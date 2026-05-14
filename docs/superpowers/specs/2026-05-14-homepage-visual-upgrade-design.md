# Homepage Visual Upgrade Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Improve the visual polish and premium feel of the homepage without changing any text content.

**Architecture:** Visual-only changes — Tailwind class adjustments, layout restructuring, section additions/removals. No new libraries, no text changes, no backend.

**Tech Stack:** Astro 4, Tailwind CSS 3, existing design tokens (tailwind.config.mjs)

---

## Constraints (STRICT)

- Do NOT change any Vietnamese text content
- Do NOT add new marketing copy
- Do NOT move text between sections
- Do NOT add new libraries
- Do NOT add booking, backend, or CMS

---

## Target Homepage Structure

```
Header
Hero carousel
Giới thiệu
Cơ sở lưu trú
Blog
Vị trí   ← new separate section (id="vi-tri")
Footer
```

**Removed from homepage:**
- Phòng Nghỉ section (id="phong-nghi") + its scroll script
- Thư Viện Ảnh section (id="hinh-anh") + its scroll/drag script

---

## Section Designs

### Hero
- Height: `min-h-[80vh]` on desktop (was `lg:h-[600px]` ≈ 600px fixed)
- Add warm dark gradient overlay: `bg-gradient-to-t from-black/50 via-black/20 to-transparent`
- No text overlay added
- Arrows, dots, autoplay unchanged

### Giới Thiệu
- Body text: `text-lg` (up from `text-base`)
- Add large decorative `"` character (aria-hidden, Playfair Display, gold/accent color, background element)
- More generous section padding
- Max-width stays at `max-w-3xl`

### Cơ Sở Lưu Trú
- Layout change: first property card spans full width in a horizontal layout (image left, text right) as a featured hero card
- Two remaining properties sit in a 2-column grid below
- First card: larger visual area, richer gradient, premium proportions
- PropertyCard.astro updated: featured variant becomes horizontal (image 40%, content 60%)
- All text unchanged

### Blog
- Image area: `h-48` → `h-56`
- Article title: `text-lg` → `text-xl`
- Text unchanged

### Vị Trí (new section)
- `id="vi-tri"`, `bg-background`
- Section heading "Vị Trí" (reuses existing nav label — not new text)
- Gold accent divider bar
- Styled map placeholder: rounded-2xl, bg-accent-soft, h-80 on desktop — ready for Google Maps iframe
- No additional text

### Footer
- Unchanged

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/HeroCarousel.astro` | Height + gradient overlay |
| `src/components/PropertyCard.astro` | Featured variant → horizontal layout |
| `src/pages/index.astro` | Remove Rooms + Gallery sections + scripts; improve Intro, Cơ Sở, Blog; add Vị trí section |
| `src/components/Header.astro` | Update "Vị Trí" nav href from `/#footer` to `/#vi-tri` |

---

## Nav Link Update

- Header desktop + mobile: "Vị Trí" link changes from `href="/#footer"` to `href="/#vi-tri"` — label unchanged
