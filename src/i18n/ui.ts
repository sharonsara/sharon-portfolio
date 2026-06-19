// ============================================================
//  i18n — all UI copy in English + Thai, in one place.
//  English is the default (served at /). Thai is served at /th.
//  To tweak wording, edit the matching string under `en` and `th`.
//  (Article + experiment + video text lives with that content,
//   not here — this file is only the site's fixed "chrome".)
// ============================================================

export const languages = { en: "EN", th: "TH" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export function isLang(value: string): value is Lang {
  return value in languages;
}

// Turn a default-language path ("/", "/writing") into the same path
// for the given language. English stays at the root; Thai is prefixed.
export function localizePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return path === "/" ? "/th" : `/th${path}`;
}

// The opposite language — used by the EN/TH toggle.
export const otherLang = (lang: Lang): Lang => (lang === "en" ? "th" : "en");

const strings = {
  en: {
    meta: {
      title: "Sharon Sethi — agentic AI orchestrator",
      description:
        "I test new AI tools the day they drop, then translate what actually matters into plain English. Half engineer, half creator. Based in Bangkok.",
    },
    nav: {
      home: "Home",
      experiments: "Experiments",
      tools: "Tools",
      work: "Work",
      writing: "Writing",
      about: "About",
      contact: "Contact",
      languageLabel: "Language",
    },
    hero: {
      eyebrow: "Agentic AI orchestrator · Bangkok",
      titleLead: "I try the latest AI tools, then share what they do in a language",
      titleMark: "anyone can understand",
      titleTail: ". In minutes, not in hours.",
      sub: "Half engineer, half creator, based in Bangkok. I orchestrate AI systems and write about what actually matters — so you don't have to decode the hype.",
      ctaPrimary: "Read the experiments",
      ctaGhost: "Browse the writing",
    },
    experiments: {
      heading: "Selected experiments",
      lead: "Tools I've put real hours into, each with the one takeaway worth keeping.",
      more: "Read the experiment",
      empty: "Coming soon.",
    },
    rig: {
      heading: "AI tools I love",
      empty: "Setting up the board.",
    },
    work: {
      heading: "Work",
      lead: "Videos I created for my company's channel — produced, edited, and explained by me. Tags show the tools behind each one.",
      all: "All",
      watch: "Watch on YouTube",
    },
    strip: {
      lead: "I translate AI from",
      em: "engineer-speak",
      tail: "into language anyone can use.",
    },
    writing: {
      heading: "Latest writing",
      lead: "Short reads. Written like I'd explain it over coffee.",
      empty: "First posts are on the way.",
      all: "All writing",
      indexKicker: "Writing",
      indexTitle: "No jargon. Written like I'd explain it over coffee.",
      back: "Back",
      backAll: "All writing",
      backToAll: "Back to all writing",
      cta: "Work with Sharon",
    },
    contact: {
      title: "Working on something with AI in it?",
      sub: "Let's build something together!",
      email: "Email Sharon",
    },
    footer: {
      copyright: "© 2026 Sharon Sethi",
    },
  },

  th: {
    meta: {
      title: "Sharon Sethi — ผู้ควบคุมระบบ AI เชิงเอเจนต์",
      description:
        "ฉันทดลองเครื่องมือ AI ใหม่ตั้งแต่วันแรกที่เปิดตัว แล้วแปลเฉพาะเรื่องที่สำคัญออกมาเป็นภาษาที่เข้าใจง่าย ครึ่งวิศวกร ครึ่งครีเอเตอร์ ใช้ชีวิตอยู่ที่กรุงเทพฯ",
    },
    nav: {
      home: "หน้าแรก",
      experiments: "การทดลอง",
      tools: "เครื่องมือ",
      work: "ผลงาน",
      writing: "งานเขียน",
      about: "เกี่ยวกับ",
      contact: "ติดต่อ",
      languageLabel: "ภาษา",
    },
    hero: {
      eyebrow: "ผู้ควบคุมระบบ AI เชิงเอเจนต์ · กรุงเทพฯ",
      titleLead: "ฉันลองเครื่องมือ AI ใหม่ล่าสุด แล้วเล่าให้ฟังว่ามันทำอะไรได้ ด้วย",
      titleMark: "ภาษาที่ทุกคนเข้าใจ",
      titleTail: " — ในไม่กี่นาที ไม่ใช่เป็นชั่วโมง",
      sub: "ครึ่งวิศวกร ครึ่งครีเอเตอร์ ใช้ชีวิตอยู่ที่กรุงเทพฯ ฉันออกแบบและควบคุมระบบ AI แล้วเขียนเล่าเฉพาะเรื่องที่สำคัญจริง ๆ เพื่อให้คุณไม่ต้องมานั่งถอดรหัสกระแสเอง",
      ctaPrimary: "อ่านการทดลอง",
      ctaGhost: "ดูงานเขียน",
    },
    experiments: {
      heading: "การทดลองที่คัดมา",
      lead: "เครื่องมือที่ฉันลงมือใช้จริงเป็นชั่วโมง ๆ พร้อมข้อสรุปหนึ่งข้อที่ควรเก็บไว้",
      more: "อ่านการทดลอง",
      empty: "เร็ว ๆ นี้",
    },
    rig: {
      heading: "เครื่องมือ AI ที่ฉันรัก",
      empty: "กำลังจัดบอร์ด",
    },
    work: {
      heading: "ผลงาน",
      lead: "วิดีโอที่ฉันทำให้ช่องของบริษัท — ผลิต ตัดต่อ และอธิบายเองทั้งหมด แท็กบอกเครื่องมือที่อยู่เบื้องหลังแต่ละชิ้น",
      all: "ทั้งหมด",
      watch: "ดูบน YouTube",
    },
    strip: {
      lead: "ฉันแปล AI จาก",
      em: "ภาษาวิศวกร",
      tail: "ให้เป็นภาษาที่ทุกคนใช้ได้",
    },
    writing: {
      heading: "งานเขียนล่าสุด",
      lead: "อ่านสั้น ๆ เขียนเหมือนเล่าให้เพื่อนฟังตอนนั่งจิบกาแฟ",
      empty: "บทความแรก ๆ กำลังจะมา",
      all: "งานเขียนทั้งหมด",
      indexKicker: "งานเขียน",
      indexTitle: "ไม่มีศัพท์เทคนิค เขียนเหมือนเล่าให้เพื่อนฟังตอนจิบกาแฟ",
      back: "กลับ",
      backAll: "งานเขียนทั้งหมด",
      backToAll: "กลับไปหน้างานเขียนทั้งหมด",
      cta: "ร่วมงานกับ Sharon",
    },
    contact: {
      title: "กำลังทำอะไรที่มี AI อยู่ในนั้นใช่ไหม?",
      sub: "มาสร้างอะไรด้วยกันเถอะ!",
      email: "อีเมลหา Sharon",
    },
    footer: {
      copyright: "© 2026 Sharon Sethi",
    },
  },
} as const;

export type UI = (typeof strings)["en"];

export function useTranslations(lang: Lang): UI {
  return strings[lang] ?? strings[defaultLang];
}
