import { SchoolRecord, UniversityRecord } from './types';

export interface AcademicRow {
  id: "btech" | "12th" | "10th";
  stage: string;
  stageSub: string;
  institution: string;
  location: string;
  year: string;
  yearSub?: string;
  score: string;
  scoreSub?: string;
}

export const academicRows: AcademicRow[] = [
  {
    id: "10th",
    stage: "Class 10th",
    stageSub: "Secondary School Examination (CBSE)",
    institution: "Lions English School",
    location: "Silvassa, Dadra & Nagar Haveli",
    year: "2022",
    score: "90.4%",
    scoreSub: "(452 / 500 Marks)",
  },
  {
    id: "12th",
    stage: "Class 12th",
    stageSub: "Senior School Certificate Examination (CBSE)",
    institution: "Lions English School",
    location: "Silvassa, Dadra & Nagar Haveli",
    year: "2024",
    score: "76.0%",
    scoreSub: "(380 / 500 Marks)",
  },
  {
    id: "btech",
    stage: "B.Tech CSE (AI & ML)",
    stageSub: "Bachelor of Technology",
    institution: "Symbiosis Institute of Technology",
    location: "Nagpur, Maharashtra",
    year: "2024 – 2028",
    yearSub: "(Expected)",
    score: "7.58 CGPA",
    scoreSub: "(Across Sem 1–4 · 97 Credits)",
  },
];

export const keySubjects: string[] = [
  "Data Structures & Algorithms",
  "Machine Learning & AI",
  "Operating Systems",
  "Database Management Systems",
  "Design & Analysis of Algorithms",
  "Discrete Mathematics & Graph Theory",
  "Java Programming",
  "Statistics & Probability",
  "Computer Organization",
  "Microcontrollers & Embedded Systems",
];

export const universityRecord: UniversityRecord = {
  institute: "Symbiosis Institute of Technology",
  university: "Symbiosis International (Deemed University)",
  location: "Nagpur, Maharashtra",
  duration: "2024 – 2028 (Expected)",
  cgpa: 7.58,
  backlogs: 0,
  keySubjects: keySubjects,
  semesters: [
    {
      label: "Sem 1",
      sgpa: 7.62,
      credits: 20,
      subjects: [
        { name: "Mathematics-I", credits: 3, grade: "B+" },
        { name: "Programming in C", credits: 3, grade: "B+" },
        { name: "Programming in C Lab", credits: 1, grade: "A" },
        { name: "Tinker Lab", credits: 2, grade: "A" },
        { name: "Basic Electrical & Electronics Engineering", credits: 3, grade: "A" },
        { name: "Basic Electrical & Electronics Engg Lab", credits: 1, grade: "B+" },
        { name: "Chemistry", credits: 3, grade: "B+" },
        { name: "Chemistry Lab", credits: 1, grade: "A+" },
        { name: "Engineering Graphics Lab", credits: 2, grade: "B+" },
        { name: "Design Thinking and Creativity", credits: 1, grade: "B" },
      ],
    },
    {
      label: "Sem 2",
      sgpa: 7.62,
      credits: 25,
      subjects: [
        { name: "Mathematics II", credits: 4, grade: "B+" },
        { name: "Programming and Problem Solving", credits: 2, grade: "B+" },
        { name: "Programming and Problem Solving Lab", credits: 1, grade: "A+" },
        { name: "Data Structures", credits: 3, grade: "B" },
        { name: "Data Structures Lab", credits: 1, grade: "B" },
        { name: "Project Based Learning - I", credits: 2, grade: "O" },
        { name: "Artificial Intelligence and Machine Learning", credits: 2, grade: "B+" },
        { name: "Statistics and Probability", credits: 3, grade: "A" },
        { name: "Physics for Computer Engineers", credits: 3, grade: "B" },
        { name: "Physics Lab", credits: 1, grade: "A" },
        { name: "Communication Skills", credits: 2, grade: "B+" },
        { name: "Communication Skills Lab", credits: 1, grade: "B+" },
      ],
    },
    {
      label: "Sem 3",
      sgpa: 7.66,
      credits: 26,
      subjects: [
        { name: "Discrete Mathematics and Graph Theory", credits: 4, grade: "A" },
        { name: "Design and Analysis of Algorithms", credits: 3, grade: "A" },
        { name: "Design and Analysis of Algorithms Lab", credits: 1, grade: "A" },
        { name: "Machine Learning", credits: 3, grade: "B+" },
        { name: "Machine Learning Lab", credits: 1, grade: "B+" },
        { name: "Digital Electronics and Logic Design", credits: 3, grade: "A" },
        { name: "Digital Electronics and Logic Design Lab", credits: 1, grade: "B+" },
        { name: "Computer Organization", credits: 3, grade: "B+" },
        { name: "Project Based Learning-II", credits: 2, grade: "A" },
        { name: "Project Management and Agile Methodology", credits: 3, grade: "B+" },
        { name: "Entrepreneurship Venture", credits: 1, grade: "B+" },
        { name: "Foundation of Ethics", credits: 1, grade: "B+" },
      ],
    },
    {
      label: "Sem 4",
      sgpa: 7.43,
      credits: 26,
      subjects: [
        { name: "Java Programming", credits: 3, grade: "A+" },
        { name: "Operating Systems", credits: 3, grade: "A" },
        { name: "Operating Systems Lab", credits: 1, grade: "A+" },
        { name: "Database Management Systems", credits: 3, grade: "B" },
        { name: "Database Management Systems Lab", credits: 2, grade: "A+" },
        { name: "Project Based Learning-III", credits: 2, grade: "A+" },
        { name: "Microcontrollers and Embedded Systems", credits: 3, grade: "B" },
        { name: "Microcontrollers and Embedded Systems Lab", credits: 1, grade: "A" },
        { name: "Theory of Computation", credits: 3, grade: "B+" },
        { name: "Neural Networks", credits: 3, grade: "C" },
        { name: "Basic German I", credits: 2, grade: "C" },
      ],
    },
    {
      label: "Sem 5",
      credits: 20,
      status: "In Progress",
      subjects: [
        { name: "Deep Learning Foundations", credits: 4, grade: "Enrolled" },
        { name: "Natural Language Processing", credits: 4, grade: "Enrolled" },
        { name: "Cloud Computing & MLOps", credits: 3, grade: "Enrolled" },
        { name: "Software Engineering & Architecture", credits: 3, grade: "Enrolled" },
        { name: "Capstone Project - Phase I", credits: 3, grade: "Enrolled" },
      ],
    },
  ],
  verification: "verified",
};

export const schoolRecords: Record<"12th" | "10th", SchoolRecord> = {
  "12th": {
    id: "12th",
    institution: "Lions English School",
    location: "Silvassa, Dadra & Nagar Haveli",
    board: "CBSE (Senior School Certificate Examination)",
    year: "2024",
    overallScore: "76.0%",
    detailedScore: "380 / 500 Marks",
    subjects: [
      { subject: "English Core (301)", marks: 89, max: 100, grade: "A2" },
      { subject: "Computer Science (083)", marks: 85, max: 100, grade: "B1" },
      { subject: "Chemistry (043)", marks: 84, max: 100, grade: "A2" },
      { subject: "Mathematics (041)", marks: 67, max: 100, grade: "B2" },
      { subject: "Physics (042)", marks: 55, max: 100, grade: "D1" },
    ],
    verification: "verified",
  },
  "10th": {
    id: "10th",
    institution: "Lions English School",
    location: "Silvassa, Dadra & Nagar Haveli",
    board: "CBSE (Secondary School Examination)",
    year: "2022",
    overallScore: "90.4%",
    detailedScore: "452 / 500 Marks",
    subjects: [
      { subject: "Science (086)", marks: 95, max: 100, grade: "A1" },
      { subject: "Hindi Course-B (085)", marks: 91, max: 100, grade: "A2" },
      { subject: "Mathematics Standard (041)", marks: 90, max: 100, grade: "A1" },
      { subject: "Social Science (087)", marks: 90, max: 100, grade: "A2" },
      { subject: "English Language & Literature (184)", marks: 86, max: 100, grade: "B1" },
    ],
    verification: "verified",
  },
};
