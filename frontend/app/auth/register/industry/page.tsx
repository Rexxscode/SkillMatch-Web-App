"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Building2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../../../lib/auth-context";
import { ApiError } from "../../../lib/api";
import { useToast } from "../../../lib/toast-context";
import AuthShell from "../../../components/auth/auth-shell";

export default function IndustryRegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !company || !email) {
      setError("Nama, nama perusahaan, dan email harus diisi");
      toast("Nama, nama perusahaan, dan email harus diisi", "error");
      return;
    }
    if (password.length < 8) {
      setError("Password minimal 8 karakter");
      toast("Password minimal 8 karakter", "error");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await register({
        name,
        email,
        password,
        password_confirmation: password,
        role: "industry",
        company,
      });
      toast("Registrasi berhasil!", "success");
      router.push(`/auth/pending?role=industry`);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errors) {
          const firstError = Object.values(err.errors)[0]?.[0];
          setError(firstError || err.message);
        } else {
          setError(err.message);
        }
        toast(err.message || "Registrasi gagal", "error");
      } else {
        setError("Tidak dapat terhubung ke server");
        toast("Gagal terhubung ke server", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

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
          Daftar Perusahaan
        </span>
        <h1 className="text-2xl font-bold text-foreground mt-3">Daftar Sebagai Perusahaan</h1>
        <p className="text-sm text-muted mt-1">Tambahkan perusahaan kamu dan temukan talenta vokasi terbaik.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                Nama PIC (Nama Kamu)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="name"
                  type="text"
                  placeholder="Nama lengkap"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-foreground mb-1.5">
                Nama Perusahaan
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="company"
                  type="text"
                  placeholder="Nama perusahaan"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email Perusahaan
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="email"
                  type="email"
                  placeholder="nama@perusahaan.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimal 8 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-border rounded-xl text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Mendaftar..." : "Daftar Sebagai Perusahaan"}
            </button>
            <a
              href="/auth/register"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Ganti Role
            </a>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              Sudah punya akun?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                Masuk
              </Link>
            </p>
          </div>
    </AuthShell>
  );
}