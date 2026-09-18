import type { QuizQuestion, QuizResult } from "./major-quiz";
import type { CertificateResult } from "./certificates";
import type { Materi } from "./materi-catalog";
import type { StudentData, UserCredential, RegisteredUser } from "./mock-data";
import type { CareerMatch } from "./type";

export type {
  QuizQuestion,
  QuizResult,
  CertificateResult,
  Materi,
  StudentData,
  UserCredential,
  RegisteredUser,
  CareerMatch,
};

export const BACKEND_ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    logout: "/api/v1/auth/logout",
    me: "/api/v1/auth/me",
    changePassword: "/api/v1/auth/change-password",
  },
  students: {
    list: "/api/v1/students",
    bySlug: (slug: string) => `/api/v1/students/${slug}`,
    updateGrade: (email: string) => `/api/v1/students/${email}/grade`,
    avatar: "/api/v1/students/avatar",
  },
  industries: {
    list: "/api/v1/industries",
    register: "/api/v1/industries/register",
    me: "/api/v1/industries/me",
    profile: "/api/v1/industries/profile",
    candidates: "/api/v1/industries/candidates",
    approval: (email: string) => `/api/v1/industries/${email}/approval`,
  },
  majors: {
    list: "/api/v1/majors",
    materi: (major: string) => `/api/v1/majors/${major}/materi`,
  },
  assessment: {
    questions: (major: string) => `/api/v1/assessment/questions/${encodeURIComponent(major)}`,
    adminQuestions: (major?: string) =>
      major ? `/api/v1/assessment/questions/admin/${encodeURIComponent(major)}` : "/api/v1/assessment/questions/admin",
    storeQuestion: "/api/v1/assessment/questions",
    question: (id: string | number) => `/api/v1/assessment/questions/${id}`,
    submit: "/api/v1/assessment/submit",
    results: "/api/v1/assessment/results",
    update: (major: string) => `/api/v1/assessment/questions?major=${encodeURIComponent(major)}`,
    reset: (major: string) => `/api/v1/assessment/questions/reset?major=${encodeURIComponent(major)}`,
  },
  materiQuiz: {
    questions: (materiId: string) => `/api/v1/materi/${materiId}/questions`,
    adminQuestions: (materiId: string) => `/api/v1/materi/${materiId}/questions/admin`,
    storeQuestion: (materiId: string) => `/api/v1/materi/${materiId}/questions`,
    question: (materiId: string, id: string | number) => `/api/v1/materi/${materiId}/questions/${id}`,
    submit: (materiId: string) => `/api/v1/materi/${materiId}/submit`,
    update: (materiId: string) => `/api/v1/materi/${materiId}/questions`,
    reset: (materiId: string) => `/api/v1/materi/${materiId}/questions/reset`,
  },
  registrations: {
    list: "/api/v1/registrations/students",
    cards: "/api/v1/registrations/students/cards",
    approve: (email: string) => `/api/v1/registrations/students/${email}/approve`,
    reject: (email: string) => `/api/v1/registrations/students/${email}/reject`,
    cardUpload: "/api/v1/registrations/students/card",
  },
  admins: {
    list: "/api/v1/admins",
    create: "/api/v1/admins",
  },
  statistics: {
    dashboard: "/api/v1/admin/statistics",
    readiness: "/api/v1/admin/statistics/readiness",
  },
  certificates: {
    list: "/api/v1/certificates",
    detail: (materiId: string) => `/api/v1/certificates/${materiId}`,
  },
  jobs: {
    list: "/api/v1/jobs",
    mine: "/api/v1/jobs/mine",
    create: "/api/v1/jobs",
    apply: (id: string) => `/api/v1/jobs/${id}/apply`,
    myApplications: "/api/v1/jobs/applications/mine",
    jobApplicants: (id: string) => `/api/v1/jobs/${id}/applications`,
    setApplicationStatus: (jobId: string, applicationId: string) => `/api/v1/jobs/${jobId}/applications/${applicationId}/status`,
  },
  portfolios: {
    list: (email: string) => `/api/v1/portfolios/${email}/projects`,
    save: "/api/v1/portfolios",
    public: (slug: string) => `/api/v1/portfolios/public/${slug}`,
  },
  notifications: {
    list: "/api/v1/notifications",
    unreadCount: "/api/v1/notifications/unread-count",
    create: "/api/v1/notifications",
    markRead: (id: string) => `/api/v1/notifications/${id}/read`,
    markAllRead: "/api/v1/notifications/read-all",
  },
} as const;

export const CLIENT_STORAGE_KEYS = {
  session: ["studentEmail", "loggedUserName", "loggedUserRole", "loggedUserCompany"] as const,
  profile: ["profilePhoto"] as const,
  theme: ["theme"] as const,
  registrations: ["registeredUsers"] as const,
  gradeOverrides: ["student_grade_overrides"] as const,
  quizOverrides: (materiId: string) => `quiz_overrides_${materiId}`,
  majorQuizOverrides: (major: string) =>
    `quiz_overrides_${major.toLowerCase().trim().replace(/\s+/g, "-")}`,
  assessment: ["major_quiz_result", "major_quiz_answers"] as const,
  certificates: (email: string) => `certificate_results_${email}`,
  industryJobs: (email: string) => `industryJobs_${email}`,
  portfolioProjects: (email: string) => `portfolio_projects_${email}`,
  notifications: "app_notifications",
} as const;

export type QuizQuestionDTO = QuizQuestion;
export type AssessmentSubmitPayload = { major: string; answers: Record<string, number> };
export type MateriQuizSubmitPayload = { answers: Record<string, number> };
export type CertificateIssuePayload = { materiId: string; studentEmail: string };
export type StudentRegistrationPayload = {
  email: string;
  password: string;
  name: string;
  major: string;
  grade: string;
  studentCard?: string;
};
export type StudentGradeUpdatePayload = { email: string; grade: string };