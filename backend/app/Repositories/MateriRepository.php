<?php

namespace App\Repositories;

use App\Models\Materi;
use App\Models\MateriQuestion;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class MateriRepository extends Repository
{
    protected function model(): string
    {
        return Materi::class;
    }

    public function listByMajor(string $major): Collection
    {
        return Materi::where('major_id', $major)->get();
    }

    public function findById($materiId): ?Materi
    {
        return Materi::where('id', $materiId)->first();
    }

    public function findBySlug(string $slug): ?Materi
    {
        return Materi::where('slug', $slug)->first();
    }

    public function questionsForMateri($materiId): Collection
    {
        return MateriQuestion::where('materi_id', $materiId)->get();
    }

    public function paginateQuestionsForMateri($materiId, int $perPage)
    {
        return MateriQuestion::where('materi_id', $materiId)
            ->orderBy('id')
            ->paginate($perPage);
    }

    public function findQuestion($id): ?MateriQuestion
    {
        return MateriQuestion::find($id);
    }

    public function deleteQuestionsForMateri($materiId): void
    {
        MateriQuestion::where('materi_id', $materiId)->delete();
    }

    public function createQuestion(array $data): Model
    {
        return MateriQuestion::create($data);
    }
}
