# SachetSewa

SachetSewa is a web application designed to help prospective Nepali migrant workers identify potential fraud and recruitment irregularities in foreign-employment offer letters and recruitment documents. By combining document text extraction, metadata inspection, structural checks, and a transparent rule-based risk-scoring engine, SachetSewa produces an explainable Low, Medium, or High risk assessment that highlights warning signs in plain language before workers commit funds or personal information.

> **IMPORTANT DISCLAIMER:**
> SachetSewa is strictly a **preliminary screening and awareness tool**, NOT an official verification service or government body. It never declares a document definitively "genuine" or "fake". The Department of Foreign Employment (DoFE), Government of Nepal, is the sole official authority for verifying recruitment approvals, agency licenses, and foreign-employment contracts. Every analysis result directs users to official DoFE channels for verification.

## Repository Layout

```
sachetsewa/
├── docs/                  # Project specifications, architecture, and working rules
│   ├── PRD.md             # Product Requirements Document
│   ├── Architecture.md    # System architecture, stack, and API design
│   ├── Rules.md           # Engineering rules, security constraints, and working agreement
│   ├── Design.md          # UI/UX principles, design tokens, and screen specifications
│   ├── Tasks.md           # Step-by-step phased build plan
│   └── Memory.md          # Project decision log, conventions, and status
├── frontend/              # React (Vite) single-page application
├── backend/               # FastAPI backend application
│   ├── app/               # Core API, database models, schemas, and services
│   └── tests/             # Backend API test suite
├── engine/                # Independent document analysis Python package (sachetsewa_engine)
│   ├── sachetsewa_engine/ # Extractors, forensics, indicator rules, and scoring
│   └── tests/             # Engine unit test suite
├── dataset/               # Synthetic and anonymized document samples for evaluation
│   ├── genuine/           # Synthetic baseline documents
│   ├── suspicious/        # Manipulated/irregular sample documents
│   └── manipulated/       # Tampered sample documents
├── .env.example           # Environment variable template
├── .gitignore             # Git ignore patterns
└── README.md              # Project overview
```

## Documentation

For full details on project requirements, engineering standards, architecture, and current task status, please consult the files in the [`docs/`](docs/) directory:
- [docs/PRD.md](docs/PRD.md)
- [docs/Architecture.md](docs/Architecture.md)
- [docs/Rules.md](docs/Rules.md)
- [docs/Design.md](docs/Design.md)
- [docs/Tasks.md](docs/Tasks.md)
- [docs/Memory.md](docs/Memory.md)

## Backend Setup (Virtual Environment)

To set up and run the backend locally:

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create a Python 3.11+ virtual environment** (do NOT commit `.venv`):
   - On Windows:
     ```powershell
     py -3.13 -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   - On Linux / macOS:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. **Run tests and linters**:
   ```bash
   pytest
   ruff check .
   ```

5. **Start the development server**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

## Run with Docker

To build and run all services (`db`, `backend`, and `frontend`) with Docker Compose:

1. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

2. **Build and start services**:
   ```bash
   docker compose build
   docker compose up -d
   ```

3. **Verify running services**:
   ```bash
   docker compose ps
   ```
   - Frontend: `http://localhost:5173`
   - Backend API Health: `http://localhost:8000/api/v1/health`

4. **Stop services**:
   ```bash
   docker compose down
   ```


