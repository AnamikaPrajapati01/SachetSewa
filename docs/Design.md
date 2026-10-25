# Design.md — How SachetSewa should look and feel

## 1. Design principles
1. **Calm, not scary.** The user is already anxious about money and a job. Be serious and reassuring, never alarmist.
2. **Plain language.** Write at an easy reading level. No forensic jargon in the UI ("document was edited after creation", not "incremental xref update detected"). Technical detail lives behind an optional "Technical details" toggle.
3. **Explain every result.** Never show a score without reasons.
4. **Trustworthy but honest.** Make it clear this is a screening aid, not an official verdict.
5. **Mobile-first.** Most users will use a phone on a modest connection.
6. **Accessible.** Don't rely on color alone for risk level; use text + icon + color.

## 2. Tone of voice
- Friendly, direct, respectful. Short sentences.
- Say: "We found 3 warning signs." / "This does not prove the offer is fake." / "Please verify with DoFE before paying anything."
- Avoid: "FAKE!", "SCAM DETECTED", "Guaranteed", "Verified".
- Offer an English UI first; structure all strings in an i18n file so Nepali can be added.

## 3. Visual identity
| Token | Value | Use |
|---|---|---|
| Primary | `#0F4C5C` (deep teal) | headers, primary buttons |
| Primary-light | `#E6F1F3` | surfaces, highlights |
| Ink | `#14212B` | body text |
| Muted | `#5B6B78` | secondary text |
| Background | `#F7F9FA` | page |
| Surface | `#FFFFFF` | cards |
| Risk Low | `#2E7D32` on `#E8F5E9` | low risk badge |
| Risk Medium | `#B26A00` on `#FFF4E0` | medium risk badge |
| Risk High | `#B3261E` on `#FDECEA` | high risk badge |

- Font: **Inter** (fallback system-ui); Devanagari fallback **Noto Sans Devanagari**.
- Radius 12px on cards, 8px on inputs/buttons. Soft shadow only. No heavy gradients.
- Icons: Lucide. Logo: simple shield + checkmark/magnifier motif (text wordmark acceptable for MVP).
- Do **not** use government emblems, flags-as-seals, or anything implying official status.
- Support light mode first; dark mode optional later.

## 4. Layout and responsiveness
- Breakpoints: 360 (base) / 768 / 1200. Max content width 1100px.
- Single-column on mobile; result page uses a header summary + stacked indicator cards.
- Touch targets ≥ 44px. Body text ≥ 16px.

## 5. Screens
1. **Landing** — one-sentence value, "Check a document" CTA, 3-step "How it works", honest limitations, DoFE link, footer disclaimer.
2. **Register / Login** — minimal fields, clear password rules, privacy note.
3. **Upload** — large drag-drop / tap-to-pick zone; accepted: PDF, JPG, PNG; size limit shown; privacy reassurance ("Only you can see this file"); tips ("Hide nothing — but don't upload documents you can't share").
4. **Analyzing** — progress with friendly steps (Reading document → Checking details → Looking for edits → Calculating risk). No fake percentages; use step states.
5. **Result** — see §6.
6. **History** — list of past analyses: date, filename, risk badge; open or delete.
7. **About / Safety tips** — how scoring works, what we can't tell you, common foreign-employment scam signs, how to verify with DoFE.
8. **(Could) Admin evaluation** — metrics table for the team.

## 6. Result page (most important screen)
Order:
1. **Risk badge**: `HIGH RISK · 78/100` — text + icon + color. Large.
2. **One-sentence summary**: "We found 5 warning signs in this document."
3. **What to do next** (level-specific):
   - Low: "Few warning signs found. Still verify with DoFE before committing."
   - Medium: "Check the concerns below and verify with DoFE before paying or committing."
   - High: "Do not pay money or share more personal information until you verify this offer through official channels."
4. **Indicator cards** (sorted by weight): title, plain explanation, severity chip, "Why this matters", optional "Technical details" expander.
5. **Primary CTA**: "Verify with DoFE" (opens official site in new tab).
6. **Disclaimer** (always visible, not collapsible): "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent."
7. Secondary actions: Upload another, Delete this document.

## 7. States to design
- Empty history, upload error (wrong type / too large / unreadable), OCR low-confidence ("We could not read part of this document; results may be incomplete"), analysis failed with retry, offline/slow network.

## 8. Accessibility checklist
- WCAG AA contrast, visible focus rings, labels on all inputs, `aria-live` for analysis progress and errors, semantic headings, alt text, keyboard-operable upload.

## 9. Microcopy bank
- Upload hint: "Upload an offer letter or recruitment document (PDF, JPG or PNG, up to 10 MB)."
- Privacy: "Your file is private and used only to analyze your document."
- Limitations: "We look for warning signs. We cannot confirm whether an offer is legal."