import { Project } from './types';

export const projects: Project[] = [
  {
    id: "careerpilot",
    title: "CareerPilot",
    summary: "AI-based career guidance platform for Class 12 students evaluating board marks, NIRF rankings, and college cutoffs.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "AI Advisory"],
    cardImage: {
      src: "/assets/careerpilot-live.png",
      alt: "CareerPilot Live Platform Showcase",
    },
    screenshots: [
      { src: "/assets/careerpilot-live.png", alt: "CareerPilot Live Platform" },
      { src: "/assets/project-careerpilot.png", alt: "CareerPilot Advisory Engine" },
    ],
    featured: true,
    role: "Creator & Lead Developer",
    contribution: "Designed and implemented the complete career advisory platform from scratch, including multi-stream guidance pipelines, NIRF ranking and exam cutoff analysis engines, responsive UI with modern typography and animations, and production deployment on Vercel.",
    year: "2026",
    duration: "3 months",
    description: "CareerPilot is a free, deliberate, human-centric academic advisory architecture for Class 12 graduates across PCM, PCB, Commerce, and Arts. Grounded in NIRF rankings, NTA exam cutoffs (JEE Main, NEET, CUET), and family tuition budgets, it provides personalized career trajectories and verified college recommendations.",
    highlights: [
      {
        title: "Multi-Stream Guidance Architecture",
        description: "Intelligent assessment engine tailored for Class 12 graduates across PCM, PCB, Commerce, and Arts.",
      },
      {
        title: "Verified NIRF & Cutoff Data",
        description: "Recommends real colleges grounded in official NIRF rankings, NTA exam cutoffs, and family tuition constraints.",
      },
      {
        title: "Actionable Career Roadmaps",
        description: "Delivers step-by-step career trajectories, emerging specialization avenues, and scholarship opportunities.",
      },
    ],
    liveUrl: "https://careerpilot-006.vercel.app/",
    githubUrl: "https://github.com/aswinbinu006/CareerPilot",
    verification: "verified",
  },
  {
    id: "learnpath-ai",
    title: "LearnPath AI",
    summary: "Personalized intelligent learning roadmap and real-time AI mentorship platform.",
    tags: ["React", "Python", "LLM", "Render"],
    cardImage: {
      src: "/assets/learnpath-live.png",
      alt: "LearnPath AI Live Platform Showcase",
    },
    screenshots: [
      { src: "/assets/learnpath-live.png", alt: "LearnPath AI Live Dashboard" },
      { src: "/assets/learnpath-featured.png", alt: "LearnPath AI Learning Journey & Roadmap" },
      { src: "/assets/project-learnpath.png", alt: "Adaptive Assessment & Diagnostic Engine" },
    ],
    featured: false,
    role: "AI / Full Stack Developer",
    contribution: "Architected adaptive curriculum generation algorithms, real-time AI mentorship conversational interface, concept diagnostic modules, and visual milestone tracking dashboards.",
    year: "2026",
    duration: "4 months",
    description: "LearnPath AI is an adaptive educational platform that generates personalized learning roadmaps and provides real-time AI mentorship for mastering software engineering skills, assessing knowledge gaps, and tracking mastery.",
    highlights: [
      {
        title: "Adaptive Roadmaps",
        description: "Dynamic curriculum generation tuned to individual assessment pacing and learning goals",
      },
      {
        title: "Real-Time AI Mentorship",
        description: "Interactive conversational guidance for clarifying difficult conceptual hurdles and debugging code",
      },
      {
        title: "Progress & Mastery Analytics",
        description: "Visual streak, topic mastery, and milestone tracking dashboard",
      },
    ],
    liveUrl: "https://learnpath-ai-xhdw.onrender.com/",
    githubUrl: "https://github.com/aswinbinu006/LearnPath-AI",
    verification: "verified",
  },
  {
    id: "finsight-ai",
    title: "FinSight AI",
    summary: "Privacy-first financial intelligence platform with spending insights and goal planning.",
    tags: ["React", "Python", "FastAPI", "PostgreSQL"],
    cardImage: {
      src: "/assets/project-finsight.png",
      alt: "FinSight AI Analytics Interface",
    },
    featured: false,
    role: "Full Stack Developer",
    contribution: "Developed machine learning categorization pipelines, spending pattern visualizers, and secure database schemas using FastAPI and PostgreSQL.",
    year: "2026",
    duration: "3 months",
    description: "FinSight AI helps users understand their spending patterns, manage subscriptions and plan financial goals using machine learning and data-driven insights.",
    highlights: [
      {
        title: "Spending insights",
        description: "Categorization and visualization of expenses using ML models",
      },
      {
        title: "Subscription management",
        description: "Track and manage recurring payments with renewal forecasts",
      },
      {
        title: "Goal planning",
        description: "Personalized savings goal recommendations and timeline simulators",
      },
    ],
    screenshots: [
      { src: "/assets/finsight-showcase-main.png", alt: "FinSight Main Dashboard" },
      { src: "/assets/finsight-th1.png", alt: "FinSight Monthly Expenses Chart" },
      { src: "/assets/finsight-th2.png", alt: "FinSight Savings Goal Tracker" },
      { src: "/assets/finsight-th3.png", alt: "FinSight Subscription View" },
    ],
    liveUrl: "https://careerpilot-006.vercel.app/",
    githubUrl: "https://github.com/aswinbinu006/finsight-ai",
    verification: "verified",
  },
  {
    id: "prashikshan",
    title: "Prashikshan",
    summary: "Student internship platform with AI resume parsing and opportunity matching.",
    tags: ["Next.js", "Python", "Firebase"],
    cardImage: {
      src: "/assets/project-prashikshan.png",
      alt: "Prashikshan Internship Platform Interface",
    },
    screenshots: [
      { src: "/assets/project-prashikshan.png", alt: "Prashikshan Student Internship Platform" },
      { src: "/assets/project-prashikshan.png", alt: "AI Resume Parsing & Competency Extraction" },
      { src: "/assets/project-prashikshan.png", alt: "Corporate Opportunity Matching & Similarity" },
    ],
    featured: false,
    role: "Full Stack Engineer",
    contribution: "Built the resume parsing microservice, competency cosine similarity matching algorithm, and multi-tier institutional approval workflows.",
    year: "2025",
    duration: "3 months",
    description: "Prashikshan bridges academic talent with verified corporate internships via intelligent skill parsing, relevance scoring, and streamlined institutional coordinator approvals.",
    highlights: [
      {
        title: "Resume Parsing",
        description: "Automated extraction and classification of technical competencies",
      },
      {
        title: "Opportunity Matching",
        description: "Cosine similarity algorithm connecting student profiles to open roles",
      },
      {
        title: "Coordinator Portal",
        description: "Multi-tiered institutional verification for academic credit validation",
      },
    ],
    liveUrl: "https://learnpath-ai-xhdw.onrender.com/",
    githubUrl: "https://github.com/aswinbinu006/prashikshan",
    verification: "verified",
  },
  {
    id: "civicsetu",
    title: "CivicSetu",
    summary: "Citizen-centric platform for reporting and tracking civic issues with transparent resolution.",
    tags: ["React", "Node.js", "PostgreSQL"],
    cardImage: {
      src: "/assets/project-civicsetu.png",
      alt: "CivicSetu Municipal Tracking Interface",
    },
    screenshots: [
      { src: "/assets/project-civicsetu.png", alt: "CivicSetu Municipal Issue Tracker" },
      { src: "/assets/project-civicsetu.png", alt: "Geotagged Photographic Grievance Intake" },
    ],
    featured: false,
    role: "Full Stack Developer",
    contribution: "Engineered geotagged complaint intake APIs, public audit timeline visualizers, and department routing queues.",
    year: "2025",
    duration: "2.5 months",
    description: "CivicSetu empowers local communities to document infrastructural grievances, auto-route reports to relevant wards, and monitor resolution through transparent public timelines.",
    highlights: [
      {
        title: "Geotagged Reporting",
        description: "Precise coordinate and photographic evidence capture for issues",
      },
      {
        title: "Automated Routing",
        description: "Category-based routing directly to municipal department heads",
      },
      {
        title: "Public Audit Trail",
        description: "Real-time timeline progression with photo-verified resolutions",
      },
    ],
    liveUrl: "https://careerpilot-006.vercel.app/",
    githubUrl: "https://github.com/aswinbinu006/civicsetu",
    verification: "verified",
  },
  {
    id: "smartscholars",
    title: "SmartScholars",
    summary: "Student performance prediction using machine learning to identify at-risk students early.",
    tags: ["Python", "Random Forest", "Pandas"],
    cardImage: {
      src: "/assets/project-smartscholars.png",
      alt: "SmartScholars Early Intervention Interface",
    },
    screenshots: [
      { src: "/assets/project-smartscholars.png", alt: "SmartScholars Academic Indicator Analytics" },
      { src: "/assets/project-smartscholars.png", alt: "Pre-Midterm Machine Learning Early Risk Model" },
    ],
    featured: false,
    role: "Data Scientist",
    contribution: "Trained Random Forest and Gradient Boosting classification models to detect academic risk factors early based on attendance and assignment indicators.",
    year: "2024",
    duration: "3 months",
    description: "SmartScholars evaluates multi-dimensional student academic indicators (attendance, internal assessment trends, assignment cadence) to surface proactive intervention alerts for mentors.",
    highlights: [
      {
        title: "Early Risk Detection",
        description: "Machine learning classifier identifying at-risk indicators before midterms",
      },
      {
        title: "Cohort Insights",
        description: "Instructor-level overview highlighting struggling subject topics",
      },
      {
        title: "Proactive Mentorship",
        description: "Automated intervention alerts and customized study plan prompts",
      },
    ],
    liveUrl: "https://careerpilot-006.vercel.app/",
    githubUrl: "https://github.com/aswinbinu006/smartscholars",
    verification: "verified",
  },
];
