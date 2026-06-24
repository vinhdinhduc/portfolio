import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

type ReqBody = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

const validate = (body: Partial<ReqBody>) => {
  if (!body.name || !body.email || !body.message)
    return "Vui lòng điền tên, email và nội dung yêu cầu.";
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRx.test(body.email)) return "Email không hợp lệ.";
  return null;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ReqBody>;

    const err = validate(body);
    if (err) return NextResponse.json({ error: err }, { status: 400 });

    // Read SMTP config from env
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const recipient = process.env.CONTACT_RECIPIENT || process.env.SMTP_USER;

    if (!host || !user || !pass) {
      return NextResponse.json(
        { error: "SMTP is not configured on the server." },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const subject = `Yêu cầu liên hệ từ ${body.name}`;
    const html = `
      <h3>Yêu cầu liên hệ mới</h3>
      <p><strong>Tên:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Điện thoại:</strong> ${body.phone || "—"}</p>
      <p><strong>Dịch vụ:</strong> ${body.service || "—"}</p>
      <p><strong>Nội dung:</strong><br/>${(body.message || "").replace(/\n/g, "<br/>")}</p>
    `;

    await transporter.sendMail({
      from: `${body.name} <${body.email}>`,
      to: recipient,
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
