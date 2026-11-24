# Memory.md — What we've decided, fixed, and learned

> The AI MUST read this at the start of every session and update it at the end of every task.
> Rule of use: if a past mistake or decision is listed here, do not repeat or reverse it without asking.
> Format for new entries: `YYYY-MM-DD | area | what happened / decided | why`.

## 1. Locked decisions
| Date | Area | Decision | Why |
|---|---|---|---|
| 2026-08 | Positioning | SachetSewa is a screening tool only; never says fake/genuine; always points to DoFE | Single documents can't prove authenticity; avoids legal/ethical risk |
| 2026-08 | Scoring | Transparent weighted rule-based model; ML only as later optional extension | Explainability; no labelled real dataset |
| 2026-08 | Weights | Fee 20, Employer/job inconsistency 20, Tampering 20, Agency unmatched 25, Contact 10, Salary 5 (sum 100) | From proposal; tunable after testing, changes must be logged here |
| 2026-08 | Levels | Low 0–30, Medium 31–60, High 61–100 | From proposal |
| 2026-08 | Stack | React, FastAPI, PostgreSQL, PyMuPDF, ExifTool, Tesseract, OpenCV, Docker | From proposal; all free/open-source |
| 2026-08 | Data | Synthetic + anonymized docs only; no real PII | Privacy and ethics section of report |
| 2026-08 | Engine | Engine is a pure Python package with no web/DB dependencies | Parallel team work + testability |
| 2026-08 | Team split | 2 software (web app) / 2 cybersecurity (engine, scoring, security testing) | Appendix C |
| 2026-10-25 | Auth | JWT stored in httpOnly cookie | Mitigates XSS token theft; standard web security best practice |
| 2026-10-25 | Repo layout | Renamed Docs/ to lowercase docs/ | Conforms to Architecture.md §3 directory structure |
| 2026-10-25 | Docs | Replaced external report Appendix A/B references with local docs | Self-contained references: Design.md §6 (Result page) and PRD.md §9 |
| 2026-10-25 | Phase 0 Order | Reordered execution: T0.3 -> T0.4 -> T0.2 | Docker compose (T0.2) requires backend and frontend source scaffolds to exist first |
| 2026-11-24 | UI Strategy | UI is built first with mock data; real API wiring happens in T3.6-T3.8 and T5.2 | Enables rapid frontend development and UX iteration before full backend API integration |

## 2. Open questions (resolve, then move to Locked decisions)
1. **Agency matching (25 pts):** the engine does not call DoFE. Options: (a) local seed list of publicly listed licensed agencies entered manually, (b) manual "could not verify, check DoFE" flag only when agency name/license number is missing or malformed. Which one?
2. **Fee thresholds:** what amount counts as "unusually high" per destination country? Need an approved reference table (cite source).
3. **Salary benchmarks:** how to judge "unusual salary" for a job title without a reliable dataset? Possibly range checks only.
4. **Max upload size** (proposed 10 MB) and max pages.
5. **Retention:** how long are uploaded documents kept? (suggest: user can delete anytime; auto-delete after N days).
6. **Language:** English-only MVP, or Nepali strings included from the start?
7. **Nepali-language documents:** OCR with Nepali pack in MVP or stretch?
8. **Target dataset size** for evaluation.

## 3. Known inconsistencies in the source report (fix, do not copy)
- The report's example result page shows **"High Risk - 8/100"** which contradicts the High band (61–100). Appendix D uses **78/100**. Use 78/100 as the example everywhere.
- Report date is "August 25, 2026" and cites 2026 sources; verify citations before final submission. Reference list URLs contain `utm_source=chatgpt.com` tracking parameters; remove before submission.
- The body has an "Accessibility and Social Responsibility" subsection and a "Methodology" heading that are missing from the Table of Contents; update the TOC.

## 4. Mistakes to never repeat
_(Add entries as they occur. Examples of what belongs here.)_
- Example: "Used `shell=True` for ExifTool call → switched to argument list. Never use shell strings."
- Example: "Result JSON used the word 'fraudulent' as a verdict → replaced with 'risk indicators'."

## 5. Bugs fixed
| Date | Area | Symptom | Root cause | Fix |
|---|---|---|---|---|
| 2026-10-25 | Backend | Ruff UP035/UP006 failure | Used `typing.Dict` instead of built-in `dict` in `main.py` | Replaced with `dict[str, str]` and formatted with black |
| 2026-10-25 | Frontend | TS2339 on `import.meta.env` | Missing Vite client type definitions in TypeScript build | Created `src/vite-env.d.ts` referencing `vite/client` |

## 6. Conventions that emerged
_(Naming, folder, API, error-format conventions agreed during build.)_

## 7. Environment notes
- Backend image must include `tesseract-ocr` and `exiftool`.
- Local ports: frontend 5173, backend 8000, postgres 5432 (change here if they differ).

## 8. Current status
- Phase: 3 (UI foundation)
- Last completed task: U1
- Next task: U2
- Blockers: Open questions 1–3 needed before T4.5–T4.9.

## 9. Session log
| Date | Task | What changed | Next |
|---|---|---|---|
| 2026-10-25 | T0.1 | Renamed Docs/->docs/; created repo scaffold with .gitkeep in leaf folders; created .gitignore, .env.example, README.md; updated PRD.md/Tasks.md appendix references; locked auth decision | T0.3 |
| 2026-10-25 | T0.3 | Created backend scaffold (FastAPI app, /api/v1/health with CORS, Pydantic settings config, requirements.txt, pyproject.toml, health test, package __init__.py files, README virtualenv guide); verified with pytest, ruff, black | T0.4 |
| 2026-10-25 | T0.4 | Created frontend scaffold (Vite + React + TS, react-router with 6 placeholder pages, layout with DoFE disclaimer, tokens.css, api client, LandingPage Vitest test); verified with lint, test, build | T0.2 |
| 2026-10-26 | T0.2 | Created docker-compose.yml (db, backend, frontend), backend/Dockerfile (Python 3.11-slim, tesseract, exiftool, non-root user), frontend/Dockerfile (Node 20-slim, vite dev), .dockerignore files, updated .env.example, README.md Docker section; verified compose up, /api/v1/health (200), frontend (200), and compose down | T0.5 |
| 2026-11-24 | U1 | Created frontend foundation: shared components (Button, Card, RiskBadge, Disclaimer, PageContainer, Alert), en.ts i18n dictionary, synthetic mock.ts with VITE_USE_MOCK, responsive Layout with skip link & mobile toggle, rich Landing & About pages, and Vitest suite (RiskBadge, Layout, Landing); verified lint, test, build | U2 |