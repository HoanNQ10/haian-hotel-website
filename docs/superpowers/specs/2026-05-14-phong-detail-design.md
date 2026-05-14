# Trang Detail Phòng — Design Spec

**Goal:** Tạo 14 trang detail tĩnh cho từng phòng cụ thể (`/phong/101`, `/phong/B201`…), mỗi trang có carousel ảnh (prev/next) và thông tin chi tiết phòng. Badge số phòng trên `/phong-nghi` trở thành link dẫn đến trang detail tương ứng.

**Architecture:** Astro dynamic route `src/pages/phong/[room].astro` với `getStaticPaths()` sinh 14 URL tĩnh. Data phòng định nghĩa trong `src/data/rooms.ts`. `phong-nghi.astro` chỉ cần thay badge `<span>` → `<a href="/phong/{num}">`, giữ nguyên `roomTypes` array inline.

**Tech Stack:** Astro 4, Tailwind CSS 3, Vanilla JS (carousel)

---

## File Map

- **Tạo:** `src/data/rooms.ts` — 14 phòng với data đầy đủ và placeholder slides
- **Tạo:** `src/pages/phong/[room].astro` — dynamic page + carousel JS
- **Sửa:** `src/pages/phong-nghi.astro` — badge số phòng → `<a>` link

---

## Data Model — `src/data/rooms.ts`

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

---

## Trang Detail — `src/pages/phong/[room].astro`

### getStaticPaths
```astro
export async function getStaticPaths() {
  return rooms.map((room) => ({
    params: { room: room.number },
    props: { room },
  }));
}
```

### Layout

```
Header
─────────────────────────────────────────────────────
max-w-container mx-auto px-4 md:px-8 py-10
  ← Tất cả phòng            [typeName — text-text-muted text-sm]
  Phòng {number}             [h1 text-3xl font-heading]
  ──── (accent divider)
─────────────────────────────────────────────────────
max-w-container mx-auto px-4 md:px-8 pb-6
  Carousel (aspect-[16/9] md:aspect-[3/1], rounded-2xl)
    [slides]
    ← prev button (absolute left)
    → next button (absolute right)
    counter "1 / 3" (absolute bottom-right)
─────────────────────────────────────────────────────
max-w-container mx-auto px-4 md:px-8 py-10
  grid md:grid-cols-2 gap-10 md:gap-16
    LEFT: dl detail grid (loại giường / sức chứa / tầng)
    RIGHT: ul amenities 2-col với SVG icons
  ───
  CTA "Liên Hệ Đặt Phòng" → /lien-he
─────────────────────────────────────────────────────
Footer
```

### Carousel HTML
```astro
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
  <button id="carousel-prev" class="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center shadow transition-all duration-200" aria-label="Ảnh trước">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
  </button>
  <button id="carousel-next" class="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary rounded-full w-9 h-9 flex items-center justify-center shadow transition-all duration-200" aria-label="Ảnh tiếp">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
  </button>
  <span id="carousel-counter" class="absolute bottom-3 right-4 bg-black/40 text-white text-xs px-2 py-1 rounded-full">1 / {room.slides.length}</span>
</div>
```

### Carousel JS
```html
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

---

## Thay đổi `src/pages/phong-nghi.astro`

Chỉ thay badge số phòng từ `<span>` thành `<a>`:

```astro
<!-- Before -->
<span class="text-xs bg-accent-soft text-primary px-3 py-1 font-medium">{num}</span>

<!-- After -->
<a href={`/phong/${num}`} class="text-xs bg-accent-soft text-primary px-3 py-1 font-medium hover:bg-accent hover:text-white transition-colors duration-200">{num}</a>
```

`roomTypes` array trong `phong-nghi.astro` giữ nguyên — không cần import từ rooms.ts.

---

## Amenities trong trang detail

Giống hệt phong-nghi.astro: WiFi, Điều hòa, Nước nóng, TV, WC riêng — thêm Ban công nếu `hasBalcony: true`. Cùng SVG icon + class.

---

## Out of Scope

- Ảnh thật (placeholder gradient đến khi có ảnh)
- Prev/next room navigation (chỉ back về /phong-nghi)
- Giá phòng
- Booking / availability
