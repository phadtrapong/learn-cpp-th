# E6/A3 — M2 micro-survey (confidence, hardest concept, language)

- Epic: E6 Analytics & Progress
- Status: TODO
- Owner: Unassigned
- Priority: P2
- Estimate: 0.5d

## Goal

Collect qualitative signals after Module 2 to inform content and language choices.

## Description

Add a dismissible micro-survey after M2 completion. Questions: confidence (1–5), hardest concept (free text or picklist), preferred language. Bilingual UI; persist dismissal; send analytics.

## Deliverables

- [ ] Survey component + trigger after M2
- [ ] TH/EN strings
- [ ] Analytics: `survey_shown`, `survey_submitted`, `survey_dismissed`

## Acceptance Criteria

- Survey appears once after M2 completion and respects dismissal
- Responses are captured with module/task context

## Dependencies

- E4/D7 progress persistence
- E6/A1 analytics wrapper

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Keep friction low; no sign-in required.

