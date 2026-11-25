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

// In-memory synthetic documents store
const analysisResultsStore = new Map<string, MockAnalysisResult>();

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

// Initialize store with synthetic history
SYNTHETIC_HISTORY.forEach((item) => analysisResultsStore.set(item.id, item));

export const isMockEnabled = (): boolean => {
  return import.meta.env.VITE_USE_MOCK === "true";
};

/**
 * Creates a synthetic analysis job for an uploaded document file.
 * Returns the generated document/analysis ID.
 */
export async function mockUploadDocument(file: File): Promise<{ documentId: string }> {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const documentId = `doc-${Date.now()}`;
  const filename = file.name || "Uploaded_Document.pdf";

  const result: MockAnalysisResult = {
    id: documentId,
    filename,
    score: filename.toLowerCase().includes("clean") ? 15 : 70,
    level: filename.toLowerCase().includes("clean") ? "low" : "high",
    engineVersion: "0.1.0-mock",
    createdAt: new Date().toISOString(),
    summary: filename.toLowerCase().includes("clean")
      ? "Few warning signs found in this document."
      : "We found 4 warning signs in this document.",
    nextSteps: filename.toLowerCase().includes("clean")
      ? "Few warning signs found. Still verify with DoFE before committing."
      : "Do not pay money or share more personal information until you verify this offer through official channels.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: filename.toLowerCase().includes("clean")
      ? [
          {
            id: `ind-${Date.now()}-1`,
            code: "SALARY_BENCHMARK",
            title: "Salary slightly above benchmark",
            weight: 5,
            severity: "low",
            explanation: "Stated remuneration is marginally higher than typical role average.",
            evidence: "Sample baseline comparison",
          },
        ]
      : [
          {
            id: `ind-${Date.now()}-1`,
            code: "AGENCY_UNMATCHED",
            title: "Agency info cannot be matched with official records",
            weight: 25,
            severity: "high",
            explanation:
              "The recruiting agency stated on the letterhead could not be identified in licensed registries.",
            evidence: "License Number: Not verified in official directory",
          },
          {
            id: `ind-${Date.now()}-2`,
            code: "HIGH_RECRUITMENT_FEE",
            title: "Suspicious or unusually high recruitment fee",
            weight: 20,
            severity: "high",
            explanation: "The document specifies advance recruitment charges prior to interview verification.",
            evidence: "Amount stated: NPR 280,000",
          },
          {
            id: `ind-${Date.now()}-3`,
            code: "DOC_TAMPERING",
            title: "Signs of document modification",
            weight: 20,
            severity: "high",
            explanation: "Document was edited with desktop graphics software after initial creation.",
            evidence: "Producer software tag modified",
          },
          {
            id: `ind-${Date.now()}-4`,
            code: "SUSPICIOUS_CONTACT",
            title: "Suspicious contact information",
            weight: 10,
            severity: "medium",
            explanation: "Recruiter lists messaging app phone numbers rather than registered landlines.",
            evidence: "Contact: +977-9800000000 (Sample unverified chat line)",
          },
        ],
  };

  analysisResultsStore.set(documentId, result);
  return { documentId };
}

/**
 * Checks whether an analysis should simulate failure.
 * When document ID or filename contains 'fail', triggers a simulated error.
 */
export async function mockPerformAnalysisStep(
  documentId: string,
  stepNumber: number
): Promise<{ success: boolean; error?: string }> {
  // Step simulated delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const result = analysisResultsStore.get(documentId);
  const name = result?.filename.toLowerCase() || "";

  // Trigger error state if document ID or filename includes 'fail' on step 2 or 3
  if ((documentId.includes("fail") || name.includes("fail")) && stepNumber >= 2) {
    return {
      success: false,
      error: "The document could not be analyzed due to an unreadable file format.",
    };
  }

  return { success: true };
}

export async function mockGetAnalysisResult(
  documentId: string
): Promise<MockAnalysisResult | null> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return analysisResultsStore.get(documentId) || null;
}

export async function mockGetHistory(): Promise<MockAnalysisResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return Array.from(analysisResultsStore.values());
}

export async function mockDeleteDocument(id: string): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  analysisResultsStore.delete(id);
  return { success: true };
}
