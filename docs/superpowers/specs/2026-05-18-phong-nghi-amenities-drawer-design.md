# Amenities Drawer — Phòng Nghỉ

**Goal:** Limit amenities shown on page to 12, with an Agoda-style right-side drawer for the full list.

**Architecture:** Modify `src/pages/phong-nghi.astro` only. Pre-render one drawer per room, one shared overlay. Vanilla JS for open/close.

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS

---

## Changes to amenities section (inside room map)

Replace the current full-list grid with:

1. Grid showing first 12 amenities: `room.amenities.slice(0, 12)`
2. If `room.amenities.length > 12`: show button `"Xem tất cả {N} tiện nghi →"`
   - Class: `amenities-open text-xs text-accent font-semibold hover:underline underline-offset-2 mb-8 transition-colors text-left`
   - `data-drawer="drawer-{index}"`

## Drawer markup (after `</section>`, before `<Footer />`)

One shared overlay:
```html
<div id="drawer-overlay"
  class="fixed inset-0 bg-black/40 z-40 hidden opacity-0 transition-opacity duration-300"
  aria-hidden="true">
</div>
```

Five drawers (one per room, via `roomTypes.map`):
```html
<div id="drawer-{index}"
  class="fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-50 translate-x-full transition-transform duration-300 ease-in-out flex flex-col shadow-lg"
  role="dialog"
  aria-label="Tiện nghi — {room.name}"
  aria-modal="true">

  <!-- Header -->
  <div class="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
    <div>
      <p class="text-xs text-text-muted uppercase tracking-widest mb-0.5">Tiện nghi</p>
      <h3 class="font-heading font-semibold text-primary text-base leading-snug">{room.name}</h3>
    </div>
    <button type="button" class="drawer-close w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary transition-colors" aria-label="Đóng">
      <!-- X icon -->
    </button>
  </div>

  <!-- Body -->
  <div class="overflow-y-auto flex-1 px-6 py-6">
    <ul class="space-y-3">
      {room.amenities.map(a => (
        <li class="flex items-center gap-3 text-sm text-text-muted">
          <span class="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></span>
          {a}
        </li>
      ))}
    </ul>
  </div>
</div>
```

## JavaScript (added to existing `<script>` block)

```js
const overlay = document.getElementById('drawer-overlay');
let activeDrawer = null;

function openDrawer(id) {
  const drawer = document.getElementById(id);
  if (!drawer) return;
  activeDrawer = drawer;
  overlay.classList.remove('hidden');
  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0');
    drawer.classList.remove('translate-x-full');
  });
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  if (!activeDrawer) return;
  activeDrawer.classList.add('translate-x-full');
  overlay.classList.add('opacity-0');
  setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    activeDrawer = null;
  }, 300);
}

document.querySelectorAll('.amenities-open')
  .forEach(btn => btn.addEventListener('click', () => openDrawer(btn.dataset.drawer)));
document.querySelectorAll('.drawer-close')
  .forEach(btn => btn.addEventListener('click', closeDrawer));
overlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });
```

## Files changed

- **Modify:** `src/pages/phong-nghi.astro` only
