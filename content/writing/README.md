# Writing — how to publish an article

The site is bilingual. Articles live in two folders:

- `en/` → English, shown at `yoursite.com/writing`
- `th/` → Thai, shown at `yoursite.com/th/writing`

The site reads them automatically: the homepage shows the 3 newest, and the
writing index lists them all. **You never touch code.**

## To publish a new post

1. **Copy an existing `.md` file** in `en/` and rename it. The filename becomes the
   URL, so keep it lowercase with hyphens — e.g. `how-i-use-claude-daily.md`
   → `yoursite.com/writing/how-i-use-claude-daily`.
2. **Edit the bit at the top** (between the `---` lines):

   ```
   ---
   title: Your headline
   date: 2026-06-13          # year-month-day. Newest date sorts to the top.
   hook: One line that makes someone want to read it.
   draft: false              # set to true to hide it while you're still writing
   ---
   ```

3. **Write the article below** the second `---` in plain Markdown:
   - `## Heading` for a section heading
   - `**bold**`, `*italic*`
   - `- item` for bullet lists, `1.` for numbered lists
   - `[link text](https://…)` for links
4. **Add the Thai version (optional but recommended):** copy your file into `th/`
   keeping **the exact same filename**, then translate the `title`, `hook`, and body.
   Matching filenames are what lets the EN/TH toggle jump between the two versions.
5. **Save, commit, push.** Vercel redeploys in about a minute and it's live.

## Tips

- Same filename in `en/` and `th/` = the toggle links them. If a Thai version
  doesn't exist yet, just publish the English one — only skip the toggle for it.
- Leave `draft: true` to park a half-finished post — it won't appear anywhere public.
- The `date` controls ordering, not the filename. Backdating is fine.
- No images needed, but if you want one, drop it in `/public` and reference it as
  `![alt text](/my-image.webp)`.
