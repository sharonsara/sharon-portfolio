// ============================================================
//  CONTENT COLLECTIONS
//  The "writing" collection reads every markdown file in
//  /content/writing/*.md at build time. To publish a new article
//  you only add a markdown file there — never touch code.
//  See /content/writing/README.md for the exact steps.
// ============================================================
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
  // pull markdown straight from the repo's /content folder (matches videos.yaml)
  loader: glob({ pattern: ["**/*.md", "!README.md"], base: "./content/writing" }),
  schema: z.object({
    title: z.string(),
    // accepts "2026-05-21" in the file; parsed into a real Date for sorting
    date: z.coerce.date(),
    // the one-line teaser shown on the homepage list
    hook: z.string(),
    // set `draft: true` to keep a post out of the live site while you work on it
    draft: z.boolean().default(false),
  }),
});

export const collections = { writing };
