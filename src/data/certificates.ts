export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  category: "ai-ml" | "cloud" | "software" | "honors";
  categoryLabel: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
  skills: string[];
  description: string;
  badgeType: "Gold Tier" | "Specialization" | "Industry Certified" | "Honorary Lead";
  image: string;
  highlight?: boolean;
}

export const certificates: CertificateItem[] = [
  {
    id: "nvidia-deep-learning",
    title: "Fundamentals of Deep Learning",
    issuer: "NVIDIA Deep Learning Institute (DLI)",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    issueDate: "2024",
    credentialId: "NV-DLI-9482-901",
    verificationUrl: "https://courses.nvidia.com/certificates/",
    skills: ["PyTorch", "Computer Vision", "CNNs", "Transfer Learning"],
    description: "Hands-on implementation of deep neural networks, convolutional architectures, and GPU acceleration for computer vision.",
    badgeType: "Industry Certified",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "deeplearning-ai-spec",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI & Coursera",
    category: "ai-ml",
    categoryLabel: "AI & Machine Learning",
    issueDate: "2024",
    credentialId: "DLAI-SPEC-88231",
    verificationUrl: "https://coursera.org/verify/specialization/",
    skills: ["Neural Networks", "Hyperparameter Tuning", "Sequence Models", "Transformers"],
    description: "Comprehensive series covering foundational mathematics, backpropagation, CNNs, RNNs, and attention mechanisms.",
    badgeType: "Specialization",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "gcp-cloud-engineer",
    title: "Google Cloud Computing Foundations",
    issuer: "Google Cloud Skills Boost",
    category: "cloud",
    categoryLabel: "Cloud & Systems",
    issueDate: "2024",
    credentialId: "GCP-CSB-77491",
    verificationUrl: "https://www.cloudskillsboost.google/public_profiles/",
    skills: ["BigQuery", "Compute Engine", "Cloud Run", "IAM Security"],
    description: "Core cloud infrastructure, serverless application orchestration, scalable data warehousing, and IAM role architectures.",
    badgeType: "Industry Certified",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Foundations",
    issuer: "Amazon Web Services (AWS)",
    category: "cloud",
    categoryLabel: "Cloud & Systems",
    issueDate: "2023",
    credentialId: "AWS-CF-419082",
    verificationUrl: "https://aws.amazon.com/verification",
    skills: ["AWS EC2", "S3 Storage", "Lambda", "VPC Networking"],
    description: "Cloud computing fundamentals, AWS global infrastructure, serverless computing, and enterprise security compliance.",
    badgeType: "Industry Certified",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "meta-frontend-dev",
    title: "Meta Full-Stack Engineering & React",
    issuer: "Meta (Coursera)",
    category: "software",
    categoryLabel: "Software Engineering",
    issueDate: "2023",
    credentialId: "META-ENG-66129",
    verificationUrl: "https://coursera.org/verify/",
    skills: ["React 19", "TypeScript", "State Trees", "Performance Profiling"],
    description: "Production-grade frontend web engineering, asynchronous state trees, component design systems, and responsive UX.",
    badgeType: "Specialization",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "hackerrank-problem-solving",
    title: "Problem Solving (Advanced) Gold Badge",
    issuer: "HackerRank",
    category: "honors",
    categoryLabel: "Honors & Badges",
    issueDate: "2024",
    credentialId: "HR-GOLD-PS-591",
    verificationUrl: "https://www.hackerrank.com/certificates/",
    skills: ["Data Structures", "Dynamic Programming", "Graph Theory", "Algorithms"],
    description: "Top-tier algorithm assessment solving complex graph algorithms, tree decompositions, and asymptotic optimizations.",
    badgeType: "Gold Tier",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
    highlight: true,
  },
  {
    id: "ieee-technical-contributor",
    title: "IEEE Student Technical Lead & Speaker",
    issuer: "IEEE Student Branch",
    category: "honors",
    categoryLabel: "Honors & Badges",
    issueDate: "2023 - 2024",
    credentialId: "IEEE-SB-TEC-2024",
    verificationUrl: "https://ieee.org/",
    skills: ["Edge ML", "Embedded Systems", "Technical Mentorship", "Public Speaking"],
    description: "Recognized leadership in designing and conducting technical labs on Edge AI, microcontroller hardware, and neural acceleration.",
    badgeType: "Honorary Lead",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "hacker-rank-python",
    title: "Python (5-Star Gold Badge)",
    issuer: "HackerRank",
    category: "honors",
    categoryLabel: "Honors & Badges",
    issueDate: "2023",
    credentialId: "HR-PY5-1109",
    verificationUrl: "https://www.hackerrank.com/certificates/",
    skills: ["Python 3", "OOP", "Functional Programming", "Decorators"],
    description: "Demonstrated mastery of idiomatic Python, concurrent execution, decorators, and memory profiling.",
    badgeType: "Gold Tier",
    image: "https://images.unsplash.com/photo-1526374879895-57242f3cc9ce?q=80&w=600&auto=format&fit=crop",
  },
];
