# Phòng Nghỉ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Phòng Nghỉ preview carousel to the homepage and a dedicated `/phong-nghi` page listing all 4 room types.

**Architecture:** Two independent changes — (1) a homepage section with a horizontal drag carousel reusing the same scroll/snap/drag pattern as the existing gallery, and (2) a new Astro page at `src/pages/phong-nghi.astro` using the shared Layout/Header/Footer. A third task updates nav links.

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS (drag-to-scroll, no external dependencies)

---

## File Map

- **Modify:** `src/pages/index.astro` — add rooms data to frontmatter, add `#phong-nghi` section after `#co-so`, add rooms carousel script
- **Create:** `src/pages/phong-nghi.astro` — dedicated rooms listing page
- **Modify:** `src/components/Header.astro` — update `#phong-nghi` links to `/phong-nghi` (desktop + mobile nav)

---

### Task 1: Homepage rooms preview carousel

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Add rooms data to frontmatter**

In `src/pages/index.astro`, add the `rooms` array inside the `---` frontmatter block, after the existing imports:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import HeroCarousel from '../components/HeroCarousel.astro';
import Section from '../components/Section.astro';
import PropertyCard from '../components/PropertyCard.astro';
import Footer from '../components/Footer.astro';
import StickyContactBar from '../components/StickyContactBar.astro';

const rooms = [
  {
    name: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng, view thành phố. Không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác.",
    tags: ["Đơn", "Có ban công"],
    gradient: "bg-gradient-to-br from-accent-soft to-border"
  },
  {
    name: "Phòng Đơn Không Ban Công",
    description: "Phòng đơn ấm cúng, sạch sẽ, đầy đủ tiện nghi cơ bản. Lý tưởng cho lưu trú ngắn ngày với mức giá tiết kiệm.",
    tags: ["Đơn"],
    gradient: "bg-gradient-to-br from-primary/10 to-primary/20"
  },
  {
    name: "Phòng Đôi Có Ban Công",
    description: "Phòng đôi rộng rãi với ban công mở ra không gian xanh. Thích hợp cho cặp đôi hoặc bạn bè đi cùng.",
    tags: ["Đôi", "Có ban công"],
    gradient: "bg-gradient-to-br from-accent/20 to-accent-soft"
  },
  {
    name: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn, đầy đủ tiện nghi, yên tĩnh. Phù hợp cho gia đình nhỏ hoặc hai người bạn đồng hành.",
    tags: ["Đôi"],
    gradient: "bg-gradient-to-br from-border to-accent-soft"
  }
];
---
```

- [ ] **Step 2: Add the `#phong-nghi` section after `#co-so`**

In `src/pages/index.astro`, insert this section immediately after the closing `</section>` tag of the `#co-so` section (after line 72):

```astro
  <!-- Phòng Nghỉ Section -->
  <section id="phong-nghi" class="bg-background">
    <Section maxWidth={true}>
      <div class="mb-10">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Phòng Nghỉ
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3"></div>
        <p class="text-text-muted text-sm mt-3">Các loại phòng tại Hải An Villa Hotel</p>
      </div>
      <div class="relative">
        <!-- Prev button -->
        <button
          id="rooms-prev"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-md hover:shadow-lg text-primary p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 border border-border"
          aria-label="Phòng trước"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Scroll track -->
        <div
          id="rooms-track"
          class="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {rooms.map((room) => (
            <div class="snap-start flex-shrink-0 w-80 rounded-xl overflow-hidden shadow-sm bg-surface group">
              <div class={`h-48 ${room.gradient}`}></div>
              <div class="p-5">
                <h3 class="font-heading font-bold text-primary text-lg mb-2">{room.name}</h3>
                <p class="text-sm text-text-muted leading-relaxed mb-3 line-clamp-2">{room.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  {room.tags.map((tag) => (
                    <span class="text-xs bg-accent-soft text-primary px-2.5 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
                <a
                  href="/phong-nghi"
                  class="inline-flex items-center justify-center gap-2 bg-accent text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 w-full"
                >
                  Xem Chi Tiết
                  <span class="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <!-- Next button -->
        <button
          id="rooms-next"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-md hover:shadow-lg text-primary p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 border border-border"
          aria-label="Phòng tiếp theo"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </Section>
  </section>
```

- [ ] **Step 3: Add rooms carousel script**

In `src/pages/index.astro`, add this `<script>` block immediately after the existing gallery `</script>` closing tag (after the drag-to-scroll script for `gallery-track`):

```astro
  <script>
    const roomsTrack = document.getElementById('rooms-track');
    const roomsPrev = document.getElementById('rooms-prev');
    const roomsNext = document.getElementById('rooms-next');

    const roomsScrollAmount = 336;
    roomsPrev?.addEventListener('click', () => roomsTrack?.scrollBy({ left: -roomsScrollAmount, behavior: 'smooth' }));
    roomsNext?.addEventListener('click', () => roomsTrack?.scrollBy({ left: roomsScrollAmount, behavior: 'smooth' }));

    if (roomsTrack) {
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      roomsTrack.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - roomsTrack.offsetLeft;
        scrollLeft = roomsTrack.scrollLeft;
      });

      roomsTrack.addEventListener('mouseleave', () => { isDragging = false; });
      roomsTrack.addEventListener('mouseup', () => { isDragging = false; });

      roomsTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - roomsTrack.offsetLeft;
        roomsTrack.scrollLeft = scrollLeft - (x - startX);
      });
    }
  </script>
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

Expected: build completes with no errors, output in `dist/`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add phong-nghi preview carousel to homepage"
```

---

### Task 2: Create `/phong-nghi` dedicated page

**Files:**
- Create: `src/pages/phong-nghi.astro`

- [ ] **Step 1: Create the file with full content**

Create `src/pages/phong-nghi.astro` with this content:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

const rooms = [
  {
    name: "Phòng Đơn Có Ban Công",
    description: "Phòng đơn thoáng mát với ban công riêng, view thành phố. Không gian yên tĩnh, phù hợp cho khách đi một mình hoặc công tác. Thiết kế gọn gàng, tối ưu không gian sử dụng.",
    tags: ["Đơn", "Có ban công"],
    gradient: "bg-gradient-to-br from-accent-soft to-border"
  },
  {
    name: "Phòng Đơn Không Ban Công",
    description: "Phòng đơn ấm cúng, sạch sẽ, đầy đủ tiện nghi cơ bản. Lý tưởng cho lưu trú ngắn ngày với mức giá tiết kiệm. Không gian yên tĩnh, phù hợp cho nghỉ ngơi sau một ngày dài.",
    tags: ["Đơn"],
    gradient: "bg-gradient-to-br from-primary/10 to-primary/20"
  },
  {
    name: "Phòng Đôi Có Ban Công",
    description: "Phòng đôi rộng rãi với ban công mở ra không gian xanh. Thích hợp cho cặp đôi hoặc bạn bè đi cùng. Ánh sáng tự nhiên tràn vào, thoáng mát quanh năm.",
    tags: ["Đôi", "Có ban công"],
    gradient: "bg-gradient-to-br from-accent/20 to-accent-soft"
  },
  {
    name: "Phòng Đôi Không Ban Công",
    description: "Phòng đôi tiêu chuẩn, đầy đủ tiện nghi, yên tĩnh. Phù hợp cho gia đình nhỏ hoặc hai người bạn đồng hành. Nội thất sạch sẽ, thoải mái, dễ chịu.",
    tags: ["Đôi"],
    gradient: "bg-gradient-to-br from-border to-accent-soft"
  }
];
---

<Layout title="Phòng Nghỉ — Hải An Villa Hotel">
  <Header />

  <!-- Page Hero -->
  <section class="bg-surface border-b border-border">
    <div class="max-w-container mx-auto px-4 md:px-8 py-10">
      <a href="/" class="inline-flex items-center gap-1 text-sm text-text-muted hover:text-primary transition-colors duration-200 mb-4">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Trang Chủ
      </a>
      <h1 class="text-3xl md:text-4xl font-heading font-bold text-primary mb-3">Phòng Nghỉ</h1>
      <div class="w-12 h-0.5 bg-accent mb-4"></div>
      <p class="text-text-muted max-w-xl">Các loại phòng sạch sẽ, ấm cúng tại Hải An Villa Hotel — phù hợp cho mọi nhu cầu lưu trú.</p>
    </div>
  </section>

  <!-- Room List -->
  <section class="bg-background">
    <div class="max-w-container mx-auto px-4 md:px-8 py-14">
      <div class="space-y-12">
        {rooms.map((room, index) => (
          <>
            <div class={`flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center${index % 2 !== 0 ? ' [&>*:first-child]:md:order-2' : ''}`}>
              <div class={`w-full aspect-video rounded-xl ${room.gradient}`}></div>
              <div>
                <h2 class="text-2xl font-heading font-bold text-primary mb-3">{room.name}</h2>
                <p class="text-text-muted leading-relaxed mb-4">{room.description}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                  {room.tags.map((tag) => (
                    <span class="text-xs bg-accent-soft text-primary px-3 py-1.5 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
                <a
                  href="#footer"
                  class="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  Liên Hệ Đặt Phòng →
                </a>
              </div>
            </div>
            {index < rooms.length - 1 && <hr class="border-border" />}
          </>
        ))}
      </div>
    </div>
  </section>

  <Footer />
</Layout>
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`

Expected: build completes with no errors, `dist/phong-nghi/index.html` is generated.

- [ ] **Step 3: Commit**

```bash
git add src/pages/phong-nghi.astro
git commit -m "feat: add /phong-nghi dedicated rooms page"
```

---

### Task 3: Update nav and property card links

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Update desktop nav link in Header**

In `src/components/Header.astro`, change line 40:

```html
<!-- Before -->
<a href="#phong-nghi" class="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 relative group">

<!-- After -->
<a href="/phong-nghi" class="text-text-muted hover:text-primary text-sm font-medium transition-colors duration-200 relative group">
```

- [ ] **Step 2: Update mobile nav link in Header**

In `src/components/Header.astro`, change line 98:

```html
<!-- Before -->
<a href="#phong-nghi" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Phòng Nghỉ</a>

<!-- After -->
<a href="/phong-nghi" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Phòng Nghỉ</a>
```

- [ ] **Step 3: Update PropertyCard ctaHref in index.astro**

In `src/pages/index.astro`, the three `PropertyCard` components in `#co-so` currently have `ctaHref="#phong-nghi"`. Update all three to `/phong-nghi`:

```astro
<!-- All three PropertyCard ctaHref values -->
ctaHref="/phong-nghi"
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`

Expected: build completes with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro src/pages/index.astro
git commit -m "feat: update nav and property card links to /phong-nghi"
```
