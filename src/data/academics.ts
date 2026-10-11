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
    stageSub: "Secondary School Examination",
    institution: "Nirmala Higher Secondary School",
    location: "Thrissur, Kerala",
    year: "2020",
    score: "93.2%",
  },
  {
    id: "12th",
    stage: "Class 12th",
    stageSub: "Higher Secondary Examination",
    institution: "Nirmala Higher Secondary School",
    location: "Thrissur, Kerala",
    year: "2022",
    score: "94.6%",
  },
  {
    id: "btech",
    stage: "B.Tech CSE (AI & ML)",
    stageSub: "Bachelor of Technology",
    institution: "Symbiosis Institute of Technology",
    location: "Nagpur, Maharashtra",
    year: "2024 – 2028",
    yearSub: "(Expected)",
    score: "7.62 CGPA",
    scoreSub: "(Till Sem 4)",
  },
];

export const keySubjects: string[] = [
  "Data Structures & Algorithms",
  "Operating Systems",
  "Database Management Systems",
  "Computer Networks",
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Computer Architecture",
  "Software Engineering",
  "Probability & Statistics",
];

export const universityRecord: UniversityRecord = {
  institute: "Symbiosis Institute of Technology",
  university: "Symbiosis International (Deemed University)",
  location: "Nagpur, Maharashtra",
  duration: "2024 – 2028 (Expected)",
  cgpa: 7.62,
  backlogs: 0,
  keySubjects: keySubjects,
  semesters: [
    {
      label: "Sem 1",
      sgpa: 7.84,
      credits: 20,
      subjects: [
        { name: "Engineering Mathematics - I", credits: 4, grade: "A" },
        { name: "Programming for Problem Solving", credits: 4, grade: "A" },
        { name: "Digital Electronics", credits: 3, grade: "B+" },
        { name: "Engineering Physics", credits: 3, grade: "A" },
        { name: "Communicative English", credits: 2, grade: "A" },
      ],
    },
    {
      label: "Sem 2",
      sgpa: 7.21,
      credits: 20,
      subjects: [
        { name: "Engineering Mathematics - II", credits: 4, grade: "A" },
        { name: "Data Structures & Algorithms", credits: 4, grade: "A" },
        { name: "Basic Electrical Engineering", credits: 3, grade: "B+" },
        { name: "Chemistry for Engineers", credits: 3, grade: "A" },
        { name: "Environmental Science", credits: 2, grade: "A" },
      ],
    },
    {
      label: "Sem 3",
      sgpa: 7.39,
      credits: 20,
      subjects: [
        { name: "Discrete Mathematics", credits: 4, grade: "A" },
        { name: "Object Oriented Programming", credits: 4, grade: "A" },
        { name: "Database Management Systems", credits: 4, grade: "A" },
        { name: "Computer Organization", credits: 3, grade: "B+" },
        { name: "Design Thinking", credits: 2, grade: "A" },
      ],
    },
    {
      label: "Sem 4",
      sgpa: 7.62,
      credits: 20,
      subjects: [
        { name: "Design & Analysis of Algorithms", credits: 4, grade: "A" },
        { name: "Operating Systems", credits: 4, grade: "A" },
        { name: "Machine Learning Foundations", credits: 4, grade: "A" },
        { name: "Computer Networks", credits: 3, grade: "A" },
        { name: "Python for AI", credits: 3, grade: "A" },
      ],
    },
    {
      label: "Sem 5",
      credits: 20,
      subjects: [
        { name: "Deep Learning", credits: 4, grade: "Current" },
        { name: "Artificial Intelligence", credits: 4, grade: "Current" },
        { name: "Cloud Computing", credits: 3, grade: "Current" },
        { name: "Software Engineering", credits: 3, grade: "Current" },
        { name: "Technical Seminar", credits: 2, grade: "Current" },
      ],
    },
  ],
  verification: "verified",
};

export const schoolRecords: Record<"12th" | "10th", SchoolRecord> = {
  "12th": {
    id: "12th",
    institution: "Nirmala Higher Secondary School",
    location: "Thrissur, Kerala",
    board: "Kerala State Higher Secondary Board",
    year: "2022",
    overallScore: "94.6%",
    subjects: [
      { subject: "Mathematics", marks: 96, max: 100, grade: "A1" },
      { subject: "Physics", marks: 94, max: 100, grade: "A1" },
      { subject: "Chemistry", marks: 92, max: 100, grade: "A1" },
      { subject: "English", marks: 88, max: 100, grade: "A2" },
      { subject: "Computer Science", marks: 98, max: 100, grade: "A1" },
    ],
    verification: "verified",
  },
  "10th": {
    id: "10th",
    institution: "Nirmala Higher Secondary School",
    location: "Thrissur, Kerala",
    board: "Kerala State Board",
    year: "2020",
    overallScore: "93.2%",
    subjects: [
      { subject: "Mathematics", marks: 98, max: 100, grade: "A1" },
      { subject: "Science", marks: 95, max: 100, grade: "A1" },
      { subject: "Social Science", marks: 92, max: 100, grade: "A1" },
      { subject: "English", marks: 91, max: 100, grade: "A1" },
      { subject: "Regional Language", marks: 90, max: 100, grade: "A1" },
    ],
    verification: "verified",
  },
};
