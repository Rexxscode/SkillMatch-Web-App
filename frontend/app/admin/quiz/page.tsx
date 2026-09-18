"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  FileQuestion,
  ListChecks,
  BookOpen,
  Loader2,
} from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import Pagination from "../../components/ui/pagination";
import DashboardHeader from "../../components/layout/dashboardheader";
import { MAJORS, materiList } from "../../lib/materi-catalog";
import {
  fetchMateriQuizAdminPage,
  createMateriQuestion,
  updateMateriQuestion,
  deleteMateriQuestion,
  resetMateriQuizAdmin,
  type AdminQuizMeta,
} from "../../lib/materi-quiz";
import type { QuizQuestion } from "../../lib/major-quiz";
import { useToast } from "../../lib/toast-context";
import { ApiError } from "../../lib/api";

const DIFFICULTIES: QuizQuestion["difficulty"][] = ["basic", "intermediate", "advanced", "expert"];
const PER_PAGE = 5;

const EMPTY_META: AdminQuizMeta = {
  total: 0,
  per_page: PER_PAGE,
  current_page: 1,
  last_page: 1,
};

const isServerId = (id: string) => /^\d+$/.test(id);

function newQuestionId(): string {
  return `new-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function AdminQuizPage() {
  const { toast } = useToast();
  const [selectedMajor, setSelectedMajor] = useState(MAJORS[0].name);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<AdminQuizMeta>(EMPTY_META);
  const [draft, setDraft] = useState<QuizQuestion[]>([]);
  const [removedIds, setRemovedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);

  const tiles = materiList.filter((m) => m.major === selectedMajor);
  const editingMateri = editingId ? materiList.find((m) => m.id === editingId) : undefined;

  const hasChanges = removedIds.length > 0 || draft.some((q) => !isServerId(q.id));

  const loadPage = useCallback(
    async (materiId: string, targetPage: number) => {
      setLoading(true);
      try {
        const res = await fetchMateriQuizAdminPage(materiId, {
          page: targetPage,
          perPage: PER_PAGE,
        });
        setDraft(res.questions);
        setMeta(res.meta);
        setRemovedIds([]);
        if (res.meta.last_page >= 1 && res.meta.current_page > res.meta.last_page) {
          setPage(res.meta.last_page);
        }
      } catch (err) {
        setDraft([]);
        setMeta(EMPTY_META);
        setRemovedIds([]);
        toast(
          err instanceof ApiError
            ? `Gagal memuat soal (${err.status}): ${err.message}`
            : "Gagal memuat soal dari server",
          "warning",
        );
      } finally {
        setLoading(false);
      }
    },
    [toast],
  );

  useEffect(() => {
    if (!editingId) return;
    loadPage(editingId, page);
  }, [editingId, page, refreshTick, loadPage]);

  const openEditor = (materiId: string) => {
    setEditingId(materiId);
    setPage(1);
  };

  const closeEditor = () => {
    setEditingId(null);
    setDraft([]);
    setRemovedIds([]);
    setMeta(EMPTY_META);
  };

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
    if (!editingId) return;
    setDraft((prev) => [
      ...prev,
      {
        id: newQuestionId(),
        question: "",
        options: ["", "", "", "", ""],
        correct: 0,
        difficulty: "basic",
        skill: "",
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    const q = draft[index];
    if (q && isServerId(q.id)) {
      setRemovedIds((prev) => (prev.includes(q.id) ? prev : [...prev, q.id]));
    }
    setDraft((prev) => prev.filter((_, i) => i !== index));
  };

  const validateDraft = (): string[] => {
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
    return errors;
  };

  const handleSavePage = async () => {
    if (!editingId) return;
    const errors = validateDraft();
    if (errors.length > 0) {
      toast(errors.slice(0, 3).join(" · "), "error");
      return;
    }

    setSaving(true);
    let created = 0;
    let updated = 0;
    let deleted = 0;
    let failure: string | null = null;

    try {
      for (const q of draft) {
        if (isServerId(q.id)) {
          await updateMateriQuestion(editingId, q.id, q);
          updated++;
        } else {
          await createMateriQuestion(editingId, q);
          created++;
        }
      }
      for (const id of removedIds) {
        await deleteMateriQuestion(editingId, id);
        deleted++;
      }
    } catch (err) {
      failure =
        err instanceof ApiError && err.errors
          ? Object.values(err.errors).flat().join(" · ")
          : err instanceof ApiError
            ? err.message
            : "Gagal menyimpan soal";
    } finally {
      setSaving(false);
    }

    if (failure) {
      toast(failure, "warning");
    } else {
      const parts: string[] = [];
      if (created) parts.push(`${created} baru`);
      if (updated) parts.push(`${updated} diperbarui`);
      if (deleted) parts.push(`${deleted} dihapus`);
      toast(parts.length ? `Halaman disimpan: ${parts.join(", ")}` : "Tidak ada perubahan pada halaman ini");
    }

    if (created > 0) {
      setPage(Number.MAX_SAFE_INTEGER);
    }
    setRefreshTick((t) => t + 1);
  };

  const handleReset = async () => {
    if (!editingId) return;
    if (!window.confirm("Kembalikan soal materi ini ke versi default?")) return;
    setSaving(true);
    try {
      await resetMateriQuizAdmin(editingId);
      toast("Soal dikembalikan ke versi default");
      setPage(1);
      setRefreshTick((t) => t + 1);
    } catch (err) {
      const detail = err instanceof ApiError
        ? `Gagal mereset (${err.status}): ${err.message}`
        : "Gagal mereset soal";
      toast(detail, "warning");
    } finally {
      setSaving(false);
    }
  };

  if (editingId) {
    return (
      <div>
        <DashboardHeader
          title={`Kelola Soal: ${editingMateri?.title || editingId}`}
          subtitle={`${editingMateri?.major || ""} — Kelas ${editingMateri?.grade || "-"} · ${meta.total} soal`}
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
            onClick={handleSavePage}
            disabled={saving || loading}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Halaman
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
        </div>

        {loading ? (
          <Card className="text-center py-16">
            <Loader2 className="w-8 h-8 text-primary mx-auto mb-3 animate-spin" />
            <p className="text-muted text-sm">Memuat soal dari server...</p>
          </Card>
        ) : draft.length === 0 && !hasChanges ? (
          <Card className="text-center py-16">
            <FileQuestion className="w-12 h-12 text-muted mx-auto mb-3" />
            <p className="text-foreground font-medium">Belum ada soal pada halaman ini</p>
            <p className="text-sm text-muted mt-1">Gunakan tombol Tambah Soal untuk membuat soal baru</p>
          </Card>
        ) : (
          <>
            <div className="space-y-4">
              {draft.map((q, qi) => (
                <Card key={q.id || qi} className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                        {(meta.current_page - 1) * PER_PAGE + qi + 1}
                      </span>
                      <h4 className="font-semibold text-foreground text-sm">
                        Soal {(meta.current_page - 1) * PER_PAGE + qi + 1}
                        {!isServerId(q.id) && (
                          <span className="ml-2 text-xs font-normal text-emerald-600">Baru</span>
                        )}
                      </h4>
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
                          className="p-2 text-muted hover:text-red-500 disabled:opacity-30 transition-colors"
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
              ))}
            </div>

            <Pagination
              currentPage={meta.current_page}
              lastPage={meta.last_page}
              total={meta.total}
              perPage={meta.per_page}
              onPageChange={setPage}
              itemLabel="soal"
            />

            {removedIds.length > 0 && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-3">
                {removedIds.length} soal ditandai hapus — klik Simpan Halaman untuk menerapkan.
              </p>
            )}
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Kelola Soal"
        subtitle="Edit bank soal tes sertifikat per jurusan dan per materi"
        role="admin"
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {MAJORS.map((m) => (
          <button
            key={m.name}
            onClick={() => setSelectedMajor(m.name)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              selectedMajor === m.name
                ? "bg-primary text-white shadow"
                : "bg-card border border-border text-muted hover:text-foreground"
            }`}
          >
            {m.short}
          </button>
        ))}
      </div>

      {tiles.length === 0 ? (
        <Card className="text-center py-16">
          <BookOpen className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Tidak ada materi untuk jurusan ini</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {tiles.map((materi) => (
              <Card key={materi.id} className="flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary">{materi.grade}</Badge>
                  </div>
                </div>
                <h4 className="font-semibold text-foreground mb-1">{materi.title}</h4>
                <p className="text-xs text-muted mb-4 flex-1">
                  Kelola bank soal materi ini
                </p>
                <button
                  onClick={() => openEditor(materi.id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  <ListChecks className="w-4 h-4" />
                  Kelola Soal
                </button>
              </Card>
          ))}
        </div>
      )}
    </div>
  );
}
