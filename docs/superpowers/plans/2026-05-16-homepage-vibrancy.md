# Homepage Vibrancy Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the homepage feel more vibrant by adding scroll-triggered animations, a Hero CTA button, gold eyebrow labels on section headings, and a dark contact section before the Footer.

**Architecture:** Four independent changes applied to three files. Scroll animations use vanilla IntersectionObserver — no libraries added. The dark contact section is a new `<section>` block inserted directly in `index.astro`. All font/color tokens already exist in `tailwind.config.mjs` and `globals.css`.

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS (IntersectionObserver)

---

## File Map

| File | What changes |
|------|-------------|
| `src/styles/globals.css` | Add `.fade-item` + `.fade-item.visible` + `prefers-reduced-motion` override |
| `src/components/HeroCarousel.astro` | Add "Khám Phá ↓" CTA button below "HOTEL" text |
| `src/pages/index.astro` | Add gold eyebrow labels, `fade-item` classes, dark contact section, IntersectionObserver script |

---

## Task 1: Add scroll-animation CSS to globals.css

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Open `src/styles/globals.css` and append these rules after the existing `.animate-slide-up` block (around line 107)**

```css
/* Scroll-triggered fade-up (IntersectionObserver) */
.fade-item {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  transition-delay: inherit;
}

.fade-item.visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .fade-item {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2: Verify the dev server compiles without errors**

Run (if not already running):
```bash
npm run dev
```
Expected: No CSS errors in terminal output. Open `http://localhost:4321/` — page looks unchanged (no elements have `fade-item` class yet).

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add fade-item scroll animation CSS"
```

---

## Task 2: Add Hero CTA button to HeroCarousel.astro

**Files:**
- Modify: `src/components/HeroCarousel.astro` (lines 35–41, the center text block)

The current center div in `HeroCarousel.astro` is:
```html
<!-- Center text -->
<div class="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
  <h1 class="text-white text-center font-heading font-bold tracking-[0.25em] leading-tight drop-shadow-lg" style="font-size: clamp(32px, 5vw, 72px);">
    HẢI AN
  </h1>
  <p class="text-white text-center font-heading tracking-[0.5em] drop-shadow-lg" style="font-size: clamp(12px, 1.5vw, 24px); margin-top: 0.2em;">
    HOTEL
  </p>
</div>
```

- [ ] **Step 1: Replace the center text div with this version that adds the CTA button**

The `pointer-events-none` must move to the h1/p only so the button is clickable:

```html
<!-- Center text -->
<div class="absolute inset-0 flex flex-col items-center justify-center z-20">
  <h1 class="text-white text-center font-heading font-bold tracking-[0.25em] leading-tight drop-shadow-lg pointer-events-none" style="font-size: clamp(32px, 5vw, 72px);">
    HẢI AN
  </h1>
  <p class="text-white text-center font-heading tracking-[0.5em] drop-shadow-lg pointer-events-none" style="font-size: clamp(12px, 1.5vw, 24px); margin-top: 0.2em;">
    HOTEL
  </p>
  <a
    href="#co-so"
    class="mt-8 inline-flex items-center gap-2 border border-white/60 text-white text-xs font-semibold tracking-[0.2em] uppercase px-8 py-3 hover:bg-white/15 transition-all duration-300"
  >
    Khám Phá
    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
    </svg>
  </a>
</div>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:4321/`. The Hero should show "HẢI AN / HOTEL" with a new outline "Khám Phá ↓" button centered below. Clicking the button should smooth-scroll the page down to the Cơ Sở section (`#co-so`).

- [ ] **Step 3: Commit**

```bash
git add src/components/HeroCarousel.astro
git commit -m "feat: add Kham Pha CTA button to Hero"
```

---

## Task 3: Add gold eyebrow labels and fade-item classes to index.astro sections

**Files:**
- Modify: `src/pages/index.astro`

This task adds two things to three sections (Cơ Sở, Khám Phá, Gallery):
1. A gold eyebrow label (`<p class="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-3">Hải An</p>`) above the `<h2>`
2. The `fade-item` class (with stagger delay for PropertyCards) on targeted elements

**Note:** Do NOT add `fade-item` to the Giới Thiệu section — it appears immediately after Hero and may already be partially visible on load.

- [ ] **Step 1: Update the Cơ Sở section heading block**

Find this block in `index.astro` (around line 73–78):
```html
      <div class="mb-12 text-center">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Cơ Sở Lưu Trú
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3 mx-auto"></div>
        <p class="text-text-muted text-sm mt-3">Hệ thống lưu trú của Hải An tại Đà Lạt và Bảo Lộc</p>
      </div>
```

Replace with:
```html
      <div class="mb-12 text-center fade-item">
        <p class="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-3">Hải An</p>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Cơ Sở Lưu Trú
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3 mx-auto"></div>
        <p class="text-text-muted text-sm mt-3">Hệ thống lưu trú của Hải An tại Đà Lạt và Bảo Lộc</p>
      </div>
```

- [ ] **Step 2: Wrap each PropertyCard with a fade-item div (staggered)**

Find the grid block (around line 81–104):
```html
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PropertyCard
          name="Hải An Villa Đà Lạt"
          ...
        />
        <PropertyCard
          name="Hải An Hotel Bảo Lộc"
          ...
        />
        <PropertyCard
          name="Hải An Homestay Bảo Lộc"
          ...
        />
      </div>
```

Replace with:
```html
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="fade-item" style="transition-delay: 0ms;">
          <PropertyCard
            name="Hải An Villa Đà Lạt"
            description="Khách sạn gia đình tại trung tâm Đà Lạt — phòng sạch sẽ, đội ngũ thân thiện, giá hợp lý."
            ctaText="Xem Phòng"
            ctaHref="/phong-nghi"
            image="/images/co-so/coso-1.jpg"
          />
        </div>
        <div class="fade-item" style="transition-delay: 120ms;">
          <PropertyCard
            name="Hải An Hotel Bảo Lộc"
            description="Khách sạn gia đình tại Bảo Lộc — không gian yên tĩnh, sạch sẽ, giá cả phải chăng."
            ctaText="Liên Hệ"
            ctaHref="/lien-he"
            image="/images/co-so/coso-2.jpg"
          />
        </div>
        <div class="fade-item" style="transition-delay: 240ms;">
          <PropertyCard
            name="Hải An Homestay Bảo Lộc"
            description="Homestay ấm cúng tại Bảo Lộc — trải nghiệm gần gũi, không gian xanh mát."
            ctaText="Liên Hệ"
            ctaHref="/lien-he"
            image="/images/co-so/coso-3.jpg"
          />
        </div>
      </div>
```

- [ ] **Step 3: Update the Khám Phá section heading block**

Find (around line 111–118):
```html
      <!-- Section label -->
      <div class="mb-12 text-center">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Khám Phá Thêm Tại Hải An
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3 mx-auto"></div>
        <p class="text-text-muted text-sm mt-3">Dịch vụ, ẩm thực và cẩm nang du lịch dành cho bạn</p>
      </div>
```

Replace with:
```html
      <!-- Section label -->
      <div class="mb-12 text-center fade-item">
        <p class="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-3">Hải An</p>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Khám Phá Thêm Tại Hải An
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3 mx-auto"></div>
        <p class="text-text-muted text-sm mt-3">Dịch vụ, ẩm thực và cẩm nang du lịch dành cho bạn</p>
      </div>
```

- [ ] **Step 4: Add fade-item to each editorial row**

Find each of the three editorial row divs and add `fade-item` class:

Row 1 — find `<div class="flex flex-col lg:flex-row gap-5 mb-5">`, change to:
```html
<div class="flex flex-col lg:flex-row gap-5 mb-5 fade-item">
```

Row 2 — find `<div class="flex flex-col lg:flex-row gap-5">` (the one right after Row 1's closing tag), change to:
```html
<div class="flex flex-col lg:flex-row gap-5 fade-item">
```

Row 3 — find `<div class="flex flex-col lg:flex-row gap-5 mt-5">`, change to:
```html
<div class="flex flex-col lg:flex-row gap-5 mt-5 fade-item">
```

- [ ] **Step 5: Update the Gallery section heading block**

Find (around line 230–236):
```html
      <!-- Heading -->
      <div class="mb-10">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Khoảnh Khắc Tại Hải An
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3"></div>
        <p class="text-text-muted text-sm mt-3">Những kỷ niệm đáng nhớ của khách hàng</p>
      </div>
```

Replace with:
```html
      <!-- Heading -->
      <div class="mb-10 fade-item">
        <p class="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-3">Hải An</p>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Khoảnh Khắc Tại Hải An
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3"></div>
        <p class="text-text-muted text-sm mt-3">Những kỷ niệm đáng nhớ của khách hàng</p>
      </div>
```

- [ ] **Step 6: Verify in browser**

Open `http://localhost:4321/`. Scroll past the Hero — section heading areas (Cơ Sở, Khám Phá, Gallery) will appear as blank gaps because `fade-item` sets `opacity: 0`. This is expected — Task 5 wires IntersectionObserver to reveal them on scroll.

To verify the layout is correct before Task 5, temporarily add `opacity: 1 !important;` to `.fade-item` in `globals.css`, check everything looks right, then remove it before proceeding.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add gold eyebrow labels and fade-item classes to sections"
```

---

## Task 4: Add dark contact section to index.astro

**Files:**
- Modify: `src/pages/index.astro` (insert before `<Footer />`)

- [ ] **Step 1: Find the `<Footer />` line in index.astro and insert the dark contact section immediately before it**

Insert this block between the closing `</section>` of the Gallery section and `<Footer />`:

```html
  <!-- Dark Contact Section -->
  <section id="lien-he" class="bg-primary py-20 md:py-28">
    <div class="fade-item mx-auto w-full text-center" style="max-width:1440px; padding-left: clamp(12px, 2vw, 32px); padding-right: clamp(12px, 2vw, 32px);">
      <p class="text-xs tracking-[0.22em] uppercase text-accent font-medium mb-4">Liên Hệ</p>
      <h2 class="font-heading font-bold text-white text-3xl md:text-4xl mb-4">Sẵn Sàng Đồng Hành</h2>
      <div class="w-12 h-px bg-accent mx-auto mb-6"></div>
      <p class="text-white/60 text-sm leading-relaxed max-w-md mx-auto mb-10">
        Đội ngũ Hải An luôn sẵn sàng hỗ trợ đặt phòng, tư vấn lịch trình và mọi yêu cầu đặc biệt của bạn.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a
          href="#"
          class="inline-flex items-center gap-2 bg-accent text-white text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:bg-accent-dark transition-colors duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          Gọi Ngay
        </a>
        <a
          href="#"
          class="inline-flex items-center gap-2 border border-white/30 text-white text-xs font-semibold tracking-[0.15em] uppercase px-8 py-4 hover:border-white/60 transition-colors duration-300"
        >
          Nhắn Zalo
        </a>
      </div>
    </div>
  </section>
```

**Note:** Both `href="#"` are placeholders — replace with real phone (`tel:+84...`) and Zalo (`https://zalo.me/...`) when contact info is available.

- [ ] **Step 2: Verify in browser**

Scroll to the bottom of `http://localhost:4321/`. You should see a dark (`bg-primary` = `#4D4D5E`) section with white heading "Sẵn Sàng Đồng Hành", a gold divider, body text, and two buttons (gold "Gọi Ngay" + outline "Nhắn Zalo"). Footer appears immediately after.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add dark contact section before footer"
```

---

## Task 5: Wire IntersectionObserver script in index.astro

**Files:**
- Modify: `src/pages/index.astro` (add to the existing `<script>` block)

The file already has a `<script>` block for the gallery carousel (around line 295). Add the IntersectionObserver to the same script block.

- [ ] **Step 1: Find the existing `<script>` block in index.astro**

It looks like:
```html
  <script>
    (function () {
      const track = document.getElementById('gallery-track') as HTMLElement | null;
      ...
    })();
  </script>
```

- [ ] **Step 2: Add the IntersectionObserver IIFE immediately after the gallery IIFE, inside the same `<script>` tag**

```typescript
    (function () {
      const items = document.querySelectorAll<HTMLElement>('.fade-item');
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

The full `<script>` block should now contain two IIFEs: the gallery one and the observer one.

- [ ] **Step 3: Verify scroll animations in browser**

Open `http://localhost:4321/` and scroll slowly through the page:

1. **Cơ Sở section**: The heading ("Hải An" label + "Cơ Sở Lưu Trú") should fade+slide up as it enters the viewport. Then the three property cards should appear one by one with a staggered delay (0ms / 120ms / 240ms).
2. **Khám Phá section**: Heading animates in, then each editorial row animates as it enters.
3. **Gallery section**: Heading animates in.
4. **Dark Contact section**: The inner content block fades in.

- [ ] **Step 4: Check prefers-reduced-motion**

In Chrome DevTools → Rendering panel → set "Emulate CSS media feature prefers-reduced-motion" to "reduce". Reload the page and scroll. All elements should be immediately visible — no fade animation. Reset the emulation when done.

- [ ] **Step 5: Check mobile layout at 375px**

In DevTools, set viewport to iPhone SE (375×667). Scroll through the page — no layout shifts, all sections readable, dark contact section buttons wrap correctly on small screens.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire IntersectionObserver for scroll animations"
```

---

## Done — Full verification

- [ ] Scroll through the full page on desktop and confirm all 4 features work: Hero CTA, gold labels, fade animations, dark contact section
- [ ] Click "Khám Phá" button in Hero — should smooth-scroll to Cơ Sở
- [ ] No console errors in browser DevTools
