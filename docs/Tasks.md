# Tasks.md — Build plan, step by step

> Rules: do ONE task at a time, in order. Tick `[x]` only when tests pass. Log decisions/bugs in `Memory.md`.
> Owner tags: **[SW]** software team · **[CS]** cybersecurity team · **[ALL]**
> Phases map to the 16-week timeline in the proposal.

## Phase 0 — Project setup (Week 1)
- [x] T0.1 [ALL] Create repo layout from `Architecture.md` §3, add `.gitignore`, `.env.example`, README.
- [x] T0.3 [SW] Backend scaffold: FastAPI app, config via env, ruff/black/pytest wired up.
- [x] T0.4 [SW] Frontend scaffold: Vite + React + router + design tokens from `Design.md`.
- [x] T0.2 [SW] `docker-compose.yml` with postgres + backend + frontend; `/health` returns 200.
- [ ] T0.5 [CS] Engine package scaffold `sachetsewa_engine` with `types.py` (`Indicator`, `AnalysisResult`) and `pipeline.analyze(path)` stub.
- [ ] T0.6 [ALL] CI: lint + tests on push.

## Phase 1 — Requirements and indicator definition (Weeks 1–4)
- [ ] T1.1 [CS] Write `indicators.md`: for each indicator in PRD §9 define trigger logic, evidence, plain-language explanation.
- [ ] T1.2 [CS] Create `scoring/weights.yaml` with weights and level thresholds.
- [ ] T1.3 [ALL] Decide and record open questions in `Memory.md` (agency matching source, fee thresholds, salary benchmarks).

## Phase 2 — Dataset (Weeks 4–6)
- [ ] T2.1 [CS] Define dataset folders: `genuine/`, `suspicious/`, `manipulated/` + `ground_truth.csv` schema.
- [ ] T2.2 [CS] Generate synthetic genuine-style offer letters (fake names, fake agencies, no real PII).
- [ ] T2.3 [CS] Create controlled manipulations: changed salary, dates, names, pasted image, inconsistent employer, high fee.
- [ ] T2.4 [CS] Add scanned/photo variants (rotated, low-res) for OCR testing.
- [ ] T2.5 [CS] Reach target sample count (record number in `Memory.md`), document labelling.

## Phase 3 — Backend and frontend core (Weeks 5–9)
- [x] U1 [SW] UI foundation, Landing, About
- [ ] U2 [SW] UI Register, Login, Upload, Analyzing
- [ ] U3 [SW] UI Result, History, 404, states
- [ ] T3.1 [SW] DB models + Alembic migrations (users, documents, analyses, indicators, extracted_fields).
- [ ] T3.2 [SW] Auth: register/login/logout/me, argon2/bcrypt, JWT cookie, tests.
- [ ] T3.3 [SW] Secure upload: extension + magic bytes + size, UUID filename, private storage, sha256, tests with bad files.
- [ ] T3.4 [SW] Documents list/delete endpoints, user-scoped (IDOR tests).
- [ ] T3.5 [SW] Analysis endpoints: start (background task), status, history.
- [ ] T3.6 [SW] Frontend: Landing, Register, Login.
- [ ] T3.7 [SW] Frontend: Upload page with validation and error states.
- [ ] T3.8 [SW] Frontend: Analyzing (polling) + History page.

## Phase 4 — Analysis engine (Weeks 6–10)
- [ ] T4.1 [CS] Input classifier: digital PDF vs scanned PDF vs image.
- [ ] T4.2 [CS] PyMuPDF text extraction + tests.
- [ ] T4.3 [CS] Tesseract OCR path (render pages, preprocess with OpenCV) + tests.
- [ ] T4.4 [CS] Field parser: agency, employer, job title, salary, fees, dates, phone/email/website.
- [ ] T4.5 [CS] Indicators: recruitment fee.
- [ ] T4.6 [CS] Indicators: employer/job inconsistency + missing info.
- [ ] T4.7 [CS] Indicators: contact info (suspicious email domains, messaging-app-only contact, etc.).
- [ ] T4.8 [CS] Indicators: salary plausibility.
- [ ] T4.9 [CS] Indicator: agency cannot be matched (per decision in `Memory.md`).
- [ ] T4.10 [CS] Forensics: ExifTool metadata (editor software, mismatched creation/modify dates).
- [ ] T4.11 [CS] Forensics: PDF structure (font mix, incremental updates, odd producer, embedded images).
- [ ] T4.12 [CS] Forensics: OpenCV basic anomalies (resampling/compression inconsistencies, pasted regions) — keep scope basic.
- [ ] T4.13 [CS] Scoring engine: weights from YAML, normalize 0–100, map level, collect reasons.
- [ ] T4.14 [CS] Graceful degradation + timeouts; engine CLI for quick manual runs.

## Phase 5 — Integration and results UI (Weeks 9–11)
- [ ] T5.1 [SW+CS] Wire engine into backend analysis task; persist indicators and fields.
- [ ] T5.2 [SW] Result page per `Design.md` §6 (badge, summary, next steps, indicator cards, DoFE CTA, disclaimer).
- [ ] T5.3 [SW] About / Safety tips page; delete-my-data flow.
- [ ] T5.4 [SW] Empty/error/low-confidence states and accessibility pass.

## Phase 6 — Testing (Weeks 12–13)
- [ ] T6.1 [SW] Functional tests: register → upload → analyze → result → history → delete.
- [ ] T6.2 [CS] Security tests: malicious/mismatched files, oversized/corrupt files, auth bypass, IDOR, injection, path traversal, rate limiting.
- [ ] T6.3 [CS] Fix findings; record in `Memory.md`.
- [ ] T6.4 [SW] Basic usability test with a few real people; record feedback.

## Phase 7 — Evaluation and wrap-up (Weeks 14–16)
- [ ] T7.1 [CS] Evaluation script: run engine over dataset → accuracy, precision, recall, F1, false-positive rate, avg processing time; export CSV.
- [ ] T7.2 [CS] Per-indicator analysis; tune weights; log changes in `Memory.md`.
- [ ] T7.3 [ALL] Documentation: setup guide, architecture update, user guide.
- [ ] T7.4 [ALL] Final report figures/tables from real evaluation outputs (no invented numbers).
- [ ] T7.5 [ALL] Demo script and polished prototype.

## Stretch (only after T7.1)
- [ ] S1 Nepali UI strings and Nepali OCR language pack.
- [ ] S2 scikit-learn classifier benchmarked against rule-based baseline.
- [ ] S3 Admin metrics page.