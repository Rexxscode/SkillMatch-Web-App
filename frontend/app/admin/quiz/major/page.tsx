"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  FileQuestion,
  Target,
  ListChecks,
  GraduationCap,
  Loader2,
} from "lucide-react";
import Card from "../../../components/ui/card";
import Badge from "../../../components/ui/badge";
import DashboardHeader from "../../../components/layout/dashboardheader";
import { MAJORS } from "../../../lib/materi-catalog";
import {
  fetchMajorQuizAdmin,
  saveMajorQuizAdmin,
  resetMajorQuizAdmin,
} from "../../../lib/major-quiz";
import type { QuizQuestion } from "../../../lib/major-quiz";
import { useToast } from "../../../lib/toast-context";
import { ApiError } from "../../../lib/api";

const DIFFICULTIES: QuizQuestion["difficulty"][] = ["basic", "intermediate", "advanced", "expert"];

const FILTER_PILLS: { label: string; name: string }[] = [
  { label: "Semua", name: "" },
  ...MAJORS.map((m) => ({ label: m.short, name: m.name })),
];

function genQuestionId(major: string, draft: QuizQuestion[]): string {
  let max = 0;
  draft.forEach((q) => {
    const m = q.id.match(/(\d+)$/);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return `${major.toLowerCase().slice(0, 3)}-${String(max + 1).padStart(2, "0")}`;
}

export default function AdminMajorQuizPage() {
  const { toast } = useToast();
  const [filterMajor, setFilterMajor] = useState("");
  const [editingMajor, setEditingMajor] = useState<string | null>(null);
  const [draft, setDraft] = useState<QuizQuestion[]>([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  const skills = editingMajor
    ? [...new Set(draft.filter((q) => q.skill).map((q) => q.skill))]
    : [];

  const openEditor = async (major: string) => {
    setLoading(true);
    setEditingMajor(major);
    setSkillFilter("");
    try {
      const backendQuiz = await fetchMajorQuizAdmin(major);
      if (backendQuiz.length > 0) {
        setDraft(backendQuiz);
        setLoadedCount(backendQuiz.length);
      } else {
        setDraft([]);
        setLoadedCount(0);
      }
    } catch (err) {
      setDraft([]);
      setLoadedCount(0);
      toast(
        err instanceof ApiError
          ? `Gagal memuat soal (${err.status}): ${err.message}`
          : "Gagal memuat soal dari server",
        "warning",
      );
    } finally {
      setLoading(false);
    }
  };

  const closeEditor = () => setEditingMajor(null);

  const visibleDraft = skillFilter ? draft.filter((q) => q.skill === skillFilter) : draft;

  const updateQuestion = (index: number, patch: Partial<QuizQuestion>) => {
    setDraft((prev) => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  };

  const updateOption = (qi: number, oi: number, value: string) => {
    setDraft((prev) =>
      prev.map((q, i) => {
        if (i !== qi) return q;
        const options = [...q.options];
        options[oi] = value;
        return { ...q, options };
      })
    );
  };

  const addOption = (qi: number) => {
    setDraft((prev) =>
      prev.map((q, i) => (i === qi ? { ...q, options: [...q.options, ""] } : q))
    );
  };

  const removeOption = (qi: number, oi: number) => {
    setDraft((prev) =>
      prev.map((q, i) => {
        if (i !== qi) return q;
        const options = q.options.filter((_, x) => x !== oi);
        const correct = q.correct === oi ? 0 : q.correct > oi ? q.correct - 1 : q.correct;
        return { ...q, options, correct };
      })
    );
  };

  const addQuestion = () => {
    if (!editingMajor) return;
    setDraft((prev) => [
      ...prev,
      {
        id: genQuestionId(editingMajor, prev),
        question: "",
        options: ["", "", "", "", ""],
        correct: 0,
        difficulty: "basic",
        skill: "",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!editingMajor) return;
    const errors: string[] = [];
    draft.forEach((q, i) => {
      if (!q.question.trim()) errors.push(`Soal ${i + 1}: pertanyaan kosong`);
      if (q.options.length < 2) errors.push(`Soal ${i + 1}: minimal 2 opsi jawaban`);
      q.options.forEach((o, oi) => {
        if (!o.trim()) errors.push(`Soal ${i + 1}: opsi ${String.fromCharCode(65 + oi)} kosong`);
      });
      if (q.correct < 0 || q.correct >= q.options.length || !Number.isInteger(q.correct))
        errors.push(`Soal ${i + 1}: opsi jawaban benar tidak valid`);
    });
    if (errors.length > 0) {
      toast(errors.slice(0, 3).join(" · "), "error");
      return;
    }
    setSaving(true);
    try {
      await saveMajorQuizAdmin(editingMajor, draft);
      toast(`Soal tes jurusan diperbarui (${draft.length} soal)`);
    } catch (err) {
      const detail = err instanceof ApiError && err.errors
        ? Object.values(err.errors).flat().join(" · ")
        : err instanceof ApiError ? err.message : "Gagal menyimpan soal";
      toast(detail, "warning");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!editingMajor) return;
    if (!window.confirm("Kembalikan soal tes jurusan ini ke versi default?")) return;
    setSaving(true);
    try {
      await resetMajorQuizAdmin(editingMajor);
      const fresh = await fetchMajorQuizAdmin(editingMajor);
      setDraft(fresh.length > 0 ? fresh : []);
      toast("Soal dikembalikan ke versi default");
    } catch (err) {
      const detail = err instanceof ApiError
        ? `Gagal mereset (${err.status}): ${err.message}`
        : "Gagal mereset soal";
      toast(detail, "warning");
    } finally {
      setSaving(false);
    }
  };

  if (editingMajor) {
    const majorShort = MAJORS.find((m) => m.name === editingMajor)?.short || editingMajor;
    return (
      <div>
        <DashboardHeader
          title={`Kelola Soal Tes Jurusan: ${majorShort}`}
          subtitle={`${editingMajor} · ${draft.length} soal Tes Jurusan`}
          actions={
            <button
              onClick={closeEditor}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-card border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </button>
          }
        />

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Perubahan
          </button>
          <button
            onClick={addQuestion}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-card border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
          >
            <Plus className="w-4 h-4" />
            Tambah Soal
          </button>
          <button
            onClick={handleReset}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-card border border-border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Reset ke Default
          </button>
          {skills.length > 0 && (
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">Semua Skill ({draft.length})</option>
              {skills.map((s) => {
                const count = draft.filter((q) => q.skill === s).length;
                return (
                  <option key={s} value={s}>
                    {s} ({count})
                  </option>
                );
              })}
            </select>
          )}
        </div>

        {loading ? (
          <Card className="text-center py-16">
            <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
            <p className="text-muted text-sm">Memuat {loadedCount ? `${loadedCount} soal dari` : ""} server...</p>
          </Card>
        ) : visibleDraft.length === 0 ? (
          <Card className="text-center py-16">
            <FileQuestion className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="text-foreground font-medium">Belum ada soal untuk jurusan ini</p>
            <p className="text-sm text-muted mt-1">Gunakan tombol Tambah Soal untuk membuat soal baru</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {visibleDraft.map((q, idx) => {
              const qi = skillFilter ? draft.findIndex((d) => d.id === q.id) : idx;
              return (
                <Card key={q.id} className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {qi + 1}
                      </span>
                      <h4 className="font-semibold text-foreground text-sm">Soal {qi + 1}</h4>
                    </div>
                    <button
                      onClick={() => removeQuestion(qi)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-500 bg-red-100 dark:bg-red-900/30 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1">Tingkat Kesulitan</label>
                      <select
                        value={q.difficulty}
                        onChange={(e) => updateQuestion(qi, { difficulty: e.target.value as QuizQuestion["difficulty"] })}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        {DIFFICULTIES.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1">Skill / Materi</label>
                      <input
                        type="text"
                        value={q.skill}
                        onChange={(e) => updateQuestion(qi, { skill: e.target.value })}
                        placeholder="mis. REST API"
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="block text-xs font-medium text-muted mb-1">Pertanyaan</label>
                    <textarea
                      value={q.question}
                      onChange={(e) => updateQuestion(qi, { question: e.target.value })}
                      rows={2}
                      placeholder="Tulis pertanyaan..."
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-medium text-muted mb-1">Opsi Jawaban</label>
                    {q.options.map((opt, oi) => (
                      <div key={oi} className="flex items-center gap-2">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            q.correct === oi
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-100 dark:bg-gray-700 text-muted"
                          }`}
                        >
                          {String.fromCharCode(65 + oi)}
                        </span>
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => updateOption(qi, oi, e.target.value)}
                          className="flex-1 min-w-0 px-3 py-2 border border-border rounded-lg text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        />
                        <button
                          onClick={() => removeOption(qi, oi)}
                          disabled={q.options.length <= 2}
                          className="p-2 text-muted hover:text-red-500 disabled:opacity-30 transition-colors flex-shrink-0"
                          title="Hapus opsi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {q.options.length < 5 && (
                      <button
                        onClick={() => addOption(qi)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-primary hover:text-primary-dark transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Tambah Opsi
                      </button>
                    )}
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs font-medium text-muted mb-1">Kunci Jawaban Benar</label>
                    <select
                      value={String(q.correct)}
                      onChange={(e) => updateQuestion(qi, { correct: parseInt(e.target.value, 10) })}
                      className="w-full sm:w-48 px-3 py-2 border border-border rounded-lg text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      {q.options.map((_, oi) => (
                        <option key={oi} value={oi}>{String.fromCharCode(65 + oi)}</option>
                      ))}
                    </select>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Soal Tes Jurusan"
        subtitle="Edit bank soal asesmen 100 soal per jurusan"
        role="admin"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_PILLS.map((m) => (
          <button
            key={m.name || "all"}
            onClick={() => setFilterMajor(m.name)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filterMajor === m.name
                ? "bg-primary text-white shadow"
                : "bg-card border border-border text-muted hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {MAJORS.filter((major) => !filterMajor || major.name === filterMajor).map((major) => (
            <Card key={major.name} className="flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <Badge variant="secondary">{major.short}</Badge>
              </div>
              <h4 className="font-semibold text-foreground mb-1">{major.name}</h4>
              <p className="text-xs text-muted mb-4 flex-1">Bank soal tes jurusan · backend</p>
              <button
                onClick={() => openEditor(major.name)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
              >
                <ListChecks className="w-4 h-4" />
                Kelola Bank Soal
              </button>
            </Card>
        ))}
      </div>

      <Card className="mt-6 flex flex-col sm:flex-row items-center gap-4 p-5">
        <div className="w-11 h-11 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">Catatan soal Tes Jurusan</p>
          <p className="text-xs text-muted mt-1">
            Soal asesmen &quot;Know Yourself&quot; menuntun pencocokan karier (career match). Setiap kali soal diubah atau di-reset,
            hasil asesmen murid dinonaktifkan agar data karier tetap sinkron dengan soal terbaru.
          </p>
        </div>
      </Card>
    </div>
  );
}