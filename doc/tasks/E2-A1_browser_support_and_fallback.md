# E2/A1 — Browser support matrix + unsupported fallback

- Epic: E2 Runner & Tests
- Status: TODO
- Owner: Unassigned
- Priority: P2
- Estimate: 0.5d

## Goal

Define supported browsers/versions and provide a graceful fallback message when unsupported.

## Description

Create a support matrix (features: WASM, Web Workers, SharedArrayBuffer if used). Detect at runtime and show a friendly, bilingual fallback page with guidance.

## Deliverables

- [ ] Support matrix doc
- [ ] Runtime detection and fallback UI
- [ ] TH/EN messages

## Acceptance Criteria

- Unsupported browsers receive a clear message and guidance; app doesn’t crash

## Dependencies

- E2/D2 runner feature requirements

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Include low-end device guidance for performance expectations.

