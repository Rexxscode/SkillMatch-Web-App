import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./lib/theme-context";
import { ToastProvider } from "./lib/toast-context";
import { AuthProvider } from "./lib/auth-context";
import ScrollToTop from "./components/ui/scroll-to-top";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "SkillMatch - Career Readiness Platform",
    template: "%s | SkillMatch",
  },
  description:
    "Platform career readiness yang menjembatani kesenjangan kompetensi antara siswa vokasi (SMK) dan kebutuhan industri. Tes jurusan, penilaian keterampilan, sertifikat, dan pemetaan karier.",
  keywords: [
    "career readiness",
    "skill match",
    "SMK",
    "sekolah vokasi",
    "tes jurusan",
    "asesmen keterampilan",
    "pemetaan karier",
    "rekomendasi karier",
  ],
  authors: [{ name: "SkillMatch" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "SkillMatch",
    title: "SkillMatch - Career Readiness Platform",
    description:
      "Jembatani kesenjangan kompetensi antara siswa vokasi dan kebutuhan industri.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillMatch - Career Readiness Platform",
    description:
      "Platform career readiness untuk siswa vokasi dan kebutuhan industri.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ background: "#0f172a", color: "#e2e8f0" }}
    >
      <body className="min-h-full flex flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches);if(d){document.documentElement.classList.add('dark');document.documentElement.style.background='#0f172a';document.documentElement.style.color='#e2e8f0'}else{document.documentElement.classList.remove('dark');document.documentElement.style.background='#f8fafc';document.documentElement.style.color='#0f172a'}}catch(e){}})();`,
          }}
        />
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
            <div className="animate-page-in">{children}</div>
          </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}