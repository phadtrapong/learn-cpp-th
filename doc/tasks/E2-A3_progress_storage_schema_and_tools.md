# E2/A3 — Progress storage schema + reset/export/import + versioning

- Epic: E2 Runner & Tests
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Define a robust local progress schema with versioning and simple user controls.

## Description

Design a JSON schema for progress (modules, tasks, streaks, badges) stored in `localStorage`. Include a version field and a migration path. Provide UI utilities to reset data and export/import as JSON.

## Deliverables

- [ ] Schema doc + TypeScript types
- [ ] Storage helpers with versioning/migrations
- [ ] Reset + export/import UI

## Acceptance Criteria

- Data persists across sessions; schema upgrades migrate without data loss
- Users can reset/export/import successfully

## Dependencies

- E4/D7 progress and badges feature

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Avoid storing raw code in progress unless necessary; keep payloads small.

