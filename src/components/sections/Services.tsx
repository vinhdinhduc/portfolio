"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay },
});

export function Services() {
  return (
    <section id="services" className="section">
      <div className="mx-auto px-6" style={{ maxWidth: 1160 }}>
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="eyebrow mb-3">Dịch vụ</p>
          <h2
            className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Giải pháp phù hợp với{" "}
            <span className="gradient-text">từng nhu cầu</span>
          </h2>
          <p
            className="text-base md:text-lg mx-auto max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Từ landing page đơn giản đến hệ thống thương mại điện tử phức tạp —
            tôi đồng hành từ ý tưởng đến ra mắt.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {services.map((svc, i) => (
            <motion.div
              key={svc.name}
              {...fadeUp(0.1 + i * 0.1)}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl p-9 flex flex-col"
              style={{
                background: svc.featured
                  ? "var(--gradient-soft)"
                  : "var(--bg-card)",
                border: `1px solid ${svc.featured ? "var(--accent)" : "var(--border)"}`,
                boxShadow: svc.featured ? "0 0 0 1px var(--accent)" : "none",
              }}
            >
              {/* Top gradient bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{
                  background: "var(--gradient)",
                  opacity: svc.featured ? 1 : 0,
                  transition: "opacity .3s",
                }}
              />

              {/* Featured badge */}
              {svc.featured && (
                <span
                  className="absolute top-5 right-5 text-xs font-bold text-white px-3 py-1 rounded-full"
                  style={{
                    background: "var(--gradient)",
                    letterSpacing: "0.05em",
                  }}
                >
                  PHỔ BIẾN
                </span>
              )}

              {/* Icon */}
              <div
                className="w-13 h-13 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform"
                style={{
                  width: 52,
                  height: 52,
                  background: "var(--gradient-soft)",
                  border: "1px solid var(--border)",
                }}
              >
                {svc.icon}
              </div>

              {/* Name */}
              <h3
                className="font-display text-xl font-bold mb-2"
                style={{
                  fontFamily: "Syne, sans-serif",
                  color: "var(--text-primary)",
                }}
              >
                {svc.name}
              </h3>

              {/* Price */}
              <p
                className="text-sm font-medium mb-4"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--accent)",
                }}
              >
                {svc.price}
              </p>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                {svc.description}
              </p>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {svc.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    <span
                      className="mt-0.5 font-bold flex-shrink-0"
                      style={{ color: "#22C55E" }}
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className={`btn btn-sm w-full justify-center ${svc.featured ? "btn-primary" : "btn-outline"}`}
              >
                {svc.cta} →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Extra note */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-12 text-center px-6 py-6 rounded-2xl"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-sm md:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            💡{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              Cần giải pháp đặc thù?
            </strong>{" "}
            Tôi cũng làm hệ thống quản lý nội bộ, API, tự động hóa báo cáo với
            Python/Django và tư vấn kiến trúc dữ liệu.{" "}
            <a
              href="#contact"
              style={{ color: "var(--accent)", fontWeight: 600 }}
            >
              Liên hệ thảo luận →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
