// ============================================================
//  CONTENT COLLECTIONS
//  Writing is bilingual. Articles live in:
//    /content/writing/en/*.md   → English, served at /writing
//    /content/writing/th/*.md   → Thai,    served at /th/writing
//  Use the SAME filename in both folders for an article so the
//  EN/TH toggle can jump between the two versions.
//  To publish, add a markdown file — never touch code.
//  See /content/writing/README.md for the exact steps.
// ============================================================
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const postSchema = z.object({
  title: z.string(),
  // accepts "2026-05-21" in the file; parsed into a real Date for sorting
  date: z.coerce.date(),
  // the one-line teaser shown on the homepage list
  hook: z.string(),
  // set `draft: true` to keep a post out of the live site while you work on it
  draft: z.boolean().default(false),
});

const writingEn = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/writing/en" }),
  schema: postSchema,
});

const writingTh = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/writing/th" }),
  schema: postSchema,
});

export const collections = { writingEn, writingTh };
