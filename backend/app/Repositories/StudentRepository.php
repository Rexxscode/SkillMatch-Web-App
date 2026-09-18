<?php

namespace App\Repositories;

use App\Models\Student;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class StudentRepository extends Repository
{
    protected function model(): string
    {
        return Student::class;
    }

    public function findByNameSlug(string $slug): ?Student
    {
        $name = str_replace('-', ' ', $slug);

        return Student::query()
            ->with(['user', 'major'])
            ->whereHas('user', function ($q) use ($name) {
                $q->whereRaw('LOWER(name) = ?', [strtolower($name)]);
            })
            ->first();
    }

    public function findById(int $id): ?Student
    {
        // NB: callers pass the authenticated *user* id, not the student PK.
        // Resolve the student row belonging to that user.
        return Student::with(['user', 'major'])->where('user_id', $id)->first();
    }

    public function withRelations(): Collection
    {
        return Student::with(['user', 'major'])->get();
    }

    public function paginateWithRelations(int $perPage, string $search = '')
    {
        $query = Student::with(['user', 'major']);

        if ($search) {
            $query->whereHas('user', fn ($q) =>
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
            );
        }

        return $query->paginate($perPage);
    }

    public function paginateCardHolders(int $perPage, string $search = '', string $status = '')
    {
        $query = Student::with(['user', 'major'])
            ->where('card_status', '!=', 'none');

        if ($status === 'pending') {
            $query->where('card_status', '!=', 'approved');
        } elseif ($status === 'approved') {
            $query->where('card_status', 'approved');
        }

        if ($search) {
            $like = "%{$search}%";
            $query->where(function ($q) use ($like) {
                $q->where('major_id', 'like', $like)
                    ->orWhere('grade', 'like', $like)
                    ->orWhereHas('user', fn ($uq) =>
                        $uq->where('name', 'like', $like)
                            ->orWhere('email', 'like', $like)
                    )
                    ->orWhereHas('major', fn ($mq) => $mq->where('name', 'like', $like));
            });
        }

        // Pending (belum disetujui) tampil lebih dulu, lalu urut nama/id stabil.
        $query->orderByRaw("CASE WHEN card_status = 'approved' THEN 1 ELSE 0 END")
            ->orderBy('id');

        return $query->paginate($perPage);
    }

    public function findByEmail(string $email): ?Student
    {
        return Student::whereHas('user', fn ($q) => $q->where('email', $email))
            ->with('user')
            ->first();
    }

    public function findUserByEmail(string $email)
    {
        return \App\Models\User::where('email', $email)->first();
    }
}
