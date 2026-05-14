# Trang Tiện ích — Spa Layout Redesign Spec

**Goal:** Redesign all 3 service cards on `/tien-ich` to use a full-width "hero-style" layout (text left, image right, flush to viewport edge), matching the KL Spa reference layout. Change Spa CTA button to "XEM MENU" linking to a future PDF.

**Architecture:** Remove the current contained `space-y-12` card list. Replace with 3 individual full-width sections, each a 2-column flex row (50% text / 50% image). Image column fills 100% height with `absolute inset-0`, no rounded corners, flush to viewport edge. Cards alternate image position (right → left → right). Spa gets a distinct CTA; Thuê Xe and Đưa Đón keep "Liên Hệ →".

**Tech Stack:** Astro 4, Tailwind CSS 3

---

## File to Modify

- **Modify:** `src/pages/tien-ich.astro` — restructure "Service List" section and update service data

---

## Data Model Changes

Add `ctaLabel` and `ctaHref` fields to the `services` array:

```astro
const services = [
  {
    name: "Spa",
    description: "Thư giãn và phục hồi năng lượng với các liệu pháp spa chuyên nghiệp ngay tại khách sạn.",
    gradient: "bg-gradient-to-br from-accent-soft to-border",
    ctaLabel: "Xem Menu",
    ctaHref: "#"
  },
  {
    name: "Thuê Xe",
    description: "Thuê xe máy và ô tô linh hoạt theo ngày — khám phá Đà Lạt và Bảo Lộc theo cách của bạn.",
    gradient: "bg-gradient-to-br from-primary/10 to-primary/20",
    ctaLabel: "Liên Hệ →",
    ctaHref: "/lien-he"
  },
  {
    name: "Đưa Đón",
    description: "Dịch vụ đưa đón sân bay và các điểm du lịch — đặt lịch trước, đúng giờ, an toàn.",
    gradient: "bg-gradient-to-br from-accent/20 to-accent-soft",
    ctaLabel: "Liên Hệ →",
    ctaHref: "/lien-he"
  }
];
```

Note: `ctaHref: "#"` for Spa is a placeholder until the PDF file is uploaded. When the PDF is ready, update to `href="/files/menu-spa.pdf"` (or whichever path it is stored at).

---

## Layout Structure

Replace the current `<section class="bg-background" aria-label="Danh sách dịch vụ">` block with 3 individual full-width sections rendered via `.map()`:

```astro
{services.map((service, index) => (
  <section
    class={`bg-surface border-b border-border${index === services.length - 1 ? ' border-b-0' : ''}`}
    aria-label={`Dịch vụ ${service.name}`}
  >
    <div class={`flex flex-col min-h-[480px]${index % 2 !== 0 ? ' md:flex-row-reverse' : ' md:flex-row'}`}>
      <!-- Text column -->
      <div class="flex-1 flex items-center px-8 md:px-16 lg:px-24 py-16">
        <div class="max-w-md">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">{service.name}</h2>
          <div class="w-10 h-0.5 bg-accent mb-6"></div>
          <p class="text-text-muted leading-relaxed mb-8">{service.description}</p>
          <a
            href={service.ctaHref}
            class="inline-flex items-center justify-center border border-primary text-primary bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-accent-soft transition-all duration-200"
          >
            {service.ctaLabel}
          </a>
        </div>
      </div>
      <!-- Image column: flush to edge, no padding, fills height -->
      <div class="relative flex-1 min-h-[280px] md:min-h-0">
        <div class={`absolute inset-0 ${service.gradient}`} aria-hidden="true"></div>
      </div>
    </div>
  </section>
))}
```

---

## CTA Button Style

The new button style matches the reference image — outlined, uppercase, with letter spacing — rather than the current filled accent style:

```
border border-primary text-primary bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-accent-soft transition-all duration-200
```

This applies to all 3 service buttons (both "Xem Menu" and "Liên Hệ →").

---

## Layout Details

| Property | Value |
|---|---|
| Section background | `bg-surface` |
| Section separator | `border-b border-border` (removed on last card) |
| Row min-height | `min-h-[480px]` (Tailwind JIT) |
| Text column padding | `px-8 md:px-16 lg:px-24 py-16` |
| Inner text max-width | `max-w-md` |
| h2 size | `text-3xl md:text-4xl` |
| Accent divider | `w-10 h-0.5 bg-accent mb-6` |
| Image column | `relative flex-1`, image div `absolute inset-0` |
| Mobile image height | `min-h-[280px]` (stacks below text on mobile) |
| Alternating | `md:flex-row` (index even) / `md:flex-row-reverse` (index odd) |

---

## What Is Removed

- The outer `<section class="bg-background" aria-label="Danh sách dịch vụ">` container
- `space-y-12` spacing container
- `<hr class="border-border">` separators between cards
- `aspect-video rounded-xl` on image placeholder
- `max-w-container mx-auto px-4 md:px-8 py-14` constraint around cards

---

## Out of Scope

- Real photos (gradient placeholders remain until photos are provided)
- PDF file for Spa menu (link stays `href="#"` until file is uploaded)
- Changes to any other page (`phong-nghi.astro`, `lien-he.astro`, etc.)
