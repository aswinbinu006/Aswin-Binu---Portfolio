import { Internship } from './types';

export const internships: Internship[] = [
  {
    id: 'maincrafts-ml-intern',
    role: 'Machine Learning Intern',
    company: 'Maincrafts Technology',
    period: '24 May 2026 – 24 Jun 2026',
    duration: '1 month',
    workMode: 'Remote',
    location: 'Remote · India',
    teamSize: 'AI/ML Team (Intern ID: MT4116)',
    isCurrent: false,
    shortDescription:
      'Completed a 1-month ML internship at Maincrafts Technology, building and validating regression and classification models in Python and Scikit-learn. Covered feature engineering, hyperparameter tuning, and handling imbalanced data, with each project documented in a reproducible notebook and report.',
    bullets: [
      'Built and validated supervised regression and classification models in Python using Scikit-learn.',
      'Covered end-to-end feature engineering, exploratory data analysis, and hyperparameter tuning to optimize model accuracy and generalizability.',
      'Handled imbalanced datasets using advanced resampling and stratified validation strategies.',
      'Documented each project and experimental pipeline in a clean, reproducible Jupyter notebook and detailed technical report.',
      'Earned an official Certificate of Completion and a formal Letter of Recommendation commending strong technical understanding, structured problem solving, and analytical rigor.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Machine Learning', 'Data Preprocessing', 'Feature Engineering', 'Jupyter Notebooks', 'Hyperparameter Tuning'],
    outcome:
      'Delivered fully validated ML models with reproducible notebooks and reports, earning an official Letter of Recommendation and Certificate of Completion.',
    certificateUrl: '/documents/maincrafts-internship-certificate.pdf',
    letterOfRecommendationUrl: '/documents/maincrafts-letter-of-recommendation.pdf',
    certificateImage: {
      src: '/assets/internship-maincrafts-cert.png',
      alt: 'Maincrafts Technology Certificate of Internship - Aswin Binu',
    },
    letterOfRecommendationImage: {
      src: '/assets/internship-maincrafts-lor.png',
      alt: 'Maincrafts Technology Letter of Recommendation - Aswin Binu',
    },
    companyWebsiteUrl: 'https://maincrafts.com',
    logo: {
      src: '/assets/maincrafts-logo.png',
      alt: 'Maincrafts Technology Logo',
    },
    verification: 'verified',
  },
];
