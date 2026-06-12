// ============================================================
//  Build-time content loaders (shared by the homepage + /writing
//  pages, in both languages). Nothing here ships to the client.
// ============================================================
import fs from "node:fs";
import yaml from "js-yaml";
import { getCollection } from "astro:content";
import { localizePath, type Lang } from "../i18n/ui";

// ---- short date label, e.g. 2026.05 ----
export const dateFmt = (d: Date) =>
  `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}`;

// ---- experiments (content/experiments.yaml, bilingual) ----
type ExperimentRaw = {
  tag: string;
  title: string;
  title_th?: string;
  takeaway: string;
  takeaway_th?: string;
  featured?: boolean;
};

export type Experiment = {
  tag: string;
  title: string;
  takeaway: string;
  featured: boolean;
};

export function loadExperiments(lang: Lang): Experiment[] {
  const file = new URL("../../content/experiments.yaml", import.meta.url);
  const data = yaml.load(fs.readFileSync(file, "utf-8")) as {
    experiments: ExperimentRaw[];
  };
  const list = (data.experiments ?? []).map((x) => ({
    tag: x.tag,
    title: lang === "th" ? x.title_th ?? x.title : x.title,
    takeaway: lang === "th" ? x.takeaway_th ?? x.takeaway : x.takeaway,
    featured: Boolean(x.featured),
  }));
  // featured item always rises to the front
  return list.sort((a, b) => Number(b.featured) - Number(a.featured));
}

// ---- writing (content/writing/{en,th}/*.md) ----
export type WritingItem = {
  slug: string;
  date: string;
  title: string;
  hook: string;
  href: string;
};

export async function getWriting(lang: Lang): Promise<WritingItem[]> {
  const collection = lang === "th" ? "writingTh" : "writingEn";
  const posts = await getCollection(collection, ({ data }) => !data.draft);
  return posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((p) => ({
      slug: p.id,
      date: dateFmt(p.data.date),
      title: p.data.title,
      hook: p.data.hook,
      href: localizePath(`/writing/${p.id}`, lang),
    }));
}
