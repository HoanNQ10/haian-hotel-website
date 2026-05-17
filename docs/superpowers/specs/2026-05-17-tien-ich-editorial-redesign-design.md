# Trang Dịch Vụ — Editorial Redesign

**Goal:** Redesign `/tien-ich` to match the editorial contained split-section layout of `/phong-nghi`, with alternating image/content columns inside a `max-w-container` (1120px).

**Architecture:** Single Astro page (`src/pages/tien-ich.astro`) — full rewrite. No new components. Vanilla JS not needed (no slideshow).

**Tech Stack:** Astro 4, Tailwind CSS 3

---

## Layout

### Page structure

- **Hero section:** Same as phong-nghi — gradient dark background, title "Dịch Vụ", subtitle
- **Services section:** `bg-[#EFEFED]`, `max-w-container mx-auto px-4 md:px-8`, `py-16 md:py-24`
- **3 service rows** stacked with `divide-y divide-border`

### Service row

Each row: `grid md:grid-cols-2 items-stretch`

- **Odd rows (0, 2):** image left, content right
- **Even rows (1):** image right (`md:order-2`), content left (`md:order-1`)

Mobile: image stacks on top, content below.

### Image panel

- Full height gradient with large centered SVG icon overlay
- `min-h-[280px] md:min-h-[420px]`
- Icon: `w-20 h-20 text-white/30` centered via `flex items-center justify-center`
- No padding, fills its column entirely

Gradient per service:
- **Spa:** `bg-gradient-to-br from-accent/60 to-accent-dark/80`
- **Thuê Xe:** `bg-gradient-to-br from-primary/70 to-primary-dark`
- **Đưa Đón:** `bg-gradient-to-br from-primary/50 to-accent/40`

### Content panel

Padding: `p-8 md:p-12 lg:p-16`, `flex flex-col justify-center`

Layout top to bottom:

1. **Service name (h2):** `font-heading font-bold text-2xl lg:text-3xl text-primary mb-5`

2. **Quick facts grid** (`grid grid-cols-2 gap-x-6 gap-y-2 text-sm mb-7`):
   - Each fact: `<span class="text-text-muted">Label: </span><span class="text-accent font-medium">Value</span>`

3. **Description:** `text-sm md:text-base text-text-muted leading-relaxed mb-7`

4. **Divider:** `h-px bg-border mb-7`

5. **CTA buttons** (`flex flex-wrap gap-3`):
   - All services: filled primary button "Liên Hệ" → `/lien-he`
   - Spa only: additional outline button "Xem Menu" → `/files/spa-menu.pdf` (opens `target="_blank"`)

Button styles:
- Filled: `inline-flex bg-primary hover:bg-primary/85 text-white text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 transition-colors duration-300`
- Outline: `inline-flex border border-primary text-primary text-xs font-semibold uppercase tracking-[0.15em] px-6 py-3 hover:bg-primary hover:text-white transition-colors duration-300`

---

## Data

```js
const services = [
  {
    name: "Spa",
    description: "...",
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
    description: "...",
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
    description: "...",
    facts: [
      { label: "Tuyến", value: "Đà Lạt – Bảo Lộc" },
      { label: "Đặt trước", value: "1 ngày" },
    ],
    gradient: "bg-gradient-to-br from-primary/50 to-accent/40",
    menuHref: null,
    ctaHref: "/lien-he",
  },
]
```

---

## Files changed

- **Modify:** `src/pages/tien-ich.astro` — full rewrite
- **No new files** — PDF placeholder path `/files/spa-menu.pdf` will be populated when file is ready
