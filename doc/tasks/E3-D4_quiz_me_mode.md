# E3/D4 — Tutor "Quiz Me" mode (2 questions)

- Epic: E3 AI Beginner Tutor
- Day: D4
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Add a lightweight "Quiz Me" mode that generates two quick checks reinforcing the current concept, with bilingual rendering and analytics.

## Description

Extend the tutor panel with a Quiz Me action. Questions are templated to the current lesson concept (e.g., I/O, variables, decisions), with multiple-choice or small fill-in checks. Render in Thai/English, allow instant toggle. Track attempts and correctness for analytics.

## Deliverables

- [ ] Tutor panel button and flow for Quiz Me
- [ ] Question templates per module (M0–M3)
- [ ] Bilingual rendering and toggle
- [ ] Analytics: `quiz_started`, `quiz_answered`, `quiz_completed`

## Acceptance Criteria

- From any lesson, Quiz Me shows two relevant concept questions
- Toggling language updates question/answers without reload
- Analytics events fire with lesson/module context

## Dependencies

- E3/D4 tutor panel exists
- E4 content modules defined to scope topics

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Keep questions short; prioritize confidence-building checks.

