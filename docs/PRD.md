# PRD.md — SachetSewa

> Product Requirements Document. Source of truth for WHAT we are building and WHY.
> Derived from the project proposal report (Westcliff University, BSc IT).

## 1. One-line summary
SachetSewa is a web app where a prospective Nepali migrant worker uploads a foreign-employment offer letter or recruitment document and receives an **explainable Low / Medium / High risk assessment** of possible fraud indicators, followed by a direction to the Department of Foreign Employment (DoFE) for official verification.

## 2. Problem
- Foreign employment is a major income source for Nepali households, but recruitment exposes workers to fake offers, false contracts, misleading salary/job info, and high or illegal fees.
- Nearly two-thirds of surveyed migrant workers paid recruitment costs before getting a job; workers using unregistered brokers paid the most (ILO / National Statistics Office, 2026).
- Contract fraud during recruitment (false contracts, misleading job/salary info) is a recognized risk (World Bank, 2025).
- DoFE already provides official verification, but there is **no pre-verification screening layer** that analyzes the actual document a worker has in hand and explains why it looks suspicious.

## 3. Product positioning (NON-NEGOTIABLE)
- SachetSewa is a **preliminary screening and awareness tool**.
- It is **NOT** an official verification authority and does **NOT** replace DoFE.
- It **never** declares a document "genuine" or "fake". It reports *risk indicators* and a *risk level*.
- Every result ends with a pointer to official DoFE verification.

## 4. Target users
| User | Needs |
|---|---|
| Prospective migrant worker (primary) | Quick, plain-language check before paying money or sharing personal info |
| Family member helping the worker | Same, often less technical |
| Evaluator / supervisor (academic) | Transparent logic, measurable results, documented tests |

Assume low-to-medium digital literacy, mobile-first usage, possibly slow connections.

## 5. Goals
1. Secure web app: register/login, upload PDF/image documents.
2. Analysis pipeline: text extraction, OCR, metadata, PDF structure, basic image forensics.
3. Transparent weighted risk-scoring engine (rule-based) producing 0–100 and Low/Medium/High.
4. Clear, non-technical explanation of every indicator found.
5. Official-verification guidance (DoFE) on every result.
6. Evaluation on a controlled genuine/suspicious/manipulated dataset.

## 6. Non-goals (out of scope)
- Legal or official determination of authenticity.
- Replacing, scraping, or impersonating DoFE services.
- Advanced forensic authentication of every manipulation type.
- Tools that create or alter documents (no forgery features, ever).
- Machine learning in the MVP (optional extension only, after rule-based baseline).
- Mobile native apps (responsive web only).

## 7. Core user flow
1. User registers / logs in.
2. Uploads offer letter or recruitment document (PDF, JPG, PNG).
3. System validates file type and size.
4. Pipeline runs: extract text (PyMuPDF or Tesseract OCR) → fraud-indicator rules → forensics (ExifTool, PyMuPDF structure, OpenCV) in parallel.
5. Risk engine sums weighted indicators → score 0–100 → category.
6. Result page: risk level, score, list of indicators with plain-language reasons, next steps, DoFE link, disclaimer.
7. Result saved to user's analysis history.

## 8. Functional requirements
| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Register, login, logout, session/JWT auth | Must |
| FR-2 | Upload PDF/JPG/PNG with type + size validation | Must |
| FR-3 | Text extraction from digital PDFs (PyMuPDF) | Must |
| FR-4 | OCR for scanned PDFs/images (Tesseract) | Must |
| FR-5 | Metadata extraction (ExifTool) | Must |
| FR-6 | PDF structure analysis (fonts, text blocks, embedded images, page structure) | Must |
| FR-7 | Basic image anomaly checks (OpenCV) | Should |
| FR-8 | Fraud-indicator rules (fees, salary, employer/job consistency, contact info, missing fields) | Must |
| FR-9 | Weighted risk score + Low/Medium/High category | Must |
| FR-10 | Explainable result page with per-indicator reasons | Must |
| FR-11 | DoFE verification guidance + disclaimer on every result | Must |
| FR-12 | Analysis history per user | Must |
| FR-13 | Delete my document / my account data | Should |
| FR-14 | Nepali language UI (English first) | Could |
| FR-15 | Admin view for evaluation metrics | Could |

## 9. Risk-scoring model (initial; weights tunable after testing)
| Indicator | Weight |
|---|---|
| Agency info cannot be matched with available official information | 25 |
| Suspicious / unusually high recruitment fee | 20 |
| Major inconsistency in job/employer information | 20 |
| Strong document-tampering indicator | 20 |
| Suspicious contact information | 10 |
| Unusual / inconsistent salary information | 5 |

Total = 100. Mapping: **Low 0–30 · Medium 31–60 · High 61–100.**
Recommended advice per level: see `Design.md` §6 (Result page).

## 10. Non-functional requirements
- **Security:** authenticated access, private storage, input/file validation, no public document URLs.
- **Privacy:** collect minimum PII; synthetic/anonymized data for dev and tests.
- **Explainability:** every score traceable to named indicators.
- **Performance:** target analysis under ~30 s for a typical 1–5 page document (measure and report).
- **Usability:** plain language, mobile responsive, accessible contrast.
- **Cost:** only free/open-source tooling.

## 11. Success metrics (from Testing & Evaluation)
Accuracy, precision, recall, F1, false-positive rate, average processing time, and usability (can users upload, understand results, follow DoFE guidance?). Per-indicator evaluation to find rules causing excess false positives.

## 12. Team and ownership
- **Software team (2):** frontend, backend, DB, auth, secure upload, dashboard, result visualization, engine integration.
- **Cybersecurity team (2):** indicator definitions, forensics, metadata/PDF/OCR/image analysis, scoring engine, security testing, detection evaluation.

## 13. Timeline (16 weeks)
P1 Requirements (1–2) · P2 Design (3–4) · P3 Dataset + indicators (4–6) · P4 Frontend/backend (5–9) · P5 Forensics module (6–10) · P6 Scoring integration (9–11) · P7 Security + functional testing (12–13) · P8 Evaluation + docs (14–16).

## 14. Deliverables
Working prototype, document-analysis module, risk engine, labelled test dataset, system documentation, evaluation results, final report.

## 15. Assumptions and open questions
See `Memory.md` → "Open questions".