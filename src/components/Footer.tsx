import Link from "next/link";
import { personalInfo } from "@/lib/data";

const socials = [
  { icon: "🐙", href: personalInfo.github, label: "GitHub" },
  { icon: "💼", href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: "💬", href: personalInfo.zalo, label: "Zalo" },
  { icon: "✉️", href: `mailto:${personalInfo.email}`, label: "Email" },
];

const footerLinks = [
  { href: "#about", label: "Về tôi" },
  { href: "#services", label: "Dịch vụ" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "#contact", label: "Liên hệ" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="mx-auto px-6 py-10" style={{ maxWidth: 1160 }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-xl font-black gradient-text"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            DDV.
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: "var(--text-muted)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all hover:-translate-y-0.5"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg-card)",
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p
          className="text-center text-xs mt-8"
          style={{
            color: "var(--text-muted)",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          © {new Date().getFullYear()}{" "}
          <Link href="/" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Đinh Đức Vình
          </Link>{" "}
          · All rights reserved
        </p>
      </div>
    </footer>
  );
}
