export type Verification = "verified" | "unverified" | "placeholder";

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  cardImage?: ImageAsset;
  screenshots?: ImageAsset[];
  role?: string;
  contribution?: string;
  contributors?: string[];
  year?: string;
  duration?: string;
  description?: string;
  highlights?: (string | ProjectHighlight)[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  verification: Verification;
}

export interface SkillItem {
  name: string;
  icon?: string;
  color?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  description?: string;
  iconType?: string;
  items: string[];
  tools?: SkillItem[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description?: string;
  skills: string[];
  credentialId?: string;
  credentialUrl?: string;
  image?: ImageAsset;
  fullImage?: ImageAsset;
  verification: Verification;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  period?: string;
  meta?: string;
  role?: string;
  description?: string;
  teamSize?: string | number;
  participants?: string | number;
  tags?: string[];
  badge?: string;
  poster?: ImageAsset;
  photos?: ImageAsset[];
  photosUrl?: string;
  verification: Verification;
}

export interface LeadershipRole {
  id: string;
  title: string;
  organization: string;
  period: string;
  description?: string;
  logo?: string;
  verification: Verification;
}

export interface SchoolRecord {
  id: "10th" | "12th";
  institution: string;
  location: string;
  board: string;
  year: string;
  overallScore: string;
  detailedScore?: string;
  subjects: { subject: string; marks: number; max: number; grade: string }[];
  verification: Verification;
}

export interface Semester {
  label: string;
  sgpa?: number;
  credits?: number;
  status?: string;
  subjects: { code?: string; name: string; credits?: number; grade: string }[];
}

export interface UniversityRecord {
  institute: string;
  university: string;
  location: string;
  duration: string;
  cgpa: number;
  backlogs?: number;
  semesters: Semester[];
  keySubjects: string[];
  verification: Verification;
}

export interface Internship {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  location?: string;
  teamSize?: string;
  isCurrent?: boolean;
  shortDescription: string;
  bullets: string[];
  technologies: string[];
  outcome: string;
  certificateUrl?: string;
  letterOfRecommendationUrl?: string;
  certificateImage?: ImageAsset;
  letterOfRecommendationImage?: ImageAsset;
  companyWebsiteUrl?: string;
  logo?: ImageAsset;
  verification: Verification;
}

export interface SiteConfig {
  name: string;
  role: string;
  statusChip: string;
  tagline: string;
  aboutParagraphs: [string, string];
  educationFact: string;
  focusFact: string;
  locationFact?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  location?: string;
}
