# E2/D2 — WASM toolchain (C++17), run endpoint/worker, result panel, autosave

- Epic: E2 Runner & Tests
- Day: D2
- Status: TODO
- Owner: Unassigned
- Priority: P1
- Estimate: 1d

## Goal

Compile and run tiny C++17 programs via WASM with CPU/memory/time caps, present results clearly, and autosave code drafts locally.

## Description

Integrate Clang/LLVM to WASM (or a vetted C++→WASM toolchain). Use a Web Worker (or similar) to compile and run safely with resource limits. Implement a result panel that shows stdout/stderr/exit code and basic timings. Persist editor buffers in `localStorage` for offline tolerance.

## Deliverables

- [ ] C++17 compile+run in WASM with sandboxed execution
- [ ] Worker/runner bridge with CPU/mem/time caps and graceful abort messaging
- [ ] Result panel (stdout/stderr/exit, compile/run timings)
- [ ] Editor autosave in `localStorage` (per task/module)
- [ ] Initial prewarm/cache strategy for faster hot reruns

## Acceptance Criteria

- Hello World compiles and runs successfully in-browser
- Hot rerun leverages caching path (observably faster vs cold)
- Abort messages are clear when limits are exceeded

## Dependencies

- E1/D1 app scaffold and editor present

## Tracking Checklist

- [ ] Design finalized
- [ ] Implemented
- [ ] Reviewed/QA
- [ ] Docs updated

## Notes

Keep tasks tiny to ensure compile P50 ≤ 5s can be met after tuning (D9).

