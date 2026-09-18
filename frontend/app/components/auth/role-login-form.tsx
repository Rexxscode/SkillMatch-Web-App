"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "../../lib/auth-context";
import { ApiError } from "../../lib/api";
import { useToast } from "../../lib/toast-context";

interface RoleLoginFormProps {
  /** Role yang dipilih di halaman pemilih. */
  chosenRole: "student" | "industry" | "admin";
  /** Label tampilan role (untuk pesan error). */
  roleLabel: string;
  /** Redirect tujuan setelah login sukses. */
  redirectTo: string;
}

export default function RoleLoginForm({
  chosenRole,
  roleLabel,
  redirectTo,
}: RoleLoginFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password harus diisi");
      toast("Email dan password harus diisi", "error");
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
      const user = await login(email, password);
      if (user.role !== chosenRole) {
        setError(`Akun ini bukan akun ${roleLabel}. Silakan pilih role yang sesuai.`);
        toast(`Akun ini bukan akun ${roleLabel}`, "warning");
        return;
      }
      toast(`Selamat datang, ${user.name}!`, "success");
      router.push(redirectTo);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 403) {
          setError("Akun kamu masih menunggu persetujuan admin.");
          toast("Akun belum disetujui admin", "warning");
        } else if (err.status === 401) {
          setError("Email atau password salah");
          toast("Email atau password salah", "error");
        } else {
          setError(err.message || "Terjadi kesalahan");
          toast(err.message || "Terjadi kesalahan", "error");
        }
      } else {
        setError("Tidak dapat terhubung ke server");
        toast("Gagal terhubung ke server", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input
            id="email"
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-3 sm:py-2.5 border border-border rounded-xl text-base sm:text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-3 sm:py-2.5 border border-border rounded-xl text-base sm:text-sm bg-input-bg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
        className="w-full py-3 sm:py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-light transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Masuk..." : "Masuk Sebagai " + roleLabel}
      </button>
      <a
        href="/auth/login"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Ganti Role
      </a>
    </form>
  );
}