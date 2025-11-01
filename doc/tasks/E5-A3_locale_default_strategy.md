# E5/A3 — Locale default strategy (Thai in TH)

- Epic: E5 i18n & Accessibility
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Default UI language to Thai for users in Thailand, with user-controlled, persistent override.

## Description

Implement a strategy using `Accept-Language` and optional geo signal (stub) to pick default. Persist user selection in localStorage and respect it across sessions. Ensure SSR/CSR consistency and instant client-side toggle.

## Deliverables

- [ ] Default language resolver (server/client parity)
- [ ] Preference persistence and rehydration
- [ ] Tests/manual QA matrix

## Acceptance Criteria

- First visit in TH defaults to Thai; outside TH uses browser language
- Toggling updates UI instantly and persists across reloads

## Dependencies

- E1/D1 i18n toggle exists

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Document assumptions when geo is unavailable.

