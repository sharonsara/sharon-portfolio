// ============================================================
//  ARTICLES — sourced from a Google Sheet + Google Docs.
//
//  The Sheet (one row per article) is the control panel:
//    key | date | draft | title_en | hook_en | doc_en
//                       | title_th | hook_th | doc_th
//  Each doc_* cell is a link to a Google Doc holding the body.
//
//  At build time we read the Sheet as CSV (no auth — the Sheet is
//  shared "anyone with the link"), then fetch each linked Doc as
//  Markdown and render it. Nothing here ships to the client.
//
//  To publish edits to the live site, trigger a redeploy.
//  Sheet + all linked Docs must be "anyone with the link → Viewer".
// ============================================================
import { localizePath, type Lang } from "../i18n/ui";
import { dateFmt } from "./content";

// --- the source sheet (public) ---
const SHEET_ID = "1FuIyJVyC6x-Ga7g2Lc-12aLdaSY14EJx-qEgbsrfk10";
const SHEET_GID = "1310791144";
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${SHEET_GID}`;

type Row = {
  key: string;
  date: string;
  draft: string;
  title_en: string;
  hook_en: string;
  doc_en: string;
  title_th: string;
  hook_th: string;
  doc_th: string;
};

export type ArticleCard = {
  key: string;
  date: string; // short label, e.g. 2026.06
  title: string;
  hook: string;
  href: string;
};

export type Article = {
  key: string;
  title: string;
  hook: string;
  date: Date;
  html: string;
  hasAlt: boolean; // does the OTHER language version exist?
};

// ---- tiny RFC-4180 CSV parser (handles quotes, commas + newlines in cells) ----
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\r") {
      /* ignore */
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// ---- fetch + parse the sheet once per build ----
let rowsCache: Promise<Row[]> | null = null;
function getRows(): Promise<Row[]> {
  if (!rowsCache) {
    rowsCache = (async () => {
      try {
        const res = await fetch(SHEET_CSV_URL);
        if (!res.ok) throw new Error(`Sheet HTTP ${res.status}`);
        const grid = parseCSV(await res.text());
        if (grid.length < 2) return [];
        const headers = grid[0].map((h) => h.trim());
        return grid.slice(1).map((cells) => {
          const obj: Record<string, string> = {};
          headers.forEach((h, i) => (obj[h] = (cells[i] ?? "").trim()));
          return obj as Row;
        });
      } catch (err) {
        console.warn(
          `[articles] could not load Google Sheet — writing section will be empty.\n  ${err}`
        );
        return [];
      }
    })();
  }
  return rowsCache;
}

// ---- markdown -> html, using Astro's own processor (gfm tables, etc.) ----
let processorCache: Promise<{ render: (md: string) => Promise<{ code: string }> }> | null = null;
function getProcessor() {
  if (!processorCache) {
    processorCache = import("@astrojs/markdown-remark").then((m) =>
      m.createMarkdownProcessor({ gfm: true, smartypants: true })
    );
  }
  return processorCache;
}

const docId = (url: string) => url.match(/document\/d\/([\w-]+)/)?.[1] ?? null;
const isDraft = (row: Row) => row.draft.toLowerCase() === "true";
const pick = (row: Row, lang: Lang) =>
  lang === "th"
    ? { title: row.title_th, hook: row.hook_th, doc: row.doc_th }
    : { title: row.title_en, hook: row.hook_en, doc: row.doc_en };

// A row is "live" for a language when it isn't a draft and has a linked doc.
const liveFor = (row: Row, lang: Lang) =>
  !isDraft(row) && Boolean(docId(pick(row, lang).doc));

// ---- public API ----

// Cards for the homepage list + /writing index (no doc fetch, just the sheet).
export async function listArticles(lang: Lang): Promise<ArticleCard[]> {
  const rows = await getRows();
  return rows
    .filter((r) => r.key && liveFor(r, lang))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((r) => {
      const f = pick(r, lang);
      return {
        key: r.key,
        date: dateFmt(new Date(r.date)),
        title: f.title,
        hook: f.hook,
        href: localizePath(`/writing/${r.key}`, lang),
      };
    });
}

// Keys that should produce a page in a given language (for getStaticPaths).
export async function articleKeys(lang: Lang): Promise<string[]> {
  const rows = await getRows();
  return rows.filter((r) => r.key && liveFor(r, lang)).map((r) => r.key);
}

// Full article: fetches + renders the linked Doc. Returns null if missing.
export async function getArticle(lang: Lang, key: string): Promise<Article | null> {
  const rows = await getRows();
  const row = rows.find((r) => r.key === key);
  if (!row || !liveFor(row, lang)) return null;

  const f = pick(row, lang);
  const id = docId(f.doc)!;
  let html = "";
  try {
    const res = await fetch(
      `https://docs.google.com/document/d/${id}/export?format=md`
    );
    if (!res.ok) throw new Error(`Doc HTTP ${res.status}`);
    let md = await res.text();
    // the Doc's own H1 (title) is dropped — the title comes from the sheet
    md = md.replace(/^﻿?\s*#\s+.*(?:\r?\n)+/, "");
    html = (await (await getProcessor()).render(md)).code;
  } catch (err) {
    console.warn(`[articles] could not render doc for "${key}" (${lang}): ${err}`);
    return null;
  }

  return {
    key: row.key,
    title: f.title,
    hook: f.hook,
    date: new Date(row.date),
    html,
    hasAlt: liveFor(row, lang === "th" ? "en" : "th"),
  };
}
