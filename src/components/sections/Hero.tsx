"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { typewriterPhrases } from "@/lib/data";

const heroStack = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#000", dark: "#fff" },
  { name: "Python", color: "#3776AB" },
  { name: "Django", color: "#092E20", dark: "#4DB6AC" },
  { name: "Oracle", color: "#F80000" },
  { name: "TypeScript", color: "#3178C6" },
];

const quickContactPopups = [
  {
    title: "Liên hệ nhanh qua Zalo",
    detail: "Nhắn tin ngay để trao đổi dự án",
    href: "https://zalo.me/0349229870",
    icon: "💬",
  },
  {
    title: "Gọi điện thoại ngay",
    detail: "Chỉ cần nhấn để gọi",
    href: "tel:0349229870",
    icon: "📞",
  },
  {
    title: "Gửi email ngay",
    detail: "Tôi sẽ phản hồi trong thời gian sớm nhất",
    href: "mailto:vinhdinh568@gmail.com",
    icon: "✉️",
  },
];

const heroSlides = [
  {
    title: "Ứng dụng quản lý hiện đại",
    subtitle: "Giao diện rõ ràng, tối ưu trải nghiệm người dùng.",
    label: "UI/UX",
    accent: "#7c3aed",
  },
  {
    title: "Cổng thông tin doanh nghiệp",
    subtitle: "Hệ thống website, portal và bảng điều khiển quản lý.",
    label: "Business",
    accent: "#0ea5e9",
  },
  {
    title: "Ứng dụng thương mại điện tử",
    subtitle: "Giải pháp bán hàng chuẩn SEO, dễ mở rộng.",
    label: "E-commerce",
    accent: "#16a34a",
  },
];

function Typewriter() {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDel] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const current = typewriterPhrases[idx];
    const speed = deleting ? 40 : 75;

    timer.current = window.setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          window.setTimeout(() => setDel(true), 1800);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDel(false);
          setIdx((i) => (i + 1) % typewriterPhrases.length);
        }
      }
    }, speed);

    return () => {
      if (timer.current !== null) {
        clearTimeout(timer.current);
      }
    };
  }, [text, deleting, idx]);

  return (
    <span
      className="font-display text-2xl md:text-3xl font-semibold"
      style={{
        fontFamily: "Syne, sans-serif",
        color: "var(--text-secondary)",
        minHeight: 40,
      }}
    >
      {text}
      <span
        className="cursor-blink inline-block w-[2px] h-[1.1em] ml-1 align-middle"
        style={{ background: "var(--accent)" }}
      />
    </span>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay },
});

export function Hero() {
  const [popupIndex, setPopupIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupDelay = window.setTimeout(() => {
      setShowPopup(true);
    }, 2000);

    const popupInterval = window.setInterval(() => {
      setPopupIndex((current) => (current + 1) % quickContactPopups.length);
    }, 4000);

    const slideInterval = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => {
      window.clearTimeout(popupDelay);
      window.clearInterval(popupInterval);
      window.clearInterval(slideInterval);
    };
  }, []);

  const activeSlide = heroSlides[slideIndex];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: 68 }}
    >
      {/* Orb backgrounds */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full orb-animate"
          style={{
            width: 600,
            height: 600,
            background: "var(--accent)",
            filter: "blur(80px)",
            opacity: 0.15,
            top: -100,
            right: -100,
          }}
        />
        <div
          className="absolute rounded-full orb-animate"
          style={{
            width: 400,
            height: 400,
            background: "var(--accent-purple)",
            filter: "blur(80px)",
            opacity: 0.15,
            bottom: -50,
            left: -80,
            animationDelay: "3s",
          }}
        />
        {/* Grid dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.6,
          }}
        />
      </div>

      <div className="relative w-full mx-auto px-6" style={{ maxWidth: 1160 }}>
        <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">
          {/* ── Content ── */}
          <div>
            {/* Badge */}
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 text-sm font-medium"
              style={{
                background: "var(--gradient-soft)",
                border: "1px solid var(--border)",
                color: "var(--accent)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
              Sẵn sàng nhận dự án mới
            </motion.div>

            {/* Name */}
            <motion.h1
              {...fadeUp(0.12)}
              className="font-display mb-4 leading-tight tracking-tight"
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: "clamp(42px, 6vw, 72px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Xin chào, tôi là
              <br />
              <span className="gradient-text">Đinh Đức Vình</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div {...fadeUp(0.25)} className="mb-5">
              <Typewriter />
            </motion.div>

            {/* Description */}
            <motion.p
              {...fadeUp(0.38)}
              className="text-base md:text-lg mb-6 max-w-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              Lập trình viên full-stack &amp; tốt nghiệp loại giỏi chuyên ngành{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                Công nghệ Thông tin
              </strong>
              . Tôi xây dựng website, ứng dụng di động như thương mại điện tử,
              quản lý nhà hàng, khách sạn...
            </motion.p>

            <AnimatePresence mode="wait">
              {showPopup && (
                <motion.div
                  key="popup"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative overflow-hidden rounded-[28px] border border-[rgba(148,163,184,.18)] bg-white/95 p-5 shadow-xl mb-6"
                  style={{ maxWidth: 520 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={quickContactPopups[popupIndex].title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.45 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-slate-100 w-12 h-12 flex items-center justify-center text-2xl">
                          {quickContactPopups[popupIndex].icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {quickContactPopups[popupIndex].title}
                          </p>
                          <p className="text-sm text-slate-600">
                            {quickContactPopups[popupIndex].detail}
                          </p>
                        </div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 border border-slate-100">
                        Liên hệ nhanh với tôi qua Zalo, điện thoại hoặc email.
                        Tôi sẽ phản hồi trong thời gian sớm nhất!
                      </div>
                      <a
                        href={quickContactPopups[popupIndex].href}
                        className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--accent-h)]"
                      >
                        Liên hệ ngay
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Buttons */}
            <motion.div {...fadeUp(0.62)} className="flex flex-wrap gap-3 mt-6">
              <a href="#portfolio" className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Xem Portfolio
              </a>
              <a href="#contact" className="btn btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Liên hệ ngay
              </a>
            </motion.div>

            {/* Stack badges */}
            <motion.div {...fadeUp(0.74)} className="flex flex-wrap gap-2 mt-6">
              {heroStack.map((s) => (
                <span key={s.name} className="stack-badge">
                  <span
                    className="w-[6px] h-[6px] rounded-full flex-shrink-0"
                    style={{ background: s.color }}
                  />
                  {s.name}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Avatar visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative" style={{ width: 360, height: 520 }}>
              <div
                className="absolute inset-0 rounded-[44px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_40px_140px_rgba(15,23,42,0.12)]"
                style={{ transform: "translate(10px, -10px)" }}
              />

              <div className="relative h-full rounded-[44px] overflow-hidden border border-[rgba(255,255,255,.08)] bg-slate-950 shadow-2xl">
                <motion.div
                  key={activeSlide.title}
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -20 }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 flex flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_35%)] p-8"
                >
                  <div className="space-y-4">
                    <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-200 ring-1 ring-white/10">
                      {activeSlide.label}
                    </span>
                    <h3 className="text-3xl font-semibold text-white leading-tight">
                      {activeSlide.title}
                    </h3>
                    <p className="max-w-[18rem] text-sm leading-relaxed text-slate-300">
                      {activeSlide.subtitle}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-inner backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                        Nội dung hợp tác
                      </p>
                      <p className="text-sm font-semibold text-white mb-2">
                        {activeSlide.title}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {activeSlide.subtitle}
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-300 mb-3">
                        Slide này
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        {heroSlides.map((slide, index) => (
                          <button
                            key={slide.title}
                            type="button"
                            onClick={() => setSlideIndex(index)}
                            className={`h-2 w-full rounded-full transition ${
                              index === slideIndex
                                ? "bg-white"
                                : "bg-white/20 hover:bg-white/30"
                            }`}
                            aria-label={`Chuyển sang slide ${index + 1}`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 mt-3 text-center">
                        {slideIndex + 1} / {heroSlides.length}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          color: "var(--text-muted)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
        aria-hidden="true"
      >
        <div
          className="w-[22px] h-[34px] rounded-[11px] flex justify-center pt-[6px]"
          style={{ border: "2px solid var(--border-h)" }}
        >
          <div
            className="w-[3px] h-[6px] rounded-sm scroll-wheel-animate"
            style={{ background: "var(--accent)" }}
          />
        </div>
        <span>scroll</span>
      </motion.div>
    </section>
  );
}
