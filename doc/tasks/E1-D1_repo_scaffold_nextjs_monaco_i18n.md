# E1/D1 — Repo scaffold (Next.js), Monaco editor, Thai/English toggle, theme & fonts

- Epic: E1 Landing & Onboarding
- Day: D1
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Establish the Next.js application foundation with Monaco editor, base theme/fonts, and a working Thai/English language toggle (i18n skeleton) to enable subsequent MVP features.

## Description

Create a Next.js repo (App Router), add a base layout with large, readable fonts and focus mode style. Integrate `@monaco-editor/react` with sensible beginner defaults. Add a header language toggle wired to `next-i18next` (or a minimal i18n stub) with Thai as default for TH locale, and instant toggle without page reload.

## Deliverables

- [ ] Next.js app scaffolded, app layout and theme tokens (colors, spacing, typography)
- [ ] Monaco editor component integrated and renders a C++ snippet
- [ ] Header with language toggle (TH/EN) that updates text instantly
- [ ] Minimal i18n config and example strings (TH + EN)
- [ ] Base landing page with demo CTA

## Acceptance Criteria

- App boots locally; editor loads with large font and focus mode
- Toggle switches interface copy between Thai and English in-place
- Thai is default when locale/country signals TH (stub acceptable at D1)

## Dependencies

- None

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Prefer App Router structure; keep UI minimal and beginner-focused.

