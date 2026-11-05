# Bumi: real estate agency website (React + TypeScript)

Slicing of the FigCraft file **Bumi - Real Estate Agency** (`/Users/denisetiawan/Downloads/Bumi - Real Estate Agency.figcraft`) into a Vite + React 19 + TypeScript + Tailwind CSS v4 site. 17 pages, each designed at 1440, 768 and 425 px.

## Mandatory rules

Read and follow [`docs/slicing-rules.md`](docs/slicing-rules.md) before writing any UI code. Key non-negotiables:

- **The result must match the design exactly** (client decision). Copy (typos included), colours (low contrast included), fonts and per-breakpoint quirks are replicated as designed; `docs/design-notes.md` lists them. Only states the design does not show (open menus, errors, 404) are built from the existing styles.

- Token first: colours, type, spacing and radius come from `src/styles/tokens.css` (generated from FigCraft paint/text styles and the few variables). No hex or raw font sizes in components.
- Auto layout → flex/grid + gap. No absolute-positioned layout copied from the design; `inspect.code` output is a value reference only.
- Content starts at column 2 of the 12-column grid on tablet and desktop (`Container` inset mode); mobile is full width with 20 px margins.
- Semantic HTML, one `h1` per page, keyboard-accessible interactive patterns, `alt` on every image.
- Mobile-first; reference frames are 425 px (base), 768 px (`md`) and 1440 px (`lg`+).
- One page at a time, each finished against the Definition of Done (section 13 of the rules).
- Design inconsistencies go in `docs/design-notes.md`; never silently change the design. The FigCraft file is read-only.
- Motion: mark elements with `data-reveal`; `src/lib/useRevealMotion.ts` animates them. No GSAP code in components for reveals, only opacity/transform, and `prefers-reduced-motion` shows everything.

## Commands

```bash
npm run dev       # dev server
npm run build     # type-check + production build
npm run lint      # oxlint
npm run format    # prettier
npm run tokens    # design/variables.css + design/styles.json → src/styles/tokens.css
npm run images    # src/assets/images/**/*-{sm,lg}.webp → typed index.ts
npm run qa:shot -- <url> <width> <out.png>   # device-emulated full-page screenshot
npm run qa:a11y   # axe-core audit of all routes (dev server must be running)
npm run qa:motion # scroll every route; fail if a reveal is left hidden (dev server must be running)
```

QA a page by screenshotting it at every frame width and comparing it side by side with the FigCraft frame exported at 1×. Page height should be within a few px of the frame.

## Design source

- FigCraft only (FigCraft MCP). Do not use Figma or figma-cli.
- File: `/Users/denisetiawan/Downloads/Bumi - Real Estate Agency.figcraft`, page **High-Fidelity Design** (id 2806). Frame names are inconsistent (the desktop home is `Landing`, the consultation page is named `Properties - Invesment Opportunities`), so use the frame id table in section 0a of the rules.
- Components: page **Components** (id 12337): Button 13665, Input 12820, Dropdown 15084, Icons 13964, News 14824, Properties card 15213, Navbar 14851, Footer 14988. Style guide on the same page: Color Pallete 12483, Typorgraphy 15244, Grid 12338.
- Full layer tree without loading the app: `figcraft-cli run` (headless, read-only without `--out`) at `~/bin/figcraft/figcraft-cli-0.7.0-macos-universal/figcraft-cli`, calling `node.get` level by level; it returns style names, `mainComponentName` and resolved `cornerRadius` (null = 0). Original photos are in the `.figcraft` zip under `images/<hash>`.
- `inspect_document` on this file is huge (>1 MB at depth 3). Use `depth: 0` or `get_node` on one section; never request the whole page at a deep depth (it dropped the MCP connection during the audit).
