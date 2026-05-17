# Amenities Drawer — Phòng Nghỉ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Limit amenities shown on the phong-nghi page to 12 per room, with an Agoda-style right-side drawer revealing the full list.

**Architecture:** Single file change — `src/pages/phong-nghi.astro`. The amenities grid uses `.slice(0, 12)`, a trigger button stores `data-drawer` pointing to a pre-rendered drawer per room, and vanilla JS handles open/close with opacity + translate transitions.

**Tech Stack:** Astro 4, Tailwind CSS 3, vanilla JS (TypeScript in `<script>`)

---

## File Map

- **Modify:** `src/pages/phong-nghi.astro`

---

### Task 1: Limit amenities grid and add drawer trigger button

**Files:**
- Modify: `src/pages/phong-nghi.astro` (amenities section inside `roomTypes.map`)

- [ ] **Step 1: Verify build passes before starting**

```powershell
npm run build
```
Expected: exits 0, no errors.

- [ ] **Step 2: Replace the amenities grid**

Find this block (inside the `roomTypes.map` loop, around line 207):

```astro
              <!-- Amenities -->
              <h3 class="font-heading text-xl text-primary mb-4">Tiện nghi</h3>
              <div class="grid grid-cols-2 gap-x-8 gap-y-2.5 mb-8">
                {room.amenities.map(a => (
                  <div class="flex items-center gap-2 text-sm text-text-muted">
                    <span class="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" aria-hidden="true"></span>
                    {a}
                  </div>
                ))}
              </div>
```

Replace with:

```astro
              <!-- Amenities -->
              <h3 class="font-heading text-xl text-primary mb-4">Tiện nghi</h3>
              <div class="grid grid-cols-2 gap-x-8 gap-y-2.5 mb-4">
                {room.amenities.slice(0, 12).map(a => (
                  <div class="flex items-center gap-2 text-sm text-text-muted">
                    <span class="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" aria-hidden="true"></span>
                    {a}
                  </div>
                ))}
              </div>
              {room.amenities.length > 12 && (
                <button
                  type="button"
                  class="amenities-open text-xs text-accent font-semibold hover:underline underline-offset-2 mb-8 transition-colors text-left"
                  data-drawer={`drawer-${index}`}
                >
                  Xem tất cả {room.amenities.length} tiện nghi →
                </button>
              )}
```

- [ ] **Step 3: Verify build passes**

```powershell
npm run build
```
Expected: exits 0.

- [ ] **Step 4: Commit**

```powershell
git add src/pages/phong-nghi.astro
git commit -m "feat: limit amenities to 12 with xem tat ca trigger"
```

---

### Task 2: Add drawer overlay and per-room drawer panels

**Files:**
- Modify: `src/pages/phong-nghi.astro` (after `</section>`, before `<Footer />`)

- [ ] **Step 1: Add overlay and drawers**

Find this line:

```astro
  <Footer />
```

Insert before it:

```astro
  <!-- Amenities drawers -->
  <div id="drawer-overlay" class="fixed inset-0 bg-black/40 z-40 hidden opacity-0 transition-opacity duration-300" aria-hidden="true"></div>

  {roomTypes.map((room, index) => (
    <div
      id={`drawer-${index}`}
      class="fixed top-0 right-0 h-full w-full max-w-sm bg-surface z-50 translate-x-full transition-transform duration-300 ease-in-out flex flex-col shadow-lg"
      role="dialog"
      aria-label={`Tiện nghi — ${room.name}`}
      aria-modal="true"
    >
      <div class="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
        <div>
          <p class="text-xs text-text-muted uppercase tracking-widest mb-0.5">Tiện nghi</p>
          <h3 class="font-heading font-semibold text-primary text-base leading-snug">{room.name}</h3>
        </div>
        <button type="button" class="drawer-close w-8 h-8 flex items-center justify-center text-text-muted hover:text-primary transition-colors" aria-label="Đóng">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="overflow-y-auto flex-1 px-6 py-6">
        <ul class="space-y-3">
          {room.amenities.map(a => (
            <li class="flex items-center gap-3 text-sm text-text-muted">
              <span class="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" aria-hidden="true"></span>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  ))}

  <Footer />
```

- [ ] **Step 2: Verify build passes**

```powershell
npm run build
```
Expected: exits 0.

- [ ] **Step 3: Commit**

```powershell
git add src/pages/phong-nghi.astro
git commit -m "feat: add amenities drawer panels and overlay"
```

---

### Task 3: Add drawer open/close JavaScript

**Files:**
- Modify: `src/pages/phong-nghi.astro` (existing `<script>` block)

- [ ] **Step 1: Add drawer JS to the existing script block**

Find the end of the existing `<script>` block:

```typescript
      if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    });
  </script>
```

Replace with:

```typescript
      if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));
    });

    const overlay = document.getElementById('drawer-overlay')!;
    let activeDrawer: HTMLElement | null = null;

    function openDrawer(id: string) {
      const drawer = document.getElementById(id) as HTMLElement;
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

    document.querySelectorAll<HTMLElement>('.amenities-open').forEach(btn => {
      btn.addEventListener('click', () => openDrawer(btn.dataset.drawer!));
    });

    document.querySelectorAll('.drawer-close').forEach(btn => {
      btn.addEventListener('click', closeDrawer);
    });

    overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  </script>
```

- [ ] **Step 2: Verify build passes**

```powershell
npm run build
```
Expected: exits 0.

- [ ] **Step 3: Check visually in dev server**

```powershell
npm run dev
```

Open `http://localhost:4321/phong-nghi` and verify:
- Each room shows exactly 12 amenities (or all if fewer than 12)
- "Xem tất cả N tiện nghi →" button appears below the grid
- Clicking the button slides in the drawer from the right
- Drawer shows room name + full amenities list
- Clicking ✕, clicking overlay, or pressing Escape closes the drawer
- Scroll is locked on `<body>` while drawer is open

- [ ] **Step 4: Commit**

```powershell
git add src/pages/phong-nghi.astro
git commit -m "feat: add drawer open/close JS for amenities"
```
