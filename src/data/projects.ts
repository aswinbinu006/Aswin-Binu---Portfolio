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
    githubUrl: "https://github.com/aswinbinu006/LearnPath-AI-",
    verification: "verified",
  },
  {
    id: "finsight-ai",
    title: "FinSight AI",
    summary: "Institutional-grade financial intelligence platform powered by AI with XGBoost behavioral scoring, subscription waste tracking, and cash flow forecasting.",
    tags: ["React 19", "FastAPI", "Python", "XGBoost", "Firebase", "Gemini AI"],
    featured: false,
    role: "Full Stack & AI Developer",
    contribution: "Architected the full-stack financial analysis platform using React 19 and Python FastAPI: trained XGBoost health scoring models, implemented Gemini AI financial advisors, built transaction classification pipelines, and configured Firebase authentication with real-time Firestore sync.",
    year: "2026",
    duration: "3 months",
    description: "FinSight AI is an institutional-grade financial intelligence platform. Built with a React 19 frontend and Python FastAPI backend, it provides behavioral financial profiling, ML-driven financial health score prediction (XGBoost), subscription waste identification, wealth simulation, and real-time Firebase sync with offline fallback scoring.",
    highlights: [
      {
        title: "Behavioral Profiling & ML Health Score",
        description: "10-question behavioral assessment analyzed by trained XGBoost models to calculate predictive financial health scores with offline fallback.",
      },
      {
        title: "Subscription Waste & Cash Flow Analysis",
        description: "Automated recurring charge detection, bill forecasting, spending velocity alerts, and subscription leak reduction.",
      },
      {
        title: "Goal Success Probability Modeling",
        description: "Wealth accumulation simulator powered by Gemini AI and Monte Carlo trajectory projections with real-time Firestore sync.",
      },
    ],
    githubUrl: "https://github.com/aswinbinu006/FinSight-AI",
    verification: "verified",
  },
  {
    id: "prashikshan",
    title: "Prashikshan",
    summary: "AI-powered internship management platform for the Indian educational ecosystem connecting students, colleges, and companies with verified APAAR/ABC IDs.",
    tags: ["React 18", "Node.js", "Express", "MongoDB", "NLP", "Socket.io"],
    featured: false,
    role: "Full Stack Engineer",
    contribution: "Engineered full-stack portals across four user roles (Student, Company, Faculty, Admin): integrated APAAR/ABC ID verification, built NLP-based resume scoring algorithms with explainable breakdowns, designed NEP credit conversion workflows, and integrated real-time video/chat communication.",
    year: "2025",
    duration: "3 months",
    description: "Prashikshan is an AI-powered internship management platform engineered specifically for the Indian education system. It connects students, companies, and faculty through verified APAAR/ABC IDs, automates internship matching with NLP resume scoring and skill gap analysis, maps hours to NEP academic credits, and offers real-time video/chat communication.",
    highlights: [
      {
        title: "APAAR/ABC & NEP Credit Mapping",
        description: "Cryptographic student identity validation preventing fraudulent credentials and converting completed internships into verified NEP academic credits.",
      },
      {
        title: "AI Resume Scoring & Skill Gap Analysis",
        description: "NLP-powered resume parsing (spaCy, TF-IDF, BERT) providing explainable candidate match percentages and personalized course recommendations for missing skills.",
      },
      {
        title: "Multi-Role Dashboards & Real-Time Comms",
        description: "Dedicated interfaces for Students, Corporate Recruiters, Faculty Mentors, and Admins with in-platform messaging, video interviews, and digital certificate issuance.",
      },
    ],
    githubUrl: "https://github.com/aswinbinu006/Prashikshan",
    verification: "verified",
  },
  {
    id: "civicsetu",
    title: "CivicSetu",
    summary: "Smart civic issue reporting and municipal management system bridging citizens and urban authorities with geotagged incident tracking.",
    tags: ["Flutter", "React 18", "Firebase", "Leaflet", "GPS Geolocation", "Node.js"],
    featured: false,
    role: "Full Stack & Mobile Developer",
    contribution: "Developed the citizen Flutter mobile application and administrative React web portal: engineered geotagged photo reporting with GPS coordinates, duplicate issue detection within a 20m radius, interactive Leaflet mapping, and department resolution workflows.",
    year: "2025",
    duration: "2.5 months",
    description: "CivicSetu is a smart civic issue reporting and municipal management system. It bridges the gap between citizens and municipal authorities through a mobile Flutter app for citizens and a React web portal for administrators and municipal departments, ensuring authenticated grievance verification and transparent public resolution lifecycles.",
    highlights: [
      {
        title: "Geotagged Incident Reporting",
        description: "Citizens report infrastructural issues with OTP phone authentication, automatic GPS coordinate logging, address verification, and 2-3 camera photo uploads.",
      },
      {
        title: "20m Proximity Duplicate Filter",
        description: "Spatial proximity algorithm preventing redundant civic grievance tickets within a 20-meter radius, optimizing municipal triage efficiency.",
      },
      {
        title: "Interactive Leaflet Admin & Department Portals",
        description: "Citywide GIS dashboard with color-coded markers, automated ward engineer routing, workload queues, and before-and-after photo verification audits.",
      },
    ],
    githubUrl: "https://github.com/aswinbinu006/CivicSetu",
    verification: "verified",
  },
  {
    id: "smartscholars",
    title: "SmartScholars",
    summary: "Predictive student academic performance and early intervention system using machine learning ensemble regression models.",
    tags: ["Python", "Flask", "Scikit-learn", "XGBoost", "Random Forest", "Pandas"],
    featured: false,
    role: "Machine Learning & Full Stack Developer",
    contribution: "Developed the predictive machine learning engine and Flask web interface: designed multi-factor student performance pipelines, benchmarked Random Forest, XGBoost, and SVR regressors, and engineered proactive early warning indicators for educators.",
    year: "2024",
    duration: "3 months",
    description: "SmartScholars is a predictive machine learning platform and Flask web application that evaluates multi-dimensional academic indicators (CA performance, previous GPA, attendance, marks consistency, poor courses count, and study hours) to forecast student performance and trigger early academic intervention before midterms.",
    highlights: [
      {
        title: "Multi-Factor Performance Predictor",
        description: "Evaluates CA marks, past GPA, attendance percentage, consistency indices, and study hours using a trained SmartScholarsPredictor pipeline.",
      },
      {
        title: "Ensemble ML Regressors",
        description: "Benchmarks and deploys Random Forest, XGBoost, and Support Vector Regression (SVR) pipelines with Scikit-learn and polynomial feature preprocessing.",
      },
      {
        title: "Early Academic Risk Alerts",
        description: "Surfaces proactive intervention flags and student diagnostic reports, allowing faculty mentors to deliver targeted remediation before exam cycles.",
      },
    ],
    liveUrl: "https://smart-scholars.vercel.app",
    githubUrl: "https://github.com/aswinbinu006/SmartScholars",
    verification: "verified",
  },
];
