# E2/A2 — Security headers (CSP, COOP/COEP) + WASM hardening

- Epic: E2 Runner & Tests
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 0.5d

## Goal

Harden the app and WASM execution path with appropriate browser security headers and safe defaults.

## Description

Configure CSP to restrict scripts, workers, and WASM sources. Enable COOP/COEP per WASM needs. Ensure no network egress from runners. Handle worker termination and timeouts defensively.

## Deliverables

- [ ] CSP, COOP, COEP headers set
- [ ] Worker lifecycle management and timeouts
- [ ] Docs on security posture and tradeoffs

## Acceptance Criteria

- Headers present and valid in prod build
- Runner respects CPU/mem/time caps with safe termination

## Dependencies

- E2/D2 runner architecture

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Test across Chrome/Edge/Safari; document any degraded features.

