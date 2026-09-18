# Teknologi & Arsitektur SkillMatch

Dokumen ini menjelaskan stack teknologi, arsitektur sistem, dan infrastruktur deployment SkillMatch.

---

## 1. Technology Stack

### Frontend

| Komponen | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router) | 16.3.1 |
| UI Library | React | 19.2.8 |
| Bahasa | TypeScript | - |
| Styling | Tailwind CSS | 4.x |
| Chart | Chart.js | - |
| PDF Export | jsPDF | - |
| State Management | React Context + localStorage | - |

**Dipilihnya Next.js App Router:**
- File-based routing dengan granular control per-route (layout, loading, error boundaries)
- Server Components default untuk performa (zero client JS kecuali `"use client"`)
- API routes terintegrasi (potensi future use)
- Streaming & Suspense untuk UX yang lebih baik

### Backend

| Komponen | Teknologi | Versi |
|---|---|---|
| Framework | Laravel | 13.17 |
| Bahasa | PHP | >= 8.3 |
| Database | MySQL | - |
| Auth | Laravel Sanctum | 4.3 |
| API Docs | L5-Swagger (OpenAPI 3.0) | - |

**Dipilihnya Laravel:**
- Eloquent ORM untuk relasi data yang bersih (Student, Assessment, Certificate, Materi)
- Built-in middleware stack (auth, role, throttle, CORS)
- Service-Repository pattern untuk separation of concerns
- Migration & seeder untuk schema management yang reproducible

### Database Schema

30 migrasi mencakup:
- `users` — auth dasar (email, password, role)
- `students` — profil siswa (nama, jurusan, kelas, NIS, card status)
- `assessment_questions` — bank soal asesmen (major_id, question, options JSON, correct, difficulty, skill)
- `assessment_results` — hasil asesmen siswa (score, percentage, level, skill_scores JSON)
- `materi` — materi pembelajaran per jurusan (slug, title, description)
- `materi_questions` — bank soal materi (materi_id, question, options, correct_index)
- `materi_results` — hasil tes materi siswa
- `certificates` — sertifikat kelulusan
- `careers` — data karier
- `career_matches` — pencocokan karier berdasarkan asesmen
- `industries` — profil perusahaan
- `jobs` & `job_applications` — lowongan & lamaran
- `portfolios` — proyek portofolio siswa
- `notifications` — notifikasi sistem
- `admins` — data admin
- `skills`, `materi_skills` — mapping skill per materi

---

## 2. Arsitektur Aplikasi

### Frontend Architecture (App Router)

```
frontend/app/
  layout.tsx              — Root layout (providers, sidebar, theme)
  auth/login/page.tsx     — Login page
  auth/register/page.tsx  — Register page
  student/
    profile/page.tsx      — Profil & upload kartu pelajar
    assessment/page.tsx   — Tes asesmen "Know Yourself" (3-step wizard)
    career-match/page.tsx — Hasil pencocokan karier
    roadmap/page.tsx      — Learning roadmap
    materi/[slug]/page.tsx — Detail materi & tes
    portfolio/page.tsx    — Portofolio proyek
  admin/
    dashboard/page.tsx    — Dashboard admin (statistik)
    quiz/page.tsx         — Kelola soal materi per jurusan
    quiz/major/page.tsx   — Kelola soal tes jurusan (asesmen)
    students/page.tsx     — Manajemen siswa
    registrations/page.tsx — Verifikasi pendaftaran & kartu
    certificates/page.tsx — Sertifikat
    industries/page.tsx   — Approval industri
  industry/
    dashboard/page.tsx    — Dashboard industri
    jobs/page.tsx         — CRUD lowongan
    candidates/page.tsx   — Calon kandidat
components/layout/        — Sidebar, DashboardHeader
components/ui/             — Card, Badge, Skeleton, dll
lib/
  api.ts                  — HTTP client (fetch wrapper + token management)
  api-contract.ts         — Endpoint constants & type definitions
  auth-context.ts         — Auth context provider
  major-quiz.ts           — Soal asesmen + admin CRUD functions
  materi-quiz.ts          — Soal materi + admin CRUD functions
  career-match.ts         — Algoritma pencocokan karier
  major-roadmap.ts        — Roadmap & localStorage persistence
  toast-context.ts        — Toast notification system
```

### Backend Architecture (Service-Repository Pattern)

```
Backend/
  app/
    Http/Controllers/     — 16 controller (request → service → response)
    Services/             — 14 service (business logic)
    Repositories/         — 14 repository (data access)
    Models/               — 17 Eloquent model
    Http/Middleware/       — Custom middleware (role, card.approved)
  routes/api.php          — 174 baris, ~63 endpoints RESTful
  database/
    migrations/           — 30 migrasi (schema)
    seeders/              — 10 seeder (data awal)
  docs/openapi.yaml       — 1567 baris, 14 kategori endpoint
  config/cors.php         — CORS configuration
```

**Request Flow:**
```
Client → Route (api.php) → Middleware (auth:sanctum, role, throttle)
       → Controller (validasi input)
       → Service (business logic)
       → Repository (database query)
       → Response JSON
```

---

## 3. API Contract

### Endpoint Summary (14 kategori, ~63 endpoints)

| Kategori | Endpoint | Method | Auth |
|---|---|---|---|
| **Auth** | `/api/v1/auth/login` | POST | throttle:5,1 |
| | `/api/v1/auth/register` | POST | throttle:5,1 |
| | `/api/v1/auth/me` | GET | auth:sanctum |
| **Students** | `/api/v1/students` | GET | public |
| | `/api/v1/students/{slug}` | GET | public |
| **Assessment** | `/api/v1/assessment/questions/{major}` | GET | public |
| | `/api/v1/assessment/questions/admin/{major}` | GET | admin |
| | `/api/v1/assessment/submit` | POST | student |
| | `/api/v1/assessment/results` | GET | student |
| | `/api/v1/assessment/questions` | PUT | admin |
| | `/api/v1/assessment/questions/reset` | POST | admin |
| **Materi** | `/api/v1/materi/majors/{major}` | GET | public |
| | `/api/v1/materi/{id}/questions` | GET | student |
| | `/api/v1/materi/{id}/submit` | POST | student |
| | `/api/v1/materi/{id}/questions/admin` | GET | admin |
| | `/api/v1/materi/{id}/questions` | PUT | admin |
| | `/api/v1/materi/{id}/questions/reset` | POST | admin |
| **Jobs** | `/api/v1/jobs` | GET | public |
| | `/api/v1/jobs` | POST | industry |
| | `/api/v1/jobs/{id}/apply` | POST | student |
| **Certificates** | `/api/v1/certificates` | GET | student |
| **Notifications** | `/api/v1/notifications` | GET | auth |
| **Admin** | `/api/v1/admins` | GET/POST | admin |
| **Statistics** | `/api/v1/admin/statistics` | GET | admin |

### OpenAPI / Swagger

Dokumentasi interaktif tersedia di: `https://api-skillmatch.rexxscode.com/api/docs/`

Spec file: `Backend/docs/openapi.yaml` (1567 baris)

---

## 4. DevOps & Deployment

### CI/CD Pipeline

```
GitHub Push → GitHub Actions CI → Deploy to Tencent Cloud CVM
```

### Deployment Architecture

| Layer | Service | Port | URL |
|---|---|---|---|
| Frontend | Next.js (PM2) | 3003 | `https://skillmatch.rexxscode.com` |
| Backend | Laravel (PM2) | 8000 | `https://api-skillmatch.rexxscode.com` |
| API Docs | Swagger UI | - | `https://api-skillmatch.rexxscode.com/api/docs/` |
| Database | MySQL | 3306 | localhost |

### Deploy Scripts

**Frontend** (`frontend/deploy.sh`):
1. `git pull origin main`
2. `npm ci --production=false` (build-time deps tetap di-install)
3. `npm run build` — bundle React 19 + Next.js 16
4. `pm2 restart skillmatch-frontend` (port 3003)

**Backend** (`Backend/deploy.sh`):
1. `git pull origin main`
2. `composer install --optimize-autoloader --no-dev`
3. `php artisan migrate --force`
4. `php artisan config:cache && php artisan route:cache`
5. `pm2 restart skillmatch-api` (port 8000)

### PM2 Ecosystem (`frontend/ecosystem.config.cjs`)

```javascript
apps: [{
  name: 'skillmatch-frontend',
  script: 'node_modules/.bin/next',
  args: 'start -p 3003',
  env: { NODE_ENV: 'production' }
}]
```

### Environment Variables

**Backend** (`.env`):
```
APP_URL=https://api-skillmatch.rexxscode.com
DB_HOST=127.0.0.1
DB_DATABASE=skillmatch
DB_USERNAME=root
CORS_ALLOWED_ORIGINS=https://skillmatch.rexxscode.com
SANCTUM_STATEFUL_DOMAINS=skillmatch.rexxscode.com
```

**Frontend** (`.env`):
```
NEXT_PUBLIC_API_URL=https://api-skillmatch.rexxscode.com
```

---

## 5. Keamanan

| Lapisan | Mekanisme | Implementasi |
|---|---|---|
| **Autentikasi** | Token-based | Laravel Sanctum (Personal Access Token) |
| **Otorisasi** | Role-based | Middleware `role:admin/student/industry` |
| **Kartu Pelajar** | Approval gate | Middleware `card.approved` (siswa harus upload & disetujui) |
| **Rate Limiting** | Per-route throttle | `throttle:5,1` pada login, register, submit asesmen |
| **CORS** | Origin whitelist | `config/cors.php` via `CORS_ALLOWED_ORIGINS` env |
| **Input Validation** | Server-side | Laravel Validator di setiap controller |
| **Password** | Hashing | bcrypt via Laravel |
| **API Docs** | Token-protected | Swagger UI butuh auth untuk try-it |

---

## 6. Fitur Utama

1. **Know Yourself (Asesmen)** — 100 soal per jurusan (RPL/DKV/TJKT), 7 skill categories, 5 level (Belum → Ahli)
2. **Career Match** — Algoritma pencocokan karier berdasarkan skor asesmen + preference siswa
3. **Materi & Sertifikat** — Tes materi per topik, lulus ≥80% dapat sertifikat
4. **Learning Roadmap** — Progress tracking materi yang sudah dikuasai
5. **Job Board** — Industri posting lowongan, siswa melamar, admin approve
6. **Portofolio** — Siswa upload proyek, bisa di-share via public link
7. **Admin Dashboard** — Statistik jumlah siswa, kelulusan, readiness per jurusan
8. **Industry Portal** — Approval industri, lihat kandidat, manage lowongan
