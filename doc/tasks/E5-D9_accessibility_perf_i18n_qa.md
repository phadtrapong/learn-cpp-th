# E5/D9 — Accessibility sweep (WCAG AA), performance tuning, i18n QA

- Epic: E5 i18n & Accessibility
- Day: D9
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Ensure WCAG AA accessibility (keyboard‑first, focus, ARIA), verify instant bilingual toggling, and tune compile/run performance targets.

## Description

Audit keyboard navigation, focus management, and ARIA labels across editor, runner, tutor, and lessons. Validate Thai default in TH and instant, in‑place language toggle. Prewarm and cache the toolchain where possible to meet compile P50 ≤ 5s and hot rerun ≤ 2s on a typical laptop. Perform i18n QA on all M0–M3 strings.

## Deliverables

- [ ] A11y: keyboard navigation, focus outlines, ARIA labels
- [ ] Thai default in TH; instant toggle re‑renders strings in place
- [ ] Prewarm/cache strategy validated with measurements
- [ ] i18n QA for M0–M3 (complete coverage)

## Acceptance Criteria

- Accessibility checks pass (manual + linting if available)
- Measured compile P50 ≤ 5s; hot rerun ≤ 2s on typical laptop
- No missing translations in M0–M3; toggle works without page reload

## Dependencies

- E2/D2, E2/D3 runner and tests in place
- E4 modules M0–M3 content available

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Document measurement methodology and environment to keep targets comparable.

