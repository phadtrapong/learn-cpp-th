# E6/A1 — Analytics event schema + client wrapper (privacy-first)

- Epic: E6 Analytics & Progress
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Define a minimal, privacy-first event schema and implement a client wrapper that queues/sends events with offline tolerance.

## Description

Specify event names, required properties, and context (lesson, module, task, language, runtime timings). Implement a thin client that:

- Queues events in-memory with `localStorage` backup
- Adds a stable anonymous device/session ID (hashed)
- Respects Do Not Track / telemetry opt-out
- Retries with backoff; flushes on `visibilitychange`/`beforeunload`

## Deliverables

- [ ] Event schema doc (YAML/JSON) and examples
- [ ] Type-safe client wrapper with queue and flush
- [ ] Configurable endpoint and batching
- [ ] Unit tests or manual test plan

## Acceptance Criteria

- Events match schema and include required context
- Offline/online transitions preserve and flush queued events
- Opt-out disables sending and clears queue

## Dependencies

- None (server endpoint may be stubbed initially)

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Minimize PII; avoid raw code payloads unless redacted.

