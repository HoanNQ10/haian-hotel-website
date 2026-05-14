# Trang Tiện Ích Design Spec

**Goal:** Rename "Tiện Nghi" to "Tiện Ích" site-wide and create a dedicated `/tien-ich` page listing 3 hotel services (Spa, Thuê Xe, Đưa Đón).

**Architecture:** New Astro page at `src/pages/tien-ich.astro` using the shared Layout/Header/Footer. Layout mirrors `phong-nghi.astro`: full-width alternating cards (image/placeholder left on odd, right on even). Header and Footer "Tiện Nghi" links renamed and redirected to `/tien-ich`.

**Tech Stack:** Astro 4, Tailwind CSS 3

---

## Rename: "Tiện Nghi" → "Tiện Ích"

Three locations to update:

### `src/components/Header.astro`
- Desktop nav (line 44): text "Tiện Nghi" → "Tiện Ích", `href="/#co-so"` → `href="/tien-ich"`
- Mobile nav (line 99): same text + href change

### `src/components/Footer.astro`
- "Khám Phá" column (line ~58): text "Tiện Nghi" → "Tiện Ích", `href="/#co-so"` → `href="/tien-ich"`

---

## Page Structure: `/tien-ich`

**File:** `src/pages/tien-ich.astro`

### Page Hero
- Breadcrumb: `← Trang Chủ` linking to `/`
- `<h1>` "Tiện Ích"
- Accent divider (`w-12 h-0.5 bg-accent`)
- Subtitle: "Các dịch vụ và tiện ích tại Hải An Villa Hotel."

### Service Cards (3 cards, stacked vertically, separated by `<hr>`)

Layout: alternating 2-column grid on desktop (`md:grid-cols-2`), stacks to 1 column on mobile. Odd-indexed cards (index 1, i.e. Thuê Xe) have image on the right using `[&>*:first-child]:md:order-last`.

Each card contains:
- **Left/Right column — placeholder image:** `w-full aspect-video rounded-xl` with gradient background (same pattern as `phong-nghi.astro`)
- **Content column:**
  - Service name as `<h2>`
  - Short description as `<p>`
  - CTA button: "Liên Hệ →" linking to `/lien-he`, styled `bg-accent text-white` (same as phong-nghi CTA)

### 3 Services

| # | Name | Description | Gradient |
|---|------|-------------|----------|
| 1 | Spa | Thư giãn và phục hồi năng lượng với các liệu pháp spa chuyên nghiệp ngay tại khách sạn. | `bg-gradient-to-br from-accent-soft to-border` |
| 2 | Thuê Xe | Thuê xe máy và ô tô linh hoạt theo ngày — khám phá Đà Lạt và Bảo Lộc theo cách của bạn. | `bg-gradient-to-br from-primary/10 to-primary/20` |
| 3 | Đưa Đón | Dịch vụ đưa đón sân bay và các điểm du lịch — đặt lịch trước, đúng giờ, an toàn. | `bg-gradient-to-br from-accent/20 to-accent-soft` |

---

## Files to Create/Modify

- **Create:** `src/pages/tien-ich.astro`
- **Modify:** `src/components/Header.astro` — 2 updates (desktop + mobile nav)
- **Modify:** `src/components/Footer.astro` — 1 update ("Khám Phá" column)

---

## Out of Scope

- Real photos for services (gradient placeholders only)
- Pricing information
- Online booking for services
- Service availability calendar
