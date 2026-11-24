/**
 * Synthetic mock API provider for SachetSewa frontend development.
 * Activated when import.meta.env.VITE_USE_MOCK === "true".
 * All data is strictly SYNTHETIC (fictional agency names, anonymous sample applicant labels).
 */

export interface MockIndicator {
  id: string;
  code: string;
  title: string;
  weight: number;
  severity: "low" | "medium" | "high";
  explanation: string;
  evidence: string;
}

export interface MockAnalysisResult {
  id: string;
  filename: string;
  score: number;
  level: "low" | "medium" | "high";
  engineVersion: string;
  createdAt: string;
  indicators: MockIndicator[];
  summary: string;
  nextSteps: string;
  disclaimer: string;
}

const SYNTHETIC_HISTORY: MockAnalysisResult[] = [
  {
    id: "doc-demo-001",
    filename: "Sample_Hospitality_Offer_2026.pdf",
    score: 75,
    level: "high",
    engineVersion: "0.1.0-mock",
    createdAt: "2026-11-20T10:15:00Z",
    summary: "We found 4 warning signs in this document.",
    nextSteps:
      "Do not pay money or share more personal information until you verify this offer through official channels.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: [
      {
        id: "ind-1",
        code: "AGENCY_UNMATCHED",
        title: "Agency info cannot be matched with official records",
        weight: 25,
        severity: "high",
        explanation:
          "The agency name 'Apex Global Manpower Demo' could not be found in active registered agency records.",
        evidence: "Agency License: Unregistered (synthetic sample)",
      },
      {
        id: "ind-2",
        code: "HIGH_RECRUITMENT_FEE",
        title: "Suspicious or unusually high recruitment fee",
        weight: 20,
        severity: "high",
        explanation:
          "The document requests an advance fee of NPR 350,000 before visa processing.",
        evidence: "Advance processing fee mentioned: NPR 350,000",
      },
      {
        id: "ind-3",
        code: "DOC_TAMPERING",
        title: "Strong document-tampering indicator",
        weight: 20,
        severity: "high",
        explanation:
          "The file metadata shows graphic editing software was used after initial creation.",
        evidence: "Modified with consumer photo-editing software.",
      },
      {
        id: "ind-4",
        code: "SUSPICIOUS_CONTACT",
        title: "Suspicious contact information",
        weight: 10,
        severity: "medium",
        explanation:
          "Official contact lists only a free personal email address and an unverified chat handle.",
        evidence: "Contact: contact-temp-demo@webmail.sample",
      },
    ],
  },
  {
    id: "doc-demo-002",
    filename: "Standard_Security_Contract_Sample.pdf",
    score: 15,
    level: "low",
    engineVersion: "0.1.0-mock",
    createdAt: "2026-11-22T14:30:00Z",
    summary: "Few warning signs found in this document.",
    nextSteps:
      "Few warning signs found. Still verify with DoFE before committing or paying.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: [
      {
        id: "ind-5",
        code: "UNUSUAL_SALARY",
        title: "Unusual or inconsistent salary benchmark",
        weight: 5,
        severity: "low",
        explanation:
          "The base salary is slightly higher than destination market averages for general security staff.",
        evidence: "Stated salary: AED 3,200/month",
      },
    ],
  },
];

export const isMockEnabled = (): boolean => {
  return import.meta.env.VITE_USE_MOCK === "true";
};

export async function mockAnalyzeDocument(
  file: File
): Promise<MockAnalysisResult> {
  // Simulate network latency (400ms)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const filename = file.name || "Uploaded_Sample_Document.pdf";

  // Provide a synthetic high-risk result if filename contains 'high' or 'warn', otherwise moderate or low
  return {
    id: `doc-${Date.now()}`,
    filename,
    score: 65,
    level: "high",
    engineVersion: "0.1.0-mock",
    createdAt: new Date().toISOString(),
    summary: "We found 3 warning signs in this document.",
    nextSteps:
      "Do not pay money or share more personal information until you verify this offer through official channels.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: [
      {
        id: "mock-ind-1",
        code: "AGENCY_UNMATCHED",
        title: "Agency info cannot be matched with official records",
        weight: 25,
        severity: "high",
        explanation:
          "The agency stated on the header could not be verified in official registry archives.",
        evidence: "Name: Sunrise Overseas Agency (Synthetic Test)",
      },
      {
        id: "mock-ind-2",
        code: "HIGH_RECRUITMENT_FEE",
        title: "Suspicious or unusually high recruitment fee",
        weight: 20,
        severity: "high",
        explanation:
          "The offer letter includes an upfront service charge exceeding standard limits.",
        evidence: "Service fee: NPR 220,000",
      },
      {
        id: "mock-ind-3",
        code: "JOB_INCONSISTENCY",
        title: "Inconsistency in job and employer information",
        weight: 20,
        severity: "medium",
        explanation:
          "The stated job title conflicts with the job description duties listed in section 3.",
        evidence: "Title: Warehouse Assistant vs Duties: Commercial Driver",
      },
    ],
  };
}

export async function mockGetHistory(): Promise<MockAnalysisResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [...SYNTHETIC_HISTORY];
}

export async function mockDeleteDocument(id: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const idx = SYNTHETIC_HISTORY.findIndex((item) => item.id === id);
  if (idx !== -1) {
    SYNTHETIC_HISTORY.splice(idx, 1);
  }
  return { success: true };
}

