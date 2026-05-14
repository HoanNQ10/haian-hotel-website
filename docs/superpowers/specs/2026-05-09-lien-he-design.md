# Trang Liên Hệ Design Spec

**Goal:** Create a dedicated `/lien-he` contact page showing contact information for all 3 properties, replacing the previous footer-scroll approach.

**Architecture:** New Astro page at `src/pages/lien-he.astro` using the shared Layout/Header/Footer. Each property is a full-width card with a 2-column layout (info left, map placeholder right). Header and footer "Liên Hệ" links updated to `/lien-he`. CTA buttons on `/phong-nghi` updated to link to `/lien-he`.

**Tech Stack:** Astro 4, Tailwind CSS 3

---

## Page Structure: `/lien-he`

**File:** `src/pages/lien-he.astro`

### Page Hero
- Breadcrumb: `← Trang Chủ` linking to `/`
- `<h1>` "Liên Hệ"
- Accent divider (`w-12 h-0.5 bg-accent`)
- Subtitle: "Thông tin liên hệ các cơ sở lưu trú Hải An"

### Property Cards (3 cards, stacked vertically, separated by `<hr>`)

Each card uses a 2-column grid on desktop (`md:grid-cols-[55%_45%]`), stacks to 1 column on mobile.

**Left column (~55%) — Contact info:**
- Property name as `<h2>`
- 3 info rows with SVG icons:
  - Address icon + address text (TBD)
  - Phone icon + phone number (TBD, `tel:` link)
  - Zalo icon + Zalo number (TBD)
- 3 CTA buttons in a row (wrap on mobile):
  - **Gọi Ngay** — `href="tel:TBD"`, style: outline/secondary
  - **Nhắn Zalo** — `href="https://zalo.me/TBD"`, style: accent/primary
  - **Xem Bản Đồ** — `href="https://maps.google.com/?q=TBD"` (opens in new tab), style: outline/secondary

**Right column (~45%) — Map placeholder:**
- Rounded box with gradient background
- Centered text: "Google Map — cập nhật sau"
- Height: `min-h-[220px]` on desktop

### 3 Properties

| # | Name | Address | Phone | Zalo | Maps |
|---|------|---------|-------|------|------|
| 1 | Hải An Villa Đà Lạt | TBD | TBD | TBD | TBD |
| 2 | Hải An Hotel Bảo Lộc | TBD | TBD | TBD | TBD |
| 3 | Hải An Homestay Bảo Lộc | TBD | TBD | TBD | TBD |

All TBD values are placeholders to be filled in when real contact info is available.

---

## Link Updates

### `src/components/Header.astro`
- Desktop nav "Liên Hệ": `/#footer` → `/lien-he`
- Mobile nav "Liên Hệ": `/#footer` → `/lien-he`

### `src/components/Footer.astro`
- "Về Chúng Tôi" column, "Liên Hệ" link: `/#footer` → `/lien-he`

### `src/pages/phong-nghi.astro`
- All 4 "Liên Hệ Đặt Phòng" CTA buttons: `href="#footer"` → `href="/lien-he"`

---

## Files to Create/Modify

- **Create:** `src/pages/lien-he.astro`
- **Modify:** `src/components/Header.astro` — 2 link updates (desktop + mobile)
- **Modify:** `src/components/Footer.astro` — 1 link update
- **Modify:** `src/pages/phong-nghi.astro` — 4 CTA button href updates

---

## Out of Scope

- Real Google Maps embed (placeholder only — real addresses TBD)
- Contact form
- Online booking
- Live chat
