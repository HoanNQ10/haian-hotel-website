# Phòng Nghỉ & Cơ Sở Redesign Spec

**Goal:** (A) Fix 2 Bảo Lộc PropertyCards in index.astro to link to Liên Hệ instead of Phòng Nghỉ. (B) Redesign phong-nghi.astro with real room data, hero-style full-width layout, detail grid, amenity icons, and room number badges.

**Architecture:** Feature A is a 2-line prop change. Feature B replaces the current contained card-list in phong-nghi.astro with 4 full-width hero sections (same pattern as tien-ich.astro), each containing a detail grid + 2-col amenity list with inline SVG icons + room number badges.

**Tech Stack:** Astro 4, Tailwind CSS 3

---

## Files to Modify

- **Modify:** `src/pages/index.astro` — update 2 PropertyCard props (Feature A)
- **Modify:** `src/pages/phong-nghi.astro` — replace rooms data + room list section (Feature B)

---

## Feature A — index.astro

### Changes

In `src/pages/index.astro`, change the two Bảo Lộc `<PropertyCard>` props:

```astro
<!-- Before -->
<PropertyCard
  featured={true}
  name="Hải An Hotel Bảo Lộc"
  description="Khách sạn gia đình tại Bảo Lộc — không gian yên tĩnh, sạch sẽ, giá cả phải chăng."
  ctaText="Xem Phòng"
  ctaHref="/phong-nghi"
/>
<PropertyCard
  featured={true}
  name="Hải An Homestay Bảo Lộc"
  description="Homestay ấm cúng tại Bảo Lộc — trải nghiệm gần gũi, không gian xanh mát."
  ctaText="Xem Phòng"
  ctaHref="/phong-nghi"
/>

<!-- After -->
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

The Đà Lạt card remains unchanged (`ctaText="Xem Phòng"` `ctaHref="/phong-nghi"`).

---

## Feature B — phong-nghi.astro

### Room Data

Replace the existing `rooms` array with `roomTypes`. All 14 rooms belong to **Hải An Villa Đà Lạt**.

| Type | Rooms | Beds | Capacity | Floors | Balcony |
|---|---|---|---|---|---|
| Đôi Có Ban Công | 202, 204, B201, B202 | 2 giường đơn | 3–4 người | Tầng 1, Tầng hầm 2 | ✓ |
| Đôi Không Ban Công | 101, 102, B101 | 2 giường đơn | 3–4 người | Tầng trệt, Tầng hầm 1 | ✗ |
| Đơn Có Ban Công | 201, 203, 301, 302, 303, 304 | 1 giường đơn | 1–2 người | Tầng 1, Tầng 2 | ✓ |
| Đơn Không Ban Công | B102 | 1 giường đơn | 1–2 người | Tầng hầm 1 | ✗ |

```astro
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
```

### Amenities

All rooms share 5 base amenities. Rooms with `hasBalcony: true` get a 6th.

```
Base (all rooms): WiFi miễn phí, Điều hòa, Nước nóng, TV, WC riêng
Balcony rooms only: Ban công
```

### Layout Structure

Replace the entire `<!-- Room List -->` section with 4 full-width hero sections rendered via `.map()`. The Page Hero section at the top stays unchanged.

Pattern is identical to `tien-ich.astro` with added detail grid, amenity list, and room number badges inside the text column.

```astro
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

          <!-- Amenity list: 2 columns, SVG icon + label -->
          <ul class="grid grid-cols-2 gap-x-4 gap-y-2 mb-8">
            <!-- WiFi -->
            <li class="flex items-center gap-2 text-sm text-text-muted">
              <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
              </svg>
              WiFi miễn phí
            </li>
            <!-- Điều hòa -->
            <li class="flex items-center gap-2 text-sm text-text-muted">
              <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>
              </svg>
              Điều hòa
            </li>
            <!-- Nước nóng -->
            <li class="flex items-center gap-2 text-sm text-text-muted">
              <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Nước nóng
            </li>
            <!-- TV -->
            <li class="flex items-center gap-2 text-sm text-text-muted">
              <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              TV
            </li>
            <!-- WC riêng -->
            <li class="flex items-center gap-2 text-sm text-text-muted">
              <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 10V6a1 1 0 011-1h16a1 1 0 011 1v4M3 10l2 10h14l2-10"/>
              </svg>
              WC riêng
            </li>
            <!-- Ban công (conditional) -->
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
      <!-- Image column -->
      <div class="relative flex-1 min-h-[280px] md:min-h-0">
        <div class={`absolute inset-0 ${room.gradient}`} aria-hidden="true"></div>
      </div>
    </div>
  </section>
))}
```

### Page Hero

Keep the existing Page Hero section unchanged (breadcrumb + h1 + divider + subtitle).

Update the subtitle text to:
```
Tất cả 14 phòng thuộc Hải An Villa Đà Lạt — sạch sẽ, ấm cúng, đầy đủ tiện nghi.
```

### What Is Removed

- The `rooms` array (4 generic types)
- The `<section class="bg-background" aria-label="Danh sách phòng">` container
- `space-y-12` spacing container
- `<hr class="border-border">` separators
- `aspect-video rounded-xl` on image placeholder
- `max-w-container mx-auto px-4 md:px-8 py-14` constraint around room cards
- `[&>*:first-child]:md:order-last` grid hack (replaced by `md:flex-row-reverse`)
- Old tags/chips (replaced by room number badges with same `bg-accent-soft text-primary` style, no `rounded-full`)

### Layout Details

| Property | Value |
|---|---|
| Section background | `bg-surface` |
| Section separator | `border-b border-border` (removed on last section) |
| Row min-height | `min-h-[520px]` (taller than tien-ich to fit detail grid) |
| Text column padding | `px-4 md:px-16 lg:px-24 py-16` |
| Inner max-width | `max-w-md w-full` |
| h2 size | `text-3xl md:text-4xl` |
| Accent divider | `w-10 h-0.5 bg-accent mb-6` |
| Detail grid | `<dl>` with `flex items-center gap-3 text-sm`, key `w-28 flex-shrink-0 text-text-muted`, value `text-primary font-medium` |
| Amenity list | `grid grid-cols-2 gap-x-4 gap-y-2`, icon `w-4 h-4 text-accent`, label `text-sm text-text-muted` |
| Room badges | `bg-accent-soft text-primary px-3 py-1 text-xs font-medium` (no rounded-full) |
| CTA | `border border-primary text-primary bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-white` |
| Image column | `relative flex-1 min-h-[280px] md:min-h-0`, inner div `absolute inset-0 {gradient} aria-hidden="true"` |
| Alternating | even index → `md:flex-row`, odd index → `md:flex-row-reverse` |

---

## Out of Scope

- Real room photos (gradient placeholders remain)
- Bảo Lộc room data (all 14 rooms are Đà Lạt only)
- Pricing information
- Booking system or availability calendar
- Changes to any other page besides index.astro and phong-nghi.astro
