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
  whyThisMatters: string;
  technicalDetails?: string;
  evidence?: string;
}

export interface MockAnalysisResult {
  id: string;
  filename: string;
  score: number;
  level: "low" | "medium" | "high";
  engineVersion: string;
  createdAt: string;
  summary: string;
  nextSteps: string;
  disclaimer: string;
  indicators: MockIndicator[];
  warnings?: string[];
}

// In-memory synthetic documents store
const analysisResultsStore = new Map<string, MockAnalysisResult>();

export const SYNTHETIC_RESULTS: Record<string, MockAnalysisResult> = {
  high: {
    id: "doc-high-001",
    filename: "Sample_Hospitality_Offer_2026.pdf",
    score: 78,
    level: "high",
    engineVersion: "0.1.0-mock",
    createdAt: "2026-11-20T10:15:00Z",
    summary: "We found 5 warning signs in this document.",
    nextSteps:
      "Do not pay money or share more personal information until you verify this offer through official channels.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: [
      {
        id: "ind-1",
        code: "HIGH_RECRUITMENT_FEE",
        title: "Recruitment fee appears unusually high",
        weight: 20,
        severity: "high",
        explanation:
          "The document requests an advance fee of NPR 350,000 before visa processing.",
        whyThisMatters:
          "Unusually high recruitment charges increase financial vulnerability and violate standard labor guidelines.",
        technicalDetails:
          "Extracted fee: NPR 350,000. Destination benchmark ceiling: NPR 10,000.",
      },
      {
        id: "ind-2",
        code: "EMPLOYER_INCONSISTENT",
        title: "Employer information is inconsistent within the document",
        weight: 20,
        severity: "high",
        explanation:
          "The letterhead names 'Al-Bahar Facility Services' while the signature block cites 'Gulf Star Holdings LLC'.",
        whyThisMatters:
          "Mismatched company names make legal accountability difficult in the event of employment disputes.",
        technicalDetails:
          "Conflicting employer entity strings detected across header and footer blocks.",
      },
      {
        id: "ind-3",
        code: "DOC_TAMPERING",
        title: "Document shows signs of being edited after it was created",
        weight: 20,
        severity: "high",
        explanation:
          "File structure and metadata indicate graphic editing tools were used to alter content after initial creation.",
        whyThisMatters:
          "Subsequent alterations often conceal modified wages, job titles, or unauthorized recruiter stamps.",
        technicalDetails:
          "Incremental updates and consumer image manipulation tool headers identified.",
      },
      {
        id: "ind-4",
        code: "SUSPICIOUS_CONTACT",
        title: "Contact information needs checking",
        weight: 10,
        severity: "medium",
        explanation:
          "The document lists a free webmail address and mobile chat handles rather than an official corporate domain.",
        whyThisMatters:
          "Legitimate recruiters typically communicate via registered corporate email and official landline numbers.",
        technicalDetails:
          "Free public webmail provider detected in official contact field.",
      },
      {
        id: "ind-5",
        code: "UNUSUAL_SALARY",
        title: "Salary looks unusual for the stated job",
        weight: 5,
        severity: "low",
        explanation:
          "The compensation figure of USD 4,500/month is significantly above standard market ranges for entry-level hospitality staff.",
        whyThisMatters:
          "Unrealistically high salaries are frequently advertised to entice applicants into paying advance placement fees.",
        technicalDetails:
          "Stated remuneration exceeds destination country median baseline by 320%.",
      },
    ],
  },

  medium: {
    id: "doc-medium-002",
    filename: "Maintenance_Contract_Sample.pdf",
    score: 45,
    level: "medium",
    engineVersion: "0.1.0-mock",
    createdAt: "2026-11-21T11:20:00Z",
    summary: "We found 2 warning signs in this document.",
    nextSteps:
      "Check the concerns below and verify with DoFE before paying or committing.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: [
      {
        id: "ind-m1",
        code: "AGENCY_UNMATCHED",
        title: "Agency info cannot be matched with official records",
        weight: 25,
        severity: "high",
        explanation:
          "The recruiting agency stated on the letterhead could not be identified in licensed registries.",
        whyThisMatters:
          "Recruitment agencies must hold an active government license to legally recruit and deploy personnel.",
        technicalDetails:
          "Agency license registry search returned zero matches for stated identifier.",
      },
      {
        id: "ind-m2",
        code: "HIGH_RECRUITMENT_FEE",
        title: "Recruitment fee appears unusually high",
        weight: 20,
        severity: "medium",
        explanation:
          "The contract references a mandatory advance documentation fee of NPR 120,000.",
        whyThisMatters:
          "Excessive documentation and placement fees place unnecessary debt burdens on workers.",
        technicalDetails:
          "Extracted processing charge exceeds approved country schedule limits.",
      },
    ],
  },

  low: {
    id: "doc-low-003",
    filename: "Standard_Security_Contract_Sample.pdf",
    score: 12,
    level: "low",
    engineVersion: "0.1.0-mock",
    createdAt: "2026-11-22T14:30:00Z",
    summary: "We found 1 warning sign in this document.",
    nextSteps:
      "Few warning signs found. Still verify with DoFE before committing.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: [
      {
        id: "ind-l1",
        code: "UNUSUAL_SALARY",
        title: "Salary looks unusual for the stated job",
        weight: 5,
        severity: "low",
        explanation:
          "The offered salary is slightly above standard market averages for general security personnel in this region.",
        whyThisMatters:
          "Review employment terms with official channels to ensure overtime and housing allowances are accurately represented.",
        technicalDetails:
          "Remuneration is approximately 15% above destination market baseline.",
      },
    ],
  },

  lowConfidence: {
    id: "doc-warning-004",
    filename: "Scanned_Mobile_Photo_Contract.jpg",
    score: 45,
    level: "medium",
    engineVersion: "0.1.0-mock",
    createdAt: "2026-11-23T09:00:00Z",
    warnings: [
      "We could not read part of this document, so results may be incomplete.",
    ],
    summary: "We found 2 warning signs in this document.",
    nextSteps:
      "Check the concerns below and verify with DoFE before paying or committing.",
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    indicators: [
      {
        id: "ind-w1",
        code: "AGENCY_UNMATCHED",
        title: "Agency info cannot be matched with official records",
        weight: 25,
        severity: "high",
        explanation:
          "The recruiting agency stated on the letterhead could not be identified in licensed registries.",
        whyThisMatters:
          "Recruitment agencies must hold an active government license to legally recruit and deploy personnel.",
        technicalDetails:
          "Document license number text partially unreadable due to image blur.",
      },
      {
        id: "ind-w2",
        code: "HIGH_RECRUITMENT_FEE",
        title: "Recruitment fee appears unusually high",
        weight: 20,
        severity: "medium",
        explanation:
          "The document references an advance payment request of NPR 140,000.",
        whyThisMatters:
          "High processing charges violate transparent recruitment regulations.",
        technicalDetails:
          "Extracted fee value identified in payment section.",
      },
    ],
  },
};

// Seed store with synthetic results
Object.values(SYNTHETIC_RESULTS).forEach((result) => {
  analysisResultsStore.set(result.id, result);
});

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

  // Also link synthetic demo IDs for convenience
  if (filename.toLowerCase().includes("clean") || filename.toLowerCase().includes("low")) {
    const lowResult = SYNTHETIC_RESULTS.low;
    analysisResultsStore.set(documentId, { ...lowResult, id: documentId, filename });
    return { documentId };
  } else if (filename.toLowerCase().includes("medium")) {
    const medResult = SYNTHETIC_RESULTS.medium;
    analysisResultsStore.set(documentId, { ...medResult, id: documentId, filename });
    return { documentId };
  }

  // Default to high risk synthetic result
  const highResult = SYNTHETIC_RESULTS.high;
  const result: MockAnalysisResult = {
    ...highResult,
    id: documentId,
    filename,
    createdAt: new Date().toISOString(),
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
