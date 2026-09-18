<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AssessmentController;
use App\Http\Controllers\MateriController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\DocsController;

Route::prefix('v1/auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::post('register', [AuthController::class, 'register'])->middleware('throttle:5,1');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:5,1');
    Route::post('reset-password', [AuthController::class, 'resetPassword'])->middleware('throttle:5,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('change-password', [AuthController::class, 'changePassword'])->middleware('throttle:5,1');
        Route::get('me', [AuthController::class, 'me']);
    });
});

Route::prefix('v1/students')->group(function () {
    Route::get('', [StudentController::class, 'index']);
    Route::get('{slug}', [StudentController::class, 'show']);
});

// Student management (admin)
Route::prefix('v1/students')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::put('{email}/grade', [StudentController::class, 'updateGrade']);
});

Route::prefix('v1/assessment')->group(function () {
    Route::get('questions/admin/{major?}', [AssessmentController::class, 'adminQuestions'])->middleware(['auth:sanctum', 'role:admin']);
    Route::get('questions/{major?}', [AssessmentController::class, 'questions']);

    Route::middleware(['auth:sanctum', 'role:student'])->group(function () {
        Route::post('submit', [AssessmentController::class, 'submit'])->middleware('throttle:5,1');
        Route::get('results', [AssessmentController::class, 'results']);
    });

    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::put('questions', [AssessmentController::class, 'updateQuestions']);
        Route::post('questions/reset', [AssessmentController::class, 'resetQuestions']);
        Route::post('questions', [AssessmentController::class, 'storeQuestion']);
        Route::patch('questions/{id}', [AssessmentController::class, 'updateQuestion']);
        Route::delete('questions/{id}', [AssessmentController::class, 'deleteQuestion']);
    });
});

Route::prefix('v1/materi')->group(function () {
    Route::get('majors/{major}', [MateriController::class, 'listByMajor']);

    Route::middleware(['auth:sanctum', 'role:student', 'card.approved'])->group(function () {
        Route::get('{materiId}/questions', [MateriController::class, 'questions']);
        Route::post('{materiId}/submit', [MateriController::class, 'submit'])->middleware('throttle:5,1');
    });

    Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
        Route::get('{materiId}/questions/admin', [MateriController::class, 'adminQuestions']);
        Route::put('{materiId}/questions', [MateriController::class, 'updateQuestions']);
        Route::post('{materiId}/questions/reset', [MateriController::class, 'resetQuestions']);
        Route::post('{materiId}/questions', [MateriController::class, 'storeQuestion']);
        Route::patch('{materiId}/questions/{id}', [MateriController::class, 'updateQuestion']);
        Route::delete('{materiId}/questions/{id}', [MateriController::class, 'deleteQuestion']);
    });
});

Route::prefix('v1/certificates')->middleware(['auth:sanctum', 'role:student', 'card.approved'])->group(function () {
    Route::get('', [CertificateController::class, 'list']);
    Route::get('{materiId}', [CertificateController::class, 'detail']);
});

Route::prefix('v1/roadmap')->middleware(['auth:sanctum', 'role:student'])->group(function () {
    Route::get('', [RoadmapController::class, 'index']);
    Route::get('progress', [RoadmapController::class, 'progress']);
    Route::post('progress', [RoadmapController::class, 'updateProgress']);
});

Route::prefix('v1/portfolios')->middleware(['auth:sanctum', 'role:student'])->group(function () {
    Route::get('{email}/projects', [PortfolioController::class, 'projects']);
    Route::post('', [PortfolioController::class, 'save']);
});

Route::prefix('v1/portfolios/public')->group(function () {
    Route::get('{slug}', [PortfolioController::class, 'public']);
});

// Industry profile & candidates (consolidated)
Route::prefix('v1/industries')->middleware(['auth:sanctum', 'role:industry'])->group(function () {
    Route::get('me', [IndustryController::class, 'me']);
    Route::get('profile', [IndustryController::class, 'profile']);
    Route::put('profile', [IndustryController::class, 'updateProfile']);
    Route::patch('profile', [IndustryController::class, 'updateProfile']);
    Route::get('candidates', [IndustryController::class, 'candidates']);
});

// Jobs (consolidated single source of truth for job CRUD)
Route::prefix('v1/jobs')->group(function () {
    Route::get('', [JobController::class, 'index']);

    // Student: apply & history (must be declared before the {id} wildcard)
    Route::middleware(['auth:sanctum', 'role:student'])->group(function () {
        Route::get('applications/mine', [JobController::class, 'myApplications']);
        Route::post('{id}/apply', [JobController::class, 'apply']);
    });

    Route::middleware(['auth:sanctum', 'role:industry'])->group(function () {
        Route::get('mine', [JobController::class, 'mine']);
        Route::post('', [JobController::class, 'store'])->middleware('throttle:2,1');
        Route::get('{id}/applications', [JobController::class, 'jobApplicants']);
        Route::put('{id}/applications/{applicationId}/status', [JobController::class, 'updateApplicationStatus']);
        Route::put('{id}', [JobController::class, 'update']);
        Route::delete('{id}', [JobController::class, 'delete']);
    });

    Route::get('{id}', [JobController::class, 'show']);
});

Route::prefix('v1/notifications')->middleware('auth:sanctum')->group(function () {
    Route::get('', [NotificationController::class, 'index']);
    Route::get('unread-count', [NotificationController::class, 'unreadCount']);
    Route::post('', [NotificationController::class, 'store']);
    Route::post('{id}/read', [NotificationController::class, 'markRead']);
    Route::post('read-all', [NotificationController::class, 'markAllRead']);
});

// Admin: accounts & industry approval
Route::prefix('v1/admins')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('', [AdminController::class, 'listAdmins']);
    Route::post('', [AdminController::class, 'createAdmin']);
});

Route::prefix('v1/industries')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('', [AdminController::class, 'listIndustries']);
    Route::post('{email}/approval', [AdminController::class, 'setIndustryApproval']);
});

// Admin: student registrations / card verification
Route::prefix('v1/registrations')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('students', [RegistrationController::class, 'listStudents']);
    Route::get('students/cards', [RegistrationController::class, 'listCardVerification']);
    Route::post('students/{email}/approve', [RegistrationController::class, 'approve']);
    Route::post('students/{email}/reject', [RegistrationController::class, 'reject']);
});

// Student: upload their own card & avatar
Route::prefix('v1/registrations')->middleware(['auth:sanctum', 'role:student'])->group(function () {
    Route::post('students/card', [RegistrationController::class, 'uploadCard'])->middleware('throttle:5,1');
});

Route::prefix('v1/students')->middleware(['auth:sanctum', 'role:student'])->group(function () {
    Route::post('avatar', [StudentController::class, 'updateAvatar'])->middleware('throttle:5,1');
});

// Admin: majors & statistics
Route::prefix('v1/majors')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('', [MajorController::class, 'list']);
    Route::get('{major}/materi', [MajorController::class, 'materi']);
});

Route::prefix('v1/admin')->middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('statistics', [StatisticsController::class, 'dashboard']);
    Route::get('statistics/readiness', [StatisticsController::class, 'readinessDistribution']);
});

// Dokumentasi OpenAPI statis (Swagger UI) dalam Bahasa Indonesia
Route::prefix('docs')->group(function () {
    Route::get('', [DocsController::class, 'index']);
    Route::get('openapi.yaml', [DocsController::class, 'spec']);
});
