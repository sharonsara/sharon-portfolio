// ============================================================
//  Build-time content loaders (shared by the homepage + /writing
//  pages, in both languages). Nothing here ships to the client.
// ============================================================
import fs from "node:fs";
import yaml from "js-yaml";
import { type Lang } from "../i18n/ui";

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

// ---- favorite tools / "my rig" (content/tools.yaml) ----
// Tool copy stays in English on both sites (by request); only the
// section heading/lead are translated, and those live in i18n/ui.ts.
export type ToolUse = "daily" | "weekly" | "testing";

export type Tool = {
  name: string;
  model?: string;
  for: string;
  why: string;
  use: ToolUse;
};

export function loadTools(): Tool[] {
  const file = new URL("../../content/tools.yaml", import.meta.url);
  const data = yaml.load(fs.readFileSync(file, "utf-8")) as {
    tools: Tool[];
  };
  return (data.tools ?? []).map((x) => ({
    name: x.name,
    model: x.model,
    for: x.for,
    why: x.why,
    use: (["daily", "weekly", "testing"].includes(x.use) ? x.use : "weekly") as ToolUse,
  }));
}
