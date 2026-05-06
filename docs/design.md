# Design System - Hải An Villa Hotel

## Design Context

Hải An is a small family-run hotel with clean, warm, simple, and comfortable rooms. The design should feel friendly, trustworthy, and easy to read—inspired by the real hotel logo and room photos.

**Key Principles:**
- Feel friendly, trustworthy, and easy to read
- Do NOT look like a luxury resort or corporate hotel
- Do NOT look like a SaaS landing page
- Emphasize simplicity and approachability

## Brand Direction

### Logo Inspiration
- Logo style: warm gold and dark gray
- Room aesthetic: warm wood tones, soft gray walls, white bedding, beige lighting, clean bathroom tiles

### Color Palette

**Recommended Color Tokens:**
- **primary**: `#3F3F3F` (charcoal / dark gray, inspired by logo text)
- **primary-dark**: `#2B2B2B` (darker charcoal for emphasis)
- **accent**: `#C9952E` (warm gold, inspired by logo wave)
- **accent-soft**: `#F3E5C2` (light gold for backgrounds)
- **background**: `#FAF8F3` (warm white / off-white)
- **surface**: `#FFFFFF` (pure white)
- **surface-warm**: `#F5EFE4` (beige / light cream)
- **text-main**: `#2F2F2F` (dark gray for primary text)
- **text-muted**: `#6B6B6B` (medium gray for secondary text)
- **border**: `#E6DDCF` (warm neutral for borders)
- **wood**: `#A67845` (natural wood brown for accents)

**Color Usage:**
- Primary dark: headlines, CTAs, main UI elements
- Accent: buttons, highlights, important actions
- Accent-soft: subtle backgrounds, hover states
- Background: main page background
- Surface: cards, panels, containers
- Surface-warm: alternative card backgrounds, section dividers
- Text main: body text, primary information
- Text muted: supporting text, secondary information
- Wood: accent details, room/wooden elements

### Typography

**Philosophy:** Clean and modern, easy to read on mobile, no overly decorative fonts.

**Font Recommendations:**

*Heading (elegant but readable):*
- Option 1: Playfair Display (serif, elegant)
- Option 2: Cormorant Garamond (serif, refined)
- Option 3: Merriweather (serif, warm)
- Option 4: Clean sans-serif (if keeping it simple)

*Body (modern sans-serif):*
- Option 1: Inter (clean, modern)
- Option 2: Noto Sans (universal, readable)
- Option 3: Be Vietnam Pro (Vietnamese-friendly)
- Option 4: System fonts first (if keeping it simple)

**Typography System:**
- H1 (Hero): TBD (size/weight)
- H2 (Section heading): TBD (size/weight)
- H3 (Card title): TBD (size/weight)
- Body (default): TBD (size/weight)
- Small (supporting text): TBD (size/weight)
- Line heights: TBD

## Layout System

### Page Structure
One-page landing page with clear vertical sections:

1. **Header**
   - Simple logo/name on the left
   - Navigation links on desktop
   - Contact button/icon
   - Compact mobile menu if needed

2. **Hero**
   - Large hotel/room image (primary visual)
   - Hotel name: "HẢI AN HOTEL" or "Haian Hotel"
   - Short warm tagline
   - Main CTA: Call now (primary button)
   - Secondary CTA: Zalo / View map (secondary buttons)

3. **Introduction**
   - Short paragraph about family-run hotel
   - Emphasize: clean rooms, friendly support, convenient stay
   - No lengthy copy

4. **Room Types**
   - Display all 4 main room types:
     - Phòng đơn có ban công (Single with balcony)
     - Phòng đơn không ban công (Single without balcony)
     - Phòng đôi có ban công (Double with balcony)
     - Phòng đôi không ban công (Double without balcony)
   - Each room card includes:
     - Photo (real room photo)
     - Room name (Vietnamese + English)
     - Short description
     - Capacity
     - Key amenities (as tags)
     - Price or TBD
     - Contact CTA (small button or link)

5. **Amenities**
   - Display as simple icon/text cards:
     - Free Wi-Fi
     - Motorbike parking
     - Car parking
     - Hot water
     - Clean rooms
     - Family-friendly atmosphere
   - Optional feature tags (when available):
     - BBQ yard access
     - Balcony options
   - Icon set: TBD

6. **Gallery**
   - Clean photo grid (3-4 photos per row on desktop)
   - Avoid heavy frames or decorative collage
   - Let real photos speak for themselves

7. **Location**
   - Address
   - Google Map embed or button
   - Nearby landmarks (if available)

8. **Contact**
   - Phone number
   - Zalo contact
   - Address
   - Check-in: 14:00 / Check-out: 12:00
   - Clear final CTA
   - Contact icons/buttons should be easy to tap on mobile

### Spacing & Layout

**Mobile (base):**
- Section padding: 48px top/bottom, 16px left/right
- Content max-width: full width with padding
- Card padding: 16px
- Card margin-bottom: 16px

**Tablet:**
- Section padding: 64px top/bottom, 24px left/right
- Content max-width: TBD

**Desktop:**
- Section padding: 80px top/bottom
- Content max-width: approximately 1120px
- Cards: comfortable padding and spacing

**General Spacing:**
- Use generous padding between sections
- Do not overcrowd content
- Plenty of whitespace

### Responsive Design

- **Mobile First**: Yes
- **Mobile Breakpoint**: 320px - 640px
- **Tablet Breakpoint**: 641px - 1024px
- **Desktop Breakpoint**: 1025px+
- Sticky bottom contact bar on mobile (optional):
  - Call button
  - Zalo button
  - Map button

## Component Styles

### Buttons

**Primary Button:**
- Background: dark gray (#3F3F3F)
- Text: white
- Padding: TBD
- Border radius: TBD
- Hover: darker background (#2B2B2B)
- Touch-friendly size on mobile (min 44px height)

**Accent Button:**
- Background: warm gold (#C9952E)
- Text: white or dark gray (contrast check needed)
- Padding: TBD
- Border radius: TBD
- Hover: darker gold or accent-soft background

**Secondary Button:**
- Background: white or transparent
- Border: 1px dark gray (#3F3F3F)
- Text: dark gray
- Padding: TBD
- Border radius: TBD
- Hover: light background (accent-soft)

### Cards

- Background: white (#FFFFFF) or warm white (#F5EFE4)
- Border radius: soft corners (8px - 12px recommended)
- Shadow: soft shadow (e.g., 0 2px 8px rgba(0,0,0,0.1))
- Padding: comfortable spacing (16px - 24px)
- Image: rounded top corners, object-fit cover

### Navigation

- Header background: white or warm white
- Logo: left aligned
- Nav links: center or right aligned on desktop
- Mobile menu: hamburger icon, slide-out menu
- Contact button: always visible

### Images

**Style:**
- Rounded corners (match card styling)
- Object-fit: cover
- Avoid excessive filters
- Keep photos bright and natural
- Use real hotel/room photos as main visual strength

**Aspect Ratios:**
- Hero image: TBD (wide landscape recommended)
- Room cards: TBD (portrait or landscape)
- Gallery: TBD (consistent aspect ratio)

**File Formats:**
- WebP (primary)
- JPG (fallback)
- Optimization: compress for fast loading

### Icons

**Icon Set:**
- Simple, clean icon style
- Consistent stroke weight
- Recommended sources: Feather Icons, Material Icons, or custom SVGs
- Icon styles: WiFi, Car, Droplet, Home, MapPin, Phone, MessageCircle

**Icon + Text Amenities:**
- Icon (24px - 32px)
- Label below or beside
- Centered alignment

## Accessibility

- **Color Contrast**: Check WCAG AA compliance for all text
- **Font Size**: Minimum 16px for body text on mobile
- **Alt Text**: Required for all images
- **Touch Targets**: Minimum 44px × 44px for buttons/interactive elements
- **Mobile Readable**: Large font sizes, generous spacing

## Branding

- **Hotel Name**: Hải An Hotel / HẢI AN HOTEL / Haian Hotel
- **Tagline**: TBD (short, warm, family-friendly)
- **Logo**: Use real hotel logo as provided
- **Logo Placement**: Header (left), possibly footer

## Do NOT:

- Do NOT use luxury hotel wording (premium, suite, executive, 5-star, resort)
- Do NOT use too many animations
- Do NOT use dark full-page backgrounds
- Do NOT hide contact information
- Do NOT make the design too flashy
- Do NOT overuse gold; use it as accent only
- Do NOT make it look like a corporate/SaaS site
- Do NOT make it look like a luxury resort

## Design Guidelines

- Clean, modern, and professional appearance
- Warm, family-friendly aesthetic (inspired by real rooms)
- Hotel industry appropriate
- User-friendly navigation
- Fast loading design (optimize images)
- Mobile-optimized (mobile-first approach)
- Emphasize simplicity and approachability
- Let real photos be the star