<?php

namespace App\Http\Controllers;

use App\Services\RegistrationService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class RegistrationController extends Controller
{
    public function __construct(
        private RegistrationService $registration,
        private NotificationService $notifications,
    ) {}

    public function listStudents(): JsonResponse
    {
        $data = $this->registration->listStudents();

        return response()->json([
            'success' => true,
            'data' => $data['data'],
        ]);
    }

    public function listCardVerification(Request $request): JsonResponse
    {
        $data = $this->registration->listCardVerification(
            $request->integer('page') ?: null,
            min($request->integer('per_page') ?: 5, 20),
            (string) $request->query('search', ''),
            (string) $request->query('status', ''),
        );

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function showCard(string $email): JsonResponse
    {
        $data = $this->registration->getStudentCard($email);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }

    public function approve(string $email): JsonResponse
    {
try {
            $data = DB::transaction(function () use ($email) {
                $data = $this->registration->approveCard($email);

                $this->notifications->create([
                    'target_email' => $email,
                    'role' => 'student',
                    'title' => 'Kartu Pelajar Disetujui',
                    'message' => 'Kartu pelajarmu telah disetujui. Semua fitur siswa kini terbuka.',
                    'type' => 'card_approval',
                ], 0);

                return $data;
            });
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Student card approved',
            'data' => $data,
        ]);
    }

    public function reject(string $email): JsonResponse
    {
try {
            $data = DB::transaction(function () use ($email) {
                $data = $this->registration->rejectCard($email);

                $this->notifications->create([
                    'target_email' => $email,
                    'role' => 'student',
                    'title' => 'Kartu Pelajar Ditolak',
                    'message' => 'Kartu pelajarmu ditolak saat verifikasi. Silakan unggah ulang.',
                    'type' => 'card_approval',
                ], 0);

                return $data;
            });
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Student card rejected',
            'data' => $data,
        ]);
    }

    public function uploadCard(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'studentCard' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->registration->uploadCard($request->user()->id, $request->input('studentCard'));

        return response()->json([
            'success' => true,
            'message' => 'Student card uploaded',
            'data' => $data,
        ]);
    }
}
