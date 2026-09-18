import Link from "next/link";
import AuthShell from "../../../components/auth/auth-shell";
import RoleLoginForm from "../../../components/auth/role-login-form";

export default function IndustryLoginPage() {
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
          Perusahaan / Industry
        </span>
        <h1 className="text-2xl font-bold text-foreground mt-3">Login Perusahaan / Industry</h1>
        <p className="text-sm text-muted mt-1">Masuk untuk mengelola lowongan dan kandidat.</p>
      </div>
      <RoleLoginForm chosenRole="industry" roleLabel="Perusahaan / Industry" redirectTo="/industry" />
    </AuthShell>
  );
}