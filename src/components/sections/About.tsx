"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, skillGroups, experiences, stats } from "@/lib/data";

function Counter({
  target,
  suffix,
  isStatic,
}: {
  target: string | number;
  suffix: string;
  isStatic?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || isStatic) {
      setCount(typeof target === "number" ? target : Number(target) || 0);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const numericTarget =
        typeof target === "number" ? target : Number(target) || 0;
      setCount(Math.floor(eased * numericTarget));
      if (p < 1) requestAnimationFrame(raf);
      else setCount(numericTarget);
    };
    requestAnimationFrame(raf);
  }, [inView, target, isStatic]);

  return (
    <span ref={ref}>
      {isStatic ? target : count}
      {suffix}
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay },
});

export function About() {
  return (
    <section id="about" className="section-alt">
      <div className="mx-auto px-6" style={{ maxWidth: 1160 }}>
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="eyebrow mb-3">Về tôi</p>
          <h2
            className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Người đứng sau <span className="gradient-text">những dự án</span>
          </h2>
          <p
            className="text-base md:text-lg mx-auto max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Kết hợp tư duy phân tích dữ liệu với kỹ năng lập trình full-stack để
            tạo ra giải pháp thực tế.
          </p>
        </motion.div>
        <motion.div
          {...fadeUp(0.1)}
          className="grid gap-6 lg:grid-cols-[1fr_0.9fr] items-center mb-14"
        >
          <div className="rounded-[32px] overflow-hidden border border-[rgba(148,163,184,.18)] bg-slate-950 shadow-2xl">
            <img
              src="/about-portrait.jpg"
              alt="Ảnh Đinh Đức Vình"
              className="h-full w-full object-cover min-h-[360px]"
              onError={(event) => {
                const img = event.currentTarget;
                img.style.display = "none";
              }}
            />
          </div>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* ── Left: Bio + Timeline ── */}
          <div>
            <motion.div {...fadeUp(0.1)} className="space-y-4 mb-8">
              {personalInfo.bio.map((para, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                  dangerouslySetInnerHTML={{
                    __html: para.replace(
                      /<strong>(.*?)<\/strong>/g,
                      '<strong style="color:var(--text-primary);font-weight:600">$1</strong>',
                    ),
                  }}
                />
              ))}
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              {...fadeUp(0.2)}
              className="rounded-r-xl p-5 mb-8 text-base italic"
              style={{
                background: "var(--gradient-soft)",
                borderLeft: "3px solid var(--accent)",
                color: "var(--text-primary)",
              }}
            >
              {personalInfo.quote}
            </motion.blockquote>

            {/* Experience Timeline */}
            <motion.div {...fadeUp(0.3)}>
              <h3
                className="font-display text-xl font-bold mb-7"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Kinh nghiệm
              </h3>
              <div className="space-y-0">
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="relative pl-6 pb-8"
                    style={{
                      borderLeft:
                        i < experiences.length - 1
                          ? "2px solid var(--border)"
                          : "2px solid transparent",
                    }}
                  >
                    {/* Dot */}
                    <div
                      className="absolute -left-[7px] top-1 w-3 h-3 rounded-full"
                      style={{
                        background: "var(--gradient)",
                        border: "2px solid var(--bg-secondary)",
                        boxShadow: "0 0 0 3px var(--accent)",
                      }}
                    />
                    <p
                      className="text-xs font-medium mb-1"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "var(--accent)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {exp.period}
                    </p>
                    <p
                      className="font-bold text-base mb-0.5"
                      style={{
                        fontFamily: "Syne, sans-serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      {exp.role}
                    </p>
                    <p
                      className="text-sm mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {exp.company}
                    </p>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right: Skills + Stats ── */}
          <div>
            <motion.h3
              {...fadeUp(0.1)}
              className="font-display text-xl font-bold mb-7"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Kỹ năng kỹ thuật
            </motion.h3>

            <div className="space-y-6 mb-10">
              {skillGroups.map((group, gi) => (
                <motion.div key={group.label} {...fadeUp(0.15 + gi * 0.08)}>
                  <p
                    className="text-xs font-medium uppercase mb-3"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill.name} className="stack-badge">
                        <span
                          className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                          style={{ background: skill.color }}
                        />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats grid */}
            <motion.div {...fadeUp(0.5)} className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-2xl p-5 text-center surface">
                  <div
                    className="gradient-text font-display text-4xl font-black leading-none mb-2"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    <Counter
                      target={stat.value}
                      suffix={stat.suffix}
                      isStatic={stat.isStatic}
                    />
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div {...fadeUp(0.6)} className="flex gap-3 mt-8">
              <a href="#contact" className="btn btn-primary btn-sm">
                Hợp tác ngay
              </a>
              <a href="#" className="btn btn-outline btn-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Tải CV
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
