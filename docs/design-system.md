# Sai Pooja Fabrication — Design System & UI Foundation

## 1. Brand Identity & Visual Language

**Sai Pooja Fabrication** represents **Premium Agricultural Engineering & Industrial Fabrication**.
The design blends heavy-duty machinery resilience with high-end editorial composition, structured technical grids, and restrained motion.

---

## 2. Color System

### Primary Brand Palette
| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| **Forest 900** | `#10271D` | Darkest brand surfaces, footer, deep overlays, dark navigation |
| **Forest 800** | `#173B2C` | Primary brand green, hero cards, selected states, badges |
| **Forest 600** | `#2F6B45` | Agricultural action green, button hover states, interactive links |

### Neutral Palette
| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| **Pure Black** | `#090C0A` | Deepest contrast, technical labels, badges background |
| **Charcoal** | `#151A17` | Industrial dark surfaces, primary dark text |
| **Slate** | `#252C28` | Secondary dark background, borders on dark cards |
| **Warm Gray** | `#6E746F` | Secondary body text, captions, inactive icons |
| **Light Gray** | `#D8D9D3` | Low-contrast borders, dividers, subtle fills |
| **Warm White** | `#F4F1E8` | Secondary warm background, light text on dark surfaces |
| **Soft White** | `#FAFAF7` | Primary light background, canvas surface |

### Accent Color
| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| **Forge Amber** | `#C8913D` | Metal, craftsmanship, active indicators, technical details, arrows |

### Semantic Palette
| Token | Hex | Role / Usage |
| :--- | :--- | :--- |
| **Success** | `#3D8B5A` | Form validation success, status tags |
| **Warning** | `#C8913D` | Warnings, alerts |
| **Error** | `#B84A45` | Destructive actions, validation errors |
| **Info** | `#557A91` | Informational badges and tips |

---

## 3. Surface Rhythm System

The website relies on alternating surface rhythm across sections:
- `.surface-soft-white`: `#FAFAF7` background with `#151A17` text.
- `.surface-warm-white`: `#F4F1E8` background with `#151A17` text.
- `.surface-charcoal`: `#151A17` background with `#F4F1E8` text.
- `.surface-forest-900`: `#10271D` background with `#F4F1E8` text.
- `.surface-forest-800`: `#173B2C` background with `#F4F1E8` text.

---

## 4. Typography System

### Font Families
- **Display Font**: `Space Grotesk` (`--font-space-grotesk`) — Headlines, hero typography, product names, numbers.
- **Body / UI Font**: `Inter` (`--font-inter`) — Paragraphs, navigation, buttons, forms, specs.

### Responsive Type Scale
- **Display**: `clamp(3.5rem, 7vw, 7.5rem)` (font-weight: 700, letter-spacing: -0.035em)
- **H1**: `clamp(2.75rem, 5vw, 5rem)` (font-weight: 700, letter-spacing: -0.025em)
- **H2**: `clamp(2rem, 3.5vw, 3.25rem)` (font-weight: 600, letter-spacing: -0.02em)
- **H3**: `clamp(1.35rem, 2vw, 2rem)` (font-weight: 600, letter-spacing: -0.015em)
- **Body Large**: `1.25rem` (20px, line-height: 1.6)
- **Body**: `1rem` (16px, line-height: 1.65)
- **Small**: `0.875rem` (14px, line-height: 1.5)
- **Micro / Label**: `0.75rem` (12px, uppercase, letter-spacing: 0.12em, font-weight: 600)

---

## 5. Spacing & Container System

### Spacing Scale
- `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `80px`, `96px`, `128px`, `160px`

### Section Spacing
- **Default**: `py-16 sm:py-20 md:py-28 lg:py-36` (120px–160px on desktop)
- **Cinematic**: `py-24 sm:py-32 md:py-44 lg:py-52` (160px–220px on desktop)
- **Compact**: `py-10 sm:py-14 md:py-20` (64px–96px on desktop)

### Container Max Width
- Standard: `1440px` with responsive horizontal padding:
  - Desktop: `32px - 48px`
  - Tablet: `24px - 32px`
  - Mobile: `20px`

---

## 6. Component Architecture

### UI Primitives
- `Container`: Responsive bounded layout container.
- `Section` & `SectionHeading`: Surface-aware section containers with eyebrow, heading, and description.
- `Eyebrow`: Tracked micro-heading with agricultural/amber bar or icon.
- `Button`: Primary, Secondary, Amber, Outline, Ghost, Link, Icon with hover lift, active scale, and animated arrow.
- `TextLink`: Semantic text link with animated trailing arrow and underline reveal.
- `Badge`: Status and category chips (forest, amber, neutral, outline, success, error).
- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`: Structured surface cards with interactive lift.
- `ProductCard`: Agricultural machinery card with image wrapper, category badge, tractor HP rating, and animated CTA.
- `ImageWrapper`: Responsive Next.js Image wrapper with aspect ratio presets, hover zoom, and dark overlays.

### Form Primitives
- `Label`, `Input`, `Textarea`, `Select`, `FormField`, `SubmitButton` with accessible focus rings and error states.

### Navigation Primitives
- `Logo`: Vector mark featuring agricultural implement geometry and custom typography.
- `Navbar`: Responsive fixed navigation with scroll glassmorphic effect.
- `MobileMenu`: Animated full-width mobile navigation drawer.

---

## 7. Motion System

Powered by **Motion for React (`framer-motion`)**:
- `FadeUp`: Standard reveal (`opacity: 0 -> 1`, `translateY: 24px -> 0`, duration 650ms, ease: `[0.21, 0.47, 0.32, 0.98]`).
- `Reveal`: Directional entrance (`up`, `down`, `left`, `right`).
- `Stagger` & `StaggerItem`: Staggered lists/grids (`delayChildren: 0.1s`).
- `ImageReveal`: Smooth scale (`1.06 -> 1.0`) and opacity entrance.
- `TextReveal`: Masked typography reveal.
- `Parallax`: Smooth scroll transform for background machinery graphics.
- **Accessibility & Reduced Motion**: Every animation component automatically adheres to user OS `prefers-reduced-motion` settings.
