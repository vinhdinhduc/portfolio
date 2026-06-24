import type { Metadata, Viewport } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
  variable: "--font-syne",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Đinh Đức Vình | Full-Stack Developer & Data Analyst – Sơn La",
    template: "%s | Đinh Đức Vình",
  },
  description:
    "Portfolio cá nhân của Đinh Đức Vình – Full-Stack Developer & Data Analyst tại MobiFone Sơn La. Chuyên phát triển website, app mobile và hệ thống dữ liệu cho doanh nghiệp khu vực Tây Bắc Việt Nam.",
  keywords: [
    "lập trình web Sơn La",
    "thiết kế website Tây Bắc",
    "full-stack developer",
    "React Next.js",
    "Python Django",
    "Đinh Đức Vình",
  ],
  authors: [{ name: "Đinh Đức Vình", url: "https://dinhducvinh.id.vn" }],
  creator: "Đinh Đức Vình",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://dinhducvinh.id.vn",
    siteName: "Đinh Đức Vình Portfolio",
    title: "Đinh Đức Vình | Full-Stack Developer & Data Analyst",
    description:
      "Chuyên phát triển website, app mobile và hệ thống dữ liệu cho doanh nghiệp khu vực Tây Bắc Việt Nam.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Đinh Đức Vình | Full-Stack Developer & Data Analyst",
    description:
      "Chuyên phát triển website, app mobile và hệ thống dữ liệu cho doanh nghiệp khu vực Tây Bắc Việt Nam.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2e75b6" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f1a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
