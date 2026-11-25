/**
 * SachetSewa English Internationalization Dictionary
 * All user-facing strings are defined here in plain, calm language.
 * Strictly adheres to Design.md §2 (no alarmist terms like "fake", "genuine", "scam detected").
 */

export const en = {
  brand: {
    name: "SachetSewa",
    tagline: "Foreign Employment Document Screening",
  },

  nav: {
    home: "Home",
    checkDocument: "Check a document",
    history: "History",
    about: "About",
    login: "Login",
    logout: "Logout",
    register: "Register",
    menuToggle: "Toggle navigation menu",
    skipToContent: "Skip to main content",
  },

  auth: {
    loginTitle: "Log In to SachetSewa",
    loginSubtitle: "Access your account to check documents and review past screenings.",
    registerTitle: "Create an Account",
    registerSubtitle: "Register to securely check your foreign-employment documents.",
    emailLabel: "Email address",
    emailPlaceholder: "you@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    confirmPasswordLabel: "Confirm password",
    confirmPasswordPlaceholder: "Re-enter your password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    loginButton: "Log In",
    registerButton: "Create Account",
    loggingIn: "Logging in...",
    registering: "Creating account...",
    noAccountPrompt: "Don't have an account?",
    hasAccountPrompt: "Already have an account?",
    linkToRegister: "Register here",
    linkToLogin: "Log in here",
    privacyNote: "We collect only what we need. Your documents are private.",
    loginError: "Email or password is not correct.",
    gate: {
      uploadTitle: "Sign in to screen your document",
      uploadSubtitle: "Foreign employment document screening is private and confidential to your account.",
      historyTitle: "Sign in to view your document history",
      historySubtitle: "Access your previous offer letter checks and safety records.",
      defaultTitle: "Sign in to continue",
      defaultSubtitle: "This section is protected to keep your documents private.",
      benefit1Title: "Private & Confidential",
      benefit1Desc: "Your offer letters and forensic results are stored privately. Only you can view them.",
      benefit2Title: "Safe Foreign Employment",
      benefit2Desc: "Screen agencies, salary levels, and fees against DoFE regulations before paying or flying.",
      benefit3Title: "Track Your Checks",
      benefit3Desc: "Keep your records handy to consult with the Department of Foreign Employment (DoFE).",
      loginCta: "Log In",
      registerCta: "Create Free Account",
      learnMore: "Learn how SachetSewa protects migrant workers",
    },
    validation: {
      emailRequired: "Please enter your email address.",
      emailInvalid: "Please enter a valid email address.",
      passwordRequired: "Please enter a password.",
      passwordLength: "Password must be at least 10 characters long.",
      passwordMatch: "Passwords do not match.",
      rulesHeader: "Password must have:",
      ruleMinLength: "At least 10 characters",
    },
  },

  upload: {
    title: "Check a Document",
    subtitle: "Upload an offer letter or recruitment document to check for warning signs.",
    dropzoneLabel: "Document upload zone. Press Enter or Space to choose a file, or drag and drop.",
    dropzonePrompt: "Tap to select a document, or drag and drop here",
    dropzoneHint: "Accepted formats: PDF, JPG, PNG (up to 10 MB)",
    selectedFileTitle: "Selected file",
    removeFile: "Remove file",
    checkButton: "Check this document",
    privacyBadge: "Only you can see this file.",
    tipsTitle: "Document tips",
    tips: [
      "Upload full, clear pages with all text readable.",
      "Hide nothing — but don't upload documents you can't share.",
      "Clear photos of printed letters work as well as digital PDFs.",
    ],
    errors: {
      wrongType: "Please choose a PDF, JPG, or PNG file.",
      tooLarge: "This file is larger than 10 MB. Please choose a smaller file.",
      emptyFile: "The selected file is empty. Please choose a valid document.",
    },
  },

  analyzing: {
    title: "Checking your document",
    subtitle: "We are reviewing your document step by step. Please keep this window open.",
    step1: "Reading your document",
    step2: "Checking the details",
    step3: "Looking for signs of editing",
    step4: "Calculating the risk level",
    statusWaiting: "Waiting",
    statusInProgress: "In progress",
    statusDone: "Completed",
    failedTitle: "We could not complete the screening",
    failedMessage:
      "We encountered an issue reading this document. You can retry the screening or choose another file.",
    retryButton: "Try screening again",
    chooseAnotherButton: "Upload another document",
  },

  footer: {
    disclaimer:
      "SachetSewa is a screening tool, not an official verification. This result is not proof that an offer is genuine or fraudulent.",
    authorityNotice:
      "The Department of Foreign Employment (DoFE), Government of Nepal, is the official verification authority for foreign employment.",
    dofeLinkText: "Visit Department of Foreign Employment (DoFE)",
  },

  riskBadge: {
    low: "Low Risk",
    medium: "Medium Risk",
    high: "High Risk",
    unknown: "Unknown",
  },

  landing: {
    hero: {
      title: "Screen your foreign-employment offer before paying or committing.",
      valueStatement:
        "Check your offer letter or recruitment document for common warning signs and get clear, explainable guidance before you pay money or share personal documents.",
      primaryCta: "Check a document",
      secondaryCta: "Learn how screening works",
    },
    howItWorks: {
      title: "How SachetSewa works",
      subtitle: "Three simple steps to review your document before taking action",
      step1: {
        number: "1",
        title: "Upload your document",
        description:
          "Upload an offer letter, agreement, or recruitment document in PDF, JPG, or PNG format (up to 10 MB). Your upload remains private.",
      },
      step2: {
        number: "2",
        title: "We look for warning signs",
        description:
          "Our transparent rule-based engine inspects fees, salary consistency, contact information, metadata, and document structure.",
      },
      step3: {
        number: "3",
        title: "Verify with DoFE",
        description:
          "Review clear reasons for each warning sign found, then follow our direct instructions to complete official verification with DoFE.",
      },
    },
    scope: {
      title: "What we can and cannot tell you",
      subtitle: "Honest boundaries on our preliminary screening aid",
      canTitle: "What SachetSewa does",
      canItems: [
        "Identifies fee demands that appear unusually high or irregular",
        "Checks for conflicting dates, job titles, or employer names in the document",
        "Looks for suspicious contact methods such as messaging-app-only communication",
        "Checks for technical signs of document alterations and mismatched metadata",
        "Provides a calm, explainable 0–100 risk score with plain-language reasons",
      ],
      cannotTitle: "What SachetSewa cannot do",
      cannotItems: [
        "Cannot confirm whether an offer letter is legally authorized or officially approved",
        "Cannot replace official verification by the Department of Foreign Employment (DoFE)",
        "Never declares a document definitively authentic or fraudulent",
        "Cannot provide legal representation or recover money already paid",
      ],
    },
    dofeBanner: {
      title: "Official Government Verification",
      text: "Always confirm your foreign employment recruitment agency license and job approval directly through official government records.",
      buttonText: "Verify with DoFE (Official Portal)",
      url: "https://dofe.gov.np/",
    },
  },

  about: {
    title: "About SachetSewa & Foreign Employment Safety",
    intro:
      "SachetSewa is an academic research project developed to provide Nepali migrant workers and their families with an explainable, preliminary screening layer against predatory recruitment practices.",

    scoring: {
      title: "How our risk scoring works",
      description:
        "Instead of using black-box algorithms, SachetSewa uses an open, rule-based scoring model. Each document is checked across six warning-sign categories, totaling 100 possible risk points:",
      categories: [
        {
          name: "Agency Official Information",
          weight: "25 points",
          explanation:
            "Checks whether the recruiting agency name or license details can be referenced in official public records.",
        },
        {
          name: "Unusually High Recruitment Fees",
          weight: "20 points",
          explanation:
            "Flags upfront recruitment fee requests that appear excessive or violate standard cost guidelines.",
        },
        {
          name: "Job & Employer Consistency",
          weight: "20 points",
          explanation:
            "Identifies internal contradictions between stated duties, employer identities, dates, and destination countries.",
        },
        {
          name: "Document Tampering Indicators",
          weight: "20 points",
          explanation:
            "Inspects technical file structure for modifications, mismatched software stamps, or inserted graphic elements.",
        },
        {
          name: "Suspicious Contact Details",
          weight: "10 points",
          explanation:
            "Detects reliance on personal mobile numbers, free webmail accounts, or messaging apps without physical office records.",
        },
        {
          name: "Unusual Salary Information",
          weight: "5 points",
          explanation:
            "Evaluates whether promised wages significantly deviate from typical market averages for the specified role.",
        },
      ],
    },

    levels: {
      title: "Understanding Risk Levels",
      description:
        "Points from detected indicators are summed to determine one of three risk levels:",
      low: {
        title: "Low Risk (0–30 points)",
        advice:
          "Few warning signs were found. However, this does not prove the offer is official. Still verify through DoFE before committing.",
      },
      medium: {
        title: "Medium Risk (31–60 points)",
        advice:
          "Notable concerns were found in this document. Carefully review the listed warning signs and verify with DoFE before paying fees or sharing personal information.",
      },
      high: {
        title: "High Risk (61–100 points)",
        advice:
          "Significant warning signs were detected. Do not pay money or share personal documents until you have verified this offer through official channels.",
      },
    },

    warningSigns: {
      title: "Common warning signs in foreign recruitment",
      subtitle:
        "Keep these six common warning signs in mind whenever reviewing foreign job offers:",
      items: [
        {
          title: "Paying before official confirmation",
          description:
            "Being asked to deposit money or pay agent fees before receiving official interview confirmation or a formal labor permit.",
        },
        {
          title: "Pressure to pay quickly",
          description:
            "Agents demanding urgent cash transfers or personal bank deposits, claiming the vacancy will expire immediately.",
        },
        {
          title: "No written contract in your language",
          description:
            "Lack of a formal written agreement in Nepali or a language you clearly understand outlining working hours, salary, and benefits.",
        },
        {
          title: "Contact only through messaging apps",
          description:
            "Recruiters who refuse in-person office visits and communicate only through messaging apps or unregistered SIM cards.",
        },
        {
          title: "Unmatched agency records",
          description:
            "An agency name or license number that does not match official lists maintained by the Department of Foreign Employment.",
        },
        {
          title: "Unrealistic salary promises",
          description:
            "Offers promising unusually high salaries or guarantees of visas with no qualifications or experience needed.",
        },
      ],
    },

    nextSteps: {
      title: "What to do if you are worried",
      steps: [
        "Pause all payments: Never hand over cash or deposit money into personal bank accounts.",
        "Keep your original documents: Retain your passport, citizenship certificate, and certificates in your own possession.",
        "Check official records: Visit the Department of Foreign Employment website or your nearest district employment service center.",
        "Seek trusted guidance: Discuss the offer with certified migrant resource centers or family members before signing.",
      ],
      dofeCta: "Verify your recruitment status with DoFE",
      dofeUrl: "https://dofe.gov.np/",
    },
  },

  common: {
    loading: "Loading...",
    error: "An error occurred",
    retry: "Retry",
    dismiss: "Dismiss",
    externalLinkNotice: "Opens in a new tab",
  },
};
