"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/lib/data";

const filters = [
  { key: "all", label: "Tất cả" },
  { key: "web", label: "Website" },
  { key: "mobile", label: "Mobile" },
  { key: "system", label: "Hệ thống" },
];

function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -6 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        boxShadow: hovered ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transition: "border-color .3s, box-shadow .3s",
        borderColor: hovered ? "var(--border-h)" : "var(--border)",
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative h-48 flex items-center justify-center overflow-hidden"
        style={{ background: project.gradient }}
      >
        <span className="text-6xl opacity-50 select-none">{project.emoji}</span>

        {/* Overlay with links */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-3"
          style={{ background: "var(--gradient)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 0.94 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {project.isPrivate ? (
            <span
              className="btn btn-sm"
              style={{
                background: "rgba(255,255,255,.15)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,.4)",
                cursor: "default",
              }}
            >
              🔒 Nội bộ
            </span>
          ) : (
            <>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  className="btn btn-primary btn-sm"
                  target="_blank"
                  rel="noopener"
                >
                  Demo →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="btn btn-sm"
                  style={{
                    background: "rgba(255,255,255,.15)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,.4)",
                  }}
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6">
        <p
          className="text-xs font-medium uppercase mb-2"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            color: "var(--accent)",
            letterSpacing: "0.1em",
          }}
        >
          {project.tag}
        </p>

        <h3
          className="font-display text-xl font-bold mb-3 leading-snug"
          style={{
            fontFamily: "Syne, sans-serif",
            color: "var(--text-primary)",
          }}
        >
          {project.title}
        </h3>

        <p
          className="text-sm leading-relaxed mb-4 flex-1"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="stack-badge"
              style={{ fontSize: 11, padding: "3px 10px" }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Links row */}
        <div className="flex gap-2.5">
          {project.isPrivate ? (
            <>
              <span
                className="btn btn-sm btn-outline"
                style={{ opacity: 0.5, cursor: "default" }}
              >
                🔒 Nội bộ
              </span>
              <a href="#contact" className="btn btn-primary btn-sm">
                Trao đổi thêm
              </a>
            </>
          ) : (
            <>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  className="btn btn-primary btn-sm"
                  target="_blank"
                  rel="noopener"
                >
                  Demo →
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  className="btn btn-outline btn-sm"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </a>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="section-alt">
      <div className="mx-auto px-6" style={{ maxWidth: 1160 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p className="eyebrow mb-3">Portfolio</p>
          <h2
            className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Các dự án <span className="gradient-text">thực tế</span> đã triển
            khai
          </h2>
          <p
            className="text-base md:text-lg mx-auto max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Những sản phẩm tôi đã xây dựng — từ hệ thống từ điển AI đến
            dashboard phân tích dữ liệu doanh nghiệp.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all"
              style={{
                color: active === f.key ? "#fff" : "var(--text-secondary)",
                border: `1.5px solid ${active === f.key ? "transparent" : "var(--border)"}`,
                background: active === f.key ? "transparent" : "var(--bg-card)",
              }}
            >
              {active === f.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "var(--gradient)", zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-7">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/dinhducvinh"
            target="_blank"
            rel="noopener"
            className="btn btn-outline"
          >
            Xem thêm trên GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
