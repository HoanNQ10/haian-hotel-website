# Room Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 14 static room detail pages (`/phong/101`, `/phong/B201`…) each with a photo carousel and room details, and link the room number badges on `/phong-nghi` to their respective detail pages.

**Architecture:** Task 1 creates the shared data file `src/data/rooms.ts`. Task 2 creates the dynamic Astro route `src/pages/phong/[room].astro` using `getStaticPaths()`. Task 3 updates the room number badges in `src/pages/phong-nghi.astro` from `<span>` to `<a>` links.

**Tech Stack:** Astro 4, Tailwind CSS 3, Vanilla JS (carousel)

---

## File Map

- **Create:** `src/data/rooms.ts` — 14 rooms with typed data + placeholder slides
- **Create:** `src/pages/phong/[room].astro` — dynamic page, carousel, details
- **Modify:** `src/pages/phong-nghi.astro` — badge `<span>` → `<a href="/phong/{num}">`

---

### Task 1: Create `src/data/rooms.ts`

**Files:**
- Create: `src/data/rooms.ts`

- [ ] **Step 1: Create the file**

Create `src/data/rooms.ts` with the following content:

```ts
export type RoomSlide =
  | { type: 'gradient'; value: string }
  | { type: 'image'; src: string; alt: string };

export interface Room {
  number: string;
  typeName: string;
  description: string;
  bedType: string;
  capacity: string;
  floor: string;
  hasBalcony: boolean;
  slides: RoomSlide[];
}

export const rooms: Room[] = [
  // ── Phòng Đôi Có Ban Công ──────────────────────────────────
  {
    number: "202",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  {
    number: "204",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  {
    number: "B201",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng hầm 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  {
    number: "B202",
    typeName: "Phòng Đôi Có Ban Công",
    description: "Phòng rộng rãi với 2 giường đơn và ban công riêng — phù hợp cho nhóm bạn hoặc gia đình nhỏ. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng hầm 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/20 to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-accent/30' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent/10 to-border' },
    ],
  },
  // ── Phòng Đôi Không Ban Công ───────────────────────────────
  {
    number: "101",
    typeName: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn đầy đủ tiện nghi, yên tĩnh — lý tưởng cho gia đình nhỏ hoặc hai người bạn đồng hành muốn lưu trú tiết kiệm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng trệt",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border/70 to-accent-soft/80' },
    ],
  },
  {
    number: "102",
    typeName: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn đầy đủ tiện nghi, yên tĩnh — lý tưởng cho gia đình nhỏ hoặc hai người bạn đồng hành muốn lưu trú tiết kiệm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng trệt",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border/70 to-accent-soft/80' },
    ],
  },
  {
    number: "B101",
    typeName: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn đầy đủ tiện nghi, yên tĩnh — lý tưởng cho gia đình nhỏ hoặc hai người bạn đồng hành muốn lưu trú tiết kiệm.",
    bedType: "2 giường đơn",
    capacity: "3–4 người",
    floor: "Tầng hầm 1",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border/70 to-accent-soft/80' },
    ],
  },
  // ── Phòng Đơn Có Ban Công ──────────────────────────────────
  {
    number: "201",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "203",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 1",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "301",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "302",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "303",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  {
    number: "304",
    typeName: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng — không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng 2",
    hasBalcony: true,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft to-border' },
      { type: 'gradient', value: 'bg-gradient-to-br from-border to-accent-soft' },
      { type: 'gradient', value: 'bg-gradient-to-br from-accent-soft/80 to-accent/10' },
    ],
  },
  // ── Phòng Đơn Không Ban Công ───────────────────────────────
  {
    number: "B102",
    typeName: "Phòng Đơn Không Ban Công",
    description: "Phòng đơn ấm cúng, sạch sẽ với đầy đủ tiện nghi cơ bản — lý tưởng cho lưu trú ngắn ngày với mức giá tiết kiệm.",
    bedType: "1 giường đơn",
    capacity: "1–2 người",
    floor: "Tầng hầm 1",
    hasBalcony: false,
    slides: [
      { type: 'gradient', value: 'bg-gradient-to-br from-primary/10 to-primary/20' },
      { type: 'gradient', value: 'bg-gradient-to-br from-primary/20 to-primary/10' },
      { type: 'gradient', value: 'bg-gradient-to-br from-primary/5 to-primary/15' },
    ],
  },
];
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/rooms.ts
git commit -m "feat: add rooms data file with 14 rooms and placeholder slides"
```

---

### Task 2: Create `src/pages/phong/[room].astro`

**Files:**
- Create: `src/pages/phong/[room].astro`

- [ ] **Step 1: Create the directory and file**

Create `src/pages/phong/[room].astro` with the following content:

```astro
---
import Layout from '../../layouts/Layout.astro';
import Header from '../../components/Header.astro';
import Footer from '../../components/Footer.astro';
import { rooms } from '../../data/rooms';

export async function getStaticPaths() {
  return rooms.map((room) => ({
    params: { room: room.number },
    props: { room },
  }));
}

const { room } = Astro.props;
---

<Layout
  title={`Phòng ${room.number} — Hải An Villa Hotel`}
  description={room.description}
>
  <Header />

  <!-- Page Hero -->
  <section class="bg-surface border-b border-border" aria-label="Thông tin phòng">
    <div class="max-w-container mx-auto px-4 md:px-8 py-10">
      <a href="/phong-nghi" class="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors duration-200 mb-3">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Tất cả phòng
      </a>
      <p class="text-sm text-text-muted mb-1">{room.typeName}</p>
      <h1 class="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">Phòng {room.number}</h1>
      <div class="w-12 h-0.5 bg-accent"></div>
    </div>
  </section>

  <!-- Carousel -->
  <section class="bg-surface border-b border-border" aria-label="Ảnh phòng">
    <div class="max-w-container mx-auto px-4 md:px-8 py-8">
      <div class="relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[3/1]">
        <div id="carousel-track" class="flex h-full transition-transform duration-300 ease-in-out">
          {room.slides.map((slide) => (
            <div class="flex-shrink-0 w-full h-full">
              {slide.type === 'gradient'
                ? <div class={`w-full h-full ${slide.value}`}></div>
                : <img src={slide.src} alt={slide.alt} class="w-full h-full object-cover" />
              }
            </div>
          ))}
        </div>
        <button
          id="carousel-prev"
          class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center shadow transition-all duration-200"
          aria-label="Ảnh trước"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <button
          id="carousel-next"
          class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center shadow transition-all duration-200"
          aria-label="Ảnh tiếp"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
        <span id="carousel-counter" class="absolute bottom-3 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
          1 / {room.slides.length}
        </span>
      </div>
    </div>
  </section>

  <!-- Details -->
  <section class="bg-surface" aria-label="Chi tiết phòng">
    <div class="max-w-container mx-auto px-4 md:px-8 py-10">
      <p class="text-text-muted leading-relaxed mb-8 max-w-2xl">{room.description}</p>

      <div class="grid md:grid-cols-2 gap-10 md:gap-16 mb-10">
        <!-- Detail grid -->
        <dl class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
          <dt class="text-text-muted">Loại giường</dt>
          <dd class="text-primary font-medium">{room.bedType}</dd>
          <dt class="text-text-muted">Sức chứa</dt>
          <dd class="text-primary font-medium">{room.capacity}</dd>
          <dt class="text-text-muted">Tầng</dt>
          <dd class="text-primary font-medium">{room.floor}</dd>
        </dl>

        <!-- Amenity list -->
        <ul class="grid grid-cols-2 gap-x-4 gap-y-2">
          <li class="flex items-center gap-2 text-sm text-text-muted">
            <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>
            </svg>
            WiFi miễn phí
          </li>
          <li class="flex items-center gap-2 text-sm text-text-muted">
            <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/>
            </svg>
            Điều hòa
          </li>
          <li class="flex items-center gap-2 text-sm text-text-muted">
            <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Nước nóng
          </li>
          <li class="flex items-center gap-2 text-sm text-text-muted">
            <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            TV
          </li>
          <li class="flex items-center gap-2 text-sm text-text-muted">
            <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 10V6a1 1 0 011-1h16a1 1 0 011 1v4M3 10l2 10h14l2-10"/>
            </svg>
            WC riêng
          </li>
          {room.hasBalcony && (
            <li class="flex items-center gap-2 text-sm text-text-muted">
              <svg class="w-4 h-4 flex-shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M3 12V8h18v4M3 12v4h18v-4M7 12v4M12 12v4M17 12v4"/>
              </svg>
              Ban công
            </li>
          )}
        </ul>
      </div>

      <a
        href="/lien-he"
        class="inline-flex items-center justify-center border border-primary text-primary bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-primary hover:text-white transition-all duration-200"
      >
        Liên Hệ Đặt Phòng
      </a>
    </div>
  </section>

  <Footer />
</Layout>

<script>
  const track = document.getElementById('carousel-track') as HTMLElement;
  const counter = document.getElementById('carousel-counter') as HTMLElement;
  const total = track.children.length;
  let current = 0;

  function goTo(n: number) {
    current = (n + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    counter.textContent = `${current + 1} / ${total}`;
  }

  document.getElementById('carousel-prev')?.addEventListener('click', () => goTo(current - 1));
  document.getElementById('carousel-next')?.addEventListener('click', () => goTo(current + 1));
</script>
```

- [ ] **Step 2: Verify build generates 14 pages**

Run: `npm run build`

Expected: build completes with no errors, output includes lines like:
```
▶ src/pages/phong/[room].astro
  ├─ /phong/101/index.html
  ├─ /phong/102/index.html
  ...
  └─ /phong/B202/index.html
```
14 pages total under `/phong/`.

- [ ] **Step 3: Commit**

```bash
git add src/pages/phong/[room].astro
git commit -m "feat: add room detail pages with carousel and getStaticPaths"
```

---

### Task 3: Update room badges in `src/pages/phong-nghi.astro`

**Files:**
- Modify: `src/pages/phong-nghi.astro`

- [ ] **Step 1: Change badge `<span>` to `<a>` link**

In `src/pages/phong-nghi.astro`, find the room number badges (inside the `.map()` section):

```astro
{room.rooms.map((num) => (
  <span class="text-xs bg-accent-soft text-primary px-3 py-1 font-medium">{num}</span>
))}
```

Replace with:

```astro
{room.rooms.map((num) => (
  <a href={`/phong/${num}`} class="text-xs bg-accent-soft text-primary px-3 py-1 font-medium hover:bg-accent hover:text-white transition-colors duration-200">{num}</a>
))}
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/phong-nghi.astro
git commit -m "feat: link room number badges to detail pages"
```
