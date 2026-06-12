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
      work: "Work",
      writing: "Writing",
      about: "About",
      contact: "Contact",
      languageLabel: "Language",
    },
    hero: {
      eyebrow: "Agentic AI orchestrator · Bangkok",
      titleLead: "I break in the newest AI tools, then translate them into",
      titleMark: "plain English",
      titleTail: ".",
      sub: "Half engineer, half creator, based in Bangkok. I orchestrate AI systems and write about what actually matters — so you don't have to decode the hype.",
      ctaPrimary: "Read the experiments",
      ctaGhost: "Browse the writing",
    },
    experiments: {
      heading: "Selected experiments",
      lead: "Tools I've put real hours into, each with the one takeaway worth keeping.",
      more: "Read the experiment",
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
      lead: "Short reads. No jargon. Written like I'd explain it over coffee.",
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
      sub: "I take on a few collaborations at a time. Tell me what you're building.",
      email: "Email Sharon",
    },
    footer: {
      copyright: "© 2026 Sharon Sethi",
      tagline: "Built between code and storytelling",
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
      work: "ผลงาน",
      writing: "งานเขียน",
      about: "เกี่ยวกับ",
      contact: "ติดต่อ",
      languageLabel: "ภาษา",
    },
    hero: {
      eyebrow: "ผู้ควบคุมระบบ AI เชิงเอเจนต์ · กรุงเทพฯ",
      titleLead: "ฉันลองเล่นเครื่องมือ AI ใหม่ล่าสุด แล้วแปลมันออกมาเป็น",
      titleMark: "ภาษาที่เข้าใจง่าย",
      titleTail: "",
      sub: "ครึ่งวิศวกร ครึ่งครีเอเตอร์ ใช้ชีวิตอยู่ที่กรุงเทพฯ ฉันออกแบบและควบคุมระบบ AI แล้วเขียนเล่าเฉพาะเรื่องที่สำคัญจริง ๆ เพื่อให้คุณไม่ต้องมานั่งถอดรหัสกระแสเอง",
      ctaPrimary: "อ่านการทดลอง",
      ctaGhost: "ดูงานเขียน",
    },
    experiments: {
      heading: "การทดลองที่คัดมา",
      lead: "เครื่องมือที่ฉันลงมือใช้จริงเป็นชั่วโมง ๆ พร้อมข้อสรุปหนึ่งข้อที่ควรเก็บไว้",
      more: "อ่านการทดลอง",
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
      lead: "อ่านสั้น ๆ ไม่มีศัพท์เทคนิค เขียนเหมือนเล่าให้เพื่อนฟังตอนนั่งจิบกาแฟ",
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
      sub: "ฉันรับงานร่วมกันทีละไม่กี่โปรเจกต์ เล่าให้ฟังหน่อยว่าคุณกำลังสร้างอะไรอยู่",
      email: "อีเมลหา Sharon",
    },
    footer: {
      copyright: "© 2026 Sharon Sethi",
      tagline: "สร้างขึ้นระหว่างโค้ดกับการเล่าเรื่อง",
    },
  },
} as const;

export type UI = (typeof strings)["en"];

export function useTranslations(lang: Lang): UI {
  return strings[lang] ?? strings[defaultLang];
}
