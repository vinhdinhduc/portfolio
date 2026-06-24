"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Mail, MessageCircle, Phone, X } from "lucide-react";
import { personalInfo } from "@/lib/data";

const options = [
  {
    icon: <MessageCircle className="w-4 h-4" />,
    label: "Nhắn Zalo ngay",
    href: personalInfo.zalo,
    bg: "rgba(2, 2, 3, 0.12)",
  },
  {
    icon: <Phone className="w-4 h-4" />,
    label: "Gọi điện thoại",
    href: `tel:${personalInfo.phone}`,
    bg: "rgba(34,197,94,.12)",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    label: "Gửi email",
    href: `mailto:${personalInfo.email}`,
    bg: "var(--gradient-soft)",
  },
];

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowMessage(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="fixed bottom-10 right-6 z-50 flex flex-col-reverse items-end gap-3"
      aria-label="Liên hệ nhanh"
    >
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-0.5"
          aria-label="Quay về đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {showMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="rounded-full px-4 py-2 text-sm bg-white/95 shadow-lg border border-slate-200 text-slate-900"
            >
              Liên hệ nhanh với tôi qua Zalo, điện thoại hoặc email. Tôi sẽ phản
              hồi trong thời gian sớm nhất!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col items-end gap-2">
          {options.map((opt) => (
            <motion.a
              key={opt.label}
              href={opt.href}
              target={opt.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                boxShadow: "var(--shadow-md)",
                color: "var(--text-primary)",
                textDecoration: "none",
              }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                style={{ background: opt.bg }}
              >
                {opt.icon}
              </span>
              {opt.label}
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowMessage(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className="fixed bottom-10 right-6 z-50 flex flex-col-reverse items-end gap-3"
      aria-label="Liên hệ nhanh"
    >
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-0.5"
          aria-label="Quay về đầu trang"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="rounded-full px-4 py-2 text-sm bg-white/95 shadow-lg border border-slate-200 text-slate-900"
          >
            Liên hệ nhanh với tôi qua Zalo, điện thoại hoặc email. Tôi sẽ phản
            hồi trong thời gian sớm nhất!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end gap-2">
        <AnimatePresence>
          {open && (
            <motion.div
              className="flex flex-col items-end gap-2.5"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } },
                hidden: {
                  transition: { staggerChildren: 0.04, staggerDirection: -1 },
                },
              }}
            >
              {options.map((opt) => (
                <motion.a
                  key={opt.label}
                  href={opt.href}
                  target={opt.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  variants={{
                    hidden: { scale: 0.8, opacity: 0 },
                    visible: { scale: 1, opacity: 1 },
                  }}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    boxShadow: "var(--shadow-md)",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                    style={{ background: opt.bg }}
                  >
                    {opt.icon}
                  </span>
                  {opt.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              className="flex flex-col items-end gap-2.5"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } },
                hidden: {
                  transition: { staggerChildren: 0.04, staggerDirection: -1 },
                },
              }}
            >
              {options.map((opt) => {
                return (
                  <motion.a
                    key={opt.label}
                    href={opt.href}
                    target={opt.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    variants={{
                      hidden: { scale: 0.8, opacity: 0 },
                      visible: { scale: 1, opacity: 1 },
                    }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border)",
                      boxShadow: "var(--shadow-md)",
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-base flex-shrink-0"
                      style={{ background: opt.bg }}
                    >
                      {opt.icon}
                    </span>
                    {opt.label}
                  </motion.a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-0.5"
          aria-label={open ? "Đóng liên hệ nhanh" : "Mở liên hệ nhanh"}
        >
          {open ? (
            <X className="w-5 h-5" />
          ) : (
            <MessageCircle className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
