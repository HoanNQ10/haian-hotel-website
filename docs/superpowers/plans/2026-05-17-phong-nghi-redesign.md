# Phòng Nghỉ Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `/phong-nghi` to display 5 rooms as white cards with an alternating image-left/image-right layout, a photo slideshow per room, and a 2-column amenity bullet list.

**Architecture:** Single file rewrite of `src/pages/phong-nghi.astro`. Hero section unchanged. Rooms section replaced with one wrapper `<section>` containing 5 card `<div>`s. Vanilla JS slideshow in an inline `<script>` tag — no external libraries.

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS

---

## File Structure

- **Modify only:** `src/pages/phong-nghi.astro`
  - Update `roomTypes` data: replace `image` (single string) with `images` (array of strings)
  - Replace the `{roomTypes.map(...)}` section with new card layout
  - Add `<script>` tag for slideshow before `</Layout>`

---

### Task 1: Update room data — replace `image` with `images[]`

**Files:**
- Modify: `src/pages/phong-nghi.astro:6-52`

- [ ] **Step 1: Replace the entire `roomTypes` array in the frontmatter**

Replace lines 6–52 with:

```js
const roomTypes = [
  {
    name: "Phòng Tiêu Chuẩn – 1 Giường Đôi",
    description: "Phòng tiêu chuẩn ấm cúng với 1 giường đôi, đầy đủ tiện nghi cơ bản. Thích hợp cho cặp đôi hoặc khách đi một mình muốn không gian riêng tư thoải mái giữa lòng Đà Lạt.",
    bedType: "1 giường đôi",
    capacity: "1–2 người",
    amenities: ["WiFi miễn phí", "Điều hòa", "Nước nóng", "TV", "WC riêng"],
    images: [
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.JPG",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.jpg",
    ]
  },
  {
    name: "Phòng Tiêu Chuẩn – 2 Giường Đôi",
    description: "Phòng rộng rãi với 2 giường đôi, phù hợp cho gia đình hoặc nhóm bạn. Không gian thoáng đãng, đủ chỗ nghỉ ngơi thoải mái cho cả nhóm.",
    bedType: "2 giường đôi",
    capacity: "2–4 người",
    amenities: ["WiFi miễn phí", "Điều hòa", "Nước nóng", "TV", "WC riêng"],
    images: [
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.jpg",
    ]
  },
  {
    name: "Phòng Tiêu Chuẩn Có Ban Công – 1 Giường Đôi",
    description: "Phòng tiêu chuẩn với ban công riêng — thêm không gian để thưởng thức không khí trong lành buổi sáng. 1 giường đôi, lý tưởng cho cặp đôi muốn không gian riêng tư và thoáng đãng.",
    bedType: "1 giường đôi",
    capacity: "1–2 người",
    amenities: ["WiFi miễn phí", "Điều hòa", "Nước nóng", "TV", "WC riêng", "Ban công riêng"],
    images: [
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.JPG",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/5.jpg",
    ]
  },
  {
    name: "Phòng Tiêu Chuẩn Có Ban Công – 2 Giường Đôi",
    description: "Rộng rãi với 2 giường đôi và ban công riêng thoáng mát. Lựa chọn lý tưởng cho gia đình muốn có thêm không gian thư giãn ngoài trời ngay tại phòng.",
    bedType: "2 giường đôi",
    capacity: "2–4 người",
    amenities: ["WiFi miễn phí", "Điều hòa", "Nước nóng", "TV", "WC riêng", "Ban công riêng"],
    images: [
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.JPG",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.JPG",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/5.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/6.jpg",
      "/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/7.JPG",
    ]
  },
  {
    name: "Phòng Sân BBQ Riêng – 2 Giường Đôi",
    description: "Phòng đặc biệt với sân BBQ riêng tư — trải nghiệm độc đáo chỉ có tại Hải An. Thưởng thức buổi tối nướng BBQ cùng gia đình hoặc bạn bè trong không gian riêng ấm cúng và đáng nhớ.",
    bedType: "2 giường đôi",
    capacity: "2–4 người",
    amenities: ["WiFi miễn phí", "Điều hòa", "Nước nóng", "TV", "WC riêng", "Sân BBQ riêng"],
    images: [
      "/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.jpg",
      "/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg",
      "/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.JPG",
      "/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.JPG",
      "/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/5.jpg",
      "/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/6.jpg",
    ]
  }
];
```

- [ ] **Step 2: Verify the dev server still compiles**

Run: `npm run dev` (already running at `http://localhost:4321`)  
Open `http://localhost:4321/phong-nghi` — page should still load (images will be broken until Task 2 fixes the template).  
Expected: no build error in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/pages/phong-nghi.astro
git commit -m "refactor: replace single image with images array for phong-nghi rooms"
```

---

### Task 2: Rewrite rooms section — card layout with slideshow HTML

**Files:**
- Modify: `src/pages/phong-nghi.astro:72-135`

Replace the entire `{roomTypes.map(...)}` block (currently lines 72–135, between `</section>` of hero and `<Footer />`) with the following. This removes the per-room `<section>` pattern and replaces it with one wrapper `<section>` containing white cards.

- [ ] **Step 1: Replace the rooms map block**

Delete everything from line 72 to line 135 (the `{roomTypes.map...}` block) and replace with:

```astro
  <!-- Rooms -->
  <section class="bg-[#EFEFED]" aria-label="Danh sách phòng nghỉ">
    <div class="max-w-container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div class="flex flex-col gap-10">
        {roomTypes.map((room, index) => (
          <div class="rounded-2xl overflow-hidden bg-white shadow-sm" aria-label={room.name}>
            <div class={`grid md:grid-cols-[55%_45%]`}>

              <!-- Slideshow -->
              <div class={`relative room-slideshow min-h-[260px] md:min-h-[420px]${index % 2 !== 0 ? ' md:order-2' : ''}`}>
                {room.images.map((src, i) => (
                  <img
                    src={src}
                    alt={`${room.name} — ảnh ${i + 1}`}
                    class={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300${i === 0 ? ' opacity-100' : ' opacity-0'}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}

                <!-- Prev button -->
                <button
                  class="prev-btn absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  aria-label="Ảnh trước"
                >
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>

                <!-- Next button -->
                <button
                  class="next-btn absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-sm transition-colors"
                  aria-label="Ảnh tiếp theo"
                >
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>

                <!-- Dot indicators -->
                <div class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
                  {room.images.map((_, i) => (
                    <span class={`slide-dot rounded-full bg-white transition-all duration-300${i === 0 ? ' w-2 h-2 opacity-100' : ' w-1.5 h-1.5 opacity-50'}`}></span>
                  ))}
                </div>
              </div>

              <!-- Content -->
              <div class={`p-8 md:p-10 flex flex-col justify-center${index % 2 !== 0 ? ' md:order-1' : ''}`}>

                <!-- Name + CTA -->
                <div class="flex justify-between items-start gap-4 mb-3">
                  <h2 class="font-heading font-bold text-xl md:text-2xl text-primary leading-snug">{room.name}</h2>
                  <a
                    href="/lien-he"
                    class="flex-shrink-0 bg-accent text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded hover:bg-accent-dark transition-colors"
                  >
                    Liên Hệ
                  </a>
                </div>

                <!-- Specs -->
                <div class="flex flex-wrap gap-5 text-sm text-text-muted mb-5">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 7h18M3 7v10h18V7M3 11h18"/>
                    </svg>
                    {room.bedType}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zm14 10v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                    {room.capacity}
                  </span>
                </div>

                <div class="h-px bg-border mb-5"></div>

                <!-- Description -->
                <p class="text-sm text-text-muted leading-relaxed">{room.description}</p>

                <div class="h-px bg-border my-5"></div>

                <!-- Amenities -->
                <p class="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Tiện nghi</p>
                <div class="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {room.amenities.map(a => (
                    <div class="flex items-center gap-2 text-sm text-text-muted">
                      <span class="w-1 h-1 bg-accent rounded-full flex-shrink-0" aria-hidden="true"></span>
                      {a}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:4321/phong-nghi`.  
Expected:
- 5 white cards on a gray background (`#EFEFED`), separated by gaps
- Each card: photo on left (or right alternating), content on right
- First image shows per room (slideshow arrows visible but JS not wired yet)
- 2-column amenity list visible
- Gold "Liên Hệ" button top-right of each card content area

- [ ] **Step 3: Commit**

```bash
git add src/pages/phong-nghi.astro
git commit -m "feat: redesign phong-nghi with alternating card layout and slideshow HTML"
```

---

### Task 3: Add slideshow JavaScript

**Files:**
- Modify: `src/pages/phong-nghi.astro` — add `<script>` before `</Layout>`

- [ ] **Step 1: Add the script tag**

Find this line near the bottom of the file:
```astro
  <Footer />
</Layout>
```

Insert the `<script>` block between `<Footer />` and `</Layout>`:

```astro
  <Footer />

  <script>
    document.querySelectorAll('.room-slideshow').forEach(slideshow => {
      const imgs = Array.from(slideshow.querySelectorAll('img'));
      const dots = Array.from(slideshow.querySelectorAll('.slide-dot'));
      let current = 0;

      function goTo(index: number) {
        imgs[current].classList.remove('opacity-100');
        imgs[current].classList.add('opacity-0');
        dots[current].classList.remove('opacity-100', 'w-2', 'h-2');
        dots[current].classList.add('opacity-50', 'w-1.5', 'h-1.5');

        current = (index + imgs.length) % imgs.length;

        imgs[current].classList.remove('opacity-0');
        imgs[current].classList.add('opacity-100');
        dots[current].classList.remove('opacity-50', 'w-1.5', 'h-1.5');
        dots[current].classList.add('opacity-100', 'w-2', 'h-2');
      }

      slideshow.querySelector('.prev-btn')!.addEventListener('click', () => goTo(current - 1));
      slideshow.querySelector('.next-btn')!.addEventListener('click', () => goTo(current + 1));
    });
  </script>
</Layout>
```

Note: Astro processes `<script>` tags — TypeScript syntax (`number`, `!`) is valid here.

- [ ] **Step 2: Verify slideshow works in browser**

Open `http://localhost:4321/phong-nghi`.  
Check each room card:
- Click the `>` (next) arrow — image fades to the second photo, active dot changes to full-size white
- Click `<` (prev) arrow — image fades back
- On the last image, clicking next wraps around to the first
- On the first image, clicking prev wraps around to the last
- Each room's slideshow works independently (navigating room 1 doesn't affect room 2)

- [ ] **Step 3: Commit**

```bash
git add src/pages/phong-nghi.astro
git commit -m "feat: add vanilla JS photo slideshow to phong-nghi room cards"
```

---

### Task 4: Final visual check and cleanup

**Files:**
- No new files

- [ ] **Step 1: Check mobile layout**

Open browser DevTools → toggle mobile view (375px width).  
Expected:
- Each card: image stacks on top, content below (single column)
- Image height at least 260px (from `min-h-[260px]`)
- Slideshow arrows still visible and tappable
- Amenity list switches to single-column (grid-cols-2 may wrap — that's fine)
- No horizontal overflow

- [ ] **Step 2: Check alternating order**

At desktop width (≥768px):
- Room 1 (index 0): image LEFT, content RIGHT
- Room 2 (index 1): image RIGHT, content LEFT
- Room 3 (index 2): image LEFT, content RIGHT
- Room 4 (index 3): image RIGHT, content LEFT
- Room 5 (index 4): image LEFT, content RIGHT

- [ ] **Step 3: Commit final**

```bash
git add src/pages/phong-nghi.astro
git commit -m "chore: final visual verification of phong-nghi redesign"
```

Only commit if you made any last-minute fixes. Skip this commit if no changes were needed.
