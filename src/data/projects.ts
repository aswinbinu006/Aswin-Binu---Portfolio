import { Project } from './types';

export const projects: Project[] = [
  {
    id: "learnpath-ai",
    title: "LearnPath AI",
    summary: "Personalized learning platform with AI powered roadmaps and recommendations.",
    tags: ["React", "Python", "LLM"],
    cardImage: {
      src: "/assets/project-learnpath.png",
      alt: "LearnPath AI Dashboard Interface",
    },
    screenshots: [
      { src: "/assets/project-learnpath.png", alt: "LearnPath AI Dashboard" },
      { src: "/assets/learnpath-featured.png", alt: "LearnPath AI Learning Journey & Roadmap" },
      { src: "/assets/project-learnpath.png", alt: "Adaptive Assessment & Diagnostic Engine" },
      { src: "/assets/learnpath-featured.png", alt: "Student Skill Analytics & Progress Tracking" },
    ],
    featured: true,
    role: "AI / Full Stack Developer",
    year: "2026",
    duration: "4 months",
    description: "LearnPath AI is an adaptive educational platform that diagnoses learner strengths, generates dynamic weekly milestones, and recommends focused AI-curated curriculum paths.",
    highlights: [
      {
        title: "Adaptive Roadmaps",
        description: "Dynamic curriculum generation tuned to individual assessment pacing",
      },
      {
        title: "Concept Diagnostic",
        description: "Real-time concept verification and automated knowledge-gap remediation",
      },
      {
        title: "Progress Analytics",
        description: "Visual streak, topic mastery, and milestone tracking dashboard",
      },
    ],
    liveUrl: "https://learnpath-ai.demo",
    githubUrl: "https://github.com/aswinbinu006/learnpath-ai",
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
      { src: "/assets/project-prashikshan.png", alt: "Coordinator Approval & Credit Validation" },
    ],
    featured: false,
    role: "Full Stack Engineer",
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
    liveUrl: "https://prashikshan.demo",
    githubUrl: "https://github.com/aswinbinu006/prashikshan",
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
    year: "2026",
    duration: "3 months",
    description: "FinSight AI helps users understand their spending patterns, manage subscriptions and plan financial goals using machine learning and data-driven insights.",
    highlights: [
      {
        title: "Spending insights",
        description: "Categorization and visualization of expenses",
      },
      {
        title: "Subscription management",
        description: "Track and manage recurring payments",
      },
      {
        title: "Goal planning",
        description: "Personalized goal recommendations using ML models",
      },
    ],
    screenshots: [
      { src: "/assets/finsight-showcase-main.png", alt: "FinSight Main Dashboard" },
      { src: "/assets/finsight-th1.png", alt: "FinSight Monthly Expenses Chart" },
      { src: "/assets/finsight-th2.png", alt: "FinSight Savings Goal Tracker" },
      { src: "/assets/finsight-th3.png", alt: "FinSight Subscription View" },
    ],
    liveUrl: "https://finsight-ai.demo",
    githubUrl: "https://github.com/aswinbinu006/finsight-ai",
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
      { src: "/assets/project-civicsetu.png", alt: "Automated Municipal Department Routing" },
      { src: "/assets/project-civicsetu.png", alt: "Public Resolution Timeline & Verification" },
    ],
    featured: false,
    role: "Full Stack Developer",
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
    liveUrl: "https://civicsetu.demo",
    githubUrl: "https://github.com/aswinbinu006/civicsetu",
    verification: "verified",
  },
  {
    id: "careerpilot-ai",
    title: "CareerPilot AI",
    summary: "AI-powered career guidance platform with skill analysis and personalized recommendations.",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    cardImage: {
      src: "/assets/project-careerpilot.png",
      alt: "CareerPilot AI Career Trajectory Interface",
    },
    screenshots: [
      { src: "/assets/project-careerpilot.png", alt: "CareerPilot Career Trajectory Interface" },
      { src: "/assets/project-careerpilot.png", alt: "Industry Benchmark Skill Gap Analysis" },
      { src: "/assets/project-careerpilot.png", alt: "Sequential Milestone Learning Roadmaps" },
      { src: "/assets/project-careerpilot.png", alt: "Curated Open-Source Project Recommendations" },
    ],
    featured: false,
    role: "ML Engineer",
    year: "2025",
    duration: "2 months",
    description: "CareerPilot AI parses aspirant engineering backgrounds, identifies gaps with real industry postings, and maps concrete course and project milestones to achieve target career trajectories.",
    highlights: [
      {
        title: "Skill Gap Analysis",
        description: "Comprehensive vector distance analysis comparing skills with benchmarks",
      },
      {
        title: "Adaptive Roadmapping",
        description: "Step-by-step sequential learning roadmaps tailored to current level",
      },
      {
        title: "Resource Recommendations",
        description: "Curated open-source courses and repository projects for each skill gap",
      },
    ],
    liveUrl: "https://careerpilot-ai.demo",
    githubUrl: "https://github.com/aswinbinu006/careerpilot-ai",
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
      { src: "/assets/project-smartscholars.png", alt: "Cohort Topic Difficulty & Trend Visuals" },
      { src: "/assets/project-smartscholars.png", alt: "Proactive Mentorship Alerts & Study Plans" },
    ],
    featured: false,
    role: "Data Scientist",
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
    liveUrl: "https://smartscholars.demo",
    githubUrl: "https://github.com/aswinbinu006/smartscholars",
    verification: "verified",
  },
];
