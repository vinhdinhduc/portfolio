import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

/* ── Fallback stub for posts without full content ── */
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="text-center py-20">
      <p className="text-5xl mb-6">🚧</p>
      <h2
        className="font-display text-2xl font-bold mb-3"
        style={{ fontFamily: "Syne, sans-serif", color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Bài viết đang được hoàn thiện, sẽ ra mắt sớm!
      </p>
      <Link href="/blog" className="btn btn-outline">
        ← Quay lại Blog
      </Link>
    </div>
  );
}

/* ── Oracle DWH article ── */
function OracleDwhArticle() {
  return (
    <div className="prose-ddv">
      <p>
        Khi làm việc với Oracle Data Warehouse tại MobiFone Sơn La, tôi thường
        xuyên gặp bài toán truy vấn hiệu năng cao từ Python. Một trong những vấn
        đề phổ biến nhất là lựa chọn cách so sánh ngày: dùng{" "}
        <code>TRUNC(date_column)</code> hay so sánh với <strong>DAY_KEY</strong>{" "}
        dạng số nguyên (YYYYMMDD)?
      </p>

      <div className="callout callout-info">
        <strong>📌 Bối cảnh:</strong> Bảng DWH tại MobiFone sử dụng cột{" "}
        <code>DAY_KEY NUMBER(8)</code> định dạng YYYYMMDD (ví dụ:{" "}
        <code>20250610</code>) thay vì kiểu DATE thuần túy, ảnh hưởng lớn đến
        cách viết query và khả năng dùng index.
      </div>

      <h2>1. Vấn đề với TRUNC(date_column)</h2>
      <p>
        Cách đơn giản nhất là dùng <code>TRUNC</code> để cắt bỏ phần
        giờ/phút/giây. Tuy nhiên cách này <strong>vô hiệu hóa index</strong>:
      </p>

      <div className="code-block">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "rgba(255,255,255,.04)",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: ".08em",
            }}
          >
            SQL — ❌ Chậm (Full Table Scan)
          </span>
        </div>
        <pre>{`-- Query này sẽ bỏ qua index trên DAY_KEY
SELECT * FROM DWH_PUB.ADMA_PTM_TTTB_TS
WHERE TRUNC(CREATE_DATE) = TRUNC(SYSDATE)
  AND TINH_CODE = '814';
-- Execution plan: FULL TABLE SCAN (cost rất cao!)`}</pre>
      </div>

      <h2>2. Giải pháp: So sánh DAY_KEY dạng số</h2>
      <p>
        Thay vì TRUNC, convert ngày sang DAY_KEY số và so sánh trực tiếp —
        Oracle dùng được index:
      </p>

      <div className="code-block">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "rgba(255,255,255,.04)",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: ".08em",
            }}
          >
            SQL — ✅ Nhanh (Index Range Scan)
          </span>
        </div>
        <pre>{`-- Convert SYSDATE thành DAY_KEY số YYYYMMDD
SELECT * FROM DWH_PUB.ADMA_PTM_TTTB_TS
WHERE DAY_KEY = TO_NUMBER(TO_CHAR(SYSDATE, 'YYYYMMDD'))
  AND TINH_CODE = '814';
-- Execution plan: INDEX RANGE SCAN
-- Cost giảm từ ~50000 xuống còn ~120!`}</pre>
      </div>

      <h2>3. Kết nối và truy vấn từ Python</h2>

      <div className="code-block">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 16px",
            background: "rgba(255,255,255,.04)",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}
        >
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "#64748B",
              textTransform: "uppercase",
              letterSpacing: ".08em",
            }}
          >
            Python — Kết nối Oracle DWH
          </span>
        </div>
        <pre>{`import cx_Oracle
import pandas as pd
from datetime import date, timedelta
import os

DB_CONFIG = {
    "host":    os.environ.get("ORACLE_HOST"),
    "port":    1521,
    "service": os.environ.get("ORACLE_SERVICE"),
    "user":    os.environ.get("ORACLE_USER"),
    "password":os.environ.get("ORACLE_PWD"),
}

def get_connection():
    dsn = cx_Oracle.makedsn(
        DB_CONFIG["host"], DB_CONFIG["port"],
        service_name=DB_CONFIG["service"]
    )
    return cx_Oracle.connect(
        DB_CONFIG["user"], DB_CONFIG["password"],
        dsn, encoding="UTF-8"
    )

def to_day_key(d: date) -> int:
    return int(d.strftime("%Y%m%d"))

def query_vneid_daily(target_date: date) -> pd.DataFrame:
    day_key = to_day_key(target_date)
    sql = """
        SELECT
            TINH_CODE,
            HUYEN_CODE,
            TONG_TB         AS total_subscribers,
            VNEID_VERIFIED  AS verified_count,
            ROUND(VNEID_VERIFIED * 100.0 / NULLIF(TONG_TB, 0), 2) AS verified_pct
        FROM dwh_pub.vneid
        WHERE DAY_KEY = :day_key
          AND TINH_CODE = '814'
        ORDER BY HUYEN_CODE
    """
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, {"day_key": day_key})
            columns = [col[0].lower() for col in cur.description]
            rows = cur.fetchall()
    return pd.DataFrame(rows, columns=columns)`}</pre>
      </div>

      <div className="callout callout-warning">
        <strong>⚠️ Lưu ý bảo mật:</strong> Không hard-code credentials. Dùng
        biến môi trường (<code>os.environ</code>) hoặc file <code>.env</code>{" "}
        với <code>python-dotenv</code>.
      </div>

      <h2>4. So sánh hiệu năng</h2>
      <p>Kết quả đo thực tế trên bảng ~8 triệu bản ghi tại MobiFone Sơn La:</p>
      <ul>
        <li>
          <strong>TRUNC(CREATE_DATE)</strong> → Full Table Scan → ~18 giây
        </li>
        <li>
          <strong>DAY_KEY = :day_key</strong> → Index Range Scan → ~0.4 giây (
          <strong>nhanh hơn 45 lần!</strong>)
        </li>
        <li>
          <strong>DAY_KEY BETWEEN :from AND :to</strong> → Index Range Scan →
          ~1.2 giây / 7 ngày
        </li>
      </ul>

      <h2>5. Kết luận</h2>
      <p>Ba điểm cần nhớ khi làm việc với Oracle DWH từ Python:</p>
      <ul>
        <li>
          <strong>Không wrap hàm quanh cột</strong> trong WHERE clause — TRUNC,
          TO_CHAR, UPPER đều vô hiệu hóa index.
        </li>
        <li>
          <strong>Dùng bind variables</strong> (<code>:param</code>) thay vì
          string concatenation để tận dụng Oracle parse cache và tránh SQL
          Injection.
        </li>
        <li>
          <strong>Xử lý in-memory</strong> với BytesIO khi xuất file để phục vụ
          qua web app.
        </li>
      </ul>

      <div className="callout callout-success">
        <strong>✅ Kết quả:</strong> Chuyển từ <code>TRUNC(date)</code> sang{" "}
        <code>DAY_KEY = :num</code> giúp các query báo cáo hàng ngày tại
        MobiFone Sơn La nhanh hơn <strong>45 lần</strong> — từ ~18 giây xuống
        còn ~0.4 giây.
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main>
        <div style={{ paddingTop: "calc(68px + 56px)", paddingBottom: 96 }}>
          <div
            className="mx-auto px-6"
            style={{
              maxWidth: 1100,
              display: "grid",
              gridTemplateColumns: "1fr 260px",
              gap: 56,
              alignItems: "start",
            }}
          >
            {/* Article */}
            <article>
              {/* Breadcrumb */}
              <nav
                className="flex items-center gap-2 text-xs mb-6"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--text-muted)",
                }}
              >
                <Link href="/" style={{ color: "var(--accent)" }}>
                  Trang chủ
                </Link>
                <span>›</span>
                <Link href="/blog" style={{ color: "var(--accent)" }}>
                  Blog
                </Link>
                <span>›</span>
                <span>{post.tags[0]}</span>
              </nav>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 12,
                      padding: "4px 12px",
                      background: "var(--gradient-soft)",
                      border: "1px solid var(--border)",
                      borderRadius: 999,
                      color: "var(--accent)",
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1
                className="font-display font-black leading-tight mb-5"
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: "clamp(26px, 4vw, 40px)",
                  letterSpacing: "-0.02em",
                  color: "var(--text-primary)",
                }}
              >
                {post.title}
              </h1>

              {/* Meta */}
              <div
                className="flex flex-wrap gap-5 pb-6 mb-10 text-sm"
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  color: "var(--text-muted)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span>✍️ Đinh Đức Vình</span>
                <span>📅 {post.date}</span>
                <span>⏱ {post.readTime}</span>
                <span>📍 Thành phố Sơn La</span>
              </div>

              {/* Content */}
              {post.slug === "oracle-dwh-python" ? (
                <OracleDwhArticle />
              ) : (
                <ComingSoon title={post.title} />
              )}

              {/* Author card */}
              <div
                className="mt-14 p-6 rounded-2xl flex gap-5 items-start"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                  style={{
                    background: "var(--gradient)",
                    fontFamily: "Syne, sans-serif",
                  }}
                >
                  DDV
                </div>
                <div>
                  <p
                    className="font-bold text-base mb-1"
                    style={{
                      fontFamily: "Syne, sans-serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    Đinh Đức Vình
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Lập trình viên fullstack, tốt nghiệp loại Giỏi chuyên nghành
                    Công nghệ Thông tin. . Có kinh nghiệm phát triển các ứng
                    dụng web, mobile,...
                    <Link
                      href="/#contact"
                      style={{ color: "var(--accent)", fontWeight: 600 }}
                    >
                      Liên hệ trao đổi →
                    </Link>
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link href="/blog" className="btn btn-outline">
                  ← Quay lại Blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: "sticky", top: "calc(68px + 24px)" }}>
              <div
                className="rounded-2xl p-6 mb-5"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  className="text-xs uppercase font-medium mb-4"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "var(--text-muted)",
                    letterSpacing: ".1em",
                  }}
                >
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: 12,
                        padding: "3px 10px",
                        background: "var(--gradient-soft)",
                        border: "1px solid var(--border)",
                        borderRadius: 999,
                        color: "var(--accent)",
                        fontWeight: 600,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--gradient-soft)",
                  border: "1px solid var(--accent)",
                }}
              >
                <p
                  className="text-xs uppercase font-medium mb-3"
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: "var(--text-muted)",
                    letterSpacing: ".1em",
                  }}
                >
                  Cần tư vấn?
                </p>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Tôi nhận tư vấn và phát triển hệ thống phân tích dữ liệu cho
                  doanh nghiệp.
                </p>
                <Link
                  href="/#contact"
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Liên hệ ngay →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
