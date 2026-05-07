# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the homepage from 9 sections to 6 focused sections, move CTAs into the hero carousel overlay, feature Haian Đà Lạt as primary property, simplify amenities to an icon strip, and merge location + contact into one section.

**Architecture:** Update shared components first (Button, PropertyCard, AmenityItem, HeroCarousel) to support new variants/props, then restructure index.astro to use the new layout. Each task is independently buildable.

**Tech Stack:** Astro 4, Tailwind CSS 3. No new packages.

**Spec:** `docs/superpowers/specs/2026-05-07-homepage-redesign.md`

**Verification command (run after every task):** `npm run build`
Expected: Build completes with no errors.

---

### Task 1: Add `ghost` variant to Button

**Files:**
- Modify: `src/components/Button.astro`

- [ ] **Step 1: Read current file**

```bash
# Read src/components/Button.astro to confirm current variants object
```

- [ ] **Step 2: Add ghost variant**

Find the `variants` object:
```js
const variants = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md focus:ring-primary',
  secondary: 'border border-primary text-primary bg-transparent hover:bg-accent-soft focus:ring-primary',
  accent: 'bg-accent text-white shadow-sm hover:bg-accent-dark hover:shadow-md focus:ring-accent',
};
```

Replace with:
```js
const variants = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md focus:ring-primary',
  secondary: 'border border-primary text-primary bg-transparent hover:bg-accent-soft focus:ring-primary',
  accent: 'bg-accent text-white shadow-sm hover:bg-accent-dark hover:shadow-md focus:ring-accent',
  ghost: 'border border-white text-white bg-transparent hover:bg-white/20 focus:ring-white',
};
```

Also update the Props interface to include `ghost`:
```ts
interface Props {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.astro
git commit -m "feat: add ghost button variant for dark backgrounds"
```

---

### Task 2: Update HeroCarousel with CTA overlay

**Files:**
- Modify: `src/components/HeroCarousel.astro`

- [ ] **Step 1: Read current file**

Read `src/components/HeroCarousel.astro` to understand current overlay structure.

- [ ] **Step 2: Move overlay outside slides loop and add CTA buttons**

The current overlay text is inside the slides loop with `{index === 0 && (...)}`. Move it outside so it stays fixed on top of all slides.

Replace the entire outer `<div class="relative w-full overflow-hidden">` block with:

```astro
<div class="relative w-full overflow-hidden">
  <!-- Carousel Container -->
  <div class="relative h-96 md:h-[500px] lg:h-[600px]">
    <!-- Slides Wrapper -->
    <div id="slides-wrapper" class="relative w-full h-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          class={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === 0 ? 'opacity-100' : 'opacity-0'
          }`}
          data-slide={index}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        </div>
      ))}
    </div>

    <!-- Overlay Content (fixed above all slides) -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
      <h2 class="text-4xl md:text-6xl font-heading font-bold mb-3 drop-shadow-lg">
        Hải An Villa Hotel
      </h2>
      <p class="text-lg md:text-xl italic text-accent-soft font-medium drop-shadow-md mb-8">
        Không gian lưu trú ấm cúng tại Đà Lạt
      </p>
      <div class="flex flex-col sm:flex-row gap-3">
        <a
          href="tel:TBD"
          class="inline-flex items-center justify-center gap-2 border border-white text-white bg-transparent hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 font-semibold rounded-lg px-6 py-3 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          Gọi Ngay
        </a>
        <a
          href="https://zalo.me/TBD"
          class="inline-flex items-center justify-center gap-2 bg-accent text-white shadow-sm hover:bg-accent-dark hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 font-semibold rounded-lg px-6 py-3 text-sm"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
          </svg>
          Zalo
        </a>
        <a
          href="https://maps.google.com"
          class="inline-flex items-center justify-center gap-2 border border-white text-white bg-transparent hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 font-semibold rounded-lg px-6 py-3 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          Xem Bản Đồ
        </a>
      </div>
    </div>

    <!-- Previous Button -->
    <button
      id="carousel-prev"
      class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 hover:border-white/40"
      aria-label="Previous slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <!-- Next Button -->
    <button
      id="carousel-next"
      class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/15 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 border border-white/20 hover:border-white/40"
      aria-label="Next slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- Dot Indicators (overlay inside image) -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
      {slides.map((_, index) => (
        <button
          data-dot={index}
          class={`h-1.5 rounded-full transition-all duration-300 ${
            index === 0
              ? 'bg-white w-8'
              : 'bg-white/50 w-4 hover:bg-white/80'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        ></button>
      ))}
    </div>
  </div>
</div>
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroCarousel.astro
git commit -m "feat: add CTA overlay to HeroCarousel"
```

---

### Task 3: Update PropertyCard with `featured` prop

**Files:**
- Modify: `src/components/PropertyCard.astro`

- [ ] **Step 1: Replace entire file content**

```astro
---
interface Props {
  name: string;
  description: string;
  status?: string;
  ctaText: string;
  ctaHref?: string;
  featured?: boolean;
}

const { name, description, status, ctaText, ctaHref = '#', featured = false } = Astro.props;
---

{featured ? (
  <!-- Featured card: large, 2/3 width context, tall image -->
  <div class="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group h-full flex flex-col">
    <div class="relative bg-gradient-to-br from-accent-soft to-border h-72 flex items-center justify-center overflow-hidden">
      <div class="w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <svg class="w-10 h-10 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      </div>
      <div class="absolute top-4 left-4">
        <span class="text-xs font-semibold text-white bg-accent px-3 py-1.5 rounded-full">
          Đang Hoạt Động
        </span>
      </div>
    </div>
    <div class="p-8 flex-1 flex flex-col">
      <h3 class="text-2xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-200">
        {name}
      </h3>
      <p class="text-text-muted leading-relaxed flex-1 mb-6">
        {description}
      </p>
      <a
        href={ctaHref}
        class="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        {ctaText}
        <span class="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </a>
    </div>
  </div>
) : (
  <!-- Compact card: smaller, stacked in sidebar -->
  <div class="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group h-full flex flex-col">
    <div class="relative bg-gradient-to-br from-accent-soft to-border h-32 flex items-center justify-center overflow-hidden">
      <div class="w-12 h-12 rounded-xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
        <svg class="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      </div>
      {status && (
        <div class="absolute top-2 left-2">
          <span class="text-xs font-semibold text-slate border border-dashed border-slate bg-white/80 px-2 py-1 rounded-full">
            {status}
          </span>
        </div>
      )}
    </div>
    <div class="p-5 flex-1 flex flex-col">
      <h3 class="text-lg font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-200">
        {name}
      </h3>
      <p class="text-sm text-text-muted leading-relaxed flex-1 mb-4">
        {description}
      </p>
      <a
        href={ctaHref}
        class="inline-flex items-center justify-center gap-2 border border-primary text-primary bg-transparent px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-soft transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        {ctaText}
        <span class="group-hover:translate-x-1 transition-transform duration-200">→</span>
      </a>
    </div>
  </div>
)}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PropertyCard.astro
git commit -m "feat: add featured prop to PropertyCard for large/compact variants"
```

---

### Task 4: Update AmenityItem with `strip` prop

**Files:**
- Modify: `src/components/AmenityItem.astro`

- [ ] **Step 1: Replace entire file content**

```astro
---
interface Props {
  icon?: string;
  title: string;
  description?: string;
  strip?: boolean;
}

const { icon, title, description, strip = false } = Astro.props;
---

{strip ? (
  <div class="flex flex-col items-center gap-2">
    {icon && <span class="text-3xl">{icon}</span>}
    <span class="text-xs font-semibold uppercase tracking-wide text-primary text-center">{title}</span>
  </div>
) : (
  <div class="flex items-start gap-4 group">
    {icon && (
      <div class="flex-shrink-0 w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center text-2xl">
        {icon}
      </div>
    )}
    <div>
      <h4 class="font-semibold text-primary text-sm uppercase tracking-wide mb-1">{title}</h4>
      {description && (
        <p class="text-sm text-text-muted leading-relaxed">{description}</p>
      )}
    </div>
  </div>
)}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AmenityItem.astro
git commit -m "feat: add strip prop to AmenityItem for horizontal icon strip layout"
```

---

### Task 5: Restructure index.astro

**Files:**
- Modify: `src/pages/index.astro`

This task removes 4 sections and restructures the remaining ones. Read the file first to confirm current content, then apply each edit.

- [ ] **Step 1: Read current index.astro**

Read `src/pages/index.astro` to confirm the current structure before editing.

- [ ] **Step 2: Remove unused import**

The `RoomCard` import is no longer needed. Find and remove:
```astro
import RoomCard from '../components/RoomCard.astro';
```

Also remove:
```astro
import { publicRoomTypes } from '../data/rooms';

const rooms = publicRoomTypes;
```

- [ ] **Step 3: Remove the Hero Section (standalone) — was "Chào Mừng"**

Find and delete the entire block:
```astro
  <!-- Hero Section -->
  <section class="bg-background">
    <Section maxWidth={true}>
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-heading font-bold text-primary mb-4">
          Chào Mừng Đến Hải An Hotel
        </h1>
        <p class="text-lg text-text-muted italic mb-10 max-w-2xl mx-auto leading-relaxed">
          Khách sạn gia đình nhỏ, sạch sẽ và ấm cúng với đội ngũ thân thiện
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="lg" href="tel:TBD">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            Gọi Ngay
          </Button>
          <Button variant="accent" size="lg" href="https://zalo.me/TBD">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
            Zalo
          </Button>
          <Button variant="secondary" size="lg" href="https://maps.google.com">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            Xem Bản Đồ
          </Button>
        </div>
      </div>
    </Section>
  </section>
```

- [ ] **Step 4: Update Cơ Sở section to featured layout**

Find the entire Properties section and replace:

```astro
  <!-- Properties Section -->
  <section id="co-so" class="bg-surface">
    <Section maxWidth={true}>
      <div class="mb-12">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Cơ Sở Lưu Trú
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3"></div>
        <p class="text-text-muted text-sm mt-3">Hệ thống lưu trú của Hải An tại Đà Lạt và Bảo Lộc</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-2">
          <PropertyCard
            featured={true}
            name="Haian Đà Lạt"
            description="Khách sạn gia đình tại trung tâm Đà Lạt — phòng sạch sẽ, đội ngũ thân thiện, giá hợp lý."
            ctaText="Xem Phòng"
            ctaHref="#phong-nghi"
          />
        </div>
        <div class="flex flex-col gap-6">
          <PropertyCard
            name="Haian Bảo Lộc Hotel"
            description="Khách sạn tại Bảo Lộc"
            status="Sắp Cập Nhật"
            ctaText="Liên Hệ"
            ctaHref="#lien-he"
          />
          <PropertyCard
            name="Haian Homestay Bảo Lộc"
            description="Homestay tại Bảo Lộc"
            status="Sắp Cập Nhật"
            ctaText="Liên Hệ"
            ctaHref="#lien-he"
          />
        </div>
      </div>
    </Section>
  </section>
```

- [ ] **Step 5: Remove Introduction section**

Find and delete the entire block:
```astro
  <!-- Introduction Section -->
  <section id="gioi-thieu" class="bg-surface-warm">
    <Section maxWidth={true}>
      <div class="text-center mb-8">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Về Hải An Hotel
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
      </div>
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-text-muted mb-4 leading-relaxed">
          Hải An Hotel là một khách sạn gia đình nhỏ với tôi yêu cầu cao về sạch sẽ và sự thân thiện.
          Chúng tôi cung cấp các phòng tiện nghi, dịch vụ chân thành và giá cả hợp lý.
        </p>
        <p class="text-text-muted leading-relaxed">
          Với đội ngũ nhân viên nhiệt tình, chúng tôi cam kết mang đến cho khách hàng những trải nghiệm tốt nhất
          trong suốt kỳ nghỉ của bạn.
        </p>
      </div>
    </Section>
  </section>
```

- [ ] **Step 6: Remove Phòng Nghỉ section**

Find and delete the entire block:
```astro
  <!-- Room Types Section -->
  <section id="phong-nghi" class="bg-surface-warm">
    <Section maxWidth={true}>
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Các Loại Phòng
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
        <p class="text-text-muted text-sm mt-3">Liên hệ trực tiếp để được tư vấn và đặt phòng</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {rooms.map(room => (
          <RoomCard
            title={room.title}
            name={room.name}
            capacity={room.capacity}
            priceDay={room.priceDay}
            priceHourly={room.priceHourly}
            amenities={room.amenities}
            image={room.image}
            description={room.nameEn}
          />
        ))}
      </div>
    </Section>
  </section>
```

- [ ] **Step 7: Update Tiện Nghi section to strip layout**

Find the amenities section and replace:

```astro
  <!-- Amenities Section -->
  <section id="tien-nghi" class="bg-surface-warm">
    <Section maxWidth={true}>
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Tiện Nghi & Dịch Vụ
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
      </div>
      <div class="flex flex-wrap justify-center gap-8 md:gap-12">
        {amenities.map(amenity => (
          <AmenityItem
            strip={true}
            icon={amenity.icon}
            title={amenity.title}
          />
        ))}
      </div>
    </Section>
  </section>
```

- [ ] **Step 8: Remove Ăn Uống section**

Find and delete the entire block:
```astro
  <!-- Ăn Uống Section -->
  <section id="an-uong" class="bg-surface-warm">
    <Section maxWidth={true}>
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Ăn Uống
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
      </div>
      <div class="max-w-3xl mx-auto text-center">
        <p class="text-text-muted mb-4 leading-relaxed">
          TBD - Thông tin về dịch vụ ăn uống
        </p>
      </div>
    </Section>
  </section>
```

- [ ] **Step 9: Remove standalone Location and Contact sections, add combined section**

Find and delete the Location section:
```astro
  <!-- Location Section -->
  <section id="vi-tri" class="bg-surface">
    <Section maxWidth={true}>
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Vị Trí
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold text-primary mb-4">Địa Chỉ</h3>
          <p class="text-text-muted mb-6">
            📍 TBD
          </p>
          <Button variant="accent" href="https://maps.google.com">
            🗺️ Mở Bản Đồ Google
          </Button>
        </div>
        <div class="bg-accent-soft rounded-lg h-64 flex items-center justify-center">
          <p class="text-text-muted">Google Map (TBD)</p>
        </div>
      </div>
    </Section>
  </section>
```

Also find and delete the standalone Contact section:
```astro
  <!-- Contact Section -->
  <section id="lien-he" class="bg-accent">
    <Section maxWidth={true}>
      <div class="text-center text-white">
        <h2 class="text-2xl md:text-3xl font-bold mb-6">
          Hãy Liên Hệ Với Chúng Tôi
        </h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Chúng tôi sẵn sàng trả lời mọi câu hỏi và giúp bạn đặt phòng
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="border border-white/20 rounded-xl p-6">
            <p class="text-3xl mb-2">📞</p>
            <p class="font-semibold mb-2">Gọi Điện</p>
            <p class="opacity-90 text-sm">TBD</p>
          </div>
          <div class="border border-white/20 rounded-xl p-6">
            <p class="text-3xl mb-2">💬</p>
            <p class="font-semibold mb-2">Zalo</p>
            <p class="opacity-90 text-sm">TBD</p>
          </div>
          <div class="border border-white/20 rounded-xl p-6">
            <p class="text-3xl mb-2">📧</p>
            <p class="font-semibold mb-2">Email</p>
            <p class="opacity-90 text-sm">TBD</p>
          </div>
        </div>

        <div class="border-t border-white/20 pt-6 space-y-2 text-sm">
          <p>⏰ Check-in: 14:00 | Check-out: 12:00</p>
          <p class="opacity-75">Liên hệ trực tiếp cho các yêu cầu đặc biệt</p>
        </div>
      </div>
    </Section>
  </section>
```

In place of both deleted sections, add the combined section (insert before `<Footer />`):

```astro
  <!-- Vị Trí & Liên Hệ -->
  <section id="lien-he" class="bg-primary text-white">
    <Section maxWidth={true}>
      <div class="text-center mb-10">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-white">
          Vị Trí & Liên Hệ
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <!-- Left: contact info -->
        <div>
          <div class="space-y-5 mb-8">
            <a href="tel:TBD" class="flex items-center gap-3 text-white hover:text-accent transition-colors duration-200 group">
              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <p class="text-xs text-white/50 uppercase tracking-wide">Điện thoại</p>
                <p class="font-semibold">TBD</p>
              </div>
            </a>
            <a href="https://zalo.me/TBD" class="flex items-center gap-3 text-white hover:text-accent transition-colors duration-200">
              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                </svg>
              </div>
              <div>
                <p class="text-xs text-white/50 uppercase tracking-wide">Zalo</p>
                <p class="font-semibold">TBD</p>
              </div>
            </a>
            <div class="flex items-center gap-3 text-white/80">
              <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-xs text-white/50 uppercase tracking-wide">Địa chỉ</p>
                <p class="font-semibold">TBD</p>
              </div>
            </div>
          </div>
          <div class="border-t border-white/20 pt-6 mb-8">
            <p class="text-white/60 text-sm">⏰ Check-in: 14:00 | Check-out: 12:00</p>
            <p class="text-white/50 text-sm mt-1">Liên hệ trực tiếp cho các yêu cầu đặc biệt</p>
          </div>
          <div class="flex gap-3">
            <a
              href="tel:TBD"
              class="inline-flex items-center justify-center gap-2 border border-white text-white bg-transparent hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 font-semibold rounded-lg px-5 py-2.5 text-sm"
            >
              Gọi Ngay
            </a>
            <a
              href="https://zalo.me/TBD"
              class="inline-flex items-center justify-center gap-2 bg-accent text-white shadow-sm hover:bg-accent-dark hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 font-semibold rounded-lg px-5 py-2.5 text-sm"
            >
              Nhắn Zalo
            </a>
          </div>
        </div>
        <!-- Right: map placeholder -->
        <div class="bg-white/10 rounded-xl h-64 md:h-auto min-h-[280px] flex items-center justify-center">
          <p class="text-white/40 text-sm">Google Map (cập nhật sau)</p>
        </div>
      </div>
    </Section>
  </section>
```

- [ ] **Step 10: Verify build**

```bash
npm run build
```
Expected: no errors. If RoomCard import error appears, confirm it was removed in Step 2.

- [ ] **Step 11: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: restructure homepage to 6 sections with featured property layout"
```

---

### Task 6: Update Header and Footer nav links

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`

Sections removed: `#phong-nghi`, `#an-uong`, `#gioi-thieu`. Section merged: `#vi-tri` → now part of `#lien-he`.

- [ ] **Step 1: Update Header desktop nav**

Find the desktop nav block in `src/components/Header.astro`. Remove the "Phòng Nghỉ" and "Ăn Uống" links, update "Vị Trí" to point to "#lien-he":

Replace the entire `<nav class="hidden md:flex ...">` block with:
```html
<nav class="hidden md:flex gap-8 flex-1 justify-center">
  <a href="#co-so" class="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 relative group">
    Cơ Sở
    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#tien-nghi" class="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 relative group">
    Tiện Nghi
    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#hinh-anh" class="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 relative group">
    Thư Viện
    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
  </a>
  <a href="#lien-he" class="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 relative group">
    Liên Hệ
    <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
  </a>
</nav>
```

- [ ] **Step 2: Update Header mobile nav**

Find the mobile nav block `<nav id="mobile-menu" ...>` and replace its inner links with:
```html
<div class="max-w-container mx-auto px-4 py-4 space-y-2">
  <a href="#co-so" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Cơ Sở</a>
  <a href="#tien-nghi" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Tiện Nghi</a>
  <a href="#hinh-anh" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Thư Viện</a>
  <a href="#lien-he" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Liên Hệ</a>
</div>
```

- [ ] **Step 3: Update Footer quick links**

Find the Quick Links section in `src/components/Footer.astro` and replace:
```html
<ul class="text-sm space-y-2 text-white/70">
  <li><a href="#co-so" class="hover:text-accent">Cơ Sở</a></li>
  <li><a href="#tien-nghi" class="hover:text-accent">Tiện Nghi</a></li>
  <li><a href="#hinh-anh" class="hover:text-accent">Thư Viện Ảnh</a></li>
  <li><a href="#lien-he" class="hover:text-accent">Liên Hệ</a></li>
</ul>
```

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro src/components/Footer.astro
git commit -m "feat: update nav links to match new 6-section homepage structure"
```

---

## Done Checklist

After all tasks, run `npm run dev` and verify:

- [ ] Hero carousel has hotel name + tagline + 3 buttons overlaid on images
- [ ] "Chào Mừng" standalone section gone
- [ ] Cơ Sở: Đà Lạt card is large (2/3 width desktop), 2 Bảo Lộc cards stacked on right
- [ ] Tiện Nghi: single row of icons (no description text)
- [ ] Gallery: masonry grid unchanged
- [ ] "Vị Trí & Liên Hệ": combined section on dark background with contact info left + map placeholder right
- [ ] No standalone Location section, no standalone Contact section
- [ ] Phòng Nghỉ section gone
- [ ] Ăn Uống section gone
- [ ] Giới Thiệu section gone
