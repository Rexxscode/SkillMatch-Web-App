"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ClipboardCheck, ChevronRight, ChevronLeft, CheckCircle2, Brain, Lock, BadgeCheck } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import { SkeletonDashboard } from "../../components/ui/skeleton";
import DashboardHeader from "../../components/layout/dashboardheader";
import { useAuth } from "../../lib/auth-context";
import { useCardStatus } from "../../components/student-card-gate";
import { api, BACKEND_ENDPOINTS, ApiError } from "../../lib/api";
import { addNotification } from "../../lib/notifications";
import { useToast } from "../../lib/toast-context";
import { gradeQuiz, type QuizQuestion, type QuizResult } from "../../lib/major-quiz";
import { generateCareerMatches, saveCareerMatches } from "../../lib/career-match";
import { saveQuizResult, saveQuizAnswers } from "../../lib/major-roadmap";
import type { Skill } from "../../lib/type";

const SkillRadar = dynamic(() => import("../../components/charts/skillradar"), { ssr: false });

const totalSteps = 3;
const stepLabels = ["Selamat Datang", "Tes Jurusan", "Hasil"];

const difficultyColor: Record<string, "success" | "primary" | "warning" | "danger"> = {
  basic: "success",
  intermediate: "primary",
  advanced: "warning",
  expert: "danger",
};
const difficultyLabel: Record<string, string> = {
  basic: "Dasar",
  intermediate: "Menengah",
  advanced: "Lanjut",
  expert: "Ahli",
};

function getLevelFromScore(correct: number, total: number): number {
  const pct = total > 0 ? correct / total : 0;
  if (pct >= 0.9) return 5;
  if (pct >= 0.7) return 4;
  if (pct >= 0.5) return 3;
  if (pct >= 0.3) return 2;
  return 1;
}

const serverLevelMap: Record<string, number> = {
  beginner: 1,
  developing: 2,
  intermediate: 3,
  advanced: 4,
  expert: 5,
};

function getLevelLabel(level: number): string {
  const labels = ["", "Belum", "Dasar", "Menengah", "Mahir", "Ahli"];
  return labels[level] || "";
}

function getLevelColor(level: number): "danger" | "warning" | "default" | "primary" | "success" {
  if (level <= 1) return "danger";
  if (level <= 2) return "warning";
  if (level <= 3) return "default";
  if (level <= 4) return "primary";
  return "success";
}

export default function AssessmentPage() {
  const { user } = useAuth();
  const { approved } = useCardStatus();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const isRetake = searchParams.get("retake") === "true";
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizCurrent, setQuizCurrent] = useState(0);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [resultSkills, setResultSkills] = useState<Skill[]>([]);

  useEffect(() => { setMounted(true); }, []);

  const major = user?.student?.major || "";
  const majorName = user?.student?.major_name || "";

  useEffect(() => {
    if (!mounted) return;
    if (isRetake) setCurrentStep(2);
  }, [mounted, isRetake]);

  useEffect(() => {
    if (!mounted || !user || !major) return;
    let cancelled = false;
    const load = async () => {
      try {
        const res = await api.get<{ success: boolean; data: QuizQuestion[] }>(
          BACKEND_ENDPOINTS.assessment.questions(major),
        );
        if (cancelled) return;
        if (res.success && res.data.length > 0) {
          setQuizQuestions(res.data.map((q) => ({ ...q, id: String(q.id) })));
          setLoadError(null);
        } else {
          setQuizQuestions([]);
          setLoadError("Belum ada soal untuk jurusanmu.");
        }
      } catch {
        if (!cancelled) setLoadError("Gagal memuat soal. Periksa koneksi atau coba lagi.");
      }
    };
    load();
    return () => { cancelled = true; };
  }, [mounted, user, major]);

  if (!mounted || !user) return <div className="p-6"><SkeletonDashboard /></div>;
  const currentUser = { name: user.name, email: user.email, major: user.student?.major || "", grade: user.student?.grade || "" };
  const quizProgress = quizQuestions.filter((q) => quizAnswers[q.id] !== undefined).length;
  const quizComplete = quizQuestions.length > 0 && quizQuestions.every((q) => quizAnswers[q.id] !== undefined);
  const quizLoaded = quizQuestions.length > 0;

  const handleQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const goToStep = async (step: number) => {
    if (step === 3) {
      let result: QuizResult;

      try {
        const res = await api.post<{
          success: boolean;
          data: {
            score: number;
            total: number;
            percentage: number;
            level: string;
            skill_scores: Record<string, { correct: number; total: number }>;
          };
        }>(BACKEND_ENDPOINTS.assessment.submit, {
          major: currentUser.major,
          answers: quizAnswers,
        });

        result = {
          score: res.data.percentage,
          level: serverLevelMap[res.data.level] ?? getLevelFromScore(res.data.score, res.data.total),
          skillScores: res.data.skill_scores,
        };
        setSubmitError(null);
      } catch (err) {
        result = gradeQuiz(quizAnswers, quizQuestions);

        setSubmitError(
          err instanceof ApiError
            ? `Hasil belum tersimpan ke server (${err.status}): ${err.message}`
            : "Hasil belum tersimpan ke server. Periksa koneksi, lalu ulangi asesmen.",
        );
        toast(
          err instanceof ApiError && err.errors
            ? Object.values(err.errors).flat().join(" · ")
            : err instanceof ApiError
            ? err.message
            : "Gagal mengirim jawaban ke server",
          "warning",
        );
      }

      setQuizResult(result);
      saveQuizResult(result);
      saveQuizAnswers(quizAnswers);

      const careerMatches = generateCareerMatches(majorName, result);
      saveCareerMatches(careerMatches);

      const skills: Skill[] = Object.entries(result.skillScores).map(([skillName, data]) => ({
        id: `skill-${skillName}`,
        name: skillName,
        category: "hard" as const,
        level: getLevelFromScore(data.correct, data.total),
      }));
      setResultSkills(skills);

      addNotification({
        text: `${currentUser.name} menyelesaikan asesmen dengan skor tes jurusan: ${result.score}%`,
        type: "assessment_done",
        targetRole: "admin",
      });
      window.dispatchEvent(new CustomEvent("notifications-updated"));
    }
    setCurrentStep(step);
  };

  if (!approved) {
    return (
      <div>
        <DashboardHeader title="Know Yourself" subtitle="Asesmen kemampuan skill kamu" />
        <Card className="max-w-xl mx-auto text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-5">
            <Lock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">Asesmen Terkunci</h2>
          <p className="text-sm text-muted mb-6 max-w-sm mx-auto">
            Selesaikan Kartu Pelajar agar bisa mengikuti asesmen dan melihat hasil level skill serta rekomendasi karier.
          </p>
          <Link
            href="/student/profile"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            <BadgeCheck className="w-4 h-4" />
            Ke Profil & Upload Kartu
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader title="Know Yourself" subtitle="Asesmen kemampuan skill kamu" />

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep > i + 1
                    ? "bg-emerald-500 text-white"
                    : currentStep === i + 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {currentStep > i + 1 ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-[10px] sm:text-xs text-center ${currentStep === i + 1 ? "font-medium text-foreground" : "text-muted"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Welcome */}
      {currentStep === 1 && (
        <Card className="text-center py-8 sm:py-12 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ClipboardCheck className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Selamat datang, {currentUser.name}!</h2>
          <p className="text-muted max-w-md mx-auto mb-8">
            Asesmen ini akan memetakan kemampuan skill kamu melalui tes pengetahuan jurusan.
            Hasil tes akan menentukan level skill hard skill kamu secara objektif.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
            <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg px-4 py-2 text-center">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-300">{quizLoaded ? `${quizQuestions.length} Soal Tes Jurusan` : "Tes Jurusan"}</p>
              <p className="text-xs text-amber-600 dark:text-amber-400">{majorName || currentUser.major}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg px-4 py-2 text-center">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">10 Soal per Hard Skill</p>
            </div>
          </div>
          <p className="text-xs text-muted text-center mb-8">
            Jawab seluruh soal bank tes jurusanmu. Hasil menentukan level hard skill dan rekomendasi karier.
          </p>
          <button
            onClick={() => goToStep(2)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
          >
            Mulai Asesmen <ChevronRight className="w-4 h-4" />
          </button>
        </Card>
      )}

      {/* Step 2: Major Quiz */}
      {currentStep === 2 && (
        <div className="animate-fade-in">
          {loadError && (
            <Card className="text-center py-14">
              <Brain className="w-10 h-10 text-muted mx-auto mb-3" />
              <p className="font-medium text-foreground">Soal tidak dapat dimuat</p>
              <p className="text-sm text-muted mt-1 mb-4">{loadError}</p>
              <button
                onClick={() => { setCurrentStep(1); setLoadError(null); }}
                className="px-5 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary-dark"
              >
                Kembali
              </button>
            </Card>
          )}
          {!loadError && !quizLoaded && (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {!loadError && quizLoaded && (
          <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Tes Pengetahuan Jurusan</h2>
              <p className="text-sm text-muted">{majorName || currentUser.major} — {quizQuestions.length} soal dari dasar hingga ahli</p>
            </div>
            <Badge variant="primary">{quizProgress}/{quizQuestions.length} soal</Badge>
          </div>

          {/* Skill nav pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[...new Set(quizQuestions.map((q) => q.skill))].map((skill) => {
              const qs = quizQuestions.filter((q) => q.skill === skill);
              const answered = qs.filter((q) => quizAnswers[q.id] !== undefined).length;
              return (
                <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-muted">
                  {skill}: {answered}/{qs.length}
                </span>
              );
            })}
          </div>

          {/* Question progress */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-6">
            <div
              className="bg-primary rounded-full h-1.5 transition-all duration-300"
              style={{ width: `${((quizCurrent + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {(() => {
            const q = quizQuestions[quizCurrent];
            const selectedAnswer = quizAnswers[q.id];
            return (
              <Card className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">
                    Soal {quizCurrent + 1}/{quizQuestions.length}
                  </span>
                  <Badge variant={difficultyColor[q.difficulty]} className="text-[10px]">
                    {difficultyLabel[q.difficulty]}
                  </Badge>
                  <Badge variant="default" className="text-[10px]">{q.skill}</Badge>
                </div>
                <p className="font-medium text-foreground mb-4">{q.question}</p>
                <div className="space-y-2">
                  {q.options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuizAnswer(q.id, i)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm border transition-colors ${
                        selectedAnswer === i
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border text-foreground hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </Card>
            );
          })()}

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => {
                if (quizCurrent > 0) setQuizCurrent(quizCurrent - 1);
                else if (isRetake) window.location.href = "/student/roadmap";
                else goToStep(1);
              }}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> {quizCurrent > 0 ? "Sebelumnya" : "Kembali"}
            </button>
            <div className="flex gap-2">
              {quizCurrent < quizQuestions.length - 1 ? (
                <button
                  onClick={() => setQuizCurrent(quizCurrent + 1)}
                  disabled={quizAnswers[quizQuestions[quizCurrent].id] === undefined}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => goToStep(3)}
                  disabled={!quizComplete}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selesai & Lihat Hasil <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
          )}
        </div>
      )}

      {/* Step 3: Results */}
      {currentStep === 3 && (resultSkills.length > 0 || quizResult) && (
        <div className="animate-fade-in">
          <Card className="mb-6 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
              <div>
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-200">Asesmen Selesai!</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Skill profile kamu sudah berhasil dibuat berdasarkan hasil tes.
                </p>
              </div>
            </div>
          </Card>

          {/* Quiz Result Summary */}
          {quizResult && (
            <Card className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Hasil Tes Jurusan — {currentUser.major}</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-primary">{quizResult.score}%</p>
                  <p className="text-xs text-muted mt-1">Skor</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-foreground">{quizResult.level}/5</p>
                  <p className="text-xs text-muted mt-1">Level</p>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-500">
                    {Object.values(quizResult.skillScores).filter((s) => s.correct === s.total).length}
                  </p>
                  <p className="text-xs text-muted mt-1">Skill Dikuasai</p>
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries(quizResult.skillScores).map(([skill, data]) => {
                  const level = getLevelFromScore(data.correct, data.total);
                  return (
                    <div key={skill} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{skill}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(data.correct / data.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-muted w-10 text-right">{data.correct}/{data.total}</span>
                        <Badge variant={getLevelColor(level)} className="text-[10px]">
                          {getLevelLabel(level)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <SkillRadar skills={resultSkills} title="Skill Profile Kamu" />
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-foreground mb-4">Ringkasan Skill</h3>
              <div className="space-y-3">
                {resultSkills
                  .sort((a, b) => b.level - a.level)
                  .map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${skill.level >= 4 ? "bg-emerald-500" : skill.level >= 3 ? "bg-amber-400" : "bg-red-400"}`} />
                        <span className="text-sm text-foreground">{skill.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm ${
                                i <= skill.level ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge variant={getLevelColor(skill.level)} className="text-[10px]">
                          {getLevelLabel(skill.level)}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setCurrentStep(isRetake ? 2 : 1);
                setQuizAnswers({});
                setQuizCurrent(0);
                setQuizResult(null);
                setResultSkills([]);
              }}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Ulangi Asesmen
            </button>
            <Link
              href="/student/career-match"
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              Lanjut ke Career Match <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
