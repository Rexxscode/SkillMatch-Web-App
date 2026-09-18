<?php

namespace App\Services;

use App\Models\Student;
use App\Repositories\CertificateRepository;
use App\Repositories\MateriRepository;
use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class MateriService
{
    public function __construct(
        private MateriRepository $materis,
        private CertificateRepository $certificates,
        private StudentRepository $students,
    ) {}

    public function listByMajor(string $major): array
    {
        $materiList = $this->materis->listByMajor($major);

        $formatted = $materiList->map(fn ($m) => [
            'id' => $m->id,
            'slug' => $m->slug,
            'major_id' => $m->major_id,
            'title' => $m->title,
            'description' => $m->description,
            'icon' => $m->icon,
        ]);

        return [
            'data' => $formatted,
            'meta' => [
                'total' => $materiList->count(),
                'major_id' => $major,
            ],
        ];
    }

    public function questions($materiId): array
    {
        $materi = $this->materis->findBySlug($materiId) ?? $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $questions = $this->materis->questionsForMateri($materi->id);

        // Never expose correct answers to students.
        $safe = $questions->map(fn ($q) => [
            'id' => $q->id,
            'materi_id' => $q->materi_id,
            'skill' => $q->skill_name,
            'question' => $q->question,
            'options' => $q->options,
            'difficulty' => $q->difficulty,
        ]);

        return [
            'data' => $safe,
            'meta' => [
                'total' => $questions->count(),
                'materi_id' => $materi->id,
                'slug' => $materi->slug,
                'major_id' => $materi->major_id,
            ],
        ];
    }

    public function adminQuestions($materiId): array
    {
        $materi = $this->materis->findBySlug($materiId) ?? $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $questions = $this->materis->questionsForMateri($materi->id);

        $full = $questions->map(fn ($q) => [
            'id' => $q->id,
            'materi_id' => $q->materi_id,
            'skill' => $q->skill_name,
            'question' => $q->question,
            'options' => $q->options,
            'correct' => $q->correct_index,
            'difficulty' => $q->difficulty,
        ]);

        return [
            'data' => $full,
            'meta' => [
                'total' => $questions->count(),
                'materi_id' => $materi->id,
                'slug' => $materi->slug,
                'major_id' => $materi->major_id,
            ],
        ];
    }

    public function paginatedAdminQuestions($materiId, int $perPage): array
    {
        $materi = $this->requireMateri($materiId);

        $paginated = $this->materis->paginateQuestionsForMateri($materi->id, $perPage);

        return [
            'data' => $paginated->getCollection()->map(fn ($q) => $this->formatAdminQuestion($q))->all(),
            'meta' => [
                'total' => $paginated->total(),
                'per_page' => $paginated->perPage(),
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'materi_id' => $materi->id,
                'slug' => $materi->slug,
                'major_id' => $materi->major_id,
            ],
        ];
    }

    public function createQuestion($materiId, array $data): array
    {
        $materi = $this->requireMateri($materiId);
        $skillId = $this->resolveSkillId($data);

        $question = $this->materis->createQuestion([
            'materi_id' => $materi->id,
            'skill_id' => $skillId,
            'question' => $data['question'],
            'options' => json_encode($data['options']),
            'correct_index' => $data['correct'],
            'difficulty' => $data['difficulty'] ?? 'basic',
        ]);

        return $this->formatAdminQuestion($question->fresh());
    }

    public function updateQuestion($materiId, int $id, array $data): array
    {
        $materi = $this->requireMateri($materiId);
        $question = $this->materis->findQuestion($id);

        if (!$question || $question->materi_id !== $materi->id) {
            throw ValidationException::withMessages(['question' => 'Soal tidak ditemukan']);
        }

        $payload = [];
        foreach (['question', 'correct', 'difficulty'] as $field) {
            if (array_key_exists($field, $data)) {
                $payload[$field] = $data[$field];
            }
        }
        if (array_key_exists('options', $data)) {
            $payload['options'] = json_encode($data['options']);
        }
        $payload['skill_id'] = $this->resolveSkillId($data);

        $this->materis->update($question, $payload);

        return $this->formatAdminQuestion($question->fresh());
    }

    public function deleteQuestion($materiId, int $id): array
    {
        $materi = $this->requireMateri($materiId);
        $question = $this->materis->findQuestion($id);

        if (!$question || $question->materi_id !== $materi->id) {
            throw ValidationException::withMessages(['question' => 'Soal tidak ditemukan']);
        }

        $this->materis->delete($question);

        return ['id' => $id, 'materi_id' => $materi->id];
    }

    private function requireMateri($materiId): \App\Models\Materi
    {
        $materi = $this->materis->findBySlug($materiId) ?? $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        return $materi;
    }

    private function resolveSkillId(array $data): ?int
    {
        $skillId = $data['skill_id'] ?? null;

        if ($skillId === null && !empty($data['skill'])) {
            $skill = \App\Models\Skill::where('name', $data['skill'])->first();
            $skillId = $skill?->id ?? null;
        }

        return $skillId ? (int) $skillId : null;
    }

    private function formatAdminQuestion($q): array
    {
        return [
            'id' => $q->id,
            'materi_id' => $q->materi_id,
            'skill' => $q->skill_name,
            'question' => $q->question,
            'options' => $q->options,
            'correct' => $q->correct_index,
            'difficulty' => $q->difficulty,
        ];
    }

    public function submit(int $userId, $materiId, array $answers): array
    {
        $materi = $this->materis->findBySlug($materiId) ?? $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $questions = $this->materis->questionsForMateri($materi->id);

        if ($questions->isEmpty()) {
            throw ValidationException::withMessages([
                'questions' => 'No questions found for this materi',
            ]);
        }

        $validIds = $questions->pluck('id')->map(fn ($id) => (string) $id)->toArray();
        foreach (array_keys($answers) as $key) {
            if (!in_array($key, $validIds)) {
                throw ValidationException::withMessages([
                    'answers' => "Invalid question ID: {$key}",
                ]);
            }
        }

        $correctCount = 0;
        $answeredMap = [];

        foreach ($questions as $question) {
            $studentAnswer = data_get($answers, $question->id, null);
            $isCorrect = ($studentAnswer !== null && $studentAnswer == $question->correct_index);

            if ($isCorrect) {
                $correctCount++;
            }

            $answeredMap[$question->id] = [
                'selected_index' => $studentAnswer,
                'is_correct' => $isCorrect,
            ];
        }

        $totalQuestions = count($questions);
        $passThreshold = 0.8;
        $requiredCorrect = ceil($totalQuestions * $passThreshold);
        $scorePercentage = $totalQuestions > 0 ? round(($correctCount / $totalQuestions) * 100) : 0;
        $passed = $scorePercentage >= ($passThreshold * 100);

        $student = $this->students->findById($userId);

        if ($student) {
            $this->saveCertificate($student, $materi->id, $materi->major_id, $correctCount, $totalQuestions, $passed);
        }

        return [
            'score' => $correctCount,
            'total' => $totalQuestions,
            'percentage' => $scorePercentage,
            'passed' => $passed,
            'required_correct' => $requiredCorrect,
            'materi_id' => $materi->id,
            'slug' => $materi->slug,
            'answered' => $answeredMap,
        ];
    }

    private function saveCertificate(Student $student, $materiId, string $majorId, int $correctCount, int $totalQuestions, bool $passed): void
    {
        $certificate = $this->certificates->detailForStudent($student->id, $materiId)
            ?? $this->certificates->create([
                'student_id' => $student->id,
                'major_id' => $majorId,
                'materi_id' => $materiId,
                'score' => $correctCount,
                'total' => $totalQuestions,
                'passed' => $passed ? 1 : 0,
                'certificate_date' => $passed ? now() : null,
                'attempts' => 1,
            ]);

        if ($certificate->wasRecentlyCreated) {
            return;
        }

        $certificate->attempts += 1;
        $certificate->score = $correctCount;
        $certificate->passed = $passed ? 1 : 0;
        $certificate->certificate_date = $passed ? now() : null;
        $certificate->save();
    }

    public function adminUpdateQuestions($materiId, array $questions): array
    {
        $materi = $this->materis->findBySlug($materiId) ?? $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $this->materis->deleteQuestionsForMateri($materi->id);

        foreach ($questions as $q) {
            $skillId = $q['skill_id'] ?? null;

            if ($skillId === null && !empty($q['skill'])) {
                $skill = \App\Models\Skill::where('name', $q['skill'])->first();
                $skillId = $skill?->id ?? null;
            }

            $this->materis->createQuestion([
                'materi_id' => $materi->id,
                'skill_id' => $skillId,
                'question' => $q['question'],
                'options' => json_encode($q['options']),
                'correct_index' => $q['correct'],
                'difficulty' => $q['difficulty'] ?? 'basic',
            ]);
        }

        return [
            'materi_id' => $materi->id,
            'slug' => $materi->slug,
            'total' => count($questions),
        ];
    }

    public function adminResetQuestions($materiId): array
    {
        $materi = $this->materis->findBySlug($materiId) ?? $this->materis->findById($materiId);

        if (!$materi) {
            throw ValidationException::withMessages([
                'materi' => 'Materi tidak ditemukan',
            ]);
        }

        $this->materis->deleteQuestionsForMateri($materi->id);

        (new \Database\Seeders\MateriQuestionSeeder())->run();

        return [
            'materi_id' => $materi->id,
            'slug' => $materi->slug,
            'reset' => true,
        ];
    }
}
