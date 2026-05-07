# Homepage Redesign — Design Spec
**Date:** 2026-05-07
**Project:** Hải An Villa Hotel Website
**Scope:** Restructure and redesign the homepage layout

---

## 1. Goals

- Remove redundant sections and tighten the page to 6 focused sections
- Move CTAs into hero carousel overlay (eliminate standalone "Chào Mừng" section)
- Feature Haian Đà Lạt as primary property in a featured layout
- Simplify Tiện Nghi to a clean icon strip
- Merge Vị Trí + Liên Hệ into one section

## 2. Page Structure

**Before (9 sections):**
Hero → Chào Mừng → Cơ Sở → Về Hải An → Phòng Nghỉ → Tiện Nghi → Ăn Uống → Gallery → Vị Trí → Liên Hệ

**After (6 sections):**
Hero → Cơ Sở → Tiện Nghi → Gallery → Vị Trí & Liên Hệ → Footer

**Removed sections:** Chào Mừng, Về Hải An, Phòng Nghỉ, Ăn Uống, Liên Hệ (standalone)

---

## 3. Section Designs

### Section 1: Hero Carousel

**Layout:** Full-width carousel, `h-[500px] lg:h-[600px]`

**Overlay content (centered, z-10):**
- Hotel name: Playfair Display, `text-4xl md:text-6xl`, white, `drop-shadow-lg`
- Tagline: Inter italic, `text-lg md:text-xl`, `text-accent-soft`, below name
- 3 CTA buttons in a row below tagline:
  - "Gọi Ngay" — `variant="ghost"` (white border, white text, transparent bg) with phone SVG icon, `href="tel:TBD"`
  - "Zalo" — `variant="accent"` with Zalo icon, `href="https://zalo.me/TBD"`
  - "Xem Bản Đồ" — `variant="ghost"` with map pin SVG, `href="https://maps.google.com"`

**Note:** Add `ghost` variant to Button.astro: `border border-white text-white bg-transparent hover:bg-white/20`

**Carousel behavior:**
- Auto-play every 3 seconds, does NOT pause on hover
- Dots indicator overlay at bottom of image
- Prev/Next arrow buttons

**Background overlay on image:** `bg-gradient-to-t from-black/50 via-black/20 to-transparent`

---

### Section 2: Cơ Sở Lưu Trú

**Background:** `bg-surface`

**Heading:** Left-aligned, Playfair Display, with decorative underline `w-12 h-0.5 bg-accent mt-3` + subtitle text below

**Layout:**

*Desktop (md+):* CSS grid `grid-cols-3`
- Haian Đà Lạt: `col-span-2` — featured card, taller image (`h-72`), larger heading, active status badge
- Haian Bảo Lộc Hotel: `col-span-1 row-span-1` — compact card, `h-32` image
- Haian Bảo Lộc Homestay: `col-span-1 row-span-1` — compact card, `h-32` image

*Mobile:* Stack all 3 vertically, Đà Lạt card first

**Featured card (Đà Lạt):**
- Gradient placeholder (until real photo available)
- Badge: "Đang Hoạt Động" — small pill, `bg-accent text-white`
- Description: longer text
- CTA: "Xem Phòng" — accent button

**Compact cards (Bảo Lộc):**
- Gradient placeholder
- Badge: "Sắp Cập Nhật" — dashed border, `text-slate`
- Description: shorter text
- CTA: "Liên Hệ" — secondary button

---

### Section 3: Tiện Nghi

**Background:** `bg-surface-warm`

**Layout:** Single horizontal strip, `flex flex-wrap justify-center gap-8 md:gap-12`

**Each item:** `flex flex-col items-center gap-2` — icon (emoji, `text-3xl`) + label (`text-xs font-semibold uppercase tracking-wide text-primary`)

**Items (7):**
- 📶 Wi-Fi
- 🏍️ Đỗ Xe Máy
- 🚗 Đỗ Ô Tô
- 🚿 Nước Nóng
- 🛏️ Phòng Sạch
- 👨‍👩‍👧‍👦 Thân Thiện GĐ
- 💬 Zalo / Điện Thoại

**No description text** — icon + short label only

---

### Section 4: Thư Viện Ảnh

**Background:** `bg-background`

**Layout:** Masonry grid — unchanged from current implementation
- Grid `grid-cols-2 md:grid-cols-3 gap-4`
- First image: `col-span-2`
- Hover: scale image + dark overlay

---

### Section 5: Vị Trí & Liên Hệ

**Background:** `bg-primary` (dark slate)

**Heading:** "Vị Trí & Liên Hệ", white, centered, with `w-12 h-0.5 bg-accent mx-auto mt-3`

**Layout:** `grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12`

**Left column (contact info):**
- Phone: large, white, clickable `href="tel:TBD"`
- Zalo: with icon, `href="https://zalo.me/TBD"`
- Address: 📍 TBD
- Hours: `⏰ Check-in: 14:00 | Check-out: 12:00`
- Divider line `border-white/20`
- 2 CTA buttons: "Gọi Ngay" (primary white) + "Nhắn Zalo" (accent)

**Right column (map):**
- Google Map iframe embed (placeholder div until address confirmed)
- Rounded corners `rounded-xl overflow-hidden`
- Height `h-64 md:h-80`

---

## 4. Components Changed

| File | Change |
|---|---|
| `src/components/HeroCarousel.astro` | Add CTA buttons overlay, update gradient |
| `src/components/PropertyCard.astro` | Add `featured` prop for large/compact variants |
| `src/components/Button.astro` | Add `ghost` variant for use on dark backgrounds |
| `src/components/AmenityItem.astro` | Add `strip` variant (column layout, no description) |
| `src/pages/index.astro` | Remove 4 sections, restructure remaining 6 |

---

## 5. Out of Scope

- Phòng Nghỉ page (separate page, future task)
- Real Google Map embed (needs address)
- Real phone/Zalo numbers
- Real property photos (placeholder gradients remain)
- Language switcher functionality
