<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Student;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AdminIntegrationFeatureTest extends TestCase
{
    use WithFaker;

    private function adminUser()
    {
        return User::where('email', 'admin@smk.id')->firstOrFail();
    }

    private function studentUser(string $email = 'hendra@student.smk.id')
    {
        $user = User::where('email', $email)->where('role', 'student')->first();
        if (!$user) {
            $user = Student::first()->user;
        }
        return $user;
    }

    private function industryEmail()
    {
        return 'hrd@techcorp.com';
    }

    public function test_list_admins_as_admin()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/admins');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'name', 'email', 'role']],
        ]);
    }

    public function test_list_industries_as_admin()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/industries');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['email', 'name', 'company', 'status']],
        ]);
    }

    public function test_list_students_as_admin()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/registrations/students');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'name', 'email', 'major', 'cardStatus']],
        ]);
    }

    public function test_admin_assessment_questions_expose_correct()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/assessment/questions/admin/RPL');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'major_id', 'question', 'options', 'correct', 'difficulty', 'skill']],
            'meta',
        ]);

        $data = $response->json('data');
        $this->assertGreaterThan(0, count($data), 'Admin questions empty for RPL');
        $this->assertTrue(
            collect($data)->every(fn ($q) => $q['major_id'] === 'RPL'),
            'Admin questions must only contain RPL questions when filtered by major'
        );
    }

    public function test_admin_materi_questions_expose_correct()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/materi/1/questions/admin');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'materi_id', 'skill', 'question', 'options', 'correct', 'difficulty']],
        ]);
    }

    public function test_statistics_dashboard_shape()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/admin/statistics');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [
                'totalStudents',
                'assessedStudents',
                'assessedPercentage',
                'avgReadinessScore',
                'totalIndustries',
                'pendingIndustries',
                'pendingCards',
            ],
        ]);
    }

    public function test_statistics_readiness_shape()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/admin/statistics/readiness');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['label', 'key', 'count']],
        ]);
    }

    public function test_student_can_create_notification()
    {
        $this->actingAs($this->studentUser());

        $response = $this->postJson('/api/v1/notifications', [
            'text' => 'Pesan uji integrasi',
            'type' => 'system',
            'role' => 'admin',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => ['created', 'actor_id'],
        ]);
    }

    public function test_notification_index_shape()
    {
        $user = $this->studentUser();

        $this->actingAs($user);
        $this->postJson('/api/v1/notifications', [
            'text' => 'Notif uji index',
            'type' => 'system',
            'role' => 'student',
        ]);

        $response = $this->getJson('/api/v1/notifications');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'role', 'target_email', 'text', 'type', 'read', 'created_at']],
        ]);
    }

    public function test_card_approve_and_reject_roundtrip()
    {
        $this->actingAs($this->adminUser());
        $email = $this->studentUser()->email;

        $approve = $this->postJson("/api/v1/registrations/students/{$email}/approve");
        $approve->assertStatus(200);
        $approve->assertJsonPath('success', true);

        $reject = $this->postJson("/api/v1/registrations/students/{$email}/reject");
        $reject->assertStatus(200);
        $reject->assertJsonPath('success', true);
    }

    public function test_industry_approval_roundtrip()
    {
        $this->actingAs($this->adminUser());

        $approve = $this->postJson('/api/v1/industries/' . $this->industryEmail() . '/approval', [
            'action' => 'approve',
        ]);
        $approve->assertStatus(200);
        $approve->assertJsonPath('success', true);

        $reject = $this->postJson('/api/v1/industries/' . $this->industryEmail() . '/approval', [
            'action' => 'reject',
        ]);
        $reject->assertStatus(200);
        $reject->assertJsonPath('success', true);
    }

    public function test_admin_question_access_denied_for_student()
    {
        $this->actingAs($this->studentUser());

        $response = $this->getJson('/api/v1/assessment/questions/admin/RPL');

        $response->assertStatus(403);
    }
}