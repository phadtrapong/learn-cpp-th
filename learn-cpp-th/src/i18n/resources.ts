export const translations = {
  en: {
    common: {
      brand: "Learn C++ — Beginner Beta",
      languageLabel: "Language",
      languageEnglish: "English",
      languageThai: "Thai",
      heroTitle: "Run your first C++ program in minutes.",
      heroSubtitle:
        "We guide Thai beginners through each step with bilingual hints and friendly explanations.",
      heroCta: "Start the guided hello-world run",
      editorTitle: "Editor preview",
      editorDescription:
        "Code runs in the browser with lightweight limits. Autosave, tests, and tutor arrive next sprint.",
      checklistTitle: "What’s ready in Sprint 1",
      checklistItems: [
        "Next.js App Router scaffold with large-font focus mode UI",
        "Thai ↔ English toggle that remembers your choice",
        "Monaco editor seeded with a C++17 hello-world snippet",
        "Thai-first messaging with instant bilingual updates",
      ],
    },
  },
  th: {
    common: {
      brand: "เริ่มเรียน C++ — รุ่นเบต้า",
      languageLabel: "ภาษา",
      languageEnglish: "อังกฤษ",
      languageThai: "ไทย",
      heroTitle: "ลองรันโปรแกรม C++ แรกของคุณได้ในไม่กี่นาที",
      heroSubtitle:
        "เราพาผู้เริ่มต้นชาวไทยทีละขั้น พร้อมคำใบ้สองภาษาและคำอธิบายแบบเป็นกันเอง",
      heroCta: "เริ่มบทเรียน Hello World",
      editorTitle: "ตัวอย่างพื้นที่เขียนโค้ด",
      editorDescription:
        "ชุดรันโค้ดบนเบราว์เซอร์พร้อมข้อจำกัดที่จำเป็น ระบบบันทึกอัตโนมัติและตัวช่วยจะตามมาในสปรินต์ถัดไป",
      checklistTitle: "สิ่งที่พร้อมแล้วในสปรินต์แรก",
      checklistItems: [
        "สเกฟโฟลด์ Next.js App Router พร้อม UI โหมดโฟกัสตัวอักษรใหญ่",
        "ปุ่มสลับภาษา ไทย ↔ อังกฤษ จดจำการตั้งค่าของคุณ",
        "Monaco editor พร้อมตัวอย่างโค้ด C++17 Hello World",
        "ข้อความภาษาไทยเป็นค่าเริ่มต้นและอัปเดตสองภาษาทันที",
      ],
    },
  },
};

export type TranslationNamespace = keyof (typeof translations)["en"];
