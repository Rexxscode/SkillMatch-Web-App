"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Building2, ShieldCheck, ChevronRight, ArrowLeft } from "lucide-react";
import AuthShell from "../../components/auth/auth-shell";

const roleOptions = [
  {
    role: "student" as const,
    title: "Siswa / SMK",
    desc: "Asesmen skill, sertifikat, roadmap, dan lowongan kerja.",
    icon: GraduationCap,
  },
  {
    role: "industry" as const,
    title: "Perusahaan / Industry",
    desc: "Posting lowongan dan cari kandidat sesuai kebutuhan.",
    icon: Building2,
  },
  {
    role: "admin" as const,
    title: "Admin",
    desc: "Kelola siswa, industri, soal, dan verifikasi akun.",
    icon: ShieldCheck,
  },
];

export default function LoginRoleSelect() {
  const router = useRouter();

  return (
    <AuthShell>
      <div className="text-center mb-8 lg:hidden">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <img src="/logo-skillmatch-baru.png" alt="SkillMatch" className="w-10 h-10 rounded-xl object-contain" />
          <span className="text-2xl font-bold text-primary">
            SkillMatch
          </span>
        </Link>
      </div>
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          Masuk
        </span>
        <h1 className="text-2xl font-bold text-foreground mt-3">Selamat datang kembali</h1>
        <p className="text-sm text-muted mt-1">Pilih peran kamu untuk melanjutkan login.</p>
      </div>

      <div className="flex flex-col gap-3">
        {roleOptions.map((opt) => (
          <button
            key={opt.role}
            type="button"
            onClick={() => router.push(`/auth/login/${opt.role}`)}
            className="group w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
              <opt.icon className="w-5 h-5 text-primary group-hover:text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{opt.title}</p>
              <p className="text-sm text-muted truncate">{opt.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </button>
        ))}
      </div>

      <div className="mt-6 text-center space-y-3">
        <p className="text-sm text-muted">
          Belum punya akun?{" "}
          <Link href="/auth/register" className="font-medium text-primary hover:text-primary-dark transition-colors">
            Daftar sekarang
          </Link>
        </p>
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
        </Link>
      </div>
    </AuthShell>
  );
}