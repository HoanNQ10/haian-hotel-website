# Homepage Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve homepage visual design — expand hero, remove Rooms/Gallery sections, improve layouts, add Vị trí section, update nav link.

**Architecture:** Visual-only Tailwind class and layout changes across existing components and the index page. No new libraries. No text content changes whatsoever — all Vietnamese copy stays byte-for-byte identical.

**Tech Stack:** Astro 4, Tailwind CSS 3, custom design tokens in `tailwind.config.mjs` (`bg-surface`, `bg-background`, `bg-accent-soft`, `text-primary`, `text-text-muted`, `bg-accent`, `border-border`, `max-w-container`, `font-heading`)

---

## File Map

| File | What changes |
|------|-------------|
| `src/components/HeroCarousel.astro` | Height → 80vh, add gradient overlay div |
| `src/pages/index.astro` | Remove Rooms + Gallery + their scripts; improve Intro, Cơ Sở, Blog; add Vị trí section |
| `src/components/Header.astro` | Update "Vị Trí" href from `/#footer` to `/#vi-tri` (desktop + mobile) |

`src/components/PropertyCard.astro` — **not modified** (first property card is inlined in index.astro for the featured horizontal layout).

---

### Task 1: Hero — expand to 80vh and add gradient overlay

**Files:**
- Modify: `src/components/HeroCarousel.astro`

- [ ] **Step 1: Read the file**

```
Read: src/components/HeroCarousel.astro
```
Confirm the height class is `h-96 md:h-[500px] lg:h-[600px]` and the slides wrapper has `id="slides-wrapper"`.

- [ ] **Step 2: Expand carousel height**

Find and replace this exact string:
```html
  <div class="relative h-96 md:h-[500px] lg:h-[600px]">
```
Replace with:
```html
  <div class="relative min-h-[80vh]">
```

- [ ] **Step 3: Add gradient overlay**

Find this exact string:
```html
    </div>

    <!-- Previous Button -->
```
Replace with:
```html
    </div>

    <!-- Dark gradient overlay — no text, purely visual depth -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none z-10" aria-hidden="true"></div>

    <!-- Previous Button -->
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No errors. Open `http://localhost:4321` — hero should fill ~80% of viewport height with a visible dark fade at the bottom of the image.

- [ ] **Step 5: Commit**

```bash
git add src/components/HeroCarousel.astro
git commit -m "feat: expand hero to 80vh with gradient overlay"
```

---

### Task 2: Remove Rooms and Gallery sections from homepage

**Files:**
- Modify: `src/pages/index.astro`

This task removes two sections (Phòng Nghỉ + Thư Viện Ảnh) and their two associated `<script>` blocks from `src/pages/index.astro`.

- [ ] **Step 1: Read the file**

```
Read: src/pages/index.astro
```
Locate: `<!-- Phòng Nghỉ Section -->`, `<!-- Gallery Section -->`, and the two `<script>` blocks below the gallery that reference `gallery-track`, `rooms-track`.

- [ ] **Step 2: Remove Phòng Nghỉ section**

Find this exact string (the entire Rooms section):
```html
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
                  href={room.href}
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

  <!-- Gallery Section -->
```
Replace with:
```html
  <!-- Gallery Section -->
```

- [ ] **Step 3: Remove Gallery section**

Find this exact string (the entire Gallery section):
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
      <div class="relative">
        <!-- Prev button -->
        <button
          id="gallery-prev"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-md hover:shadow-lg text-primary p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 border border-border"
          aria-label="Ảnh trước"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <!-- Scroll track -->
        <div
          id="gallery-track"
          class="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div class="snap-start flex-shrink-0 w-72 md:w-96 rounded-xl overflow-hidden shadow-sm group relative bg-surface">
              <img
                src={`https://via.placeholder.com/800x500?text=Ảnh+${i}`}
                alt={`Ảnh khách sạn ${i}`}
                class="w-full h-56 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
                draggable="false"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-xl"></div>
            </div>
          ))}
        </div>

        <!-- Next button -->
        <button
          id="gallery-next"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-md hover:shadow-lg text-primary p-3 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 border border-border"
          aria-label="Ảnh tiếp theo"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </Section>
  </section>

  <script>
```
Replace with:
```html
  <script>
```

- [ ] **Step 4: Remove gallery drag script**

Find this exact string:
```html
  <script>
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');

    // Button scroll
    const scrollAmount = 320;
    prevBtn?.addEventListener('click', () => track?.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    nextBtn?.addEventListener('click', () => track?.scrollBy({ left: scrollAmount, behavior: 'smooth' }));

    // Drag to scroll
    if (track) {
      let isDragging = false;
      let startX = 0;
      let scrollLeft = 0;

      track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      track.addEventListener('mouseleave', () => { isDragging = false; });
      document.addEventListener('mouseup', () => { isDragging = false; });

      track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        track.scrollLeft = scrollLeft - (x - startX);
      });
    }
  </script>

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
      document.addEventListener('mouseup', () => { isDragging = false; });

      roomsTrack.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - roomsTrack.offsetLeft;
        roomsTrack.scrollLeft = scrollLeft - (x - startX);
      });
    }
  </script>

  <!-- Blog Section -->
```
Replace with:
```html
  <!-- Blog Section -->
```

- [ ] **Step 5: Remove the now-unused `rooms` data array from frontmatter**

Read the top of `src/pages/index.astro`. Find:
```js
const rooms = [
  {
    name: "Phòng Đơn",
    description: "Phòng đơn gọn gàng, thoáng mát — phù hợp cho khách đi một mình hoặc công tác. Một số phòng có ban công riêng nhìn ra không gian xanh.",
    tags: ["1 giường đơn", "1–2 người"],
    gradient: "bg-gradient-to-br from-accent-soft to-border",
    href: "/phong-don"
  },
  {
    name: "Phòng Đôi",
    description: "Phòng rộng rãi với 2 giường đơn — lý tưởng cho gia đình nhỏ hoặc nhóm bạn. Một số phòng có ban công riêng, ánh sáng tự nhiên tràn vào thoáng mát.",
    tags: ["2 giường đơn", "3–4 người"],
    gradient: "bg-gradient-to-br from-accent/20 to-accent-soft",
    href: "/phong-doi"
  }
];
```
Replace with an empty string (delete it entirely).

- [ ] **Step 6: Build and verify**

Run: `npm run build`
Expected: No errors. Rooms and Gallery sections gone from homepage. Blog section immediately follows Cơ Sở.

- [ ] **Step 7: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: remove Rooms and Gallery sections from homepage"
```

---

### Task 3: Improve Giới Thiệu visual

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Read the file**

```
Read: src/pages/index.astro
```
Locate the `<!-- Giới Thiệu -->` section.

- [ ] **Step 2: Add decorative quote mark and increase text size**

Find this exact string:
```html
  <!-- Giới Thiệu -->
  <section id="gioi-thieu" class="bg-background">
    <Section maxWidth={true}>
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
          Chào Mừng Đến Với Hải An
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mb-6"></div>
        <p class="text-text-muted leading-relaxed mb-4">
          Hải An là hệ thống khách sạn gia đình với tiêu chí sạch sẽ, ấm cúng và thân thiện.
          Chúng tôi mang đến không gian lưu trú thoải mái, dịch vụ chân thành và giá cả hợp lý —
          lý tưởng cho những chuyến nghỉ dưỡng tại Đà Lạt và Bảo Lộc.
        </p>
        <p class="text-text-muted leading-relaxed">
          Với đội ngũ nhân viên nhiệt tình, chúng tôi luôn sẵn sàng hỗ trợ để mỗi kỳ nghỉ của bạn
          trở thành những kỷ niệm đáng nhớ.
        </p>
      </div>
    </Section>
  </section>
```
Replace with:
```html
  <!-- Giới Thiệu -->
  <section id="gioi-thieu" class="bg-background">
    <Section maxWidth={true}>
      <div class="max-w-3xl mx-auto text-center relative">
        <div class="absolute -top-8 left-1/2 -translate-x-1/2 font-heading text-[120px] leading-none text-accent/15 select-none pointer-events-none" aria-hidden="true">"</div>
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary mb-3">
          Chào Mừng Đến Với Hải An
        </h2>
        <div class="w-12 h-0.5 bg-accent mx-auto mb-6"></div>
        <p class="text-text-muted text-lg leading-relaxed mb-4">
          Hải An là hệ thống khách sạn gia đình với tiêu chí sạch sẽ, ấm cúng và thân thiện.
          Chúng tôi mang đến không gian lưu trú thoải mái, dịch vụ chân thành và giá cả hợp lý —
          lý tưởng cho những chuyến nghỉ dưỡng tại Đà Lạt và Bảo Lộc.
        </p>
        <p class="text-text-muted text-lg leading-relaxed">
          Với đội ngũ nhân viên nhiệt tình, chúng tôi luôn sẵn sàng hỗ trợ để mỗi kỳ nghỉ của bạn
          trở thành những kỷ niệm đáng nhớ.
        </p>
      </div>
    </Section>
  </section>
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: No errors. Intro section shows larger body text and a faint decorative `"` behind the heading.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: improve Gioi Thieu visual — decorative quote mark, text-lg body"
```

---

### Task 4: Redesign Cơ Sở section — featured horizontal first card

**Files:**
- Modify: `src/pages/index.astro`

The first property (Hải An Villa Đà Lạt) becomes a full-width horizontal card (image left, content right). The other two remain in a 2-column grid using `<PropertyCard featured={false}>`.

- [ ] **Step 1: Read the file**

```
Read: src/pages/index.astro
```
Locate `<!-- Properties Section -->`.

- [ ] **Step 2: Replace the Properties section**

Find this exact string:
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PropertyCard
          featured={true}
          name="Hải An Villa Đà Lạt"
          description="Khách sạn gia đình tại trung tâm Đà Lạt — phòng sạch sẽ, đội ngũ thân thiện, giá hợp lý."
          ctaText="Xem Phòng"
          ctaHref="/phong-nghi"
        />
        <PropertyCard
          featured={true}
          name="Hải An Hotel Bảo Lộc"
          description="Khách sạn gia đình tại Bảo Lộc — không gian yên tĩnh, sạch sẽ, giá cả phải chăng."
          ctaText="Liên Hệ"
          ctaHref="/lien-he"
        />
        <PropertyCard
          featured={true}
          name="Hải An Homestay Bảo Lộc"
          description="Homestay ấm cúng tại Bảo Lộc — trải nghiệm gần gũi, không gian xanh mát."
          ctaText="Liên Hệ"
          ctaHref="/lien-he"
        />
      </div>
    </Section>
  </section>
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

      <!-- Featured first property: full-width horizontal card -->
      <div class="rounded-2xl overflow-hidden border border-border mb-8 group hover:shadow-lg transition-shadow duration-300">
        <div class="grid md:grid-cols-[2fr_3fr]">
          <div class="bg-gradient-to-br from-accent-soft to-border min-h-[240px] md:min-h-[340px] relative flex items-center justify-center">
            <div class="w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <svg class="w-10 h-10 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div class="absolute top-4 left-4">
              <span class="text-xs font-semibold text-white bg-accent px-3 py-1.5 rounded-full">Đang Hoạt Động</span>
            </div>
          </div>
          <div class="p-8 md:p-12 bg-surface flex flex-col justify-center">
            <h3 class="text-2xl md:text-3xl font-heading font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-200">
              Hải An Villa Đà Lạt
            </h3>
            <p class="text-text-muted leading-relaxed mb-8">
              Khách sạn gia đình tại trung tâm Đà Lạt — phòng sạch sẽ, đội ngũ thân thiện, giá hợp lý.
            </p>
            <div>
              <a
                href="/phong-nghi"
                class="inline-flex items-center justify-center gap-2 bg-accent text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-accent-dark transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
              >
                Xem Phòng
                <span class="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Other two properties: 2-col grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PropertyCard
          featured={false}
          name="Hải An Hotel Bảo Lộc"
          description="Khách sạn gia đình tại Bảo Lộc — không gian yên tĩnh, sạch sẽ, giá cả phải chăng."
          ctaText="Liên Hệ"
          ctaHref="/lien-he"
        />
        <PropertyCard
          featured={false}
          name="Hải An Homestay Bảo Lộc"
          description="Homestay ấm cúng tại Bảo Lộc — trải nghiệm gần gũi, không gian xanh mát."
          ctaText="Liên Hệ"
          ctaHref="/lien-he"
        />
      </div>
    </Section>
  </section>
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: No errors. Cơ Sở section shows a wide horizontal card for Hải An Villa Đà Lạt with two smaller cards below it.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: redesign Co So section — featured horizontal first card, 2-col grid below"
```

---

### Task 5: Improve Blog section cards

**Files:**
- Modify: `src/pages/index.astro`

Changes: image area `h-48` → `h-56`, article title `text-lg` → `text-xl` (three articles).

- [ ] **Step 1: Read the file**

```
Read: src/pages/index.astro
```
Locate `<!-- Blog Section -->`.

- [ ] **Step 2: Update first article image height and title size**

Find:
```html
          <div class="bg-gradient-to-br from-accent-soft to-border rounded-xl h-48 mb-4 overflow-hidden relative">
```
Replace with:
```html
          <div class="bg-gradient-to-br from-accent-soft to-border rounded-xl h-56 mb-4 overflow-hidden relative">
```

Find:
```html
          <h3 class="font-heading font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
            Top 5 điểm check-in đẹp nhất Đà Lạt 2025
```
Replace with:
```html
          <h3 class="font-heading font-bold text-primary text-xl mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
            Top 5 điểm check-in đẹp nhất Đà Lạt 2025
```

- [ ] **Step 3: Update second article image height and title size**

Find:
```html
          <div class="bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl h-48 mb-4 overflow-hidden relative">
```
Replace with:
```html
          <div class="bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl h-56 mb-4 overflow-hidden relative">
```

Find:
```html
          <h3 class="font-heading font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
            Kinh nghiệm du lịch Bảo Lộc cho người mới
```
Replace with:
```html
          <h3 class="font-heading font-bold text-primary text-xl mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
            Kinh nghiệm du lịch Bảo Lộc cho người mới
```

- [ ] **Step 4: Update third article image height and title size**

Find:
```html
          <div class="bg-gradient-to-br from-accent/20 to-accent-soft rounded-xl h-48 mb-4 overflow-hidden relative">
```
Replace with:
```html
          <div class="bg-gradient-to-br from-accent/20 to-accent-soft rounded-xl h-56 mb-4 overflow-hidden relative">
```

Find:
```html
          <h3 class="font-heading font-bold text-primary text-lg mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
            Lịch trình 3 ngày 2 đêm Đà Lạt — Bảo Lộc
```
Replace with:
```html
          <h3 class="font-heading font-bold text-primary text-xl mb-2 group-hover:text-accent transition-colors duration-200 leading-snug">
            Lịch trình 3 ngày 2 đêm Đà Lạt — Bảo Lộc
```

- [ ] **Step 5: Build and verify**

Run: `npm run build`
Expected: No errors. Blog cards have taller image areas and larger article titles.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: improve Blog section — taller images, larger article titles"
```

---

### Task 6: Add Vị trí section before Footer

**Files:**
- Modify: `src/pages/index.astro`

Add a new `<section id="vi-tri">` with a styled map placeholder between the Blog section and the Footer. No new text copy — only the section heading "Vị Trí" (same label as the existing nav item) and a visual map placeholder div.

- [ ] **Step 1: Read the file**

```
Read: src/pages/index.astro
```
Locate the line `<Footer />` near the bottom.

- [ ] **Step 2: Insert Vị trí section before Footer**

Find:
```html
  <Footer />
  <StickyContactBar />
```
Replace with:
```html
  <!-- Vị Trí Section -->
  <section id="vi-tri" class="bg-background">
    <Section maxWidth={true}>
      <div class="mb-10">
        <h2 class="text-2xl md:text-3xl font-heading font-bold text-primary">
          Vị Trí
        </h2>
        <div class="w-12 h-0.5 bg-accent mt-3"></div>
      </div>
      <div class="rounded-2xl overflow-hidden border border-border h-80 md:h-[480px] bg-accent-soft relative">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="opacity-20" aria-hidden="true">
            <svg class="w-20 h-20 text-primary mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </Section>
  </section>

  <Footer />
  <StickyContactBar />
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: No errors. A "Vị Trí" section with a beige map placeholder appears between Blog and Footer.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add Vi tri section as map placeholder before footer"
```

---

### Task 7: Update Header nav "Vị Trí" link

**Files:**
- Modify: `src/components/Header.astro`

Update the `href` of "Vị Trí" links from `/#footer` to `/#vi-tri` in both desktop nav and mobile nav. The label text "Vị Trí" must NOT change.

- [ ] **Step 1: Read the file**

```
Read: src/components/Header.astro
```
Find all occurrences of `/#footer` used for the "Vị Trí" nav item.

- [ ] **Step 2: Update desktop nav link**

Find:
```html
      <a href="/#footer" class="text-text-muted hover:text-primary text-base font-medium transition-colors duration-200 relative group">
        Vị Trí
```
Replace with:
```html
      <a href="/#vi-tri" class="text-text-muted hover:text-primary text-base font-medium transition-colors duration-200 relative group">
        Vị Trí
```

- [ ] **Step 3: Update mobile nav link**

Find:
```html
      <a href="/#footer" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Vị Trí</a>
```
Replace with:
```html
      <a href="/#vi-tri" class="block text-text-muted hover:text-primary hover:bg-accent-soft text-sm py-3 px-3 rounded-lg transition-all duration-200 font-medium">Vị Trí</a>
```

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: No errors. Clicking "Vị Trí" in nav scrolls to `#vi-tri` section, not to the footer.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro
git commit -m "fix: update Vi Tri nav link to point to #vi-tri section"
```

---

## Final Verification

After all 7 tasks complete:

1. Run `npm run build` — must be clean
2. Run `npm run dev` and open `http://localhost:4321`
3. Verify homepage structure top to bottom:
   - Header (fixed, unchanged)
   - Hero: ~80vh tall, dark gradient overlay at bottom, no text overlay
   - Giới thiệu: faint `"` behind heading, body text slightly larger
   - Cơ sở: wide horizontal first card + 2-col grid below
   - Blog: taller image cards, larger titles
   - Vị trí: beige map placeholder with pin icon
   - Footer: unchanged
4. Confirm no text content changed anywhere
5. Confirm Rooms and Gallery sections are gone
6. Confirm "Vị Trí" nav link scrolls to the map placeholder section
