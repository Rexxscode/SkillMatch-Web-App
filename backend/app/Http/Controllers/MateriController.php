<?php

namespace App\Http\Controllers;

use App\Services\MateriService;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class MateriController extends Controller
{
    public function __construct(
        private MateriService $materi,
        private NotificationService $notifications,
    ) {}

    public function listByMajor(string $major): JsonResponse
    {
        $data = $this->materi->listByMajor($major);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function questions($materiId): JsonResponse
    {
        $data = $this->materi->questions($materiId);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function adminQuestions(Request $request, $materiId): JsonResponse
    {
        if ($request->integer('page')) {
            $data = $this->materi->paginatedAdminQuestions(
                $materiId,
                min($request->integer('per_page') ?: 5, 50),
            );
        } else {
            $data = $this->materi->adminQuestions($materiId);
        }

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function storeQuestion(Request $request, $materiId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'question' => 'required|string',
            'options' => 'required|array|min:2',
            'options.*' => 'string',
            'correct' => 'required|integer|min:0',
            'difficulty' => 'nullable|string',
            'skill' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->materi->createQuestion($materiId, $request->only([
            'question', 'options', 'correct', 'difficulty', 'skill',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Question created',
            'data' => $data,
        ], 201);
    }

    public function updateQuestion(Request $request, $materiId, int $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'question' => 'sometimes|required|string',
            'options' => 'sometimes|required|array|min:2',
            'options.*' => 'string',
            'correct' => 'sometimes|required|integer|min:0',
            'difficulty' => 'nullable|string',
            'skill' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->materi->updateQuestion($materiId, $id, $request->only([
            'question', 'options', 'correct', 'difficulty', 'skill',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Question updated',
            'data' => $data,
        ]);
    }

    public function deleteQuestion($materiId, int $id): JsonResponse
    {
        $data = $this->materi->deleteQuestion($materiId, $id);

        return response()->json([
            'success' => true,
            'message' => 'Question deleted',
            'data' => $data,
        ]);
    }

    public function submit(Request $request, $materiId): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'answers' => 'required|array',
            'answers.*' => 'integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $result = $this->materi->submit($request->user()->id, $materiId, $request->input('answers'));

        if ($result['passed']) {
            $this->notifications->create([
                'role' => 'admin',
                'title' => 'Sertifikat Diperoleh',
                'message' => $request->user()->name . ' lulus tes materi dengan skor ' . $result['score'] . '/' . $result['total'] . '.',
                'type' => 'materi_passed',
            ], $request->user()->id);
        }

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => $result['passed'] ? 'Selamat! Anda lulus.' : 'Belum lulus, coba lagi.',
        ]);
    }

    public function updateQuestions(Request $request, $materiId): JsonResponse
    {
        $validator = Validator::make($request->only('questions'), [
            'questions' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->materi->adminUpdateQuestions($materiId, $request->input('questions'));

        return response()->json([
            'success' => true,
            'message' => 'Questions updated',
            'data' => $data,
        ]);
    }

    public function resetQuestions($materiId): JsonResponse
    {
        $data = $this->materi->adminResetQuestions($materiId);

        return response()->json([
            'success' => true,
            'message' => 'Questions reset to default',
            'data' => $data,
        ]);
    }
}
