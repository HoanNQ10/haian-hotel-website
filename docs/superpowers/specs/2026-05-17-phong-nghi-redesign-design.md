# Phòng Nghỉ Page Redesign

**Goal:** Redesign `/phong-nghi` to use an alternating image/content layout with real photo slideshows per room, matching the editorial style of the homepage.

**Architecture:** Single Astro page (`src/pages/phong-nghi.astro`) — no new components needed. Vanilla JS for slideshow logic inlined in a `<script>` tag.

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS

---

## Layout

### Page structure

- **Hero section**: unchanged — gradient background, title, subtitle
- **Rooms section**: `bg-[#EFEFED]`, `max-width 1120px mx-auto`, `px-4 md:px-8`, `py-16 md:py-24`
- **5 room cards** stacked vertically with `gap-10` (40px) between them

### Room card

Each room is a card:
```
rounded-2xl  overflow-hidden  bg-white  shadow-sm
```

Inside: `grid md:grid-cols-[55%_45%]`

- **Odd rooms (0, 2, 4)**: image left, content right
- **Even rooms (1, 3)**: image right (`md:order-2`), content left (`md:order-1`)

On mobile: image stacks on top, content below (single column).

### Image side (55%)

- Slideshow fills the full panel — no padding, image `object-cover w-full h-full`
- Minimum height: `min-h-[260px]` mobile, `min-h-[380px]` md
- Left/right arrow buttons overlaid (absolute positioned, vertically centered)
  - Style: `bg-white/80 hover:bg-white`, `rounded-full`, `w-9 h-9`, SVG chevron icon
  - Left arrow: `left-3`, Right arrow: `right-3`
- Dot indicators: absolute bottom center, `flex gap-1.5`
  - Active dot: `bg-white w-2 h-2 rounded-full`
  - Inactive dot: `bg-white/50 w-1.5 h-1.5 rounded-full`
- Image transition: `opacity` fade, `transition-opacity duration-300`

### Content side (45%)

Padding: `p-8 md:p-10`, `flex flex-col justify-center`

Layout top to bottom:

1. **Top row**: room name (h2) + CTA button side by side (`flex justify-between items-start gap-4`)
   - Name: `font-heading font-bold text-xl md:text-2xl text-primary`
   - CTA button: `bg-accent text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded flex-shrink-0 hover:bg-accent-dark`
   - Button text: "Liên Hệ Đặt Phòng"

2. **Specs row** (`flex gap-6 text-sm text-text-muted mt-3`):
   - Bed icon + bed type
   - People icon + capacity

3. **Divider**: `h-px bg-border my-5`

4. **Description**: `text-sm text-text-muted leading-relaxed`

5. **Divider**: `h-px bg-border my-5`

6. **Amenities heading**: `text-xs uppercase tracking-widest text-primary font-semibold mb-3`
   Text: "Tiện nghi"

7. **Amenities list**: 2-column grid (`grid grid-cols-2 gap-x-4 gap-y-1.5`)
   - Each item: `flex items-center gap-2 text-sm text-text-muted`
   - Bullet: `w-1 h-1 bg-accent rounded-full flex-shrink-0`

---

## Data structure

Each room in `roomTypes` gains an `images` array replacing the single `image` field:

```js
{
  name: string,
  description: string,
  bedType: string,
  capacity: string,
  amenities: string[],
  detailHref: string,
  images: string[],   // all photos for this room, URL-encoded paths
}
```

### Image paths per room

**Phòng Tiêu Chuẩn – 1 Giường Đôi** (4 images):
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.JPG`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.jpg`

**Phòng Tiêu Chuẩn – 2 Giường Đôi** (4 images):
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.jpg`

**Phòng Tiêu Chuẩn Có Ban Công – 1 Giường Đôi** (5 images):
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.JPG`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%201%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/5.jpg`

**Phòng Tiêu Chuẩn Có Ban Công – 2 Giường Đôi** (7 images):
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.JPG`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.JPG`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/5.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/6.jpg`
- `/images/rooms/Ph%C3%B2ng%20Ti%C3%AAu%20Chu%E1%BA%A9n%20C%C3%B3%20Ban%20C%C3%B4ng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/7.JPG`

**Phòng Sân BBQ Riêng – 2 Giường Đôi** (6 images):
- `/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/1.jpg`
- `/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/2.jpg`
- `/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/3.JPG`
- `/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/4.JPG`
- `/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/5.jpg`
- `/images/rooms/Ph%C3%B2ng%20S%C3%A2n%20BBQ%20Ri%C3%AAng%20%E2%80%93%202%20Gi%C6%B0%E1%BB%9Dng%20%C4%90%C3%B4i/6.jpg`

---

## Slideshow JavaScript

One `<script>` tag at the bottom of the page. Logic:

1. Query all `.room-slideshow` elements
2. For each: track `currentIndex`, handle prev/next buttons, update active image opacity, update dot indicators
3. Wrap-around: last → first, first → last
4. Fade transition: set outgoing image `opacity-0`, set incoming image `opacity-100`, swap after 300ms

```js
document.querySelectorAll('.room-slideshow').forEach(slideshow => {
  const imgs = slideshow.querySelectorAll('.slide-img');
  const dots = slideshow.querySelectorAll('.slide-dot');
  let current = 0;

  function goTo(index) {
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

  slideshow.querySelector('.prev-btn').addEventListener('click', () => goTo(current - 1));
  slideshow.querySelector('.next-btn').addEventListener('click', () => goTo(current + 1));
});
```

---

## Files changed

- **Modify**: `src/pages/phong-nghi.astro` — full rewrite of rooms section and data

No new components, no new dependencies.
