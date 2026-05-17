# Trang Dịch Vụ — Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `src/pages/tien-ich.astro` to use an editorial contained split-section layout matching the style of phong-nghi, with a hero, alternating image/content columns inside `max-w-container`, gradient image panels with icons, quick-fact rows, and a Spa-specific PDF menu button.

**Architecture:** Single Astro page rewrite — no new components, no JS needed. Tailwind utility classes only.

**Tech Stack:** Astro 4, Tailwind CSS 3

---

## File Map

- **Modify:** `src/pages/tien-ich.astro` — full rewrite

---

### Task 1: Rewrite tien-ich.astro with editorial layout

**Files:**
- Modify: `src/pages/tien-ich.astro`

- [ ] **Step 1: Verify current build passes**

Run:
```powershell
npm run build
```
Expected: build completes with no errors. If it fails, stop and fix before continuing.

- [ ] **Step 2: Rewrite src/pages/tien-ich.astro**

Replace the entire file with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const services = [
  {
    name: "Spa",
    description: "Thư giãn và phục hồi năng lượng với các liệu pháp spa chuyên nghiệp ngay tại khách sạn. Đội ngũ kỹ thuật viên được đào tạo bài bản, sử dụng nguyên liệu thiên nhiên cao cấp mang lại trải nghiệm thư giãn toàn diện cho cơ thể và tâm hồn.",
    facts: [
      { label: "Giờ mở cửa", value: "8:00 – 22:00" },
      { label: "Đặt trước", value: "Khuyến nghị" },
    ],
    gradient: "bg-gradient-to-br from-accent/60 to-accent-dark/80",
    menuHref: "/files/spa-menu.pdf",
    ctaHref: "/lien-he",
  },
  {
    name: "Thuê Xe",
    description: "Thuê xe máy và ô tô linh hoạt theo ngày — khám phá Đà Lạt và Bảo Lộc theo cách của bạn. Xe được bảo dưỡng định kỳ, sạch sẽ và an toàn. Giao xe tận nơi theo yêu cầu.",
    facts: [
      { label: "Loại xe", value: "Xe máy & Ô tô" },
      { label: "Thuê theo", value: "Ngày / Tuần" },
    ],
    gradient: "bg-gradient-to-br from-primary/70 to-primary-dark",
    menuHref: null,
    ctaHref: "/lien-he",
  },
  {
    name: "Đưa Đón",
    description: "Dịch vụ đưa đón sân bay và các điểm du lịch — đặt lịch trước, đúng giờ, an toàn. Phục vụ tuyến Đà Lạt – Bảo Lộc và các tuyến theo yêu cầu với tài xế kinh nghiệm, am hiểu địa phương.",
    facts: [
      { label: "Tuyến", value: "Đà Lạt – Bảo Lộc" },
      { label: "Đặt trước", value: "1 ngày" },
    ],
    gradient: "bg-gradient-to-br from-primary/50 to-accent/40",
    menuHref: null,
    ctaHref: "/lien-he",
  },
];

const icons = [
  // Spa — sparkles
  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>`,
  // Thuê Xe — car
  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 16H6l-2-5h14l-2 5zM5 11l1.5-4h7L15 11"/>`,
  // Đưa Đón — location pin
  `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>`,
];
---

<Layout title="Dịch Vụ — Hải An Villa Hotel" description="Spa, thuê xe máy và ô tô, dịch vụ đưa đón tại Hải An Villa Hotel Đà Lạt.">
  <Header />

  <!-- Hero -->
  <section class="relative overflow-hidden min-h-[340px] md:min-h-[420px] flex items-center justify-center" aria-label="Dịch vụ">
    <div class="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-accent/40" aria-hidden="true"></div>
    <div class="absolute inset-0 bg-primary/40" aria-hidden="true"></div>
    <div class="relative text-center px-4 md:px-8">
      <p class="text-white/70 text-sm uppercase tracking-widest mb-3">Hải An Villa Đà Lạt</p>
      <h1 class="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Dịch Vụ</h1>
      <div class="w-12 h-0.5 bg-accent mx-auto mb-4"></div>
      <p class="text-white/70 text-base md:text-lg max-w-xl mx-auto">Tiện ích và dịch vụ bổ sung cho kỳ nghỉ hoàn hảo của bạn</p>
    </div>
  </section>

  <!-- Services -->
  <section class="bg-[#EFEFED]" aria-label="Danh sách dịch vụ">
    <div class="max-w-container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div class="divide-y divide-border">
        {services.map((service, index) => (
          <div class={`grid md:grid-cols-2 overflow-hidden${index === 0 ? ' rounded-t-xl' : ''}${index === services.length - 1 ? ' rounded-b-xl' : ''}`} aria-label={service.name}>

            <!-- Image panel -->
            <div
              class={`relative flex items-center justify-center min-h-[280px] md:min-h-[420px] ${service.gradient}${index % 2 !== 0 ? ' md:order-2' : ''}`}
              aria-hidden="true"
            >
              <svg class="w-24 h-24 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" set:html={icons[index]} />
            </div>

            <!-- Content panel -->
            <div class={`flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white${index % 2 !== 0 ? ' md:order-1' : ''}`}>
              <div class="w-full">

                <h2 class="font-heading font-bold text-2xl lg:text-3xl text-primary mb-5">
                  {service.name}
                </h2>

                <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-7">
                  {service.facts.map(fact => (
                    <div>
                      <span class="text-text-muted">{fact.label}: </span>
                      <span class="text-accent font-medium">{fact.value}</span>
                    </div>
                  ))}
                </div>

                <p class="text-sm md:text-base text-text-muted leading-relaxed mb-7">
                  {service.description}
                </p>

                <div class="h-px bg-border mb-7"></div>

                <div class="flex flex-wrap gap-3">
                  {service.menuHref && (
                    <a
                      href={service.menuHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-primary hover:text-white transition-colors duration-300"
                    >
                      Xem Menu
                    </a>
                  )}
                  <a
                    href={service.ctaHref}
                    class="inline-flex bg-primary hover:bg-primary/85 text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 transition-colors duration-300"
                  >
                    Liên Hệ
                  </a>
                </div>

              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  </section>

  <Footer />
</Layout>
```

- [ ] **Step 3: Verify build still passes**

Run:
```powershell
npm run build
```
Expected: build completes with no errors.

- [ ] **Step 4: Check visually in dev server**

Run:
```powershell
npm run dev
```
Open `http://localhost:4321/tien-ich` and verify:
- Hero renders with gradient background, title "Dịch Vụ"
- 3 service rows visible within 1120px container
- Spa row: gradient gold panel left, white content right — 2 buttons (Xem Menu + Liên Hệ)
- Thuê Xe row: gradient dark panel right, white content left — 1 button
- Đưa Đón row: gradient muted panel left, white content right — 1 button
- Each content panel shows: name, 2 quick facts in accent color, description, divider, CTA(s)
- On mobile (< 768px): image stacks above content for all rows

- [ ] **Step 5: Commit**

```powershell
git add src/pages/tien-ich.astro
git commit -m "feat: redesign tien-ich with editorial contained split-section layout"
```
