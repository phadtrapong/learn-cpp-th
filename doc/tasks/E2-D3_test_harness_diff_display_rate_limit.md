# E2/D3 — Test harness, minimal diff display, anonymous rate limiting

- Epic: E2 Runner & Tests
- Day: D3
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Provide deterministic unit testing for tasks via a simple DSL, surface pass/fail with minimal diffs, and protect the runner with anonymous rate limiting.

## Description

Define a small task DSL (inputs/outputs/asserts) and schema. Implement a harness that compiles candidate code, runs tests deterministically, and emits structured results. Add a minimal unified diff viewer for expected vs actual. Introduce anonymous rate limits per IP/device with clear error copy.

## Deliverables

- [ ] Task DSL and schema (types, sample JSON)
- [ ] Deterministic test runner integrated with WASM path
- [ ] Minimal diff UI for failing tests
- [ ] Anonymous rate limiting for run invocations

## Acceptance Criteria

- Given a failing task, UI shows a minimal diff for the failing assert
- Given excessive runs, user receives a friendly, actionable rate limit message
- Tests produce stable, repeatable outputs for the same inputs

## Dependencies

- E2/D2 WASM compile+run

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Determinism is critical for tutor accuracy; avoid nondeterministic I/O.

