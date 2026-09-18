import Link from "next/link";
import { ClipboardCheck, Award, Target, BriefcaseBusiness } from "lucide-react";

const brandFeatures = [
  { icon: ClipboardCheck, text: "Asesmen skill sesuai jurusanmu" },
  { icon: Award, text: "Sertifikat kompetensi terverifikasi" },
  { icon: Target, text: "Rekomendasi karier yang tepat" },
  { icon: BriefcaseBusiness, text: "Koneksi langsung dengan industri vokasi" },
];

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary/5 px-4 py-10">
      <div
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl grid lg:grid-cols-2">
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-secondary p-10 text-white">
          <div
            className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-secondary/40 blur-2xl"
            aria-hidden
          />

          <Link href="/" className="relative inline-flex items-center gap-2">
            <img
              src="/logo-skillmatch-baru.png"
              alt="SkillMatch"
              className="h-10 w-10 rounded-xl bg-white/15 object-contain ring-1 ring-white/30"
            />
            <span className="text-2xl font-bold tracking-tight">SkillMatch</span>
          </Link>

          <div className="relative my-10">
            <h2 className="text-3xl font-bold leading-tight">
              Bangun karier vokasimu,
              <br />
              mulai dari sini.
            </h2>
            <p className="mt-3 text-sm text-white/85">
              Platform career readiness yang menjembatani kompetensi siswa SMK dengan kebutuhan
              industri.
            </p>
          </div>

          <ul className="relative space-y-4">
            {brandFeatures.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-white/90">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">{children}</div>
      </div>
    </div>
  );
}