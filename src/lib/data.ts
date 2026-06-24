export const personalInfo = {
  name: "Đinh Đức Vình",
  nameEn: "Dinh Duc Vinh",
  initials: "DDV",
  title: "Full-Stack Developer & Data Analyst",
  company: "",
  university: "Đại học Tây Bắc",
  location: "Sơn La, Việt Nam",
  email: "vinhdinh568@gmail.com",
  phone: "0349229870",
  zalo: "https://zalo.me/0349229870",
  github: "https://github.com/vinhdinhduc",
  linkedin: "https://linkedin.com/in/vinhdinhduc",
  domain: "https://vinhdinhduc.id.vn",
  bio: [
    "Tôi là Đinh Đức Vình – là 1 lập trình viên full-stack. Với kinh nghiệm phát triển website, app mobile và hệ thống dữ liệu cho doanh nghiệp khu vực Tây Bắc Việt Nam, tôi luôn hướng đến việc tạo ra các giải pháp công nghệ thực tiễn và hiệu quả.",
    "Tôi có nền tảng kỹ thuật đa dạng: từ phát triển full-stack với React/Next.js và Node.js, đến phân tích dữ liệu với Python/Pandas và Oracle DWH. Mỗi dự án tôi xây dựng đều hướng đến hiệu quả thực tiễn, không chỉ đẹp về giao diện.",
  ],
  quote:
    '"Công nghệ không phải là mục đích — mà là công cụ để giải quyết bài toán thực tế của doanh nghiệp và cộng đồng khu vực Tây Bắc."',
};

export const typewriterPhrases = [
  "Full-Stack Developer",

  "Python & Django Developer",
  "React & Next.js Developer",
];

export const stats: Array<{
  value: string | number;
  suffix: string;
  label: string;
  isStatic?: boolean;
}> = [
  { value: "", suffix: "+", label: "Dự án hoàn thành", isStatic: false },
  { value: "", suffix: "+", label: "Năm kinh nghiệm", isStatic: false },
  { value: 5, suffix: "+", label: "Công nghệ thành thạo", isStatic: false },
  // { value: 100, suffix: "%", label: "Cam kết bàn giao", isStatic: true },
];

export const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#000000" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "React Native", color: "#FF6B6B" },
      { name: "Redux", color: "#ff2d78" },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Python", color: "#3776AB" },
      { name: "Django", color: "#092E20" },
      { name: "Node.js", color: "#339933" },
      { name: "Express", color: "#000000" },
      { name: "ASP.NET", color: "#ff2d78" },
    ],
  },
  {
    label: "Database & Data",
    skills: [
      { name: "Oracle DB", color: "#F80000" },
      { name: "MySQL", color: "#4479A1" },
      { name: "MongoDB", color: "#47A248" },
      { name: "Power BI", color: "#F2C811" },
      { name: "Pandas", color: "#150458" },
    ],
  },
  {
    label: "DevOps & Tools",
    skills: [
      { name: "Git", color: "#F05032" },
      { name: "Vercel", color: "#000000" },
      { name: "Docker", color: "#2496ED" },
      { name: "SQL Developer", color: "#FF9900" },
    ],
  },
];

export const experiences = [
  // {
  //   period: '2023 – Hiện tại',
  //   role: 'Chuyên viên Phân tích Dữ liệu',
  //   company: 'MobiFone Sơn La – Chi nhánh tỉnh Sơn La',
  //   description:
  //     'Phân tích dữ liệu Oracle DWH, xây dựng báo cáo Power BI, tự động hóa quy trình với Python, hỗ trợ hệ thống dịch vụ công trực tuyến (DVC/DVCQG) cho các xã/phường tỉnh Sơn La.',
  // },
  {
    period: "2022 – 2026",
    role: "Sinh viên Công nghệ thông tin",
    company: "Trường Đại học Tây Bắc – Sơn La",
    description:
      "Chuyên ngành Công nghệ Thông tin. Đô án tốt nghiệp: Ứng dụng công nghệ trí tuệ nhân tạo phát triển hệ thống từ điển chuyên ngành mở.",
  },
  {
    period: "Freelance",
    role: "Full-Stack Developer",
    company: "Độc lập – Khu vực Tây Bắc Việt Nam",
    description:
      "Phát triển website, app mobile và hệ thống quản lý cho DNNVV và cá nhân tại khu vực Tây Bắc.",
  },
];

export interface Service {
  icon: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export const services: Service[] = [
  {
    icon: "🖥️",
    name: "Website Giới thiệu",
    price: "Từ 3.000.000 – 5.000.000 VNĐ",
    description:
      "Website chuyên nghiệp để giới thiệu doanh nghiệp, sản phẩm hoặc thương hiệu cá nhân. Tối ưu SEO, responsive hoàn toàn.",
    features: [
      "Thiết kế theo yêu cầu, responsive mobile",
      "Tối ưu SEO Google (meta, schema, sitemap)",
      "Tích hợp Zalo OA, Facebook fanpage",
      "Form liên hệ gửi email tự động",
      "Deploy miễn phí, bảo hành 3 tháng",
    ],
    cta: "Báo giá miễn phí",
  },
  {
    icon: "🛒",
    name: "Website Thương mại điện tử",
    price: "Từ 8.000.000 – 15.000.000 VNĐ",
    description:
      "Hệ thống bán hàng online đầy đủ tính năng: quản lý sản phẩm, đơn hàng, khách hàng. Tích hợp thanh toán VNPay / Momo.",
    features: [
      "Quản lý sản phẩm, danh mục, tồn kho",
      "Giỏ hàng, thanh toán VNPay / Momo / COD",
      "Dashboard quản trị đơn hàng, khách hàng",
      "Tìm kiếm nâng cao, lọc sản phẩm",
      "Báo cáo doanh thu, thống kê trực quan",
      "Hỗ trợ 6 tháng sau bàn giao",
    ],
    cta: "Báo giá miễn phí",
    featured: true,
  },
  {
    icon: "📱",
    name: "App Mobile",
    price: "Từ 15.000.000 – 30.000.000 VNĐ",
    description:
      "Ứng dụng di động cross-platform (iOS + Android) với React Native. Giao diện mượt mà, tích hợp thông báo đẩy và thanh toán.",
    features: [
      "Chạy trên cả iOS và Android (1 codebase)",
      "Đăng nhập Google / Facebook / SĐT",
      "Thông báo đẩy (Push Notifications)",
      "Tích hợp bản đồ, camera, GPS",
      "Publish lên App Store & Google Play",
    ],
    cta: "Báo giá miễn phí",
  },
];

export interface Project {
  id: string;
  category: "web" | "mobile" | "system";
  emoji: string;
  gradient: string;
  tag: string;
  title: string;
  description: string;
  stack: string[];
  demoUrl?: string;
  githubUrl?: string;
  isPrivate?: boolean;
}

export const projects: Project[] = [
  {
    id: "opendict",
    category: "web",
    emoji: "📖",
    gradient: "linear-gradient(135deg,#1E3A5F20,#2E75B635)",
    tag: "🌐 Web App · AI",
    title: "OpenDict – Từ điển Đa ngôn ngữ AI",
    description:
      "Hệ thống từ điển Việt – Lào – Anh tích hợp Google Gemini API. .",
    stack: ["Next.js 15", "TypeScript", "Node.js", "MongoDB", "Gemini AI"],
    demoUrl: "https://opendict.utb.edu.vn",
    githubUrl: "https://github.com/dinhducvinh/opendict",
  },
  {
    id: "medibooking",
    category: "web",
    emoji: "🏥",
    gradient: "linear-gradient(135deg,#06474720,#0891B230)",
    tag: "🌐 Web App · Healthcare",
    title: "MediBooking – Đặt lịch khám bệnh",
    description:
      "Hệ thống đặt lịch khám bệnh trực tuyến với giao diện riêng cho bệnh nhân, bác sĩ và admin. Tích hợp chat realtime, thông báo SMS, thanh toán và hồ sơ y tế điện tử.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MySQL", "Socket.io"],
    demoUrl: "#",
    githubUrl: "https://github.com/dinhducvinh/medibooking",
  },
  {
    id: "shop_badminton",
    category: "web",
    emoji: "🏸",
    gradient: "linear-gradient(135deg,#78350F20,#F59E0B30)",
    tag: "🌐 Web App · E-commerce",
    title: "Shop Badminton – Cửa hàng bán lẻ dụng cụ cầu lông",
    description:
      "Website bán vợt cầu lông có tích hợp chatbot AI hỗ trợ tư vấn chợn vợt phù hợp. Tích hợp thanh toán VNPay, Momo và quản lý đơn hàng.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB"],
    demoUrl: "#",
    githubUrl: "https://github.com/dinhducvinh/shop-badminton",
  },

  {
    id: "portfolio",
    category: "web",
    emoji: "🎨",
    gradient: "linear-gradient(135deg,#4C1D9520,#7C3AED30)",
    tag: "🌐 Portfolio · Personal",
    title: "Portfolio Website – Trang này",
    description:
      "Website portfolio cá nhân xây dựng với Next.js 15, TypeScript, Tailwind CSS v4 và Framer Motion. Dark mode, animations mượt, responsive hoàn toàn và tối ưu SEO.",
    stack: ["Next.js 15", "TypeScript", "Tailwind v4", "Framer Motion"],
    demoUrl: "#",
    githubUrl: "https://github.com/dinhducvinh",
  },
];

export interface BlogPost {
  slug: string;
  emoji: string;
  gradient: string;
  tags: string[];
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "oracle-dwh-python",
    emoji: "🗄️",
    gradient: "linear-gradient(135deg,#1E3A5F15,#2E75B625)",
    tags: ["Oracle", "Python"],
    title: "Tối ưu truy vấn Oracle DWH với Python — TRUNC vs DAY_KEY",
    excerpt:
      "Phân tích chi tiết sự khác biệt giữa TRUNC(date) và so sánh DAY_KEY dạng số trong Oracle DWH, và cách tối ưu performance khi kết nối từ Python.",
    date: "10/06/2025",
    readTime: "8 phút đọc",
  },
  {
    slug: "django-oracle-portal",
    emoji: "🏗️",
    gradient: "linear-gradient(135deg,#6D28D915,#7C3AED25)",
    tags: ["Django", "Oracle"],
    title: "Xây dựng cổng báo cáo nội bộ với Django + Oracle trong 4 tuần",
    excerpt:
      "Kinh nghiệm thực tế khi xây dựng portal Django thay thế email phân phối báo cáo tại MobiFone Sơn La — từ thiết kế đến triển khai.",
    date: "20/05/2025",
    readTime: "12 phút đọc",
  },
  {
    slug: "react-native-guide",
    emoji: "📱",
    gradient: "linear-gradient(135deg,#06474715,#0891B230)",
    tags: ["React Native", "Tutorial"],
    title: "React Native từ A–Z: Hướng dẫn bắt đầu cho developer Việt Nam",
    excerpt:
      "Hướng dẫn toàn diện để bắt đầu với React Native — setup môi trường, cấu trúc project, navigation và deploy lên store.",
    date: "05/04/2025",
    readTime: "15 phút đọc",
  },
];
