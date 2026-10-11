import { Certificate } from './types';

export const certificates: Certificate[] = [
  {
    id: "google-ml-engineer",
    title: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    issueDate: "Jan 2025",
    description: "Completed an in-depth program on machine learning, model development and MLOps on Google Cloud.",
    skills: ["Machine Learning", "MLOps", "Google Cloud", "Model Deployment"],
    credentialId: "1234567890",
    credentialUrl: "https://www.credential.net",
    image: {
      src: "/assets/cert-google.png",
      alt: "Google Professional Machine Learning Engineer Certificate",
    },
    verification: "verified",
  },
  {
    id: "aws-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    issueDate: "Nov 2024",
    description: "Foundational understanding of AWS cloud services, security, architecture and pricing models.",
    skills: ["AWS Cloud", "Cloud Architecture", "Security", "Pricing Models"],
    credentialId: "AWS-98765432",
    credentialUrl: "https://aws.amazon.com/verification",
    image: {
      src: "/assets/cert-aws.png",
      alt: "AWS Certified Cloud Practitioner Certificate",
    },
    verification: "verified",
  },
  {
    id: "coursera-deep-learning",
    title: "Deep Learning Specialization",
    issuer: "Coursera (DeepLearning.AI)",
    issueDate: "Aug 2024",
    description: "Completed a series of courses on neural networks, deep learning and practical applications.",
    skills: ["Neural Networks", "Deep Learning", "TensorFlow", "Hyperparameter Tuning"],
    credentialId: "COURSERA-DL-456",
    credentialUrl: "https://coursera.org/verify",
    image: {
      src: "/assets/cert-coursera.png",
      alt: "Deep Learning Specialization Certificate",
    },
    verification: "verified",
  },
  {
    id: "meta-frontend-developer",
    title: "Front-End Developer Professional Certificate",
    issuer: "Meta",
    issueDate: "May 2024",
    description: "Gained hands-on experience in modern web development using HTML, CSS, JavaScript and React.",
    skills: ["HTML5", "CSS3", "JavaScript", "React"],
    credentialId: "META-FE-789",
    credentialUrl: "https://coursera.org/verify",
    image: {
      src: "/assets/cert-meta.png",
      alt: "Meta Front-End Developer Certificate",
    },
    verification: "verified",
  },
];
