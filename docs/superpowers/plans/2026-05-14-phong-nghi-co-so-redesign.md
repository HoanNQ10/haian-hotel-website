# Phòng Nghỉ & Cơ Sở Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix Bảo Lộc PropertyCard CTAs to link to /lien-he, then replace phong-nghi.astro's contained card list with 4 full-width hero sections using real room data, detail grids, amenity icons, and room number badges.

**Architecture:** Task 1 is a 2-prop change in index.astro. Task 2 replaces the entire `<!-- Room List -->` section in phong-nghi.astro — the `rooms` array becomes `roomTypes` with full room data, and the old `bg-background` contained section becomes 4 full-width `bg-surface` hero sections rendered via `.map()`, following the same layout pattern as tien-ich.astro.

**Tech Stack:** Astro 4, Tailwind CSS 3

---

## File Map

- **Modify:** `src/pages/index.astro` — update 2 PropertyCard props (Task 1)
- **Modify:** `src/pages/phong-nghi.astro` — replace rooms data + room list section (Task 2)

---

### Task 1: Fix Bảo Lộc PropertyCard CTAs in index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Edit the two Bảo Lộc PropertyCard props**

In `src/pages/index.astro`, the Properties section (around line 83–96) has three `<PropertyCard>` components. Change only the second and third cards:

```astro
<PropertyCard
  featured={true}
  name="Hải An Hotel Bảo Lộc"
  description="Khách sạn gia đình tại Bảo Lộc — không gian yên tĩnh, sạch sẽ, giá cả phải chăng."
  ctaText="Liên Hệ"
  ctaHref="/lien-he"
/>
<PropertyCard
  featured={true}
  name="Hải An Homestay Bảo Lộc"
  description="Homestay ấm cúng tại Bảo Lộc — trải nghiệm gần gũi, không gian xanh mát."
  ctaText="Liên Hệ"
  ctaHref="/lien-he"
/>
```

The first card ("Hải An Villa Đà Lạt") stays unchanged with `ctaText="Xem Phòng"` `ctaHref="/phong-nghi"`.

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "fix: change Bao Loc PropertyCards CTA to Lien He"
```

---

### Task 2: Rewrite phong-nghi.astro with hero layout and real room data

**Files:**
- Modify: `src/pages/phong-nghi.astro`

- [ ] **Step 1: Replace the entire file content**

Replace `src/pages/phong-nghi.astro` with:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const roomTypes = [
  {
    name: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floors: "Tầng 1, Tầng hầm 2",
    rooms: ["202", "204", "B201", "B202"],
    hasBalcony: true,
    gradient: "bg-gradient-to-br from-accent/20 to-accent-soft"
  },
  {
    name: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn đầy đủ tiện nghi, yên tĩnh — lý tưởng cho gia đình nhỏ hoặc hai người bạn đồng hành muốn lưu trú tiết kiệm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floors: "Tầng trệt, Tầng hầm 1",
    rooms: ["101", "102", "B101"],
    hasBalcony: false,
    gradient: "bg-gradient-to-br from-border to-accent-soft"
  },
  {
    name: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floors: "Tầng 1, Tầng 2",
    rooms: ["201", "203", "301", "302", "303", "304"],
    hasBalcony: true,
    gradient: "bg-gradient-to-br from-accent-soft to-border"
  },
  {
    name: "Phòng Đơn Không Ban Công",
    description: "Phòng đơn ấm cúng, sạch sẽ với đầy đủ tiện nghi cơ bản — lý tưởng cho lưu trú ngắn ngày với mức giá tiết kiệm.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floors: "Tầng hầm 1",
    rooms: ["B102"],
    hasBalcony: false,
    gradient: "bg-gradient-to-br from-primary/10 to-primary/20"
  }
];
---

<Layout title="Phòng Nghỉ — Hải An Villa Hotel" description="Tất cả 14 phòng nghỉ tại Hải An Villa Đà Lạt — phòng đơn, phòng đôi, có hoặc không có ban công.">
  <Header />

  <!-- Page Hero -->
  <section class="bg-surface border-b border-border" aria-label="Giới thiệu trang">
    <div class="max-w-container mx-auto px-4 md:px-8 py-10">
      <a href="/" class="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors duration-200 mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Trang Chủ
      </a>
      <h1 class="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">Phòng Nghỉ</h1>
      <div class="w-12 h-0.5 bg-accent mb-4"></div>
      <p class="text-text-muted max-w-xl">Tất cả 14 phòng thuộc Hải An Villa Đà Lạt — sạch sẽ, ấm cúng, đầy đủ tiện nghi.</p>
    </div>
  </section>

  <!-- Room Sections -->
  {roomTypes.map((room, index) => (
    <section
      class={`bg-surface${index < roomTypes.length - 1 ? ' border-b border-border' : ''}`}
      aria-label={`Phòng ${room.name}`}
    >
      <div class={`flex flex-col min-h-[520px]${index % 2 !== 0 ? ' md:flex-row-reverse' : ' md:flex-row'}`}>
        <!-- Text column -->
        <div class="flex-1 flex items-center px-4 md:px-16 lg:px-24 py-16">
          <div class="max-w-md w-full">
            <h2 class="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">{room.name}</h2>
            <div class="w-10 h-0.5 bg-accent mb-6"></div>
            <p class="text-text-muted leading-relaxed mb-6">{room.description}</p>

            <!-- Detail grid -->
            <dl class="grid grid-cols-1 gap-2 mb-6">
              <div class="flex items-center gap-3 text-sm">
                <dt class="text-text-muted w-28 flex-shrink-0">Loại giường</dt>
                <dd class="text-primary font-medium">{room.bedType}</dd>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <dt class="text-text-muted w-28 flex-shrink-0">Sức chứa</dt>
                <dd class="text-primary font-medium">{room.capacity}</dd>
              </div>
              <div class="flex items-center gap-3 text-sm">
                <dt class="text-text-muted w-28 flex-shrink-0">Vị trí</dt>
                <dd class="text-primary font-medium">{room.floors}</dd>
              </div>
            </dl>

            <!-- Amenity list: 2 columns with SVG icons -->
            <ul class="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
                </svg>
                WiFi miễn phí
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>
                </svg>
                Điều hòa
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Nước nóng
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                TV
              </li>
              <li class="flex items-center gap-2 text-sm text-text-muted">
                <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 10V6a1 1 0 011-1h16a1 1 0 011 1v4M3 10l2 10h14l2-10"/>
                </svg>
                WC riêng
              </li>
              {room.hasBalcony && (
                <li class="flex items-center gap-2 text-sm text-text-muted">
                  <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M3 12V8h18v4M3 12v4h18v-4M7 12v4M12 12v4M17 12v4"/>
                  </svg>
                  Ban công
                </li>
              )}
            </ul>

            <!-- Room number badges -->
            <div class="flex flex-wrap gap-2 mb-8">
              {room.rooms.map((num) => (
                <span class="text-xs bg-accent-soft text-primary px-3 py-1 font-medium">Phòng {num}</span>
              ))}
            </div>

            <!-- CTA -->
            <a
              href="/lien-he"
              class="inline-flex items-center justify-center border border-primary text-primary bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-200"
            >
              Liên Hệ Đặt Phòng
            </a>
          </div>
        </div>
        <!-- Image column: fills 100% height, flush to edge -->
        <div class="relative flex-1 min-h-[280px] md:min-h-0">
          <div class={`absolute inset-0 ${room.gradient}`} aria-hidden="true"></div>
        </div>
      </div>
    </section>
  ))}

  <Footer />
</Layout>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build completes with no errors, `dist/phong-nghi/index.html` generated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/phong-nghi.astro
git commit -m "feat: redesign phong-nghi with hero layout, real room data, detail grid, amenity icons"
```
