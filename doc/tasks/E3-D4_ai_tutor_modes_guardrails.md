# E3/D4 — AI Tutor modes (Explain Error, Minimal Fix, Concept Explain) + guardrails

- Epic: E3 AI Beginner Tutor
- Day: D4
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Enable beginner-friendly tutor interactions that can explain errors, propose minimal diffs, and clarify concepts, while enforcing a hint ladder before revealing full solutions.

## Description

Create prompt templates for tutor modes: Explain Error, Minimal Fix (diff), and Concept Explain. Build a context packer that constrains inputs to code, compiler errors, and failing tests. Implement ladder guardrails so full solutions appear only after ≥2 hints or explicit request. Add a tutor panel UI with bilingual rendering and per-hint language toggle.

## Deliverables

- [ ] Prompt templates: Explain Error, Minimal Fix, Concept Explain
- [ ] Context builder: code, error, failing tests, task constraints
- [ ] Guardrails: hint ladder gating + explicit "show solution" control
- [ ] Tutor panel UI with bilingual (TH/EN) toggle

## Acceptance Criteria

- For missing `#include <iostream>`, Explain Error points out header within one hint
- Minimal Fix yields a minimal diff patch when ladder allows it
- Hints re-render in the selected language without page reload

## Dependencies

- E2/D3 test outputs and errors available

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Prefer snippet-level patches to reduce hallucination surface area.

