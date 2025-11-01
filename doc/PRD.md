# GPT‑5 Codex: C++ for Absolute Beginners — MVP (Decisions Locked)

## A) Stakeholder Decisions (from user)

1. **Anonymous run allowed** (no sign‑in, rate‑limited).
2. **Default UI language**: Thai for users in TH (toggleable).
3. **C++ standard**: Start with **C++17** (introduce selected C++20 features in Phase 2).
4. **Capstone**: **Not** included in MVP.
5. **Certificates**: **None** in MVP/Pro.

---

## B) MVP Goal (Beginner‑First)

Deliver a zero‑install, beginner‑friendly site where first‑time learners can:

* Run a tiny C++ program,
* Fix common errors with friendly, bilingual hints,
* Complete Modules 0–3 (Hello World → Variables → I/O → Decisions),
* Track basic progress and return next day.

**North star**: Confidence over coverage — learners leave Day 1 believing “I can write and run a small C++ program.”

---

## C) MVP Scope (What ships)

### 1) Content (Modules)

* **Module 0**: Start Here — What is a program, how to use the site; print name greeting.
* **Module 1**: I/O — `#include`, `main`, `std::cout`, `std::cin`, newline.
* **Module 2**: Variables & Types — `int`, `double`, `bool`, `char`, `std::string`; expressions.
* **Module 3**: Decisions — `if/else`, comparisons; micro‑project: grade classifier.

> Each module: 2–3 minute read → 2–4 tiny tasks → run tests → **hint ladder** (nudge → point → snippet → show solution).

### 2) Interactive Runner

* **WASM** compile/run (Clang/LLVM) for C++17; CPU/mem/time caps.
* Deterministic unit tests; show pass/fail and minimal diff.
* Beginner clang‑tidy rules (readability/modernize).
* Offline‑tolerant editor state (localStorage) for code drafts.

### 3) AI Tutor (Beginner Mode)

* Modes: Explain Error, Minimal Fix, Concept Explain, Quiz Me (2 Q).
* **Guardrails**: full solution only after ≥2 hints or explicit request; minimal diff patches with a short “why”.
* **Bilingual**: Thai default in TH; instant toggle per hint/paragraph.

### 4) UX & Progress

* Monaco editor (large font, focus mode), glossary popovers (Thai/English).
* Progress: module checkmarks, daily streak, simple badge on first pass.
* Accessibility: WCAG AA, keyboard‑first.

### 5) Growth & Monetization (MVP)

* Landing page with demo and 3 free lessons (M0–M1 fully free; parts of M2–M3 behind paywall if desired later).
* **No certificates**; **Pro** upsell postponed (collect interest only).
* PromptPay + cards *optional later*; MVP may use waitlist only.

---

## D) Out of Scope (MVP)

* Debugger UI, templates/metaprogramming, raw pointer management, concurrency.
* Classroom/teacher dashboards.
* Capstone projects.
* Certificates.

---

## E) Success Metrics (MVP)

* **Activation**: ≥ 75% run a program within 5 minutes.
* **Hint efficacy**: ≥ 50% pass within 2 runs after Explain‑Error.
* **Learning throughput**: ≥ 3 tasks completed per active session (P50).
* **Retention**: D7 ≥ 35%.
* **TTFH** (time‑to‑first‑hint): median < 10s.

---

## F) Acceptance Criteria

1. First‑time user (no sign‑in) completes Module 0 Task 1 without external help.
2. Thai default in TH; toggle to English in‑place; all strings translated for M0–M3.
3. WASM compile P50 ≤ 5s; hot rerun ≤ 2s on a typical laptop.
4. Hints respect ladder and bilingual rules; “show solution” exists but is lock‑gated by ladder.
5. Progress persists locally; returning users see completed tasks checked.
6. Analytics events present: `open_lesson`, `run_clicked`, `tests_passed`, `hint_viewed`, `hint_accepted`, `language_switched`.

---

## G) Analytics & Research

* Lightweight telemetry (privacy‑first).
* In‑lesson micro‑survey after M2: confidence (1–5), hardest concept, language preference.
* Event funnels: first session → first pass; first pass → complete M1; return next day.

---

## H) Risks & Mitigations

* **Slow compiles** → prewarm WASM, cache toolchain, keep tasks tiny.
* **Hint hallucinations** → constrain tutor context to code, error, tests; prefer snippet‑level patches; disable non‑deterministic advice.
* **Beginner overwhelm** → large font, fewer panels, plain Thai by default, glossary popovers.
* **Abuse/limits** → anonymous rate limit (per IP/device), CPU/mem/time caps.

---

## I) 2‑Week Sprint Plan (Timeboxed)

### Epics

E1. Landing & Onboarding • E2. Runner & Tests • E3. AI Beginner Tutor • E4. Content M0–M3 • E5. i18n & Accessibility • E6. Analytics & Progress

### Week 1

* **D1**: Repo scaffold (Next.js), Monaco editor, Thai/English toggle; basic theme & fonts.
* **D2**: WASM toolchain integration (C++17), run endpoint, result panel; localStorage code save.
* **D3**: Test harness for tasks, diff display; anonymous rate limiting.
* **D4**: AI Tutor modes (Explain Error, Minimal Fix, Concept Explain) with prompt templates + guardrails.
* **D5**: Module 0 content complete (2–3 tasks) + Thai translations; analytics events.

### Week 2

* **D6**: Module 1 content; glossary popovers; beginner clang‑tidy checks.
* **D7**: Module 2 content; hint ladders; progress/badges.
* **D8**: Module 3 content; micro‑project (grade classifier).
* **D9**: Accessibility sweep (keyboard, focus, aria); performance tuning; i18n QA.
* **D10**: QA script, acceptance test run, launch checklist.

---

## J) User Stories (Samples)

* As a **new learner**, I can run the starter code and see output so that I know the site works.
* As a **new learner**, when I make a mistake, the tutor explains it simply in Thai and shows a minimal fix.
* As a **returning learner**, I see my completed tasks and resume where I left off.
* As a **parent/teacher**, I see no scary permissions or tracking; privacy is clear.

**Acceptance tests** (samples):

* Given starter code missing `#include <iostream>`, when I click Run, then Explain‑Error points out the header within one hint.
* Given Thai default, when I toggle to English, the current hint re-renders in English without page reload.
* Given 3 failed runs, when I request a solution, I get a **minimal diff** patch and pass tests.

---

## K) Technical Notes

* Stack: Next.js + React, `@monaco-editor/react`, Clang/LLVM to WASM, simple task DSL (inputs/outputs/asserts), i18n (next‑i18next).
* Data: localStorage for MVP; server APIs for future accounts.
* Security: WASM sandbox; if server fallback later → container isolation + no egress.

---

## L) Post‑MVP (Phase 2)

* Modules 4–6 (loops, vectors/strings deeper, functions), performance labs, file I/O.
* Semantic search, spaced review, mobile edit mode, optional payments.
* Select C++20 concepts (ranges, `std::span`) as usage‑level topics.
