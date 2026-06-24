# Portfolio – Đinh Đức Vình

Website portfolio cá nhân xây dựng với **Next.js 15 + TypeScript + Tailwind CSS v4 + Framer Motion**.

## Tech Stack

| Layer      | Công nghệ                    |
|------------|------------------------------|
| Framework  | Next.js 15 (App Router)      |
| Language   | TypeScript 5                 |
| Styling    | Tailwind CSS v4              |
| Animations | Framer Motion v12            |
| Theme      | next-themes (dark/light)     |
| Deploy     | Vercel (khuyên dùng)         |

## Cấu trúc dự án

```
src/
├── app/
│   ├── layout.tsx          ← Root layout + metadata SEO
│   ├── page.tsx            ← Trang chủ (hero, about, services, portfolio, blog, contact)
│   ├── globals.css         ← Tailwind v4 + CSS design tokens + dark mode
│   └── blog/
│       ├── page.tsx        ← Danh sách blog
│       └── [slug]/page.tsx ← Bài viết chi tiết
├── components/
│   ├── Navbar.tsx          ← Fixed nav, scroll hide/show, mobile menu, dark toggle
│   ├── ThemeProvider.tsx   ← next-themes wrapper
│   ├── Footer.tsx          ← Footer với social links
│   ├── FloatingContact.tsx ← Speed-dial Zalo/Phone/Email
│   └── sections/
│       ├── Hero.tsx        ← Typewriter, morphing avatar, floating cards
│       ├── About.tsx       ← Timeline, skills grid, counter animation
│       ├── Services.tsx    ← 3 service cards
│       ├── Portfolio.tsx   ← Filter tabs + AnimatePresence grid
│       ├── BlogPreview.tsx ← 3 blog cards
│       └── Contact.tsx     ← Form + validation + channel links
└── lib/
    └── data.ts             ← Toàn bộ nội dung (projects, services, blog, personal info)
```

## Cài đặt & chạy

```bash
# 1. Giải nén và vào thư mục
cd portfolio-nextjs

# 2. Cài dependencies
npm install

# 3. Chạy development server
npm run dev
# → Mở http://localhost:3000
```

## Build & Deploy lên Vercel

```bash
# Build production
npm run build
npm start

# Deploy lên Vercel (miễn phí)
npx vercel --prod
# hoặc kéo thả thư mục vào vercel.com
```

## Tùy chỉnh nội dung

**Toàn bộ nội dung** nằm trong `src/lib/data.ts` — chỉ cần sửa 1 file:

```ts
export const personalInfo = {
  name:  'Đinh Đức Vình',
  email: 'email-that@gmail.com',  // ← sửa
  phone: '0912 345 678',          // ← sửa
  zalo:  'https://zalo.me/...',   // ← sửa
  github: 'https://github.com/...', // ← sửa
  // ...
}
```

## Thêm ảnh đại diện

1. Đặt file `avatar.jpg` vào `public/images/avatar.jpg`
2. Trong `src/components/sections/Hero.tsx`, thay khối `<div className="avatar-placeholder">` bằng:

```tsx
import Image from 'next/image'

<Image
  src="/images/avatar.jpg"
  alt="Đinh Đức Vình"
  fill
  className="object-cover"
  priority
/>
```

## Tích hợp form liên hệ thật (EmailJS)

Trong `src/components/sections/Contact.tsx`, thay phần `setTimeout`:

```ts
// 1. npm install @emailjs/browser
// 2. Thêm vào Contact.tsx:
import emailjs from '@emailjs/browser'

const result = await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  { name: form.name, email: form.email, message: form.message },
  'YOUR_PUBLIC_KEY'
)
```

## Thêm bài blog mới

1. Thêm entry vào `src/lib/data.ts` trong mảng `blogPosts`
2. Thêm component content trong `src/app/blog/[slug]/page.tsx`

## Colors & Theming

Design tokens trong `src/app/globals.css`:

```css
:root {           /* Light mode */
  --accent: #2e75b6;
  --bg-primary: #ffffff;
}
.dark {           /* Dark mode */
  --accent: #60a5fa;
  --bg-primary: #0f0f1a;
}
```

---

Made with ❤️ by **Đinh Đức Vình** · MobiFone Sơn La · Đại học Tây Bắc
