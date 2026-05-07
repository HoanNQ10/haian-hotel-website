# Modern UI Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize the Hải An Hotel website UI to match the official logo palette (slate gray + sandy tan + warm linen) with consistent spacing, improved component design, and clean section layout.

**Architecture:** Update design tokens first (tailwind.config.mjs), then update each component in isolation, finally update index.astro for page-level section backgrounds and layout tweaks. Each task is independently buildable.

**Tech Stack:** Astro 4, Tailwind CSS 3, no additional packages required.

**Spec:** `docs/superpowers/specs/2026-05-07-modern-ui-refresh-design.md`

**Verification command (run after every task):** `npm run build`
Expected: Build completes with no errors. Warnings about unused CSS are OK.

---

### Task 1: Update Design Tokens

**Files:**
- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Replace the colors block in tailwind.config.mjs**

Replace the entire `colors` block inside `theme.extend` with:

```js
colors: {
  'primary': '#4D4D5E',
  'primary-dark': '#3A3A4A',
  'accent': '#C4A882',
  'accent-dark': '#A88B67',
  'accent-soft': '#F0EAE0',
  'background': '#EDE8DF',
  'bg-warm': '#EDE8DF',
  'surface': '#FFFFFF',
  'surface-warm': '#F7F3EC',
  'text-main': '#2E2E38',
  'text-primary': '#2E2E38',
  'text-muted': '#72727E',
  'border': '#DDD8CE',
  'border-warm': '#DDD8CE',
  'slate': '#8A8A9A',
  'wood': '#A67845',
},
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.mjs
git commit -m "feat: update design tokens to logo-aligned palette"
```

---

### Task 2: Update Button Component

**Files:**
- Modify: `src/components/Button.astro`

- [ ] **Step 1: Replace the entire file content**

```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const {
  variant = 'primary',
  size = 'md',
  href,
  type = 'button'
} = Astro.props;

const base = 'font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5 active:translate-y-0';

const variants = {
  primary: 'bg-primary text-white shadow-sm hover:bg-primary-dark hover:shadow-md focus:ring-primary',
  secondary: 'border border-primary text-primary bg-transparent hover:bg-accent-soft focus:ring-primary',
  accent: 'bg-accent text-white shadow-sm hover:bg-accent-dark hover:shadow-md focus:ring-accent',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm min-h-[44px]',
  lg: 'px-8 py-4 text-base min-h-[48px]',
};

const className = `${base} ${variants[variant]} ${sizes[size]}`;
---

{href ? (
  <a href={href} class={className}>
    <slot />
  </a>
) : (
  <button type={type} class={className}>
    <slot />
  </button>
)}
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Button.astro
git commit -m "feat: update Button with new palette and hover lift"
```

---

### Task 3: Update Header Component

**Files:**
- Modify: `src/components/Header.astro`

- [ ] **Step 1: Replace the logo block**

Find this block in `src/components/Header.astro`:
```html
<div class="flex items-center">
  <h1 class="text-2xl md:text-2xl font-heading font-bold text-primary hover:text-accent transition-colors duration-200">Haian</h1>
</div>
```

Replace with:
```html
<div class="flex flex-col items-start leading-none">
  <h1 class="font-heading font-bold text-primary tracking-[0.15em] uppercase text-xl md:text-2xl leading-none hover:text-accent transition-colors duration-200">Haian</h1>
  <span class="font-body font-light text-slate tracking-[0.2em] uppercase text-[10px] mt-0.5">Hotel</span>
</div>
```

- [ ] **Step 2: Replace the header border/shadow**

Find:
```html
<header class="bg-surface shadow-md sticky top-0 z-50 border-b border-border">
```

Replace with:
```html
<header class="bg-surface sticky top-0 z-50 border-b border-border">
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: update Header logo style and remove shadow"
```

---

### Task 4: Update AmenityItem Component

**Files:**
- Modify: `src/components/AmenityItem.astro`

- [ ] **Step 1: Replace the entire file content**

```astro
---
interface Props {
  icon?: string;
  title: string;
  description?: string;
}

const { icon, title, description } = Astro.props;
---

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
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/AmenityItem.astro
git commit -m "feat: update AmenityItem to flex-row layout with icon container"
```

---

### Task 5: Update RoomCard Component

**Files:**
- Modify: `src/components/RoomCard.astro`

- [ ] **Step 1: Replace the entire file content**

```astro
---
interface Props {
  title?: string;
  name: string;
  capacity?: string;
  priceDay?: number;
  priceHourly?: number;
  amenities?: string[];
  image?: string;
  description?: string;
}

const {
  title,
  name,
  capacity,
  priceDay,
  priceHourly,
  amenities = [],
  image = 'https://via.placeholder.com/400x300?text=Room',
  description
} = Astro.props;

const formatPrice = (price: number | undefined) => {
  if (!price) return '';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(price);
};
---

<div class="bg-surface rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 h-full flex flex-col">
  <div class="relative overflow-hidden aspect-[4/3]">
    <img
      src={image}
      alt={name}
      class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
    />
    {title && (
      <div class="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
        {title}
      </div>
    )}
  </div>
  <div class="p-6 flex-1 flex flex-col">
    <h3 class="text-xl font-heading font-bold text-primary mb-2">{name}</h3>

    {description && <p class="text-sm text-text-muted mb-4 leading-relaxed">{description}</p>}

    {capacity && <p class="text-sm text-text-muted mb-3 flex items-center gap-2">👥 <span>{capacity}</span></p>}

    {amenities.length > 0 && (
      <div class="mb-4">
        <p class="text-xs font-semibold text-primary uppercase tracking-wide mb-2">Tiện nghi</p>
        <div class="flex flex-wrap gap-2">
          {amenities.map(amenity => (
            <span class="text-xs bg-accent-soft text-primary px-3 py-1 rounded-full border border-border">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    )}

    {(priceDay || priceHourly) && (
      <div class="mb-4 border-t border-border pt-4">
        {priceDay && <p class="text-xl font-heading font-bold text-primary">{formatPrice(priceDay)}<span class="text-sm font-body font-normal text-text-muted">/ngày</span></p>}
        {priceHourly && <p class="text-sm text-text-muted mt-1">{formatPrice(priceHourly)}/giờ</p>}
      </div>
    )}

    <a
      href="tel:TBD"
      class="mt-auto block text-center bg-accent text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-sm hover:-translate-y-0.5 active:translate-y-0"
    >
      Liên hệ đặt phòng
    </a>
  </div>
</div>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/RoomCard.astro
git commit -m "feat: update RoomCard with aspect-ratio image, overlay badge, accent CTA"
```

---

### Task 6: Update PropertyCard Component

**Files:**
- Modify: `src/components/PropertyCard.astro`

- [ ] **Step 1: Replace the entire file content**

```astro
---
interface Props {
  name: string;
  description: string;
  status?: string;
  ctaText: string;
  ctaHref?: string;
}

const { name, description, status, ctaText, ctaHref = '#' } = Astro.props;
---

<div class="bg-surface rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group h-full flex flex-col">
  <div class="relative bg-gradient-to-br from-accent-soft to-border h-48 flex items-center justify-center overflow-hidden">
    <div class="w-16 h-16 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
      <svg class="w-8 h-8 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
      </svg>
    </div>
  </div>

  <div class="p-6 flex-1 flex flex-col">
    <h3 class="text-xl font-heading font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-200">
      {name}
    </h3>

    <p class="text-sm text-text-muted mb-4 leading-relaxed flex-1">
      {description}
    </p>

    {status && (
      <div class="mb-4">
        <span class="text-xs font-semibold text-slate border border-dashed border-slate px-3 py-1.5 inline-block rounded-full">
          {status}
        </span>
      </div>
    )}

    <a
      href={ctaHref}
      class="inline-flex items-center justify-center gap-2 border border-primary text-primary bg-transparent px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-accent-soft transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
    >
      {ctaText}
      <span class="group-hover:translate-x-1 transition-transform duration-200">→</span>
    </a>
  </div>
</div>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/PropertyCard.astro
git commit -m "feat: update PropertyCard with gradient placeholder and dashed status badge"
```

---

### Task 7: Update Section Component

**Files:**
- Modify: `src/components/Section.astro`

- [ ] **Step 1: Replace the entire file content**

Remove the `lg:py-32` breakpoint for consistent spacing:

```astro
---
interface Props {
  maxWidth?: boolean;
}

const { maxWidth = true } = Astro.props;
const className = maxWidth
  ? 'max-w-container mx-auto px-4 md:px-8'
  : 'w-full';
---

<div class={`py-16 md:py-24 ${className}`}>
  <slot />
</div>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Section.astro
git commit -m "feat: update Section with consistent padding and wider mobile px"
```

---

### Task 8: Update Page-Level Layout (index.astro)

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Replace the Hero section**

Find:
```html
<!-- Hero Section -->
<section class="relative bg-gradient-to-b from-accent-soft to-bg-warm py-16 md:py-32">
  <Section maxWidth={true}>
    <div class="text-center">
      <h1 class="text-3xl md:text-5xl font-bold text-primary mb-4">
        Chào Mừng Đến Hải An Hotel
      </h1>
      <p class="text-lg text-text-muted mb-8 max-w-2xl mx-auto">
        Khách sạn gia đình nhỏ, sạch sẽ và ấm cúng với đội ngũ thân thiện
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button variant="primary" size="lg">
          📞 Gọi Ngay
        </Button>
        <Button variant="secondary" size="lg">
          💬 Zalo
        </Button>
        <Button variant="secondary" size="lg">
          🗺️ Xem Bản Đồ
        </Button>
      </div>
    </div>
  </Section>
</section>
```

Replace with:
```html
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

- [ ] **Step 2: Update Properties section background and heading**

Find:
```html
<!-- Properties Section -->
<section id="co-so" class="bg-white">
  <Section maxWidth={true}>
    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-12 text-center">
      Cơ Sở Lưu Trú
    </h2>
```

Replace with:
```html
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
```

Also close the `</Section>` correctly — the grid div and closing tags stay the same.

- [ ] **Step 3: Update Introduction section**

Find:
```html
<!-- Introduction Section -->
<section id="gioi-thieu" class="bg-white">
  <Section maxWidth={true}>
    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
      Về Hải An Hotel
    </h2>
```

Replace with:
```html
<!-- Introduction Section -->
<section id="gioi-thieu" class="bg-surface-warm">
  <Section maxWidth={true}>
    <div class="text-center mb-8">
      <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
        Về Hải An Hotel
      </h2>
      <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
    </div>
```

Remove the old `mb-6` from the h2 (it's now on the wrapper div).

- [ ] **Step 4: Update Rooms section**

Find:
```html
<!-- Room Types Section -->
<section id="phong-nghi" class="bg-bg-warm">
  <Section maxWidth={true}>
    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-12 text-center">
      Các Loại Phòng
    </h2>
```

Replace with:
```html
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
```

- [ ] **Step 5: Update Amenities section**

Find:
```html
<!-- Amenities Section -->
<section id="tien-nghi" class="bg-white">
  <Section maxWidth={true}>
    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-12 text-center">
      Tiện Nghi & Dịch Vụ
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

Replace with:
```html
<!-- Amenities Section -->
<section id="tien-nghi" class="bg-surface">
  <Section maxWidth={true}>
    <div class="text-center mb-12">
      <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
        Tiện Nghi & Dịch Vụ
      </h2>
      <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
```

- [ ] **Step 6: Update Gallery section**

Find:
```html
<!-- Gallery Section -->
<section id="hinh-anh" class="bg-bg-warm">
  <Section maxWidth={true}>
    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-12 text-center">
      Thư Viện Ảnh
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <div class="bg-white rounded-lg overflow-hidden shadow-sm h-64">
          <img
            src={`https://via.placeholder.com/400x300?text=Ảnh+${i}`}
            alt={`Ảnh khách sạn ${i}`}
            class="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
```

Replace with:
```html
<!-- Gallery Section -->
<section id="hinh-anh" class="bg-background">
  <Section maxWidth={true}>
    <div class="text-center mb-12">
      <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
        Thư Viện Ảnh
      </h2>
      <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div class={`bg-surface rounded-xl overflow-hidden shadow-sm group relative ${i === 1 ? 'col-span-2' : ''}`}>
          <img
            src={`https://via.placeholder.com/800x500?text=Ảnh+${i}`}
            alt={`Ảnh khách sạn ${i}`}
            class="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl flex items-center justify-center">
            <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
```

- [ ] **Step 7: Update Location section**

Find:
```html
<!-- Location Section -->
<section id="vi-tri" class="bg-white">
  <Section maxWidth={true}>
    <h2 class="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
      Vị Trí
    </h2>
```

Replace with:
```html
<!-- Location Section -->
<section id="vi-tri" class="bg-surface">
  <Section maxWidth={true}>
    <div class="text-center mb-10">
      <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
        Vị Trí
      </h2>
      <div class="w-12 h-0.5 bg-accent mx-auto mt-3"></div>
    </div>
```

- [ ] **Step 8: Update Contact section**

Find the 3 contact cards block:
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
  <div class="bg-white bg-opacity-10 rounded-lg p-6">
    <p class="text-3xl mb-2">📞</p>
    <p class="font-semibold mb-2">Gọi Điện</p>
    <p class="opacity-90">TBD</p>
  </div>
  <div class="bg-white bg-opacity-10 rounded-lg p-6">
    <p class="text-3xl mb-2">💬</p>
    <p class="font-semibold mb-2">Zalo</p>
    <p class="opacity-90">TBD</p>
  </div>
  <div class="bg-white bg-opacity-10 rounded-lg p-6">
    <p class="text-3xl mb-2">📧</p>
    <p class="font-semibold mb-2">Email</p>
    <p class="opacity-90">TBD</p>
  </div>
</div>
```

Replace with:
```html
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
```

Also find the check-in/out info block:
```html
<div class="space-y-3 text-sm">
  <p>⏰ Check-in: 14:00 | Check-out: 12:00</p>
  <p class="opacity-90">Liên hệ trực tiếp cho các yêu cầu đặc biệt</p>
</div>
```

Replace with:
```html
<div class="border-t border-white/20 pt-6 space-y-2 text-sm">
  <p>⏰ Check-in: 14:00 | Check-out: 12:00</p>
  <p class="opacity-75">Liên hệ trực tiếp cho các yêu cầu đặc biệt</p>
</div>
```

- [ ] **Step 9: Update Ăn Uống section background**

Find:
```html
<!-- Ăn Uống Section -->
<section id="an-uong" class="bg-white">
```

Replace with:
```html
<!-- Ăn Uống Section -->
<section id="an-uong" class="bg-surface-warm">
```

- [ ] **Step 10: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 11: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: update page layout with new section backgrounds and heading styles"
```

---

### Task 9: Update Footer

**Files:**
- Modify: `src/components/Footer.astro`

- [ ] **Step 1: Add logo text and update copyright color**

Find:
```html
<footer class="bg-primary text-white py-12">
  <div class="max-w-container mx-auto px-4 md:px-0">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <!-- About -->
      <div>
        <h3 class="font-bold text-lg mb-3">HẢI AN HOTEL</h3>
```

Replace with:
```html
<footer class="bg-primary text-white py-12">
  <div class="max-w-container mx-auto px-4 md:px-8">
    <div class="mb-8 pb-8 border-b border-white/10">
      <p class="font-heading font-bold tracking-[0.15em] uppercase text-xl leading-none">Haian</p>
      <p class="font-body font-light text-slate tracking-[0.2em] uppercase text-[10px] mt-1">Hotel</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
      <!-- About -->
      <div>
        <h3 class="font-semibold text-sm uppercase tracking-wide mb-3 text-white/80">Về Chúng Tôi</h3>
```

Find the copyright line:
```html
<p>&copy; 2024 Hải An Villa Hotel. All rights reserved.</p>
```

Replace with:
```html
<p class="text-slate">&copy; 2025 Hải An Villa Hotel. All rights reserved.</p>
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: update Footer with logo text and refined typography"
```

---

## Done

After all tasks are committed, run `npm run dev` and verify visually:
- [ ] Colors match logo palette (slate gray primary, sandy tan accent)
- [ ] Header shows "Haian / Hotel" stacked logo
- [ ] AmenityItem icons are in square containers, laid out horizontally
- [ ] RoomCard image has 4:3 aspect ratio with overlay badge
- [ ] PropertyCard has gradient placeholder and dashed status badge
- [ ] Gallery first image spans 2 columns
- [ ] Section headings have decorative underline
- [ ] Contact cards use border instead of filled background
