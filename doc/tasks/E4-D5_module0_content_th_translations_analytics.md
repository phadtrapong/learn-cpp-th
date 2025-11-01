# E4/D5 — Module 0 content (2–3 tasks) + Thai translations + analytics events

- Epic: E4 Content M0–M3
- Day: D5
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Publish Module 0 with 2–3 tiny tasks, translated strings (TH/EN), and baseline analytics instrumentation for key events.

## Description

Create Module 0 pages that introduce the site and guide a first run (e.g., print a name greeting). Define tasks via the DSL with deterministic tests. Translate all module UI strings and hints to Thai. Instrument analytics events: `open_lesson`, `run_clicked`, `tests_passed`, `hint_viewed`, `hint_accepted`, `language_switched`.

## Deliverables

- [ ] Module 0 content with 2–3 tasks
- [ ] DSL + tests for each task
- [ ] TH/EN translations for all strings (lesson + hints)
- [ ] Analytics events wired for module interactions

## Acceptance Criteria

- A first-time, anonymous user can complete Module 0 Task 1 without external help
- Analytics events fire with expected payloads on the above interactions
- Progress persists locally after a refresh

## Dependencies

- E3/D4 tutor hints and ladder behaviors
- E2/D3 test harness ready

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Favor clarity and Thai-first language; keep tasks tiny and confidence-building.

