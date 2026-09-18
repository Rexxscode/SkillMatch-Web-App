<?php

namespace App\Services;

use App\Repositories\StudentRepository;
use Illuminate\Validation\ValidationException;

class RegistrationService
{
    public function __construct(
        private StudentRepository $students,
    ) {}

    public function listStudents(): array
    {
        $students = $this->students->withRelations();

        return [
            'data' => $students->map(fn ($student) => [
                'id' => $student->id,
                'name' => $student->user?->name,
                'email' => $student->user?->email,
                'major' => $student->major_id,
                'major_name' => $student->major?->name,
                'grade' => $student->grade,
                'studentCard' => $student->student_card,
                'cardStatus' => $student->card_status ?? 'none',
            ]),
        ];
    }

    public function listCardVerification(?int $page, int $perPage, string $search = '', string $status = ''): array
    {
        if (!$page) {
            $page = 1;
        }

        $paginated = $this->students->paginateCardHolders($perPage, $search, $status);

        $items = $paginated->getCollection()->map(fn ($student) => [
            'id' => $student->id,
            'name' => $student->user?->name,
            'email' => $student->user?->email,
            'major' => $student->major_id,
            'major_name' => $student->major?->name,
            'grade' => $student->grade,
            'hasCard' => (bool) $student->student_card,
            'cardStatus' => $student->card_status ?? 'none',
        ]);

        $pendingReview = \App\Models\Student::where('card_status', '!=', 'none')
            ->where('card_status', '!=', 'approved')
            ->count();

        return [
            'data' => $items,
            'meta' => [
                'total' => $paginated->total(),
                'per_page' => $paginated->perPage(),
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'pending_review' => $pendingReview,
            ],
        ];
    }

    public function getStudentCard(string $email): array
    {
        $student = $this->requireStudentByEmail($email);

        return [
            'email' => $email,
            'hasCard' => (bool) $student->student_card,
            'studentCard' => $student->student_card,
            'cardStatus' => $student->card_status ?? 'none',
        ];
    }

    public function approveCard(string $email): array
    {
        $student = $this->requireStudentByEmail($email);

        $this->students->update($student, ['card_status' => 'approved']);

        return ['email' => $email, 'cardStatus' => 'approved'];
    }

    public function rejectCard(string $email): array
    {
        $student = $this->requireStudentByEmail($email);

        $this->students->update($student, [
            'card_status' => 'none',
            'student_card' => null,
        ]);

        return ['email' => $email, 'cardStatus' => 'none'];
    }

    public function uploadCard(int $userId, ?string $cardData): array
    {
        $student = $this->students->findById($userId);

        if (!$student) {
            throw ValidationException::withMessages([
                'student' => 'Student profile not found',
            ]);
        }

        if (!is_string($cardData) || !preg_match('/^data:(image\/[a-zA-Z]+);base64,(.+)$/', $cardData, $matches)) {
            throw ValidationException::withMessages([
                'studentCard' => 'Kartu pelajar harus berupa file gambar',
            ]);
        }

        $allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
        $normalizedMime = strtolower($matches[1]) === 'image/jpg' ? 'image/jpeg' : strtolower($matches[1]);
        if (!in_array($normalizedMime, $allowedMimes, true)) {
            throw ValidationException::withMessages([
                'studentCard' => 'Format gambar tidak didukung (jpeg, png, webp)',
            ]);
        }

        $decoded = base64_decode($matches[2], true);
        if ($decoded === false || strlen($decoded) === 0 || strlen($decoded) > 2 * 1024 * 1024) {
            throw ValidationException::withMessages([
                'studentCard' => 'Gambar tidak valid atau melebihi 2MB',
            ]);
        }

        $this->students->update($student, [
            'student_card' => $cardData,
            'card_status' => 'pending',
        ]);

        return [
            'cardStatus' => 'pending',
        ];
    }

    private function requireStudentByEmail(string $email)
    {
        $user = $this->students->findUserByEmail($email);

        if (!$user || $user->role !== 'student') {
            throw ValidationException::withMessages([
                'email' => 'Student account not found',
            ]);
        }

        $student = $user->student;

        if (!$student) {
            throw ValidationException::withMessages([
                'email' => 'Student profile not found',
            ]);
        }

        return $student;
    }
}
