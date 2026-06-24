import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Blog Kỹ Thuật",
  description:
    "Bài viết kỹ thuật của Đinh Đức Vình về Python, Django , React, Next.js và phát triển phần mềm.",
};

const allTags = [
  "Tất cả",
  ...Array.from(new Set(blogPosts.flatMap((p) => p.tags))),
];

const morePosts = [
  {
    slug: "power-bi-oracle",
    emoji: "📊",
    gradient: "linear-gradient(135deg,#78350F15,#F59E0B25)",
    tags: ["Python", "Power BI"],
    title: "Kết nối Power BI với Oracle DWH — Hướng dẫn từng bước",
    date: "15/03/2025",
    readTime: "10 phút đọc",
  },
  {
    slug: "nextjs-seo-2025",
    emoji: "⚛️",
    gradient: "linear-gradient(135deg,#4C1D9515,#7C3AED25)",
    tags: ["Next.js", "SEO"],
    title: "Tối ưu SEO cho Next.js 15 — Checklist đầy đủ 2025",
    date: "01/03/2025",
    readTime: "11 phút đọc",
  },
  {
    slug: "django-rest-api",
    emoji: "🐍",
    gradient: "linear-gradient(135deg,#064E3B15,#10B98125)",
    tags: ["Django", "Tutorial"],
    title: "Django REST API cho người mới: Từ model đến production",
    date: "10/02/2025",
    readTime: "18 phút đọc",
  },
];

const allPosts = [...blogPosts, ...morePosts];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <div
          className="section-alt"
          style={{ paddingTop: "calc(68px + 64px)" }}
        >
          <div className="mx-auto px-6 text-center" style={{ maxWidth: 1160 }}>
            <p className="eyebrow mb-3 justify-center">Blog kỹ thuật</p>
            <h1
              className="font-display text-4xl md:text-5xl font-black mb-5 gradient-text"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Chia sẻ kiến thức &amp; kinh nghiệm
            </h1>
            <p
              className="text-lg mx-auto max-w-xl mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Bài viết thực tế từ Oracle DWH, Django, Python đến React và
              Next.js.
            </p>

            {/* Tags */}
            <div className="flex justify-center flex-wrap gap-2">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer transition-all"
                  style={{
                    border: "1.5px solid var(--border)",
                    background: "var(--bg-card)",
                    color: "var(--text-secondary)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="section">
          <div className="mx-auto px-6" style={{ maxWidth: 1160 }}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {allPosts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-2xl overflow-hidden flex flex-col"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    className="h-44 flex items-center justify-center text-5xl select-none"
                    style={{ background: post.gradient }}
                  >
                    {post.emoji}
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-semibold px-3 py-0.5 rounded-full"
                          style={{
                            fontFamily: "JetBrains Mono, monospace",
                            background: "var(--gradient-soft)",
                            border: "1px solid var(--border)",
                            color: "var(--accent)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h2
                      className="font-display text-base font-bold leading-snug mb-3 flex-1"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-[var(--accent)] transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h2>

                    <div
                      className="flex items-center gap-4 text-xs pt-4"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "var(--text-muted)",
                        borderTop: "1px solid var(--border)",
                      }}
                    >
                      <span>📅 {post.date}</span>
                      <span>⏱ {post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
