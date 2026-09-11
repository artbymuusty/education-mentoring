export type Locale = "tr" | "en" | "de";

export interface StageOption {
  id: string;
  label: string;
  description: string;
  cta: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  help: string;
  process: string[];
  scope: string;
  forWhom: string;
  nextStep: string;
}

/**
 * A real mentor's public profile (madde: PRIORITY 2 — Human Trust).
 * `photoSrc` is optional — when absent, MentorProfile renders a lettered
 * avatar in brand colors instead of a stock/fake photo. Never seed this
 * array with an invented person; leave it empty until real data arrives.
 */
export interface Mentor {
  id: string;
  name: string;
  role: string;
  photoSrc?: string;
  bio: string;
  germanyExperience: string;
  education: string;
  specialty: string;
  quote?: string;
}

/**
 * A real student's journey (madde: PRIORITY 3 — Student Story). Never seed
 * this array with an invented student; leave it empty until real data,
 * shared with the student's consent, arrives.
 */
export interface StudentStory {
  id: string;
  name: string;
  photoSrc?: string;
  city: string;
  university: string;
  field: string;
  year: string;
  quote: string;
  startingPoint: string;
  problem: string;
  stepsTaken: string;
  now: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type AssessmentQuestionType = "single" | "text";

export interface AssessmentOption {
  value: string;
  label: string;
}

export interface AssessmentStep {
  id: string;
  question: string;
  helper?: string;
  type: AssessmentQuestionType;
  options?: AssessmentOption[];
  placeholder?: string;
  optional?: boolean;
}

export interface Dictionary {
  meta: {
    siteName: string;
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
  };
  nav: {
    home: string;
    services: string;
    mentorship: string;
    about: string;
    faq: string;
    contact: string;
    ctaPrimary: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
    stageSelector: {
      title: string;
      subtitle: string;
      stages: StageOption[];
      fallback: StageOption;
    };
    services: {
      title: string;
      subtitle: string;
      cta: string;
    };
    howWeWork: {
      title: string;
      subtitle: string;
      steps: { title: string; description: string }[];
    };
    mentorship: {
      title: string;
      description: string;
      cta: string;
    };
    trust: {
      title: string;
      body: string[];
      /** Optional real photo — omitted, not stock art, until one exists. */
      imageSrc?: string;
      imageAlt?: string;
    };
    faqPreview: {
      title: string;
      cta: string;
    };
    finalCta: {
      title: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
    };
  };
  services: {
    title: string;
    intro: string;
    items: ServiceItem[];
  };
  mentorship: {
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
    processTitle: string;
    process: { title: string; description: string }[];
    cta: { title: string; description: string; label: string };
  };
  about: {
    title: string;
    intro: string;
    sections: { heading: string; body: string }[];
    /** Optional real photo (team/office) — omitted, not stock art, until one exists. */
    imageSrc?: string;
    imageAlt?: string;
  };
  faq: {
    title: string;
    intro: string;
    items: FaqItem[];
  };
  contact: {
    title: string;
    intro: string;
    whatsapp: { title: string; description: string; cta: string };
    email: { title: string; description: string; cta: string };
    formCta: { title: string; description: string; cta: string };
  };
  assessment: {
    intro: { eyebrow: string; title: string; description: string; startCta: string };
    steps: AssessmentStep[];
    contactStep: {
      title: string;
      description: string;
      fields: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        preferredContact: string;
        preferredContactOptions: AssessmentOption[];
        note: string;
      };
    };
    submit: { label: string; loading: string };
    success: {
      title: string;
      description: string;
      whatsappCta: string;
      backHome: string;
    };
    error: { title: string; description: string; retry: string };
  };
  footer: {
    description: string;
    navTitle: string;
    legalTitle: string;
    legalLinks: { label: string; href: string }[];
    rights: string;
  };
}
