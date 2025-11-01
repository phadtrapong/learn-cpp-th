# E4/D6 — Module 1 content; glossary popovers; beginner clang‑tidy checks

- Epic: E4 Content M0–M3
- Day: D6
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Ship Module 1 (I/O) with glossary popovers (bilingual) and non‑blocking beginner clang‑tidy suggestions.

## Description

Create Module 1 lessons and tasks on includes, `main`, `std::cout`, `std::cin`, newlines. Implement glossary popovers that show Thai/English definitions inline. Integrate clang‑tidy in beginner mode to surface readable/modernize suggestions without blocking runs.

## Deliverables

- [ ] Module 1 content + tasks/tests
- [ ] Glossary popover component + term definitions (TH/EN)
- [ ] Beginner clang‑tidy checks surfaced in UI (non‑blocking)

## Acceptance Criteria

- Popovers are keyboard accessible and readable in Thai/English
- clang‑tidy suggestions appear after run and do not block passing tests

## Dependencies

- E4/D5 module scaffolding patterns
- E2/D3 diff view available

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Keep popovers concise; avoid jargon; link to glossary index page if needed.

