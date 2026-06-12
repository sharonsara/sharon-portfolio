# CLAUDE.md — Sharon Sethi Portfolio

## What this project is

Personal portfolio site for **Sharon Sethi**, an **agentic AI orchestrator** — she tests, experiments, and plays with new AI tools as they roll out, then translates her learnings into plain English for everyone else. Half engineer, half creator.

**Positioning:** "The engineer who doesn't fit the mold." She sits between code and storytelling — the site should feel like it was made by someone who builds AND explains. Visionary, curious, hands-on.

**The site's single job:** Make a visitor think "I want to follow this person / work with this person" within 30 seconds. Audience: AI-curious professionals, potential collaborators, clients, and hiring teams.

## Tech stack (do not deviate without asking)

- **Framework:** Astro (fast, content-first, minimal JS by default — ideal for a writing-heavy portfolio)
- **Styling:** Vanilla CSS or Tailwind — but every visual decision comes from the design tokens below, not framework defaults
- **Deployment:** Vercel (keep the project Vercel-compatible at all times; zero-config deploy)
- **No heavy dependencies.** No component libraries, no UI kits, no animation libraries unless a specific effect demands it. Performance budget: Lighthouse 95+ on mobile.
- Mobile-first, responsive, accessible (visible keyboard focus, respects `prefers-reduced-motion`, semantic HTML).

## Site structure

- **Home** — hero that states who Sharon is in one strong line, selected experiments, latest writing, contact
- **Experiments / Playground** — the AI tools she's tested, each with a short plain-English takeaway
- **Writing** — her learnings translated for normal humans
- **About** — her story: the unconventional path, half engineer / half creator
- **Contact** — simple, no friction

## Design direction

**One sentence:** Disciplined minimalism with a single inventive signature — modern, precise, and quietly playful, like a lab notebook designed by an artist.

### The signature element: the navigation

Sharon explicitly wants tabs that are NOT ordinary tabs. The navigation is the one place to spend boldness. Treat it as the memorable, creative centerpiece — a blend of creativity and modernism. Propose 2–3 concepts before building (e.g., tabs that behave like an instrument panel, a command palette, or physical index tabs — but invent for THIS brief, don't copy these examples). Everything else on the page stays quiet so the navigation can sing.

### Hard anti-AI-slop rules

These are banned. If a draft contains any of them, revise before showing:

- ❌ The default AI looks: cream background + high-contrast serif + terracotta accent; near-black + single acid-green/vermilion accent; broadsheet hairline-rule newspaper layout
- ❌ Purple/blue gradients, glassmorphism cards, glowing orbs, particle backgrounds
- ❌ Generic numbered markers (01 / 02 / 03) unless the content is genuinely sequential
- ❌ Emoji as decoration; sparkle/robot iconography; "✨ AI-powered" energy
- ❌ Template copy: "Crafting digital experiences," "Turning ideas into reality," "Passionate about..."
- ❌ Three-equal-cards-in-a-row layouts as the default answer to everything
- ❌ Scattered micro-animations everywhere. Motion is allowed only as one orchestrated moment (e.g., a deliberate page-load or scroll reveal). Less is more.

### What TO do

- Minimal = precision, not emptiness: obsess over spacing, type scale, and alignment
- Typography carries the personality. Choose a characterful display face + complementary body face that would NOT be the default pick for any portfolio. State the pairing and why before building.
- Derive visual ideas from Sharon's actual world: orchestration, experiments, signals, plain-language translation. Her subject matter is the source of distinctive choices.
- Generous whitespace, strong hierarchy, restrained palette (4–6 named hex tokens, defined before any code is written)
- Take one justifiable aesthetic risk per page — in the navigation first

## Voice & copy

- Plain English, active voice, zero jargon — this IS Sharon's brand (she translates AI for humans)
- Confident but warm. Specific beats clever. Short sentences.
- Write copy as if Sharon is explaining her work to a smart friend over coffee
- Buttons say exactly what they do ("Read the experiment," not "Learn more")

## Workflow conventions

- Before building any page: present a short design plan (palette tokens, type pairing, layout concept, signature element) and self-critique it against the anti-slop rules above. Build only after confirming it doesn't look like a generic default.
- Commit after each meaningful unit of work with descriptive messages (e.g., `feat: experiments grid with takeaway cards`)
- Never push directly without showing Sharon the change first
- Keep all content (bio, project descriptions, post drafts) in `/content` as markdown so it's easy to edit without touching code

## Performance rules (non-negotiable)

- Target: Lighthouse 95+ mobile, under 1s first load on 4G
- Ship near-zero JavaScript by default (Astro static output); JS only for the nav interaction and video modal
- Videos: thumbnail images only on page load — YouTube iframe is injected ONLY when a card is clicked
- Images: modern formats (webp/avif), explicit width/height, lazy-load everything below the fold
- Fonts: max 2 font files, self-hosted, preloaded, with font-display: swap — no Google Fonts runtime requests
- No animation/UI libraries; CSS-only motion where possible
- After each page is built, run a quick audit and report the bundle size to me