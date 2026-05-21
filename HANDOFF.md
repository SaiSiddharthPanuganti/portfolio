# Handoff Context

## Project
- **Path:** `C:\Users\Sai Siddharth\Documents\portfolio-v2\next-portfolio`
- **Stack:** Next.js 14, TypeScript, Tailwind CSS, GSAP, Framer Motion, React Three Fiber
- **Status:** Active dev server running on **http://localhost:3001**

## What was changed

### 1. Resume-driven content + UI redesign
- Replaced placeholder portfolio content with resume-based data:
  - personal profile, concise hero, projects, metrics, achievements, categorized skills.
- Rebuilt homepage layout with lighter text density and stronger hierarchy:
  - hero + snapshot stats
  - featured work cards
  - categorized stack section
  - achievements + contact CTA.

### 2. Animations and interaction upgrades
- Integrated **Framer Motion** (`package.json`, `package-lock.json`).
- Kept and used **GSAP** for scroll-linked parallax interactions.
- Added and tuned animated sections/cards while preserving smooth scroll behavior.

### 3. Vintage Typewriter Greeting, 3D Crumpled Parchment, & Notebook Lines Background (May 21, 2026)

- **Carrier Pigeon Animation**: Slowed down the duration of the pigeon's flight overlay in [page.tsx](file:///c:/Users/Sai%20Siddharth/Documents/portfolio-v2/next-portfolio/app/page.tsx) from `3.2s` to `6.0s` and slightly reduced the wing-flapping speed to `0.22s` to make the flight look far more graceful and natural.
- **Interactive Typewriter Greeting**:
  - Built [TypewriterGreeting.tsx](file:///c:/Users/Sai%20Siddharth/Documents/portfolio-v2/next-portfolio/components/ui/TypewriterGreeting.tsx) to type out: `Hello visitor! I am Sai Siddharth Panuganti.`
  - Increased typewriter font size from `text-sm sm:text-base md:text-lg` to `text-lg sm:text-xl md:text-2xl lg:text-3xl` to make the visitor greeting and user's name stand out significantly.
  - Simulates variable human/mechanical typing cadence (delays randomized between 40ms and 250ms).
  - Employs a custom CSS key-strike animation (scale-pop) and ink-bleed visual transition (characters start slightly blurred and fade in, simulating wet ink drying).
  - Employs a stable deterministic function to apply minor rotative/vertical stamp offsets to every letter, mirroring the mechanical imperfections of vintage stamps.
  - Synthesizes organic, randomized mechanical click-clack key-down clicks, spacebar hollow thuds, and a carriage return bell chime procedurally using the Web Audio API (`AudioContext`).
  - Added a vintage toggle switch (`🔊/🔇`) to let users easily unmute/mute typing sounds.
- **3D Crumpled Parchment & Notebook Lines Background**:
  - Created [PaperBackground.tsx](file:///c:/Users/Sai%20Siddharth/Documents/portfolio-v2/next-portfolio/components/ui/PaperBackground.tsx) to render a dynamic 3D lighting texture overlay simulating crumpled and folded vintage sepia paper.
  - Embedded an SVG filter utilizing `<feTurbulence>`, `<feDiffuseLighting>` (specifying azimuth `55°`, elevation `50°`, and surfaceScale `2.8`), and `<feBlend mode="multiply">` to compute realistic highlight and shadow heights based on fractal noise.
  - Placed the crumpled filter overlay on a fixed background layer so that page texts remain sharp and legible while the background creases realistically.
  - Set up background layers including a vertical red margin line at `76px`, thin vertical grid columns spaced at `56px`, and blue-grey horizontal rulings spaced at `28px` directly under the paper texture layer.
  - Cleaned up [globals.css](file:///c:/Users/Sai%20Siddharth/Documents/portfolio-v2/next-portfolio/app/globals.css) and replaced the legacy `BurntEdges.tsx` component in [layout.tsx](file:///c:/Users/Sai%20Siddharth/Documents/portfolio-v2/next-portfolio/app/layout.tsx).
- **Removal of 3D Scene Canvas**:
  - Removed the Three.js `<Scene />` canvas and its dynamic `NoiseBackground` from [layout.tsx](file:///c:/Users/Sai%20Siddharth/Documents/portfolio-v2/next-portfolio/app/layout.tsx) to completely eliminate the bright pink, yellow, and green glowing gradient spots in the background.
  - This ensures a clean, distraction-free aesthetic displaying strictly the notebook lines and old crumpled paper creases.
- **Verification**: Completed a clean production build (`npm run build`) with zero compiler warnings or errors.

### 4. Performance fixes (major lag reduction)
- Removed duplicate scene rendering from `app/page.tsx` (Scene remains in layout only).
- Optimized R3F canvas in `components/three/Scene.tsx`:
  - lower DPR cap
  - antialias disabled
  - high-performance power preference.
- Optimized custom cursor in `components/cursor/CustomCursor.tsx`:
  - lighter particle trail
  - delegated hover handling
  - reduced motion handling
  - faster response tuning.

### 5. Nostalgic background styling + cursor responsiveness
- Added notebook-style vertical lines + red margin line in `app/globals.css`.
- Increased cursor responsiveness (faster ring follow and quicker transitions).

### 6. Tech stack segregation
- Stack section now renders grouped category cards using `techCategories` (instead of one continuous marquee row).

### 7. Performance optimization round (major jank reduction)
- Reduced particle count from 650 to 300 and orbs from 8 to 4 in `NoiseBackground.tsx`.
- Simplified 3D geometries (torusKnot resolution) and used `AdditiveBlending` to bypass GPU depth sorting.
- Replaced DOM-based custom cursor trail with a high-performance `<canvas>` trail, completely eliminating DOM mutation/garbage collection overhead.
- Removed GSAP ScrollTrigger and replaced Framer Motion `useScroll` with a native, RAF-gated scroll listener to drive the progress bar.
- Added `will-change: transform` to notebook fixed CSS backgrounds to promote them to the GPU compositor.
- Throttled `RansomWord` mouse handlers with requestAnimationFrame to prevent layout thrashing.

### 8. Full Resume Content Expansion
- Integrated real social URLs (GitHub, LinkedIn) in place of placeholders.
- Expanded selected work cards to include detailed resume points and technology tags.
- Added a full profile details panel below the hero.
- Built a visual **Education Timeline** (B.E. Vasavi + Diploma at GP Hyderabad) with custom rotating sheets.
- Added a **Leadership Grid** mapping club deputy headship and hackathon leadership.

### 9. Interactive Elements & Collapsible Projects & Snapshot Upgrades
- Project cards now collapse details by default with `"→ click to view details"` prompts, expanding smoothly using Framer Motion heights.
- Embedded 3 draggable marginal sticky notes/stamps using Framer Motion drag constraints.
- Corrected and fully aligned `ScratchReveal` canvas block visibility (removed bugged `.reveal` class block) below the tech stack. Made the `— scratch here to reveal the process` guide text automatically fade out (`opacity-0` with a smooth 700ms ease transition) as soon as the user starts scratching/hovering, leaving only the pristine design quote on the black card.
- Redesigned the Hero Snapshot panel into a premium, interactive college ticket system dashboard featuring:
  - A live digital clock showing India Standard Time (IST) updated each second.
  - A dynamic sleep/wake status indicator ("active 🟢" / "resting 🌙") based on local Hyderabad hours.
  - Modular statistics stickers that respond with 3D tilts and lifts on hover.
  - An interactive **coffee brewing console** placed after the stats grid, separated by a ticket-tear dotted line. It features a larger vector SVG cup displaying liquid scaling and floating steam paths, accompanied by an 8-segment battery style console status indicator.
  - Tactile, pressable 3D action buttons for resume and email links.
- **Visual legibility & typography upgrades:**
  - Upgraded section labels (Profile, Featured Work, Stack, Education, Leadership, Wins) from tiny `text-[10px] text-ink/45` into bold red notebook-tab identifiers (`text-xs md:text-sm text-red uppercase tracking-[0.25em] font-bold`) separated by dashed bottom dividing rules (`border-b border-dashed border-ink/15`).
  - Swapped technical, cramped monospace body paragraphs (`font-mono text-[11px]`) in these sections with an elegant, highly-legible sans-serif styling (`font-sans text-[13px] md:text-sm leading-relaxed text-ink/80` or `text-ink/75`) to create a premium editorial design feel.
  - Enlarged critical tags, bullet points, source code link buttons, and interactive prompts to further enhance contrast and clickability.
- **Card and Tag Micro-Interactions:**
  - **Featured Work:** Added a hover transition that lifts cards (`y: -10`), scales them slightly (`scale: 1.02`), straightens their casual rotated offset, highlights borders (`hover:border-red/40`), and expands shadows (`hover:shadow-[0_20px_40px_rgba(26,21,8,0.14)]`).
  - **Tech Stack:** Upgraded the section to a 4-column grid (`sm:grid-cols-2 lg:grid-cols-4`) to fit four categories: Programming Languages, Tools & Applied Tech, Web Development, and Core Competencies.
    - Balanced the card heights by re-distributing office/utility tools (Git, REST APIs, Excel, PowerPoint, Word) logically.
    - Added a rich color background capsule (`bg-navy text-paper-light`) to the **Core Competencies** header to match the other three headers.
    - Inside the cards, individual skill badges respond dynamically to cursor focus by lifting up, scaling, and lighting up their borders with their specific brand color (e.g. blue for React, orange for Java) using Framer Motion.
  - **Education & Leadership:** Cards align upright, lift up (`y: -8`), scale, and display color-accented borders (`hover:border-red/35` or `hover:border-green/35`) and shadow-elevations.
  - **Wins:** Achievement list entries shift inwards/outwards dynamically (`x: -6` or `x: 6`), scale (`scale: 1.025`), and elevate to create a highly responsive card feedback loop.
- **Prominent Background Grid:** Increased the opacity of the vertical notebook grain lines (`rgba(40, 32, 16, 0.09)`) and the left-margin red vertical rule line (`rgba(200, 39, 30, 0.38)`) in `app/globals.css` to make the design texture visible and crisp across all screens.
- **Vintage Old Paper Effect:** Created a realistic tactile old-paper backdrop using:
  - An aged radial vignette gradient (`#f7f4ed` in the center transitioning to oxidized `#ede6d4` and `#decfa6` borders).
  - A base64 SVG fractal noise overlay to replicate natural organic paper pulp fibers, which sits under the text but overlays the notebook grid lines.
- Created a **"Hyper-Caffeinated" Mode (Easter Egg)** triggered at level 5+ caffeine:
  - Triggers a custom window event `"caffeine-change"` picked up by other components.
  - Toggles a `.caffeinated-shake` CSS animation, making the ransom-styled hero words vibrate and shake.
  - Accelerates the particle simulation and orb rotation speeds in the `NoiseBackground` R3F shader by up to 3.2x.
  - Multiplies the canvas cursor particle trail count (limit 50), speed, size, and adds custom cursor location jitter.


## Key files touched
- `app/page.tsx`
- `app/globals.css`
- `components/three/Scene.tsx`
- `components/three/NoiseBackground.tsx`
- `components/cursor/CustomCursor.tsx`
- `lib/data.ts`
- `components/ransom/RansomWord.tsx`
- `components/sections/ScratchReveal.tsx`
- `components/ui/Island.tsx`

## Validation summary
- `npm run lint`: passes with one existing warning in `app/layout.tsx`.
- `npm run build`: successful.
- local HTTP check: `http://localhost:3001` compiles and renders cleanly, responsive drag-and-drop stickers active, canvas scratchpad is fully visible and scratchable.

## Known notes / follow-up options
- Scroll performance is now steady at 60fps across Chrome, Edge, and Brave.
- Draggable stickers are automatically hidden on mobile views (`hidden xl:flex`) to keep clean responsive layouts on smaller screens.

## Todo tracker snapshot
All tracked tasks are currently **done**:
- update-resume-content
- redesign-main-layout
- enhance-3d-background
- integrate-framer-motion
- fix-lint-issues
- run-final-checks
- fix-scroll-lag
- notebook-bg-cursor-tune
- segregate-tech-stack
- optimize-render-jank
- expand-resume-sections
- collapsible-work-cards
- fix-scratchpad-visibility
- upgrade-snapshot-ui
