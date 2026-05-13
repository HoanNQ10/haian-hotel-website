# Phòng Nghỉ Feature Design

**Goal:** Add a Rooms section to the homepage as a preview carousel, plus a dedicated `/phong-nghi` page listing all 4 room types in detail.

**Architecture:** Two-part feature — a homepage section with a horizontal draggable carousel (reusing the gallery's drag/snap pattern), and a new Astro page at `/phong-nghi` with a vertical list layout (image left, content right).

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS (drag-to-scroll)

---

## Part 1: Homepage Section (`#phong-nghi`)

**Location:** `src/pages/index.astro` — inserted after the `#co-so` section.

**Layout:** Horizontal draggable carousel, identical scroll/snap/drag mechanism as the existing `#hinh-anh` gallery section.

**Section header:** Title "Phòng Nghỉ", accent divider, subtitle "Các loại phòng tại Hải An Villa Hotel".

**Each room card (~320px wide):**
- Placeholder image area (height ~200px, gradient background like blog cards)
- Room name (`h3`, bold)
- Short description (2 lines, `line-clamp-2`)
- Amenity tags as pill badges (e.g. `Có ban công`, `Không ban công`, optional: `BBQ`, `View đẹp`, `Phòng áp mái`, `Bố cục đặc biệt`)
- CTA button "Xem Chi Tiết" → links to `/phong-nghi`

**4 room cards:**
1. Phòng Đơn Có Ban Công — tags: `Đơn`, `Có ban công`
2. Phòng Đơn Không Ban Công — tags: `Đơn`
3. Phòng Đôi Có Ban Công — tags: `Đôi`, `Có ban công`
4. Phòng Đôi Không Ban Công — tags: `Đôi`

**Navigation:** Prev/Next arrow buttons (same style as gallery). No auto-play.

---

## Part 2: Dedicated Page (`/phong-nghi`)

**File:** `src/pages/phong-nghi.astro` — new file.

**Reuses:** `Layout.astro`, `Header.astro`, `Footer.astro`.

**Page structure:**
1. Header (shared component)
2. Page hero: title "Phòng Nghỉ", short description, breadcrumb link back to homepage (`← Trang Chủ`)
3. Room list (4 items, separated by thin dividers)
4. Footer (shared component)

**Each room row (desktop):**
- Left ~45%: placeholder image (rounded corners, `aspect-video` or fixed height ~280px)
- Right ~55%: room name (`h2`), description (3–4 sentences), amenity tags (pill badges), CTA button "Liên Hệ Đặt Phòng" → `href="#footer"` (scrolls to footer contact info)

**Mobile:** Image stacks above content (1-column layout via Tailwind `md:grid-cols-2`).

**Alternating layout:** Even-indexed rooms have image left / content right. Odd-indexed rooms have image right / content left (on desktop only, via `md:order` classes).

**Room data (placeholder content):**

| # | Name | Description | Tags |
|---|------|-------------|------|
| 1 | Phòng Đơn Có Ban Công | Phòng đơn thoáng mát với ban công riêng, view thành phố. Không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. | `Đơn`, `Có ban công` |
| 2 | Phòng Đơn Không Ban Công | Phòng đơn ấm cúng, sạch sẽ, đầy đủ tiện nghi cơ bản. Lý tưởng cho lưu trú ngắn ngày với mức giá tiết kiệm. | `Đơn` |
| 3 | Phòng Đôi Có Ban Công | Phòng đôi rộng rãi với ban công mở ra không gian xanh. Thích hợp cho cặp đôi hoặc bạn bè đi cùng. | `Đôi`, `Có ban công` |
| 4 | Phòng Đôi Không Ban Công | Phòng đôi tiêu chuẩn, đầy đủ tiện nghi, yên tĩnh. Phù hợp cho gia đình nhỏ hoặc hai người bạn đồng hành. | `Đôi` |

---

## Files to Create/Modify

- **Create:** `src/pages/phong-nghi.astro`
- **Modify:** `src/pages/index.astro` — add `#phong-nghi` section after `#co-so`

## Out of Scope

- Real room photos (placeholder gradients used)
- Pricing information
- Online booking or availability
- Individual room detail pages
