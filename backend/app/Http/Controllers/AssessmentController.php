<?php

namespace App\Http\Controllers;

use App\Services\AssessmentService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AssessmentController extends Controller
{
    /** Alias nama jurusan lengkap -> kode singkat, agar filter aman dari frontend lama. */
    private const MAJOR_ALIASES = [
        'rekayasa perangkat lunak' => 'RPL',
        'desain komunikasi visual' => 'DKV',
        'teknik jaringan, komputer, dan telekomunikasi' => 'TJKT',
    ];

    public function __construct(
        private AssessmentService $assessment,
    ) {}

    private function normalizeMajor(?string $major): ?string
    {
        if ($major === null) {
            return null;
        }

        $trimmed = trim($major);
        $lower = mb_strtolower($trimmed);
        $lower = preg_replace('/\s+/', ' ', str_replace('+', ' ', $lower));

        return self::MAJOR_ALIASES[$lower] ?? mb_strtoupper($lower);
    }

    public function questions($major = null): JsonResponse
    {
        $data = $this->assessment->questions($this->normalizeMajor($major));

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function adminQuestions(Request $request, $major = null): JsonResponse
    {
        $major = $this->normalizeMajor($major ?? $request->query('major'));

        $page = $request->integer('page') ?: null;

        if ($page) {
            $data = $this->assessment->paginatedAdminQuestions(
                $major,
                min($request->integer('per_page') ?: 5, 50),
                $request->query('skill') ?: null,
            );
        } else {
            $data = $this->assessment->adminQuestions($major, $request->query('skill') ?: null);
        }

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function storeQuestion(Request $request): JsonResponse
    {
        $request->merge(['major' => $this->normalizeMajor($request->input('major')) ?? $request->input('major')]);

        $validator = Validator::make($request->all(), [
            'major' => 'required|string|in:RPL,DKV,TJKT',
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

        $data = $this->assessment->createQuestion($request->only([
            'major', 'question', 'options', 'correct', 'difficulty', 'skill',
        ]));

        return response()->json([
            'success' => true,
            'message' => 'Question created',
            'data' => $data,
        ], 201);
    }

    public function updateQuestion(Request $request, int $id): JsonResponse
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

        try {
            $data = $this->assessment->updateQuestion($id, $request->only([
                'question', 'options', 'correct', 'difficulty', 'skill',
            ]));
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Question updated',
            'data' => $data,
        ]);
    }

    public function deleteQuestion(int $id): JsonResponse
    {
        try {
            $data = $this->assessment->deleteQuestion($id);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'Question deleted',
            'data' => $data,
        ]);
    }

    public function submit(Request $request): JsonResponse
    {
        $request->merge(['major' => $this->normalizeMajor($request->input('major')) ?? $request->input('major')]);

        $validator = Validator::make($request->all(), [
            'major' => 'required|string|in:RPL,DKV,TJKT',
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

        $result = $this->assessment->submit($request->all(), $request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $result,
        ]);
    }

    public function results(Request $request): JsonResponse
    {
        $results = $this->assessment->results($request->user()->id);

        return response()->json([
            'success' => true,
            'data' => $results,
        ]);
    }

    public function updateQuestions(Request $request): JsonResponse
    {
        $request->merge(['major' => $this->normalizeMajor($request->input('major')) ?? $request->input('major')]);

        $validator = Validator::make($request->all([
            'major',
            'questions',
        ]), [
            'major' => 'required|string|in:RPL,DKV,TJKT',
            'questions' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->assessment->adminUpdateQuestions($request->input('major'), $request->input('questions'));

        return response()->json([
            'success' => true,
            'message' => 'Questions updated',
            'data' => $data,
        ]);
    }

    public function resetQuestions(Request $request): JsonResponse
    {
        $request->merge(['major' => $this->normalizeMajor($request->input('major')) ?? $request->input('major')]);

        $validator = Validator::make($request->all([
            'major',
        ]), [
            'major' => 'required|string|in:RPL,DKV,TJKT',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $this->assessment->adminResetQuestions($request->input('major'));

        return response()->json([
            'success' => true,
            'message' => 'Questions reset to default',
            'data' => $data,
        ]);
    }
}
