# Homepage Vibrancy Upgrade — Design Spec

> **For agentic workers:** Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the homepage feel more vibrant and visually polished through scroll animations, a Hero CTA button, gold accent labels on section headings, and a dark contact section before the Footer.

**Approach:** A (Scroll Animations + Hero CTA) + B (Visual Uplift + Dark Contact Section). No new dependencies — Playfair Display and Inter are already loaded in `Layout.astro`.

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS (IntersectionObserver)

---

## Scope

### What changes
1. **Hero CTA button** — "Khám Phá ↓" centered below "HẢI AN / HOTEL", smooth-scrolls to `#co-so`
2. **Scroll animations** — all major sections/cards fade+slide up on enter via IntersectionObserver
3. **Gold accent labels** — small uppercase eyebrow text in accent color above each section `h2`
4. **Dark Contact section** — new section before `<Footer />` with dark background, short CTA copy, Gọi Ngay + Nhắn Zalo buttons

### What does NOT change
- Hero text ("HẢI AN / HOTEL") — no tagline added
- Existing section layouts (Giới Thiệu, Cơ Sở, Editorial, Gallery)
- Font loading (Playfair Display + Inter already in `Layout.astro`)
- Footer, Header, StickyContactBar

---

## Files to Modify

| File | Change |
|------|--------|
| `src/components/HeroCarousel.astro` | Add CTA button below hero text |
| `src/pages/index.astro` | Add gold labels to sections, add dark contact section, add scroll animation script |
| `src/styles/globals.css` | Add `.fade-item` and `.fade-item.visible` CSS classes |

---

## Detail: Hero CTA Button

Location: inside `HeroCarousel.astro`, in the `.absolute.inset-0.flex.flex-col` center div, below the `<p class="...HOTEL">` element.

```html
<a
  href="#co-so"
  class="mt-8 inline-flex items-center gap-2 border border-white/60 text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-3 hover:bg-white/15 transition-all duration-300"
>
  Khám Phá
  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
  </svg>
</a>
```

The `<a>` is a real anchor link — no JS needed. Smooth scroll is already handled by `html { scroll-behavior: smooth; }` in `globals.css` (line 6–8).

---

## Detail: Scroll Animations

### CSS (add to `globals.css`)

```css
.fade-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-item.visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .fade-item { opacity: 1; transform: none; transition: none; }
}
```

### Elements to animate (add `fade-item` class to)

| Element | Stagger delay |
|---------|--------------|
| `#gioi-thieu` section inner content div | none |
| Each `PropertyCard` wrapper div in `index.astro` (not in the component) | `--delay: 0ms`, `120ms`, `240ms` |
| Editorial rows (Row 1, Row 2, Row 3) | none (each row animates as one) |
| Gallery heading + track | none |
| Dark contact section inner div | none |

For stagger on PropertyCards, use inline style `style="transition-delay: var(--delay, 0ms)"` and set `--delay` via `style` on each card wrapper.

### IntersectionObserver script (add to `index.astro` `<script>` block)

```js
(function () {
  const items = document.querySelectorAll('.fade-item');
  if (!items.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  items.forEach((el) => observer.observe(el));
})();
```

---

## Detail: Gold Accent Labels

Above each section `h2`, add a small eyebrow label:

```html
<p class="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-3">Hải An</p>
<h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
  Cơ Sở Lưu Trú
</h2>
```

Apply to: **Cơ Sở Lưu Trú**, **Khám Phá Thêm Tại Hải An**, **Khoảnh Khắc Tại Hải An**.

The Giới Thiệu section already has its own layout — skip eyebrow label there.

---

## Detail: Dark Contact Section

Add immediately before `<Footer />` in `index.astro`.

```html
<section id="lien-he" class="bg-primary py-20 md:py-28">
  <div class="mx-auto w-full text-center" style="max-width:1440px; padding-left: clamp(12px, 2vw, 32px); padding-right: clamp(12px, 2vw, 32px);">
    <p class="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-4">Liên Hệ</p>
    <h2 class="font-heading font-bold text-white text-3xl md:text-4xl mb-4">Sẵn Sàng Đồng Hành</h2>
    <div class="w-12 h-px bg-accent mx-auto mb-6"></div>
    <p class="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-10">
      Đội ngũ Hải An luôn sẵn sàng hỗ trợ đặt phòng, tư vấn lịch trình và mọi yêu cầu đặc biệt của bạn.
    </p>
    <div class="flex flex-wrap gap-4 justify-center">
      <a href="tel:+84000000000"
        class="inline-flex items-center gap-2 bg-accent text-white text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-accent-dark transition-colors duration-300">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        Gọi Ngay
      </a>
      <a href="https://zalo.me/0000000000"
        class="inline-flex items-center gap-2 border border-white/30 text-white text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:border-white/60 transition-colors duration-300">
        Nhắn Zalo
      </a>
    </div>
  </div>
</section>
```

Phone number and Zalo link use placeholder values — replace with real contact info from `docs/content.md` when available.

---

## Acceptance Criteria

- [ ] Hero has "Khám Phá ↓" button that smooth-scrolls to `#co-so`
- [ ] All targeted sections fade+slide up when entering viewport
- [ ] PropertyCards stagger: card 1 → 0ms, card 2 → 120ms, card 3 → 240ms
- [ ] `prefers-reduced-motion` disables all animations
- [ ] Gold eyebrow labels appear above h2 in Cơ Sở, Khám Phá, Gallery sections
- [ ] Dark contact section renders correctly before Footer
- [ ] No layout shifts or FOUC on page load
- [ ] Mobile layout intact (test at 375px)
