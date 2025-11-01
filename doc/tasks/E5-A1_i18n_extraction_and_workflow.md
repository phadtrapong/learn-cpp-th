# E5/A1 — i18n string extraction workflow + translation QA

- Epic: E5 i18n & Accessibility
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Ensure all UI/lesson/tutor strings are extracted, translated, and verified for M0–M3.

## Description

Define an i18n extraction process (keys, namespaces). Add checks for missing/unused keys. Provide a translation handoff format and a QA checklist, including rendering checks for Thai.

## Deliverables

- [ ] Extraction script/patterns and docs
- [ ] Missing/unused key checks with CI gate
- [ ] QA checklist for M0–M3

## Acceptance Criteria

- Build/CI fails on missing translations for M0–M3
- Pages render with correct TH/EN strings without layout breakage

## Dependencies

- E1/D1 i18n scaffold

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Prefer descriptive keys; avoid inlined strings in components.

