"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay },
});

export function BlogPreview() {
  return (
    <section id="blog" className="section">
      <div className="mx-auto px-6" style={{ maxWidth: 1160 }}>
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-14">
          <p className="eyebrow mb-3">Blog kỹ thuật</p>
          <h2
            className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Chia sẻ{" "}
            <span className="gradient-text">kiến thức &amp; kinh nghiệm</span>
          </h2>
          <p
            className="text-base md:text-lg mx-auto max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Bài viết thực tế từ quá trình làm việc tại MobiFone Sơn La và các dự
            án cá nhân.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              {...fadeUp(0.1 + i * 0.1)}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Thumb */}
              <div
                className="h-36 flex items-center justify-center text-5xl select-none"
                style={{ background: post.gradient }}
              >
                {post.emoji}
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5">
                {/* Tags */}
                <div className="flex gap-2 mb-3 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        background: "var(--gradient-soft)",
                        border: "1px solid var(--border)",
                        color: "var(--accent)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3
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
                </h3>

                {/* Meta */}
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
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/blog" className="btn btn-outline">
            Xem tất cả bài viết →
          </Link>
        </div>
      </div>
    </section>
  );
}
