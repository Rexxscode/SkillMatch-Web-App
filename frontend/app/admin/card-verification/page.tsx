"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, Check, X, IdCard, Users, Eye, BadgeCheck, Loader2 } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import Pagination from "../../components/ui/pagination";
import DashboardHeader from "../../components/layout/dashboardheader";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";
import { useToast } from "../../lib/toast-context";
import { addNotification } from "../../lib/notifications";

type CardRow = {
  id: number;
  name: string;
  email: string;
  major?: string | null;
  major_name?: string | null;
  grade?: string | null;
  hasCard: boolean;
  cardStatus: "none" | "pending" | "approved" | string;
};

type CardsMeta = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  pending_review: number;
};

const PER_PAGE = 5;
const STATUS_TABS: { label: string; value: "" | "pending" | "approved" }[] = [
  { label: "Semua", value: "" },
  { label: "Menunggu", value: "pending" },
  { label: "Disetujui", value: "approved" },
];

export default function CardVerificationPage() {
  const { toast } = useToast();
  const [rows, setRows] = useState<CardRow[]>([]);
  const [meta, setMeta] = useState<CardsMeta>({
    total: 0,
    per_page: PER_PAGE,
    current_page: 1,
    last_page: 1,
    pending_review: 0,
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "approved">("");
  const [page, setPage] = useState(1);
  const [refreshTick, setRefreshTick] = useState(0);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<{ email: string; kind: "approve" | "reject" } | null>(null);
  const [preview, setPreview] = useState<{ name: string; img: string } | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          per_page: String(PER_PAGE),
        });
        if (debouncedSearch) params.set("search", debouncedSearch);
        if (statusFilter) params.set("status", statusFilter);

        const res = await api.get<{
          success: boolean;
          data: CardRow[];
          meta: CardsMeta;
        }>(`${BACKEND_ENDPOINTS.registrations.cards}?${params.toString()}`);

        if (cancelled) return;

        if (res.success) {
          setRows(res.data ?? []);
          if (res.meta) {
            setMeta(res.meta);
            if (res.meta.last_page >= 1 && res.meta.current_page > res.meta.last_page) {
              setPage(res.meta.last_page);
            }
          }
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch, statusFilter, refreshTick]);

  const refresh = useCallback(() => setRefreshTick((t) => t + 1), []);

  const fetchedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    rows.forEach((row) => {
      if (!row.hasCard || images[row.email] || fetchedRef.current.has(row.email)) return;
      fetchedRef.current.add(row.email);
      api
        .get<{ success: boolean; data: { studentCard?: string | null } }>(
          BACKEND_ENDPOINTS.registrations.card(row.email),
        )
        .then((res) => {
          if (res.success && res.data?.studentCard) {
            setImages((prev) => ({ ...prev, [row.email]: res.data.studentCard as string }));
          }
        })
        .catch(() => {
          fetchedRef.current.delete(row.email);
        });
    });
  }, [rows]);

  useEffect(() => {
    const handler = () => refresh();
    window.addEventListener("students-updated", handler);
    return () => window.removeEventListener("students-updated", handler);
  }, [refresh]);

  const changeStatus = (value: "" | "pending" | "approved") => {
    setStatusFilter(value);
    setPage(1);
  };

  const runAction = async (email: string, kind: "approve" | "reject") => {
    if (busy !== null) return;
    setBusy({ email, kind });
    try {
      await api.post(BACKEND_ENDPOINTS.registrations[kind](email));
      refresh();
      window.dispatchEvent(new CustomEvent("students-updated"));
      if (kind === "approve") {
        addNotification({
          text: "Kartu pelajarmu telah disetujui — semua fitur siswa kini terbuka.",
          type: "card_approval",
          targetRole: "student",
          targetEmail: email,
        });
        toast("Kartu pelajar disetujui — fitur siswa terbuka");
      } else {
        addNotification({
          text: "Kartu pelajarmu ditolak saat verifikasi. Silakan unggah ulang kartu yang jelas di halaman Profil.",
          type: "card_approval",
          targetRole: "student",
          targetEmail: email,
        });
        toast("Kartu pelajar ditolak — siswa dapat mengunggah ulang", "warning");
      }
      window.dispatchEvent(new CustomEvent("notifications-updated"));
    } catch (err) {
      if (err instanceof Error) toast(err.message, "warning");
    } finally {
      setBusy(null);
    }
  };

  const hasFilter = !!debouncedSearch || !!statusFilter;

  return (
    <div>
      <DashboardHeader
        title="Verifikasi Kartu Pelajar"
        subtitle="Periksa dan setujui kartu pelajar yang dikirim siswa"
        role="admin"
      />

      {meta.pending_review > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          {meta.pending_review} kartu menunggu verifikasi
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Cari nama, email, jurusan, atau kelas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value || "all"}
              type="button"
              onClick={() => changeStatus(tab.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === tab.value
                  ? "bg-primary text-white shadow"
                  : "bg-card border border-border text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Belum ada kartu pelajar ditemukan</p>
          <p className="text-sm text-muted mt-1">
            {hasFilter
              ? "Coba ubah kata kunci atau filter status"
              : "Siswa yang mengunggah kartu pelajar akan muncul di sini"}
          </p>
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {rows.map((p) => {
              const pending = p.cardStatus !== "approved";
              return (
                <Card key={p.email}>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {images[p.email] || p.hasCard ? (
                      images[p.email] ? (
                        <button
                          type="button"
                          onClick={() => setPreview({ name: p.name, img: images[p.email] as string })}
                          title="Klik untuk memperbesar kartu pelajar"
                          className="flex-shrink-0 group"
                        >
                          <img
                            src={images[p.email]}
                            alt={`Kartu pelajar ${p.name}`}
                            loading="lazy"
                            className="h-28 w-40 object-cover rounded-xl border border-border transition-transform group-hover:scale-[1.02] group-hover:ring-2 group-hover:ring-primary/40 cursor-zoom-in"
                          />
                        </button>
                      ) : (
                        <div className="h-28 w-40 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        </div>
                      )
                    ) : (
                      <div className="h-28 w-40 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                        <IdCard className="w-8 h-8 text-muted" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-muted break-all">{p.email}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="primary">{p.major_name || p.major || "-"}</Badge>
                          {p.grade && <Badge variant="secondary">Kelas {p.grade}</Badge>}
                          {pending ? (
                            <Badge variant="warning">Menunggu Verifikasi</Badge>
                          ) : (
                            <Badge variant="success">
                              <span className="inline-flex items-center gap-1">
                                <BadgeCheck className="w-3 h-3" /> Disetujui
                              </span>
                            </Badge>
                          )}
                        </div>
                      </div>
                      {pending && (
                        <div className="flex gap-2 ml-auto sm:ml-0 flex-wrap">
                          <button
                            type="button"
                            onClick={() => runAction(p.email, "approve")}
                            disabled={busy?.email === p.email && busy.kind === "approve"}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors disabled:opacity-60"
                          >
                            {busy?.email === p.email && busy.kind === "approve" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => runAction(p.email, "reject")}
                            disabled={busy?.email === p.email && busy.kind === "reject"}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors disabled:opacity-60"
                          >
                            {busy?.email === p.email && busy.kind === "reject" ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />} Tolak
                          </button>
                        </div>
                      )}
                      {!pending && (
                        <Eye className="w-4 h-4 text-muted hidden sm:block" />
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Pagination
            currentPage={meta.current_page}
            lastPage={meta.last_page}
            total={meta.total}
            perPage={meta.per_page}
            onPageChange={setPage}
            itemLabel="kartu"
          />
        </>
      )}

      {/* Kartu Pelajar Preview Modal */}
      {preview &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50 p-4"
            onClick={() => setPreview(null)}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Kartu Pelajar — {preview.name}</h3>
                <button
                  onClick={() => setPreview(null)}
                  className="p-1.5 text-muted hover:text-foreground transition-colors"
                  aria-label="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <img src={preview.img} alt={`Kartu pelajar ${preview.name}`} className="w-full rounded-xl border border-border object-contain" />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
