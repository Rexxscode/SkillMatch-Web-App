import type { QuizQuestion } from "./major-quiz";
import { rplMateriQuiz } from "./materi-quiz-rpl";
import { dkvMateriQuiz } from "./materi-quiz-dkv";
import { tkjMateriQuiz } from "./materi-quiz-tkj";
import { transmisiMateriQuiz } from "./materi-quiz-tt";
import { api, BACKEND_ENDPOINTS } from "./api";

export const allMateriQuiz: Record<string, QuizQuestion[]> = {
  ...rplMateriQuiz,
  ...dkvMateriQuiz,
  ...tkjMateriQuiz,
  ...transmisiMateriQuiz,
};

const QUIZ_OVERRIDE_PREFIX = "quiz_overrides_";

export function getQuizStorageKey(materiId: string): string {
  return `${QUIZ_OVERRIDE_PREFIX}${materiId}`;
}

function readOverride(materiId: string): QuizQuestion[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(getQuizStorageKey(materiId));
    if (!raw) return null;
    const arr = JSON.parse(raw);
    return Array.isArray(arr) && arr.length > 0 ? (arr as QuizQuestion[]) : null;
  } catch {
    return null;
  }
}

export function hasMateriQuizOverride(materiId: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(getQuizStorageKey(materiId)) !== null;
}

export function saveMateriQuiz(materiId: string, questions: QuizQuestion[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getQuizStorageKey(materiId), JSON.stringify(questions));
}

export function resetMateriQuiz(materiId: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(getQuizStorageKey(materiId));
}

export function getQuizForMateri(materiId: string): QuizQuestion[] | null {
  const override = readOverride(materiId);
  if (override) return override;
  const quiz = allMateriQuiz[materiId];
  return quiz && quiz.length > 0 ? quiz : null;
}

/* ------------------------------------------------------------------ */
/*  Backend-backed admin helpers                                       */
/* ------------------------------------------------------------------ */

type ApiAdminQuestion = {
  id: number;
  materi_id?: string;
  question: string;
  options: string[] | string;
  correct: number;
  difficulty: string;
  skill: string;
};

export type AdminQuizMeta = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  materi_id?: number;
  slug?: string;
  major_id?: string;
};

export type AdminQuizPage = {
  questions: QuizQuestion[];
  meta: AdminQuizMeta;
};

function mapAdminQuestion(q: ApiAdminQuestion): QuizQuestion {
  return {
    id: String(q.id),
    question: q.question,
    options: Array.isArray(q.options) ? q.options : JSON.parse(q.options),
    correct: q.correct,
    difficulty: (q.difficulty || "basic") as QuizQuestion["difficulty"],
    skill: q.skill || "",
  };
}

function toQuestionPayload(q: QuizQuestion) {
  return {
    question: q.question.trim(),
    options: q.options.map((o) => o.trim()),
    correct: q.correct,
    difficulty: q.difficulty,
    skill: q.skill.trim(),
  };
}

export async function fetchMateriQuizAdminPage(
  materiId: string,
  opts: { page?: number; perPage?: number } = {},
): Promise<AdminQuizPage> {
  const params = new URLSearchParams();
  if (opts.page) params.set("page", String(opts.page));
  if (opts.perPage) params.set("per_page", String(opts.perPage));
  const qs = params.toString();
  const base = BACKEND_ENDPOINTS.materiQuiz.adminQuestions(materiId);

  const res = await api.get<{
    success: boolean;
    data: ApiAdminQuestion[];
    meta: AdminQuizMeta;
  }>(qs ? `${base}?${qs}` : base);

  return {
    questions: (res.data ?? []).map(mapAdminQuestion),
    meta:
      res.meta ??
      {
        total: 0,
        per_page: opts.perPage ?? 5,
        current_page: opts.page ?? 1,
        last_page: 1,
      },
  };
}

export async function createMateriQuestion(
  materiId: string,
  q: QuizQuestion,
): Promise<QuizQuestion> {
  const res = await api.post<{ success: boolean; data: ApiAdminQuestion }>(
    BACKEND_ENDPOINTS.materiQuiz.storeQuestion(materiId),
    toQuestionPayload(q),
  );
  return mapAdminQuestion(res.data);
}

export async function updateMateriQuestion(
  materiId: string,
  id: string | number,
  q: QuizQuestion,
): Promise<QuizQuestion> {
  const res = await api.patch<{ success: boolean; data: ApiAdminQuestion }>(
    BACKEND_ENDPOINTS.materiQuiz.question(materiId, id),
    toQuestionPayload(q),
  );
  return mapAdminQuestion(res.data);
}

export async function deleteMateriQuestion(
  materiId: string,
  id: string | number,
): Promise<void> {
  await api.delete(BACKEND_ENDPOINTS.materiQuiz.question(materiId, id));
}

export async function resetMateriQuizAdmin(materiId: string): Promise<boolean> {
  await api.post(BACKEND_ENDPOINTS.materiQuiz.reset(materiId));
  return true;
}