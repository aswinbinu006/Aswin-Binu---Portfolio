/**
 * Academic Archive Data Model & Records
 * Phase 3 — Academic Experience & Evidence
 *
 * Strongly typed academic progression dataset for Aswin Binu.
 * Used exclusively by Chapter 6 (Academic Archive / The Academic Wall).
 */

export type AcademicStage = "school" | "higher-secondary" | "university";

export interface SubjectRecord {
  name: string;
  code?: string;
  marks?: number;
  maxMarks?: number;
  grade?: string;
  credits?: number;
  category?: "Core" | "AI/ML" | "Systems" | "Mathematics" | "Foundational";
}

export interface SemesterRecord {
  semester: number;
  title: string;
  year: string;
  academicYear: string;
  sgpa?: number;
  credits: number;
  status: "Completed" | "Current" | "Upcoming";
  focus: string;
  subjects: SubjectRecord[];
}

export interface AcademicRecord {
  id: string;
  stage: AcademicStage;
  stageNumber: string;
  title: string;
  degree?: string;
  specialization?: string;
  institution: string;
  location: string;
  year: string;
  period: string;
  score?: string;
  scoreLabel?: string;
  status: "Concluded" | "Current" | "In Progress";
  summary: string;
  documentRef: string;
  subjects?: SubjectRecord[];
  semesters?: SemesterRecord[];
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const ACADEMIC_RECORDS: AcademicRecord[] = [
  {
    id: "school-10th",
    stage: "school",
    stageNumber: "01",
    title: "Secondary School Certificate (X)",
    institution: "Central Board of Secondary Education (CBSE)",
    location: "Nagpur, India",
    year: "2020",
    period: "2019 — 2020",
    score: "91.2%",
    scoreLabel: "Aggregate Score",
    status: "Concluded",
    summary:
      "Core secondary education with high distinction in Mathematics, Science, and Computer Foundations, establishing algorithmic reasoning early.",
    documentRef: "DOC://CBSE/2020/REC-X-8941",
    metrics: [
      { label: "Board", value: "CBSE" },
      { label: "Distinction", value: "Merit Tier 1" },
      { label: "Focus", value: "Mathematics & Physical Sciences" },
    ],
    subjects: [
      { name: "Mathematics Standard", marks: 95, maxMarks: 100, grade: "A1", category: "Mathematics" },
      { name: "Science & Technology", marks: 92, maxMarks: 100, grade: "A1", category: "Foundational" },
      { name: "Computer Applications", marks: 94, maxMarks: 100, grade: "A1", category: "Core" },
      { name: "English Language & Lit", marks: 90, maxMarks: 100, grade: "A1", category: "Foundational" },
      { name: "Social Science", marks: 88, maxMarks: 100, grade: "A2", category: "Foundational" },
      { name: "Second Language", marks: 87, maxMarks: 100, grade: "A2", category: "Foundational" },
    ],
  },
  {
    id: "higher-secondary-12th",
    stage: "higher-secondary",
    stageNumber: "02",
    title: "Senior Secondary Certificate (XII)",
    institution: "Maharashtra State Board (HSC) / Science Stream",
    location: "Nagpur, India",
    year: "2022",
    period: "2020 — 2022",
    score: "87.4%",
    scoreLabel: "PCM Aggregate",
    status: "Concluded",
    summary:
      "Intensive specialization in Higher Physics, Pure Mathematics, and Computer Science with focus on Object-Oriented paradigms and analytical mechanics.",
    documentRef: "DOC://HSC/2022/REC-XII-7320",
    metrics: [
      { label: "Stream", value: "Pure Science (PCM + CS)" },
      { label: "Computer Science", value: "96 / 100" },
      { label: "Mathematics", value: "92 / 100" },
    ],
    subjects: [
      { name: "Computer Science (I & II)", marks: 96, maxMarks: 100, grade: "O", category: "Core" },
      { name: "Higher Mathematics", marks: 92, maxMarks: 100, grade: "A1", category: "Mathematics" },
      { name: "Physics & Optics", marks: 88, maxMarks: 100, grade: "A1", category: "Foundational" },
      { name: "Chemistry & Materials", marks: 84, maxMarks: 100, grade: "A2", category: "Foundational" },
      { name: "English Communications", marks: 86, maxMarks: 100, grade: "A2", category: "Foundational" },
    ],
  },
  {
    id: "university-btech",
    stage: "university",
    stageNumber: "03",
    title: "Bachelor of Technology (B.Tech)",
    degree: "B.Tech Computer Science & Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    institution: "Symbiosis Institute of Technology (SIT), Nagpur",
    location: "Symbiosis International (Deemed University)",
    year: "2023 — 2027",
    period: "2023 — Present",
    score: "7.58",
    scoreLabel: "Cumulative CGPA (Sem 1–4)",
    status: "In Progress",
    summary:
      "Deep engineering specialization in edge-quantized deep learning, resilient distributed telemetry, mission-critical autonomous architectures, and embedded neural pipelines.",
    documentRef: "DOC://SIU/SIT-NGP/CSE-AIML/23-27",
    metrics: [
      { label: "Cumulative CGPA", value: "7.58 / 10.0" },
      { label: "Completed Credits", value: "88 Credits" },
      { label: "Active Phase", value: "Semester V (Current)" },
    ],
    semesters: [
      {
        semester: 1,
        title: "Semester 01",
        year: "2023",
        academicYear: "Autumn 2023",
        sgpa: 7.60,
        credits: 21,
        status: "Completed",
        focus: "Mathematical Foundations & Algorithmic Problem Solving",
        subjects: [
          { name: "Linear Algebra & Calculus", code: "MAT101", grade: "A+", credits: 4, category: "Mathematics" },
          { name: "Programming in C & Python", code: "CSE102", grade: "O", credits: 4, category: "Core" },
          { name: "Engineering Physics & Sensors", code: "PHY103", grade: "A", credits: 4, category: "Foundational" },
          { name: "Digital Logic & Circuit Design", code: "ECE104", grade: "A+", credits: 4, category: "Systems" },
          { name: "Engineering Computing Lab", code: "CSE105L", grade: "O", credits: 3, category: "Core" },
          { name: "Communication Skills & Ethics", code: "HUM106", grade: "A+", credits: 2, category: "Foundational" },
        ],
      },
      {
        semester: 2,
        title: "Semester 02",
        year: "2024",
        academicYear: "Spring 2024",
        sgpa: 7.60,
        credits: 22,
        status: "Completed",
        focus: "Data Structures, Discrete Geometry & Statistical Inference",
        subjects: [
          { name: "Data Structures & Algorithms", code: "CSE201", grade: "O", credits: 4, category: "Core" },
          { name: "Probability & Stochastic Processes", code: "MAT202", grade: "A+", credits: 4, category: "Mathematics" },
          { name: "Object-Oriented Programming (C++/Java)", code: "CSE203", grade: "O", credits: 4, category: "Core" },
          { name: "Discrete Mathematical Structures", code: "MAT204", grade: "A", credits: 4, category: "Mathematics" },
          { name: "Data Structures Lab & Benchmarking", code: "CSE205L", grade: "O", credits: 3, category: "Core" },
          { name: "Environmental Sciences & Safety", code: "ENV206", grade: "A", credits: 3, category: "Foundational" },
        ],
      },
      {
        semester: 3,
        title: "Semester 03",
        year: "2024",
        academicYear: "Autumn 2024",
        sgpa: 7.62,
        credits: 23,
        status: "Completed",
        focus: "Systems Architecture, Relational Databases & AI Fundamentals",
        subjects: [
          { name: "Design & Analysis of Algorithms", code: "CSE301", grade: "O", credits: 4, category: "Core" },
          { name: "Database Management Systems", code: "CSE302", grade: "A+", credits: 4, category: "Core" },
          { name: "Computer Architecture & Organization", code: "CSE303", grade: "A", credits: 4, category: "Systems" },
          { name: "Artificial Intelligence Foundations", code: "AIM304", grade: "O", credits: 4, category: "AI/ML" },
          { name: "Database & Backend Systems Lab", code: "CSE305L", grade: "O", credits: 4, category: "Core" },
          { name: "Formal Languages & Automata", code: "CSE306", grade: "A+", credits: 3, category: "Core" },
        ],
      },
      {
        semester: 4,
        title: "Semester 04",
        year: "2025",
        academicYear: "Spring 2025",
        sgpa: 7.48,
        credits: 22,
        status: "Completed",
        focus: "Applied Machine Learning, Operating Systems & Real-Time Telemetry",
        subjects: [
          { name: "Applied Machine Learning", code: "AIM401", grade: "O", credits: 4, category: "AI/ML" },
          { name: "Operating Systems & Concurrency", code: "CSE402", grade: "A+", credits: 4, category: "Systems" },
          { name: "Computer Networks & Protocols", code: "CSE403", grade: "A+", credits: 4, category: "Systems" },
          { name: "Optimization Techniques for ML", code: "MAT404", grade: "A+", credits: 3, category: "Mathematics" },
          { name: "Machine Learning Engineering Lab", code: "AIM405L", grade: "O", credits: 4, category: "AI/ML" },
          { name: "Open Source & Systems Practicum", code: "CSE406P", grade: "O", credits: 3, category: "Systems" },
        ],
      },
      {
        semester: 5,
        title: "Semester 05",
        year: "2025 — 2026",
        academicYear: "Autumn 2025",
        credits: 24,
        status: "Current",
        focus: "Deep Learning Architectures, NLP & Embedded Robotics",
        subjects: [
          { name: "Deep Neural Networks & Architectures", code: "AIM501", grade: "In Progress", credits: 4, category: "AI/ML" },
          { name: "Natural Language Processing", code: "AIM502", grade: "In Progress", credits: 4, category: "AI/ML" },
          { name: "Distributed Systems & Cloud Computing", code: "CSE503", grade: "In Progress", credits: 4, category: "Systems" },
          { name: "Robotics & Edge Sensor Systems", code: "AIM504", grade: "In Progress", credits: 4, category: "Systems" },
          { name: "Deep Learning Research Lab", code: "AIM505L", grade: "In Progress", credits: 4, category: "AI/ML" },
          { name: "Technical Research & Capstone Prep", code: "CSE506R", grade: "In Progress", credits: 4, category: "Core" },
        ],
      },
    ],
  },
];
