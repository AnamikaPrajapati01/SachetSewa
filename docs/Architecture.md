# Architecture.md — SachetSewa

> HOW the system is structured. If code contradicts this file, stop and ask; do not silently diverge.

## 1. Stack (fixed by the project proposal)
| Layer | Choice |
|---|---|
| Frontend | React.js (Vite), JavaScript/TypeScript, CSS (Tailwind allowed), HTML |
| Backend API | Python 3.11+, FastAPI, Pydantic, SQLAlchemy + Alembic |
| Database | PostgreSQL |
| Analysis engine | Python package: PyMuPDF, ExifTool (via `pyexiftool` or subprocess), Tesseract (`pytesseract`), OpenCV, optional scikit-learn (later) |
| Auth | Password hashing (argon2/bcrypt) + JWT (httpOnly cookie preferred) |
| Infra | Docker + docker-compose, Git/GitHub |
| Tests | pytest (backend + engine), Vitest/RTL (frontend), Playwright optional |

## 2. High-level diagram
```
[React SPA] --HTTPS--> [FastAPI]
                          |-- Auth / Users
                          |-- Documents API (upload, list, delete)
                          |-- Analysis API (run, result)
                          |        |
                          |        v
                          |   [Analysis Engine (pure Python package)]
                          |        |- extractors: pdf_text, ocr
                          |        |- indicators: fee, salary, employer/job, contact, completeness
                          |        |- forensics: metadata, pdf_structure, image_anomaly
                          |        |- scoring: weighted rules -> score + level + reasons
                          |
                          |-- [PostgreSQL]  (users, documents, analyses, indicators)
                          |-- [Private file storage] (volume; never publicly served)
```
The engine has **no web or DB dependencies**. It takes a file path and returns a structured result. This keeps it unit-testable and lets the cybersecurity team work independently of the software team.

## 3. Repository layout
```
sachetsewa/
├── docs/                  # PRD.md Architecture.md Rules.md Design.md Tasks.md Memory.md
├── frontend/
│   └── src/ {pages, components, api, hooks, styles}
├── backend/
│   └── app/ {main.py, api/, core/, models/, schemas/, services/, db/}
│   └── tests/
├── engine/                # installable package: sachetsewa_engine
│   └── sachetsewa_engine/ {extractors/, indicators/, forensics/, scoring/, pipeline.py, types.py}
│   └── tests/
├── dataset/               # synthetic + anonymized samples + ground_truth.csv (NO real PII)
├── docker-compose.yml
└── .env.example
```

## 4. Analysis pipeline
1. **Validate**: extension AND magic-bytes AND size limit (e.g. 10 MB). Reject everything else.
2. **Classify input**: digital PDF (has text layer) vs scanned PDF vs image.
3. **Extract text**: PyMuPDF for digital PDFs; render pages + Tesseract for scans/images.
4. **Parse fields** (best effort, regex + heuristics): agency name/license no., employer, job title, salary, fees, dates, phone/email/website.
5. **Run indicator rules** → list of `Indicator{id, title, weight, severity, evidence, explanation}`.
6. **Run forensics** (parallelizable): ExifTool metadata, PyMuPDF structure (fonts, producer, text blocks, embedded images, incremental updates), OpenCV basic anomalies.
7. **Score**: sum weights of triggered indicators, clamp/normalize to 0–100, map to level.
8. **Return** `AnalysisResult{score, level, indicators[], extracted_fields, warnings, disclaimer, engine_version}`.

Each stage must degrade gracefully: if OCR fails, return a result with a "could not read document fully" warning, not a 500.

## 5. Scoring contract
- Weights live in **one config file** (`scoring/weights.yaml`), not hardcoded.
- Levels: Low 0–30, Medium 31–60, High 61–100.
- Same input + same engine version = same output (deterministic).
- Output never uses the words "fake", "genuine", "authentic", "fraudulent" as a verdict.

## 6. Data model (initial)
- **users**(id, email unique, password_hash, created_at)
- **documents**(id, user_id FK, original_filename, stored_path, mime, size_bytes, sha256, uploaded_at, deleted_at)
- **analyses**(id, document_id FK, status[queued|running|done|failed], score, level, engine_version, started_at, finished_at, error)
- **indicators**(id, analysis_id FK, code, title, weight, severity, explanation, evidence_json)
- **extracted_fields**(id, analysis_id FK, key, value, confidence)

## 7. API (REST, `/api/v1`)
| Method | Path | Purpose |
|---|---|---|
| POST | /auth/register | create account |
| POST | /auth/login | login |
| POST | /auth/logout | logout |
| GET | /me | current user |
| POST | /documents | upload (multipart) |
| GET | /documents | list own documents |
| DELETE | /documents/{id} | delete document + analysis |
| POST | /documents/{id}/analyze | start analysis |
| GET | /analyses/{id} | status + result |
| GET | /analyses | history |
| GET | /health | liveness |

All routes except `/auth/*` and `/health` require auth, and every query is scoped to the current user (no IDOR).

## 8. Security architecture
- Uploads stored outside web root with random UUID filenames; original name kept only in DB.
- Never execute or render uploaded content server-side beyond the parsers; run parsers with timeouts and size caps.
- ExifTool/Tesseract invoked with argument lists (no shell string concatenation).
- Rate-limit auth and upload endpoints; CORS locked to the frontend origin.
- Secrets only via environment variables.
- Logs must not contain document text or PII.
- Security test cases: malicious/mismatched file types, oversized/corrupt files, auth bypass, IDOR, injection, path traversal.

## 9. Execution model
MVP: background task (FastAPI `BackgroundTasks`) + polling `GET /analyses/{id}`. Only introduce Celery/Redis if Memory.md records a real need.

## 10. Deployment
`docker-compose up` runs frontend, backend, postgres. The backend image must include Tesseract and ExifTool binaries.

## 11. Extension points (not MVP)
- scikit-learn classifier compared against the rule-based baseline.
- Nepali OCR language pack (`nep`) and Nepali UI strings.