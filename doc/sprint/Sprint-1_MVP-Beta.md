# Sprint 1 — MVP Beta (10 days)

- Goal: Ship a usable MVP Beta that lets first-time learners run C++ code, get helpful hints, complete Modules 0–1, switch Thai/English, persist progress locally, and emit core analytics.
- Definition of Do
ne: PRD acceptance criteria covered for M0; M1 fully playable; AI tutor (Explain Error, Minimal Fix, Concept Explain) with guardrails; Thai default in TH with toggle; compile/run via WASM; core analytics events; QA script and acceptance checks pass.
- Duration: 10 working days

## Scope (Must-Have Tasks)

- E1
  - doc/tasks/E1-D1_repo_scaffold_nextjs_monaco_i18n.md
  - doc/tasks/E1-A2_privacy_terms_pages_th_en.md
  - doc/tasks/E1-A3_ci_cd_and_e2e_smoke.md
- E2
  - doc/tasks/E2-D2_wasm_toolchain_runner_endpoint_results_autosave.md
  - doc/tasks/E2-D3_test_harness_diff_display_rate_limit.md
  - doc/tasks/E2-A2_security_headers_wasm_hardening.md
  - doc/tasks/E2-A3_progress_storage_schema_and_tools.md
  - doc/tasks/E2-A5_error_states_and_offline_banner.md
- E3
  - doc/tasks/E3-D4_ai_tutor_modes_guardrails.md
- E4
  - doc/tasks/E4-D5_module0_content_th_translations_analytics.md
  - doc/tasks/E4-D6_module1_glossary_clang_tidy.md
- E5
  - doc/tasks/E5-A1_i18n_extraction_and_workflow.md
  - doc/tasks/E5-A3_locale_default_strategy.md
- E6
  - doc/tasks/E6-A1_analytics_event_schema_client_wrapper.md
  - doc/tasks/E6-D10_qascript_acceptance_tests_launch_checklist.md

Total in scope: 15 tasks

## Out of Scope (Defer to Next Sprint)

- doc/tasks/E1-A1_landing_waitlist_integration.md
- doc/tasks/E1-A4_thai_font_stack_and_license_audit.md
- doc/tasks/E2-A1_browser_support_and_fallback.md
- doc/tasks/E3-D4_quiz_me_mode.md
- doc/tasks/E4-D7_module2_hint_ladders_progress_badges.md
- doc/tasks/E4-D8_module3_grade_classifier.md
- doc/tasks/E4-A1_content_lint_and_validation.md
- doc/tasks/E5-D9_accessibility_perf_i18n_qa.md
- doc/tasks/E5-A4_perf_instrumentation.md
- doc/tasks/E6-A2_analytics_pipeline_funnels_dashboard.md
- doc/tasks/E6-A3_m2_micro_survey.md

## Day-by-Day Plan (Guidance)

- Day 1: E1-D1 scaffold + i18n toggle; basic theme; Monaco
- Day 2: E2-D2 WASM runner; result panel; autosave
- Day 3: E2-D3 test harness + diff; rate limiting
- Day 4: E3-D4 tutor modes + guardrails (Explain Error, Minimal Fix, Concept)
- Day 5: E4-D5 Module 0 + TH/EN + core analytics; E6-A1 analytics wrapper
- Day 6: E4-D6 Module 1 + glossary; beginner clang-tidy (non-blocking)
- Day 7: E2-A3 progress schema + local persistence; checkmarks/streak seed
- Day 8: E2-A5 error states + offline banner; E2-A2 security headers
- Day 9: E5-A1 i18n extraction workflow; E5-A3 locale default (Thai in TH)
- Day 10: E6-D10 QA script + acceptance test pass; launch checklist

## Acceptance Criteria Coverage

- M0 Task 1 completes without external help — via E4-D5, E2 runner, E3 tutor
- Thai default in TH; inline toggle — via E1-D1, E5-A3, E5-A1
- Compile P50 ≤ 5s; hot rerun ≤ 2s — basic via E2-D2 (final tuning next sprint)
- Hint ladder + bilingual — via E3-D4, E4-D5/D6
- Local progress — via E2-A3
- Analytics events present — via E4-D5 + E6-A1

## Risks & Mitigations

- Slow compile/hot rerun — keep tasks tiny; prewarm/cache basics; deeper tuning next sprint
- Tutor hallucinations — constrain context to code/errors/tests; minimal diffs; ladder gating
- i18n gaps — enforce extraction workflow; TH/EN review pass for M0–M1
- Legal/privacy — ship TH/EN Privacy/Terms aligned with analytics wrapper behavior

## Notes for Team

- Keep scope tight: M0–M1 fully playable; M2–M3 in next sprint.
- Aim for calm UI with large font; glossary popovers for M1 terms.
- CI/E2E should validate first-run path early to stabilize velocity.

