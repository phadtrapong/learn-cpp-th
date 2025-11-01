# E1/A3 — CI/CD (GitHub Actions), lint/typecheck, Playwright E2E smoke

- Epic: E1 Landing & Onboarding
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Automate quality gates and basic end-to-end validation for the first-run experience.

## Description

Add GitHub Actions workflows for install/cache, lint, typecheck, build, and unit tests. Add a minimal Playwright E2E that loads the app, runs starter code, sees output, and toggles language.

## Deliverables

- [ ] CI workflow (lint, typecheck, build/test)
- [ ] Playwright setup + E2E smoke for first-run path
- [ ] Artifacts/screenshots on failure

## Acceptance Criteria

- CI passes on main and PRs; E2E validates core flow

## Dependencies

- E1/D1 scaffold exists; E2/D2 runner path available

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Keep CI fast (<10m); cache deps.

