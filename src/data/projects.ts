export type ProjectCategory = 'all' | 'ai-agentic' | 'fullstack-web' | 'ml-datascience';

export type Project = {
  id: string;
  title: string;
  category: string;
  filterCategory: ProjectCategory;
  badgeType: 'Live System' | 'Agentic Engine' | 'Full Stack' | 'ML Benchmark' | 'Predictive Model';
  year: string;
  role: string;
  duration: string;
  stack: string[];
  description: string;
  image: string;
  fullStory?: string;
  metrics?: { label: string; value: string }[];
  architectureHighlights?: string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  size: 'lead' | 'standard';
};

export const projects: Project[] = [
  {
    id: 'learnpath-ai',
    title: 'LearnPath AI — Adaptive Learning Ecosystem',
    category: 'AI & ADAPTIVE EDTECH',
    filterCategory: 'ai-agentic',
    badgeType: 'Live System',
    year: '2026',
    role: 'Lead Full-Stack & ML Architect',
    duration: '10 weeks',
    stack: ['TypeScript', 'Python', 'FastAPI', 'React', 'Gemini AI', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
    description:
      'AI-powered personalized learning platform with automated skill-gap analysis, explainable recommendation engines, and interactive Socratic Code Studio.',
    fullStory:
      'Architected an end-to-end adaptive education platform powered by Large Language Models and real-time knowledge graphs. The system diagnoses learner gaps, dynamically constructs customized curriculum trajectories, and provides an interactive Socratic AI coding mentor for live debugging and conceptual reinforcement.',
    metrics: [
      { label: 'Recommendation Precision', value: '94.8%' },
      { label: 'Skill Gap Diagnosis', value: '<2.1s' },
      { label: 'Active Learning Modules', value: '45+ Domains' },
    ],
    architectureHighlights: [
      'Contextual skill-graph traversal engine for non-linear learning path synthesis',
      'Socratic Code Studio powered by streaming multi-agent LLM prompts',
      'Responsive glassmorphism UI with real-time progress telemetry and analytics',
    ],
    githubUrl: 'https://github.com/aswinbinu006/LearnPath-AI-',
    demoUrl: 'https://learnpath-ai-xhdw.onrender.com',
    size: 'lead',
  },
  {
    id: 'portfolio-monitoring-agent',
    title: 'Agentic Telemetry & Portfolio Monitor',
    category: 'AUTONOMOUS TELEMETRY',
    filterCategory: 'ai-agentic',
    badgeType: 'Agentic Engine',
    year: '2026',
    role: 'Autonomous Systems Engineer',
    duration: '6 weeks',
    stack: ['TypeScript', 'Next.js', 'React', 'TailwindCSS', 'WebSockets', 'Vercel'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    description:
      'Real-time agentic telemetry dashboard and uptime intelligence engine with sub-second health diagnostics and proactive failure alerts.',
    fullStory:
      'Designed a distributed portfolio monitoring framework that integrates autonomous agents to monitor service health, latency metrics, and API anomalies across deployments. Provides real-time interactive stream visualizations and automated incident dispatching.',
    metrics: [
      { label: 'Telemetry Frequency', value: 'Sub-500ms Streams' },
      { label: 'Incident Discovery', value: 'Zero False Drops' },
      { label: 'Dashboard Latency', value: '<45ms TTI' },
    ],
    architectureHighlights: [
      'High-frequency event ingest pipeline with lightweight agent heartbeats',
      'Real-time reactive charts and dynamic system status matrices',
      'Cloud-native edge architecture deployed seamlessly on Vercel',
    ],
    githubUrl: 'https://github.com/aswinbinu006/portfolio-monitoring-agent-main',
    demoUrl: 'https://portfolio-monitoring-agent-six.vercel.app',
    size: 'standard',
  },
  {
    id: 'career-pilot',
    title: 'CareerPilot — AI Career Navigator',
    category: 'CAREER INTELLIGENCE',
    filterCategory: 'fullstack-web',
    badgeType: 'Full Stack',
    year: '2025',
    role: 'Full-Stack Developer',
    duration: '8 weeks',
    stack: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    description:
      'Automated career roadmap navigator analyzing market demand, resume proficiencies, and industry trajectories to chart optimal transition pathways.',
    fullStory:
      'Built a full-stack career guidance ecosystem that correlates industry job postings with candidate profiles to identify critical missing competencies. Delivers step-by-step milestones, curated course recommendations, and milestone tracking.',
    metrics: [
      { label: 'Career Paths Indexed', value: '120+ Roles' },
      { label: 'Roadmap Generation', value: '<1.5s' },
      { label: 'Skill Match Accuracy', value: '91.4%' },
    ],
    architectureHighlights: [
      'Dynamic roadmap synthesizer generating structured milestone timelines',
      'RESTful microservices backend with cached competency graphs',
      'Modern interactive client interface with customized career tracking checklists',
    ],
    githubUrl: 'https://github.com/aswinbinu006/CareerPilot',
    demoUrl: 'https://frontend-iota-drab-spp0nmlunp.vercel.app',
    size: 'standard',
  },
  {
    id: 'model-comparison',
    title: 'ML Classifier Benchmark Matrix',
    category: 'APPLIED MACHINE LEARNING',
    filterCategory: 'ml-datascience',
    badgeType: 'ML Benchmark',
    year: '2025',
    role: 'Machine Learning Engineer',
    duration: '4 weeks',
    stack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Matplotlib', 'Seaborn'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop',
    description:
      'Comparative benchmarking suite evaluating classification algorithms across accuracy, precision-recall curves, ROC-AUC, and computational inference costs.',
    fullStory:
      'Developed a rigorous ML evaluation pipeline comparing Support Vector Machines, Random Forests, XGBoost, and Logistic Regression on multi-dimensional datasets. Includes automated hyperparameter grid search, k-fold cross-validation, and ROC-AUC curve visualization.',
    metrics: [
      { label: 'Models Evaluated', value: '6 Architectures' },
      { label: 'Cross-Validation', value: '10-Fold Stratified' },
      { label: 'Peak F1-Score', value: '96.2%' },
    ],
    architectureHighlights: [
      'Automated preprocessing, outlier filtering, and standard scalar pipelines',
      'Comprehensive evaluation matrix comparing training latency vs classification performance',
      'Detailed residual and confusion matrix diagnostic generation',
    ],
    githubUrl: 'https://github.com/aswinbinu006/Model-Comparison',
    demoUrl: 'https://github.com/aswinbinu006/Model-Comparison',
    size: 'standard',
  },
  {
    id: 'california-housing-ml',
    title: 'California Housing Valuation Engine',
    category: 'PREDICTIVE MODELING',
    filterCategory: 'ml-datascience',
    badgeType: 'Predictive Model',
    year: '2025',
    role: 'Data Scientist / ML Developer',
    duration: '3 weeks',
    stack: ['Python', 'Scikit-Learn', 'NumPy', 'Pandas', 'Feature Engineering'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    description:
      'Multivariate regression pipeline for housing appraisal with geospatial feature engineering, collinearity mitigation, and residual analysis.',
    fullStory:
      'Constructed an end-to-end regression modeling pipeline on the California Housing dataset. Engineered domain-specific geospatial clustering features, median income ratios, and rooms-per-household factors, optimizing gradient boosted and random forest regressors for minimal RMSE.',
    metrics: [
      { label: 'RMSE Reduction', value: '18.4% vs Baseline' },
      { label: 'Explained Variance', value: 'R² = 0.84' },
      { label: 'Engineered Features', value: '14 Custom Metrics' },
    ],
    architectureHighlights: [
      'Geospatial clustering and proximity feature transformations',
      'Cross-validated hyperparameter optimization using Scikit-Learn pipelines',
      'Residual error diagnostic reporting and multicollinearity pruning via VIF',
    ],
    githubUrl: 'https://github.com/aswinbinu006/California-House-Price-Prediction-Model',
    demoUrl: 'https://github.com/aswinbinu006/California-House-Price-Prediction-Model',
    size: 'standard',
  },
];