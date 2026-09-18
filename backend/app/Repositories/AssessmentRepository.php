<?php

namespace App\Repositories;

use App\Models\AssessmentQuestion;
use App\Models\AssessmentResult;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AssessmentRepository extends Repository
{
    protected function model(): string
    {
        return AssessmentQuestion::class;
    }

    public function questions(string $major = null): Collection
    {
        $query = AssessmentQuestion::query();

        if ($major) {
            $query->where('major_id', $major);
        }

        return $query->select('id', 'major_id', 'question', 'options', 'difficulty', 'skill')->get();
    }

    public function adminQuestions(string $major = null, ?string $skill = null): Collection
    {
        $query = AssessmentQuestion::query()->select('id', 'major_id', 'question', 'options', 'correct', 'difficulty', 'skill');

        if ($major) {
            $query->where('major_id', $major);
        }

        if ($skill !== null && $skill !== '') {
            $query->where('skill', $skill);
        }

        return $query->get();
    }

    public function paginateAdminQuestions(?string $major, int $perPage, ?string $skill = null)
    {
        $query = AssessmentQuestion::query()
            ->select('id', 'major_id', 'question', 'options', 'correct', 'difficulty', 'skill');

        if ($major) {
            $query->where('major_id', $major);
        }

        if ($skill !== null && $skill !== '') {
            $query->where('skill', $skill);
        }

        return $query->orderBy('id')->paginate($perPage);
    }

    public function adminSkills(?string $major): array
    {
        $query = AssessmentQuestion::query()
            ->select('skill', DB::raw('count(*) as total'));

        if ($major) {
            $query->where('major_id', $major);
        }

        return $query->groupBy('skill')
            ->orderBy('skill')
            ->get()
            ->map(fn ($row) => ['skill' => $row->skill, 'count' => (int) $row->total])
            ->all();
    }

    public function deleteResultsForMajor(string $major): void
    {
        AssessmentResult::where('major_id', $major)->delete();
    }

    public function questionsForMajor(string $major): Collection
    {
        return AssessmentQuestion::where('major_id', $major)->get();
    }

    public function countForMajor(string $major): int
    {
        return AssessmentQuestion::where('major_id', $major)->count();
    }

    public function saveResult(array $data): Model
    {
        return AssessmentResult::create($data);
    }

    public function resultsForStudent(int $studentId): Collection
    {
        return AssessmentResult::where('student_id', $studentId)
            ->latest()
            ->get(['id', 'major_id', 'score', 'level', 'skill_scores', 'answered_at']);
    }
}
