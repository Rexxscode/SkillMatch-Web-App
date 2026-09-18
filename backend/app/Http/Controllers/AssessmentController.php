<?php

namespace App\Http\Controllers;

use App\Services\AssessmentService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AssessmentController extends Controller
{
    public function __construct(
        private AssessmentService $assessment,
    ) {}

    public function questions($major = null): JsonResponse
    {
        $data = $this->assessment->questions($major);

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function adminQuestions(Request $request): JsonResponse
    {
        $data = $this->assessment->adminQuestions($request->query('major'));

        return response()->json([
            'success' => true,
            'data' => $data['data'],
            'meta' => $data['meta'],
        ]);
    }

    public function submit(Request $request): JsonResponse
    {
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
