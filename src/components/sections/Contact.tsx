"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Phone as PhoneIcon,
  Mail as MailIcon,
  Github as GithubIcon,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay },
});

const channels = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "Zalo",
    value: personalInfo.phone,
    href: personalInfo.zalo,
  },
  {
    icon: <PhoneIcon className="w-5 h-5" />,
    label: "Điện thoại",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
  },
  {
    icon: <MailIcon className="w-5 h-5" />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: <GithubIcon className="w-5 h-5" />,
    label: "GitHub",
    value: "github.com/dinhducvinh",
    href: personalInfo.github,
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormState>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrMsg("Vui lòng điền đầy đủ thông tin bắt buộc (*).");
      return;
    }
    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(form.email)) {
      setErrMsg("Địa chỉ email không hợp lệ.");
      return;
    }

    try {
      setStatus("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setErrMsg(json?.error || "Gửi thất bại. Vui lòng thử lại sau.");
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      setErrMsg("Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại.");
      setStatus("error");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-alt">
      <div className="mx-auto px-6" style={{ maxWidth: 1160 }}>
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-14">
          <p className="eyebrow mb-3">Liên hệ</p>
          <h2
            className="font-display text-3xl md:text-4xl font-black mb-4 leading-tight"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Bắt đầu <span className="gradient-text">dự án của bạn</span>
          </h2>
          <p
            className="text-base md:text-lg mx-auto max-w-xl"
            style={{ color: "var(--text-secondary)" }}
          >
            Hãy nói cho tôi biết bạn cần gì — tôi sẽ phản hồi trong vòng 24 giờ.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ── Left: Info ── */}
          <motion.div {...fadeUp(0.1)}>
            <h3
              className="font-display text-2xl font-bold mb-4 leading-snug"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Hãy cùng xây dựng điều gì đó tuyệt vời
            </h3>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Dù bạn cần một website cho cửa hàng, một app mobile cho đội nhóm,
              hay một hệ thống quản lý dữ liệu — tôi lắng nghe, tư vấn miễn phí
              và đưa ra giải pháp phù hợp nhất với ngân sách của bạn.
            </p>

            <div className="space-y-3">
              {channels.map((ch) => (
                <motion.a
                  key={ch.label}
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={ch.href.startsWith("http") ? "noopener" : undefined}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = "var(--accent)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = "var(--border)")
                  }
                >
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                    style={{
                      background: "var(--gradient-soft)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {ch.icon}
                  </div>
                  <div>
                    <p
                      className="text-xs uppercase mb-0.5"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        color: "var(--text-muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {ch.label}
                    </p>
                    <p className="text-sm font-semibold">{ch.value}</p>
                  </div>
                </motion.a>
              ))}

              {/* Copy email */}
              <motion.button
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={copyEmail}
                className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background: "var(--gradient-soft)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {copied ? "✅" : "📋"}
                </div>
                <div>
                  <p
                    className="text-xs uppercase mb-0.5"
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      color: "var(--text-muted)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    Sao chép email
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: copied ? "#22C55E" : "inherit" }}
                  >
                    {copied ? "Đã sao chép!" : personalInfo.email}
                  </p>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div {...fadeUp(0.2)}>
            <div
              className="rounded-2xl p-8 md:p-9"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="font-display text-xl font-bold mb-7"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Gửi yêu cầu tư vấn
              </h3>

              <form onSubmit={handleSubmit} noValidate>
                {/* Error */}
                {errMsg && (
                  <div
                    className="mb-4 px-4 py-3 rounded-lg text-sm font-medium"
                    style={{
                      background: "rgba(239,68,68,.1)",
                      border: "1px solid rgba(239,68,68,.3)",
                      color: "#DC2626",
                    }}
                  >
                    {errMsg}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--text-secondary)" }}
                      htmlFor="name"
                    >
                      Họ và tên *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      placeholder="Nguyễn Văn A"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-1.5"
                      style={{ color: "var(--text-secondary)" }}
                      htmlFor="phone"
                    >
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="0912 345 678"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                    htmlFor="email"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                    htmlFor="service"
                  >
                    Dịch vụ quan tâm
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-input cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2394A3B8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 14px center",
                      appearance: "none",
                      paddingRight: 36,
                    }}
                    value={form.service}
                    onChange={handleChange}
                  >
                    <option value="">-- Chọn dịch vụ --</option>
                    <option value="website">
                      Website giới thiệu / Landing Page
                    </option>
                    <option value="ecommerce">
                      Website thương mại điện tử
                    </option>
                    <option value="mobile">App Mobile (React Native)</option>
                    <option value="system">Hệ thống quản lý / API</option>
                    <option value="data">Phân tích dữ liệu / Dashboard</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="mb-7">
                  <label
                    className="block text-sm font-semibold mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                    htmlFor="message"
                  >
                    Mô tả yêu cầu *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input resize-y"
                    placeholder="Mô tả ngắn về dự án, ngân sách dự kiến và thời gian cần hoàn thành..."
                    rows={4}
                    style={{ minHeight: 100 }}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn btn-primary w-full justify-center"
                  style={{ opacity: status === "loading" ? 0.75 : 1 }}
                >
                  {status === "loading" ? (
                    <>⏳ Đang gửi...</>
                  ) : (
                    <>
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
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Gửi yêu cầu tư vấn
                    </>
                  )}
                </button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-4 py-3 rounded-lg text-sm font-semibold text-center"
                    style={{
                      background: "rgba(34,197,94,.1)",
                      border: "1px solid rgba(34,197,94,.3)",
                      color: "#16A34A",
                    }}
                  >
                    ✅ Cảm ơn bạn! Tôi sẽ liên hệ lại trong vòng 24 giờ.
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
