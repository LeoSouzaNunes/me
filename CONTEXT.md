# Project Context

## Overview

Personal portfolio/landing page for Leo, developer at Arctic Leaf. Built with React, TanStack Start, Tailwind CSS, and Bun. Follows the Nothing Tech design system (minimal, monochrome, dot-matrix aesthetic).

## Tech Stack

- **Runtime / Package Manager**: Bun
- **Framework**: TanStack Start (file-based routing via `@tanstack/react-start`)
- **UI**: React 19 + TypeScript (TSX)
- **Styling**: Tailwind CSS v3 with custom Nothing Tech design tokens
- **Icons**: lucide-react (Lock icon for locked features)
- **Build**: Vite 8 with `tanstackStart()` plugin

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Section.tsx      # Layout primitive (max-width container with responsive padding)
│   ├── HeroSection.tsx  # Hero block with name, Arctic Leaf link, passions tagline
│   ├── PassionChip.tsx  # Individual passion chip (non-interactive span)
│   ├── PassionsBlock.tsx # Renders passion chips from data array
│   ├── FeatureCard.tsx  # Feature card with locked/unlocked states
│   ├── FeaturesSection.tsx # Renders feature cards from data array
│   └── Footer.tsx       # Footer with social links and license
├── constants/
│   └── site.ts          # All static data: site config, passions, features, social links
├── types/
│   └── index.ts         # TypeScript interfaces: Passion, Feature, SocialLink, SiteConfig
├── styles/
│   └── globals.css      # Tailwind directives + Nothing Tech base styles
├── routes/
│   ├── __root.tsx       # TanStack root route (HTML shell, head meta, font imports)
│   └── index.tsx        # Home page route (composes all sections)
├── router.tsx           # TanStack router config
└── routeTree.gen.ts     # Auto-generated route tree (do not edit)
```

## Design System: Nothing Tech

Enforced via `nothing-design-system` agent. Key rules:

- **Colors**: Pure black (#000) background, near-black (#0A0A0A) surfaces, white (#FFF) primary text, #666 muted, #444 hint
- **Typography**: NDot 57/55 for headings (uppercase, wide tracking), NType 82 for body, NType 82 Mono for metadata
- **Spacing**: 8px base grid (allowed: 8, 12, 16, 20, 24, 32, 40, 48, 64, 72, 80)
- **Border-radius**: Max 4px (rounded-md). No rounded-lg or rounded-full
- **No shadows, gradients, blur, or font-weight > 500**
- **Locked state**: opacity-40 + pointer-events-none
- **Hover**: opacity/shade transitions only (exception: footer links may transition color)
- **All interactive elements**: must have :focus-visible styling
- **prefers-reduced-motion**: disables all transitions/animations

## Data-Driven Content

All rendered content comes from typed arrays in `src/constants/site.ts`:

- `PASSIONS`: Chess, Languages, Travel, Coding, Music
- `FEATURES`: Language Practice, Chess Puzzle Library, Chess Books Library, Places I've Been Map (all locked)
- `SOCIAL_LINKS`: GitHub, LinkedIn, Chess.com
- `SITE_CONFIG`: Name, title, description, Arctic Leaf URL, license URL placeholder

## Commands

```bash
bun install        # Install dependencies
bun run dev        # Start dev server (port 3000)
bun run build      # Production build
bun run preview    # Preview production build
```

## Key Decisions

- All features are locked (opacity-40, non-interactive) — intended as future placeholders
- Passion chips are non-interactive spans (no hover/focus) per design system compliance
- CSS imports globals.css from the index route; fonts loaded via Google Fonts in root head
- NDot custom fonts fallback to Space Mono → Share Tech Mono → monospace
- Tailwind config extends theme with Nothing Tech tokens (no overrides of defaults)
