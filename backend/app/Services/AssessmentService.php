<?php

namespace App\Services;

use App\Repositories\AssessmentRepository;
use App\Repositories\StudentRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class AssessmentService
{
    public function __construct(
        private AssessmentRepository $assessments,
        private StudentRepository $students,
    ) {}

    public function questions(?string $major): array
    {
        $questions = $this->assessments->questions($major);

        return [
            'data' => $questions,
            'meta' => [
                'total' => $questions->count(),
                'major' => $major ?? 'all',
            ],
        ];
    }

    public function adminQuestions(?string $major, ?string $skill = null): array
    {
        $questions = $this->assessments->adminQuestions($major, $skill);

        return [
            'data' => $questions,
            'meta' => [
                'total' => $questions->count(),
                'major' => $major ?? 'all',
                'skills' => $this->assessments->adminSkills($major),
            ],
        ];
    }

    public function paginatedAdminQuestions(?string $major, int $perPage, ?string $skill = null): array
    {
        $paginated = $this->assessments->paginateAdminQuestions($major, $perPage, $skill);

        return [
            'data' => $paginated->items(),
            'meta' => [
                'total' => $paginated->total(),
                'per_page' => $paginated->perPage(),
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'major' => $major ?? 'all',
                'skills' => $this->assessments->adminSkills($major),
            ],
        ];
    }

    public function createQuestion(array $data): array
    {
        $question = $this->assessments->create([
            'major_id' => $data['major'],
            'question' => $data['question'],
            'options' => json_encode($data['options']),
            'correct' => $data['correct'],
            'difficulty' => $data['difficulty'] ?? 'basic',
            'skill' => $data['skill'] ?? '',
        ]);

        $this->assessments->deleteResultsForMajor($data['major']);

        return $this->formatAdminQuestion($question->fresh());
    }

    public function updateQuestion(int $id, array $data): array
    {
        $question = $this->assessments->find($id);

        if (!$question) {
            throw ValidationException::withMessages(['question' => 'Soal tidak ditemukan']);
        }

        $payload = [];
        foreach (['question', 'correct', 'difficulty', 'skill'] as $field) {
            if (array_key_exists($field, $data)) {
                $payload[$field] = $data[$field];
            }
        }
        if (array_key_exists('options', $data)) {
            $payload['options'] = json_encode($data['options']);
        }

        $this->assessments->update($question, $payload);
        $this->assessments->deleteResultsForMajor($question->major_id);

        return $this->formatAdminQuestion($question->fresh());
    }

    public function deleteQuestion(int $id): array
    {
        $question = $this->assessments->find($id);

        if (!$question) {
            throw ValidationException::withMessages(['question' => 'Soal tidak ditemukan']);
        }

        $major = $question->major_id;
        $this->assessments->delete($question);
        $this->assessments->deleteResultsForMajor($major);

        return ['id' => $id, 'major' => $major];
    }

    private function formatAdminQuestion($question): array
    {
        return [
            'id' => $question->id,
            'major_id' => $question->major_id,
            'question' => $question->question,
            'options' => json_decode($question->options, true) ?? [],
            'correct' => $question->correct,
            'difficulty' => $question->difficulty,
            'skill' => $question->skill,
        ];
    }

    public function submit(array $data, int $userId): array
    {
        $major = $data['major'];
        $answers = $data['answers'];

        $totalQuestions = $this->assessments->countForMajor($major);
        $answeredCount = count($answers);

        if ($answeredCount !== $totalQuestions) {
            throw ValidationException::withMessages([
                'answers' => "Expected {$totalQuestions} answers, got {$answeredCount}",
            ]);
        }

        $questions = $this->assessments->questionsForMajor($major);

        $correct = 0;
        foreach ($questions as $question) {
            if (isset($answers[$question->id]) && $answers[$question->id] == $question->correct) {
                $correct++;
            }
        }

        $percentage = $totalQuestions > 0 ? round(($correct / $totalQuestions) * 100) : 0;
        $level = $this->getLevel($percentage);
        $skillScores = $this->calculateSkillScores($questions, $answers);

        $levelMap = ['beginner' => 1, 'developing' => 2, 'intermediate' => 3, 'advanced' => 4, 'expert' => 5];
        $student = $this->students->findById($userId);

        if (!$student) {
            Log::error(sprintf(
                '[Assessment] Siswa tidak ditemukan untuk user id %d saat submit asesmen. Skor tidak tersimpan.',
                $userId,
            ));

            throw ValidationException::withMessages([
                'student' => 'Profil siswa tidak ditemukan. Lengkapi profil sebelum mengerjakan asesmen.',
            ]);
        }

        $this->assessments->saveResult([
            'student_id' => $student->id,
            'major_id' => $major,
            'score' => $correct,
            'percentage' => $percentage,
            'level' => $levelMap[$level] ?? 1,
            'skill_scores' => json_encode($skillScores),
            'answered_at' => now(),
        ]);

        return [
            'score' => $correct,
            'total' => $totalQuestions,
            'percentage' => $percentage,
            'level' => $level,
            'skill_scores' => $skillScores,
            'answered_at' => now(),
        ];
    }

    public function results(int $userId): Collection
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            return new Collection();
        }

        return $this->assessments->resultsForStudent($student->id);
    }

    public function adminUpdateQuestions(string $major, array $questions): array
    {
        $this->assessments->query()->where('major_id', $major)->delete();

        foreach ($questions as $q) {
            $this->assessments->create([
                'major_id' => $major,
                'question' => $q['question'],
                'options' => json_encode($q['options']),
                'correct' => $q['correct'],
                'difficulty' => $q['difficulty'] ?? 'basic',
                'skill' => $q['skill'] ?? '',
            ]);
        }

        // Editing the question bank invalidates stored results & career matches.
        \App\Models\AssessmentResult::where('major_id', $major)->delete();

        return [
            'major' => $major,
            'total' => count($questions),
        ];
    }

    public function adminResetQuestions(string $major): array
    {
        $this->assessments->query()->where('major_id', $major)->delete();
        \App\Models\AssessmentResult::where('major_id', $major)->delete();

        (new \Database\Seeders\AssessmentQuestionSeeder())->run();

        return [
            'major' => $major,
            'reset' => true,
        ];
    }

    private function getLevel(int $score): string
    {
        if ($score <= 20) return 'beginner';
        if ($score <= 40) return 'developing';
        if ($score <= 60) return 'intermediate';
        if ($score <= 80) return 'advanced';
        return 'expert';
    }

    private function calculateSkillScores(Collection $questions, array $answers): array
    {
        $skillScores = [];

        foreach ($questions as $question) {
            $skill = $question->skill;
            if (!isset($skillScores[$skill])) {
                $skillScores[$skill] = ['correct' => 0, 'total' => 0, 'level' => 'beginner'];
            }

            $skillScores[$skill]['total']++;
            if (isset($answers[$question->id]) && $answers[$question->id] == $question->correct) {
                $skillScores[$skill]['correct']++;
            }
        }

        foreach ($skillScores as &$skill) {
            if ($skill['correct'] === 0) {
                $skill['level'] = 'beginner';
            } elseif ($skill['correct'] === $skill['total']) {
                $skill['level'] = 'expert';
            } elseif ($skill['correct'] >= $skill['total'] * 0.75) {
                $skill['level'] = 'advanced';
            } elseif ($skill['correct'] >= $skill['total'] * 0.5) {
                $skill['level'] = 'intermediate';
            } else {
                $skill['level'] = 'beginner';
            }
        }

        return $skillScores;
    }
}
