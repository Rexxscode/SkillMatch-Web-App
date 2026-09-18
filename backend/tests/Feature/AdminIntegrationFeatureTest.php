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

    public function test_admin_questions_accepts_full_major_name_alias()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/assessment/questions/admin/' . urlencode('Rekayasa Perangkat Lunak'));

        $response->assertStatus(200);
        $this->assertEquals('RPL', $response->json('meta.major'));

        $data = $response->json('data');
        $this->assertGreaterThan(0, count($data), 'Admin questions empty for full major name');
        $this->assertTrue(
            collect($data)->every(fn ($q) => $q['major_id'] === 'RPL'),
            'Admin questions must only contain RPL questions when filtered by full major name'
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

    public function test_card_verification_paginated_only_card_holders()
    {
        $this->actingAs($this->adminUser());

        $response = $this->getJson('/api/v1/registrations/students/cards?page=1&per_page=5');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'name', 'email', 'major', 'major_name', 'grade', 'hasCard', 'cardStatus']],
            'meta' => ['total', 'per_page', 'current_page', 'last_page', 'pending_review'],
        ]);

        $total = \App\Models\Student::where('card_status', '!=', 'none')->count();
        $this->assertEquals($total, $response->json('meta.total'), 'Cards endpoint must only include card holders');
        $this->assertEquals(5, $response->json('meta.per_page'));

        $card = $response->json('data.0');
        $this->assertTrue($card['hasCard'], 'List must not include card image payload, only hasCard flag');
    }

    public function test_card_image_fetched_on_demand()
    {
        $this->actingAs($this->adminUser());

        $cardholder = \App\Models\Student::where('card_status', '!=', 'none')->first();
        $this->assertNotNull($cardholder);

        $email = $cardholder->user->email;
        $cardStatus = $cardholder->card_status;

        $response = $this->getJson('/api/v1/registrations/students/' . urlencode($email) . '/card');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => ['email', 'hasCard', 'studentCard', 'cardStatus'],
        ]);
        $this->assertEquals($cardStatus, $response->json('data.cardStatus'));
        $this->assertEquals($email, $response->json('data.email'));
    }

    public function test_card_verification_search_and_status_filters()
    {
        $this->actingAs($this->adminUser());

        $cardholder = \App\Models\Student::where('card_status', '!=', 'none')->first();
        $this->assertNotNull($cardholder, 'Test DB should have at least one card holder');
        $email = $cardholder->user->email;

        $byEmail = $this->getJson('/api/v1/registrations/students/cards?search=' . urlencode($email));
        $byEmail->assertStatus(200);
        $this->assertEquals(1, $byEmail->json('meta.total'));

        $none = $this->getJson('/api/v1/registrations/students/cards?search=zzz_nothing');
        $none->assertStatus(200);
        $this->assertEquals(0, $none->json('meta.total'));

        $pending = $this->getJson('/api/v1/registrations/students/cards?status=pending');
        $pending->assertStatus(200);
        $pendingCount = \App\Models\Student::where('card_status', '!=', 'none')->where('card_status', '!=', 'approved')->count();
        $this->assertEquals($pendingCount, $pending->json('meta.total'));
    }

    public function test_admin_assessment_questions_paginated_with_skill_meta()
    {
        $this->actingAs($this->adminUser());

        $total = \App\Models\AssessmentQuestion::where('major_id', 'RPL')->count();

        $response = $this->getJson('/api/v1/assessment/questions/admin/RPL?page=2&per_page=5');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'major_id', 'question', 'options', 'correct', 'difficulty', 'skill']],
            'meta' => ['total', 'per_page', 'current_page', 'last_page', 'major', 'skills'],
        ]);

        $this->assertEquals($total, $response->json('meta.total'));
        $this->assertEquals(5, $response->json('meta.per_page'));
        $this->assertEquals(2, $response->json('meta.current_page'));
        $this->assertEquals(ceil($total / 5), $response->json('meta.last_page'));
        $this->assertGreaterThan(0, count($response->json('meta.skills')));

        $data = $response->json('data');
        $this->assertTrue(
            collect($data)->every(fn ($q) => $q['major_id'] === 'RPL'),
            'Paginated admin questions must only contain RPL questions'
        );

        $firstSkill = $data[0]['skill'];
        $filtered = $this->getJson('/api/v1/assessment/questions/admin/RPL?skill=' . urlencode($firstSkill));
        $filtered->assertStatus(200);
        $this->assertTrue(
            collect($filtered->json('data'))->every(fn ($q) => $q['skill'] === $firstSkill),
            'Skill filter must return only questions with that skill'
        );
    }

    public function test_admin_materi_questions_paginated()
    {
        $this->actingAs($this->adminUser());

        $total = \App\Models\MateriQuestion::where('materi_id', 1)->count();

        $response = $this->getJson('/api/v1/materi/1/questions/admin?page=1&per_page=5');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'success',
            'data' => [['id', 'materi_id', 'skill', 'question', 'options', 'correct', 'difficulty']],
            'meta' => ['total', 'per_page', 'current_page', 'last_page', 'materi_id', 'slug', 'major_id'],
        ]);

        $this->assertEquals($total, $response->json('meta.total'));
        $this->assertEquals(5, count($response->json('data')));
    }

    public function test_assessment_question_create_update_delete_roundtrip()
    {
        $this->actingAs($this->adminUser());

        $totalBefore = \App\Models\AssessmentQuestion::where('major_id', 'RPL')->count();

        $created = $this->postJson('/api/v1/assessment/questions', [
            'major' => 'RPL',
            'question' => 'Soal percobaan pagination?',
            'options' => ['Opsi A', 'Opsi B'],
            'correct' => 1,
            'difficulty' => 'basic',
            'skill' => 'Test Skill',
        ]);
        $created->assertStatus(201);
        $created->assertJsonPath('success', true);
        $id = $created->json('data.id');
        $this->assertNotNull($id);

        try {
            $this->assertEquals(
                $totalBefore + 1,
                \App\Models\AssessmentQuestion::where('major_id', 'RPL')->count(),
                'Create must add one question'
            );

            $updated = $this->patchJson("/api/v1/assessment/questions/{$id}", [
                'question' => 'Soal percobaan pagination (diubah)?',
                'correct' => 0,
            ]);
            $updated->assertStatus(200);
            $updated->assertJsonPath('data.question', 'Soal percobaan pagination (diubah)?');

            $deleted = $this->deleteJson("/api/v1/assessment/questions/{$id}");
            $deleted->assertStatus(200);
            $deleted->assertJsonPath('success', true);
        } finally {
            \App\Models\AssessmentQuestion::where('id', $id)->delete();
        }

        $this->assertEquals(
            $totalBefore,
            \App\Models\AssessmentQuestion::where('major_id', 'RPL')->count(),
            'Delete must restore question count'
        );
    }

    public function test_materi_question_create_update_delete_roundtrip()
    {
        $this->actingAs($this->adminUser());

        $totalBefore = \App\Models\MateriQuestion::where('materi_id', 1)->count();

        $created = $this->postJson('/api/v1/materi/1/questions', [
            'question' => 'Soal materi percobaan pagination?',
            'options' => ['Pilihan A', 'Pilihan B'],
            'correct' => 0,
            'difficulty' => 'basic',
            'skill' => 'Test Skill',
        ]);
        $created->assertStatus(201);
        $created->assertJsonPath('success', true);
        $id = $created->json('data.id');
        $this->assertNotNull($id);

        try {
            $this->assertEquals(
                $totalBefore + 1,
                \App\Models\MateriQuestion::where('materi_id', 1)->count()
            );

            $updated = $this->patchJson("/api/v1/materi/1/questions/{$id}", [
                'question' => 'Soal materi percobaan pagination (diubah)?',
            ]);
            $updated->assertStatus(200);
            $updated->assertJsonPath('data.question', 'Soal materi percobaan pagination (diubah)?');

            $deleted = $this->deleteJson("/api/v1/materi/1/questions/{$id}");
            $deleted->assertStatus(200);
            $deleted->assertJsonPath('success', true);
        } finally {
            \App\Models\MateriQuestion::where('id', $id)->delete();
        }

        $this->assertEquals($totalBefore, \App\Models\MateriQuestion::where('materi_id', 1)->count());
    }
}