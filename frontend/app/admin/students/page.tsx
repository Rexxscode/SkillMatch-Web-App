"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, Users, User } from "lucide-react";
import Card from "../../components/ui/card";
import Badge from "../../components/ui/badge";
import Pagination from "../../components/ui/pagination";
import DashboardHeader from "../../components/layout/dashboardheader";
import { api, BACKEND_ENDPOINTS } from "../../lib/api";

const PER_PAGE = 5;

type StudentRow = {
  name: string;
  email: string;
  major: string;
  grade: string;
  avatar?: string | null;
};

type RawStudent = {
  name: string;
  user?: { email?: string } | null;
  major?: { name?: string } | null;
  major_id?: string | null;
  grade?: string | null;
  avatar?: string | null;
  [k: string]: unknown;
};

function mapStudent(s: RawStudent): StudentRow {
  return {
    name: s.name ?? "",
    email: s.user?.email ?? "",
    major: s.major?.name ?? s.major_id ?? "-",
    grade: s.grade ?? "",
    avatar: s.avatar ?? null,
  };
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [majorFilter, setMajorFilter] = useState("all");
  const [majorOpen, setMajorOpen] = useState(false);
  const majorTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get<{ success: boolean; data: RawStudent[] }>(BACKEND_ENDPOINTS.students.list);
        if (res.success) {
          setRows(res.data.map(mapStudent));
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      setSearch((e as CustomEvent).detail || "");
      setPage(1);
    };
    window.addEventListener("global-search", handler);
    return () => window.removeEventListener("global-search", handler);
  }, []);

  const filtered = rows.filter((s) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      s.name.toLowerCase().includes(q) ||
      s.major.toLowerCase().includes(q) ||
      s.email.toLowerCase().includes(q);
    const matchesMajor = majorFilter === "all" || s.major === majorFilter;
    return matchesSearch && matchesMajor;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const effectivePage = Math.min(page, totalPages);
  const pageStart = (effectivePage - 1) * PER_PAGE;
  const paginated = filtered.slice(pageStart, pageStart + PER_PAGE);

  const majors = useMemo(() => [...new Set(rows.map((s) => s.major))], [rows]);

  return (
    <div>
      <DashboardHeader
        title="Data Siswa"
        subtitle="Kelola data siswa"
        role="admin"
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Cari nama, jurusan, atau email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
          />
        </div>
        <div className="relative">
          <select
            value={majorFilter}
            onChange={(e) => { setMajorFilter(e.target.value); setMajorOpen(false); setPage(1); }}
            onClick={() => { clearTimeout(majorTimer.current); setMajorOpen((v) => !v); }}
            onBlur={() => { majorTimer.current = setTimeout(() => setMajorOpen(false), 200); }}
            className="w-full appearance-none px-4 py-2 pr-9 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-input-bg text-foreground"
          >
            <option value="all">Semua Jurusan</option>
            {majors.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {majorOpen ? (
            <ChevronUp className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          ) : (
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          )}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <Card className="text-center py-12">
          <Users className="w-12 h-12 text-muted mx-auto mb-3" />
          <p className="text-foreground font-medium">Tidak ada siswa ditemukan</p>
          <p className="text-sm text-muted mt-1">Coba ubah filter atau kata kunci pencarian</p>
        </Card>
      ) : (
        <>
          {/* Table — Desktop */}
          <Card className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-3 font-medium text-muted">No</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Foto Profil</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Nama</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Email</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Jurusan</th>
                    <th className="text-left py-3 px-3 font-medium text-muted">Kelas</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((student, index) => (
                    <tr key={student.email || index} className="border-b border-border/50 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-3 text-muted">{pageStart + index + 1}</td>
                      <td className="py-3 px-3">
                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={`Foto ${student.name}`}
                            loading="lazy"
                            className="w-10 h-10 rounded-full object-cover border border-border"
                          />
                        ) : (
                          <span className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 border border-border flex items-center justify-center">
                            <User className="w-5 h-5 text-muted" />
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-medium text-foreground">{student.name}</td>
                      <td className="py-3 px-3 text-muted break-all">{student.email}</td>
                      <td className="py-3 px-3 text-muted">{student.major}</td>
                      <td className="py-3 px-3">
                        <Badge variant="secondary">{student.grade}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={effectivePage}
              lastPage={totalPages}
              total={filtered.length}
              perPage={PER_PAGE}
              onPageChange={setPage}
              itemLabel="siswa"
            />
          </Card>

          {/* Cards — Mobile */}
          <div className="md:hidden space-y-3">
            {paginated.map((student) => (
              <Card key={student.email} className="flex items-center gap-3">
                {student.avatar ? (
                  <img
                    src={student.avatar}
                    alt={`Foto ${student.name}`}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover border border-border flex-shrink-0"
                  />
                ) : (
                  <span className="w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 border border-border flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-muted" />
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground truncate">{student.name}</p>
                  <p className="text-xs text-muted break-all">{student.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{student.major}</Badge>
                    <Badge variant="secondary">Kelas {student.grade}</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Pagination
            className="md:hidden"
            currentPage={effectivePage}
            lastPage={totalPages}
            total={filtered.length}
            perPage={PER_PAGE}
            onPageChange={setPage}
            itemLabel="siswa"
          />
        </>
      )}
    </div>
  );
}