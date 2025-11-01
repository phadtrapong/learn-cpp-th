# E4/A1 — Content lint/validation (tests, hints, translations present)

- Epic: E4 Content M0–M3
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Prevent incomplete lesson/task entries by validating required fields and assets are present.

## Description

Create a content linter that validates each task definition includes: deterministic tests, hint ladder steps, and TH/EN translations. Run in CI and expose a local CLI.

## Deliverables

- [ ] Linter CLI for content DSL
- [ ] CI check to block incomplete content
- [ ] Docs for authors

## Acceptance Criteria

- Missing tests/hints/translations fail the linter with clear messages

## Dependencies

- E2/D3 task DSL
- E3/D4 hint ladder rules

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Keep rules minimal but enforce MVP quality bar.

