# Hải An Villa Hotel Website

A lightweight, static one-page landing page for **Hải An Villa Hotel** — a small family-run hotel.

**Stack:** Astro + Tailwind CSS (no backend, no database, no CMS)

## ✨ Features

- ✅ **Mobile-first design** — Fully responsive
- ✅ **9 sections** — Hero, intro, rooms, amenities, gallery, location, contact, footer
- ✅ **4 room types** — Single/Double with/without balcony
- ✅ **Design tokens** — Color system based on real hotel branding
- ✅ **Fast** — Static HTML generation (~15KB)
- ✅ **Clean code** — Reusable Astro components + Tailwind

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Documentation

- **Local Setup Guide:** `docs/local-setup.md` (how to run, test on mobile/desktop)
- **Design System:** `docs/design.md` (colors, typography, layout)
- **Content:** `docs/content.md` (hotel info, room types)
- **Requirements:** `docs/requirements.md` (features, sections)
- **Project Rules:** `CLAUDE.md` (scope, constraints)

## 📁 Project Structure

```
src/
├── components/      # Reusable Astro components
├── layouts/         # Base layout
├── pages/           # Landing page (index.astro)
└── styles/          # Global styles

docs/               # Documentation (design, content, requirements)
dist/               # Build output (generated)
```

## 🎨 Design

- **Colors:** Dark gray + warm gold accent + warm white background
- **Typography:** System fonts (upgrade to Playfair Display + Inter later)
- **Layout:** Mobile-first, max-width ~1120px on desktop

See `docs/design.md` for complete design system.

## 📞 Sections

1. **Header** — Logo, navigation, contact button
2. **Hero** — Welcome image, name, tagline, CTAs
3. **Introduction** — Short description
4. **Rooms** — 4 room type cards
5. **Amenities** — 7 facilities with icons
6. **Gallery** — Photo grid (6 placeholders)
7. **Location** — Address & Google Maps button
8. **Contact** — Phone, Zalo, email
9. **Footer** — Links, hours, copyright

## ⚠️ Limitations (TBD)

- [ ] Placeholder images (need real photos)
- [ ] System fonts (add Google Fonts: Playfair Display + Inter)
- [ ] No icon library yet (use emoji icons currently)
- [ ] No mobile hamburger menu
- [ ] No contact form backend
- [ ] Phone/Zalo/email links are placeholders

## 🔄 Development

**Edit content:**
- Room types, amenities → `src/pages/index.astro`
- Styling → `src/components/*.astro` + Tailwind classes
- Design tokens → `tailwind.config.mjs`

**Hot reload:** Changes auto-refresh in dev mode

## 🚢 Deployment

Build is ready for static hosting:
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Just push `dist/` folder.

## 📋 Next Steps

1. Add real hotel photos
2. Add Google Fonts
3. Update phone/email/Zalo info
4. Add mobile hamburger menu (optional)
5. Deploy to production

---

**Questions?** See `docs/local-setup.md` for detailed setup & testing guide.

## Project Overview

This is a personal project to create a simple, static website for Haian Hotel. The website serves as a digital business card with essential information and contact methods.

## Features

- One-page design with multiple sections
- Responsive layout
- Contact integration (phone, Zalo, Google Maps)
- Image gallery
- Location information

## Project Structure

```
D:\Projects-hotel-website/
├── CLAUDE.md                 # AI assistance instructions
├── README.md                 # This file
├── docs/
│   ├── requirements.md       # Functional requirements
│   ├── content.md            # Hotel content and information
│   ├── design.md             # Visual design guidelines
│   ├── local-setup.md        # Local development setup
│   └── deploy.md             # Deployment instructions
└── public/
    └── images/               # Static images
```

## Getting Started

1. Review the documentation in the `docs/` folder
2. Set up your local development environment (see `docs/local-setup.md`)
3. Follow the requirements and design guidelines

## Technology Stack

- Framework: Next.js or Astro (TBD)
- Styling: CSS/Tailwind (TBD)
- Deployment: Static hosting (TBD)

## Contact

This is a personal project. For questions about the project structure, refer to the documentation files.