# E5/A4 — Perf instrumentation for compile/hot-rerun

- Epic: E5 i18n & Accessibility
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Measure compile P50 and hot rerun ≤ 2s reliably via browser Performance API.

## Description

Add `performance.mark`/`measure` around compile/run paths. Aggregate client-side and send summary stats in analytics. Provide a lightweight debug panel for local testing.

## Deliverables

- [ ] Perf marks/measures integrated
- [ ] Analytics payloads with timings
- [ ] Debug view for local verification

## Acceptance Criteria

- Measured P50s visible in dashboard (via E6/A2)
- Hot rerun times demonstrably lower than cold with prewarm

## Dependencies

- E2/D2 runner path
- E6/A1 analytics client

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Document methodology; exclude outliers when appropriate.

