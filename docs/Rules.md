# Rules.md — What the AI can and cannot do

> Read this file, `PRD.md`, `Architecture.md`, `Design.md`, `Tasks.md`, and `Memory.md` BEFORE doing anything. Re-read `Memory.md` before every task.

## 1. Working agreement
1. Work on **one task at a time** from `Tasks.md`. Do not start the next task unprompted.
2. Before coding a task: state a 3–6 line plan and the files you will touch.
3. After a task: run the tests/linters, tick the box in `Tasks.md`, and add decisions/bugs to `Memory.md`.
4. If a request conflicts with `PRD.md` or `Architecture.md`, stop and ask. Do not silently change the architecture.
5. If something is ambiguous, ask one focused question instead of guessing.
6. Keep changes small and reviewable. No drive-by refactors.

## 2. Product guardrails (MUST)
- Never label a document "fake", "genuine", "authentic", "forged", or "fraudulent" as a verdict. Use "risk indicators", "potential", "requires verification".
- Every result view and API result includes the disclaimer and a DoFE verification pointer.
- Never present SachetSewa as an official or government service. No government logos or insignia.
- Never build features that create, edit, or help evade detection of forged documents.
- Never call or scrape DoFE in a way that impersonates a user or violates their terms. Link out only, unless Memory.md records an approved integration.

## 3. Security and privacy (MUST)
- No secrets in code, commits, logs, or frontend bundles. Use `.env`; keep `.env.example` current.
- Validate uploads by extension, magic bytes, and size. Reject by default.
- Uploaded files are private: never served from a public path or static route.
- Scope every DB query by the authenticated user.
- Hash passwords with argon2 or bcrypt. Never log passwords, tokens, or document text.
- Use parameterized queries / ORM only. No string-built SQL. No `shell=True`.
- Use only **synthetic or anonymized** documents in `dataset/`, tests, fixtures, and screenshots. Never invent realistic real-person passport/ID data.
- Do not send user documents to third-party APIs or LLMs.

## 4. Engineering standards
- Backend: Python 3.11+, type hints, Pydantic schemas, `ruff` + `black`, pytest.
- Frontend: React function components + hooks, TypeScript preferred, ESLint + Prettier.
- Engine (`engine/`) must stay free of FastAPI and DB imports.
- Scoring weights come from config, never magic numbers in code.
- Every indicator rule gets: a unit test that triggers it, a unit test that does not, and a plain-language explanation string.
- Prefer clear and boring over clever. Comment the *why*, not the *what*.
- Write/adjust tests with the code, not after.

## 5. Dependencies and tools
- Allowed without asking: libraries already listed in `Architecture.md` §1.
- Ask first before adding any new dependency, service, or paid API.
- Free/open-source only.
- Do not upgrade major versions of existing dependencies without asking.

## 6. Git
- Small commits, imperative messages (`feat(engine): add fee indicator`).
- Never commit `.env`, uploaded files, datasets with PII, or `node_modules`.
- Do not rewrite shared history or force-push.

## 7. Things the AI must NOT do
- Do not delete or overwrite files outside the task scope.
- Do not mark a task done if tests fail or were not run.
- Do not fabricate test results, metrics, accuracy numbers, or citations.
- Do not invent DoFE URLs, agency license data, or legal claims. Use only values recorded in `Memory.md`.
- Do not change the risk weights or level thresholds without recording the reason in `Memory.md`.
- Do not leave `TODO` stubs that look like finished features.

## 8. Communication style
- Explain in plain language; the team has two software and two cybersecurity members, so note which side a change affects.
- When something fails, show the actual error and the fix tried, then log it in `Memory.md`.
- End each task with: what changed, how to run it, what is next.