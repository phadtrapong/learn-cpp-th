# E2/A5 — Error boundary, runner failure states, offline banner

- Epic: E2 Runner & Tests
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Improve UX resilience with clear error boundaries, runner failure messages, and offline awareness.

## Description

Add a global React error boundary with a reset action. Surface runner failure statuses (compile error, runtime error, timeout, OOM) with actionable, bilingual messages. Detect offline/online and show a lightweight banner.

## Deliverables

- [ ] Error boundary component and wiring
- [ ] Runner error state messages and icons
- [ ] Offline/online detection and banner

## Acceptance Criteria

- Crashes show a recoverable boundary; runner errors are categorized with next-step guidance
- Offline banner appears/disappears accurately

## Dependencies

- E2/D2 runner integration points

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Keep copy calm, friendly, and concise.

