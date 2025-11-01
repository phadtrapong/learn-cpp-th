# E6/A2 — Analytics pipeline, funnels, minimal dashboard

- Epic: E6 Analytics & Progress
- Status: TODO
- Owner: Unassigned
- Priority: P2
- Estimate: 1d

## Goal

Stand up a minimal analytics pipeline and a simple dashboard to visualize key funnels and metrics.

## Description

Implement a backend collector (or third-party integration) to receive batched events. Store to a lightweight store. Build a minimal dashboard page showing:

- Activation: first session → first run → first pass
- Throughput: tasks per session (P50)
- Retention: D1/D7 return rates (if feasible)
- TTFH distribution (median)

## Deliverables

- [ ] Event collector endpoint + storage
- [ ] Funnel computation jobs/queries
- [ ] Minimal dashboard page (authless or behind secret)
- [ ] Docs for metrics definitions

## Acceptance Criteria

- Dashboard renders with live/test data and correct funnel math
- TTFH median and compile P50 visible from captured events

## Dependencies

- E6/A1 client wrapper + schema

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Privacy-first: aggregate; avoid user-identifiable data.

