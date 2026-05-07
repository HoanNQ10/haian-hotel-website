# Modern UI Refresh — Design Spec
**Date:** 2026-05-07
**Project:** Hải An Villa Hotel Website
**Style Direction:** Clean & Warm — boutique hotel, minimal animation, logo-aligned palette

---

## 1. Goals

- Modernize the visual design to match the actual brand identity (logo)
- Create a consistent design system across all components and sections
- Improve readability and visual hierarchy without changing page structure
- Keep it fast and accessible — no heavy animation or JS dependencies

## 2. Design Tokens

### Colors

All tokens updated in `tailwind.config.mjs`. Derived from the official Hải An Hotel logo.

| Token | Value | Usage |
|---|---|---|
| `primary` | `#4D4D5E` | Text, header, footer background |
| `primary-dark` | `#3A3A4A` | Hover states on primary |
| `accent` | `#C4A882` | CTA buttons, badges, highlights |
| `accent-dark` | `#A88B67` | Hover state on accent |
| `accent-soft` | `#F0EAE0` | Light backgrounds, tag pills |
| `background` | `#EDE8DF` | Page background (warm linen) |
| `bg-warm` | `#EDE8DF` | Same as background |
| `surface` | `#FFFFFF` | Card backgrounds |
| `surface-warm` | `#F7F3EC` | Alternating section backgrounds |
| `text-main` | `#2E2E38` | Body text |
| `text-muted` | `#72727E` | Secondary text, descriptions |
| `border` | `#DDD8CE` | Borders, dividers |
| `slate` | `#8A8A9A` | Secondary accent (logo wave 2), badges |

### Typography

Fonts unchanged (Playfair Display + Inter). Usage rules:

- **Section headings:** Playfair Display, `letter-spacing: 0.02em`
- **Labels/badges:** Inter uppercase, `letter-spacing: 0.1em`, `font-semibold`
- **Body text:** Inter, `line-height: 1.8`
- **Decorative underline:** `w-12 h-0.5 bg-accent mx-auto mt-3` below every section heading

### Section Background Rhythm

Alternating backgrounds to create visual separation without hard borders:

| Section | Background |
|---|---|
| Hero (below carousel) | `#EDE8DF` |
| Properties | `#FFFFFF` |
| Introduction | `#F7F3EC` |
| Rooms | `#F7F3EC` |
| Amenities | `#FFFFFF` |
| Gallery | `#EDE8DF` |
| Contact | `#4D4D5E` (keep existing) |
| Footer | `#4D4D5E` |

---

## 3. Components

### Button

Three variants, all `rounded-lg`, with subtle `hover:-translate-y-0.5 hover:shadow-md` lift:

- **Primary:** bg `#4D4D5E`, white text, shadow-sm
- **Secondary:** transparent, border `#4D4D5E`, hover bg `#F0EAE0`
- **Accent:** bg `#C4A882`, white text — used for main CTAs ("Liên hệ đặt phòng")

No emoji in button text. Use small SVG icons instead.

### RoomCard

- Image: `aspect-[4/3]` instead of fixed `h-56`
- Room type badge: overlay top-left on image, bg `rgba(77,77,94,0.8)` with backdrop-blur
- Price: Playfair Display, larger, color `#4D4D5E`
- Amenity tags: pill shape, bg `#F0EAE0`, border `#DDD8CE`
- CTA: Accent button variant

### AmenityItem

- Layout: flex row (icon left, text right) instead of column
- Icon container: `48x48` rounded-xl, bg `#F0EAE0`
- Title: Inter semibold, `#4D4D5E`
- Description: Inter regular small, `#72727E`

### PropertyCard

- Replace emoji 🏨 placeholder with gradient `from-[#F0EAE0] to-[#DDD8CE]`
- "Sắp Cập Nhật" badge: dashed border, color `#8A8A9A`
- CTA: Secondary button variant (de-emphasized vs. main property)

### Header

- Logo: "HAIAN" in Playfair Display, `letter-spacing: 0.15em`, uppercase
- Tagline "HOTEL" below in Inter light, `#8A8A9A`, `letter-spacing: 0.2em`
- Nav hover color: `#C4A882` (accent)
- Bottom border: `1px solid #DDD8CE` (no shadow)

---

## 4. Section-Level Layout

### Global

- Section padding: `py-16 md:py-24` (consistent across all sections)
- Section heading always has decorative underline below
- Max-width: `1120px`, horizontal padding `px-4 md:px-8`

### Hero (below carousel)

- Background: `#EDE8DF`
- H1: `text-4xl md:text-6xl`, Playfair Display
- Subtitle: italic, `#72727E`
- 3 CTA buttons in a row with SVG icons

### Properties Section

- Heading: left-aligned (editorial feel)
- Short subtitle below heading

### Rooms Section

- Short intro text above the grid
- Grid: 2 columns (unchanged)

### Amenities Section

- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` (compact)
- Icon + title only — drop verbose descriptions if needed

### Gallery Section

- Grid: 2 col mobile, 3 col desktop
- First image: `col-span-2` for visual weight (simple masonry)
- Hover: light overlay with expand icon

### Contact Section

- Keep slate dark background `#4D4D5E`
- 3 contact cards: use `border border-white/20` instead of `bg-white/10`
- Check-in/out info has a divider line above it

### Footer

- Add "HAIAN HOTEL" logo text at top
- Copyright text: `#8A8A9A`

---

## 5. Out of Scope

- No changes to page structure or section order
- No new JavaScript libraries
- No backend, booking system, or CMS
- Real images are a separate task (placeholder images remain for now)
- Language switcher (VI/EN) remains non-functional

---

## 6. Files to Change

| File | Change |
|---|---|
| `tailwind.config.mjs` | Update all color tokens, add `slate` and `accent-dark` |
| `src/components/Button.astro` | New variants, SVG icons, hover lift |
| `src/components/RoomCard.astro` | Aspect ratio, overlay badge, accent CTA |
| `src/components/AmenityItem.astro` | Flex row layout, icon container |
| `src/components/PropertyCard.astro` | Gradient placeholder, dashed badge, secondary CTA |
| `src/components/Header.astro` | Logo style, nav hover color, border |
| `src/components/Section.astro` | Consistent padding |
| `src/pages/index.astro` | Section backgrounds, heading decorative underlines, layout tweaks |
