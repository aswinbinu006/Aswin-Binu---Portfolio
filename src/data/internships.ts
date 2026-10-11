import { Internship } from './types';

export const internships: Internship[] = [
  {
    id: 'ml-intern',
    role: 'Machine Learning Intern',
    company: 'Company Name',
    period: 'Jun 2024 – Present',
    duration: '5+ months',
    workMode: 'Remote',
    location: 'Bengaluru, India',
    teamSize: '4 members',
    isCurrent: true,
    shortDescription:
      'Working on machine learning models and data-driven solutions to solve real-world problems. Collaborating with a cross-functional team to develop and improve existing products.',
    bullets: [
      'Worked on machine learning models and data-driven solutions to solve real-world problems.',
      'Collaborated with a cross-functional team to develop and improve existing products.',
      'Researched and implemented new approaches to enhance model performance and system efficiency.',
    ],
    technologies: ['Python', 'Machine Learning', 'Data Analysis', 'FastAPI'],
    outcome:
      'Contributed to improved model performance and more reliable product features.',
    certificateUrl: '',
    companyWebsiteUrl: '',
    verification: 'placeholder',
  },
  {
    id: 'sde-intern',
    role: 'Software Development Intern',
    company: 'Company Name',
    period: 'Jan 2024 – May 2024',
    duration: '5 months',
    workMode: 'On-site',
    location: 'Nagpur, India',
    teamSize: '5 members',
    isCurrent: false,
    shortDescription:
      'Developed and maintained web applications, implemented new features, and resolved bugs. Worked closely with the development team to deliver user-focused solutions.',
    bullets: [
      'Developed and maintained responsive web applications, improving core feature velocity.',
      'Worked closely with the development team to deliver user-focused solutions and resolve bugs.',
      'Assisted in designing clean API integrations and optimizing database queries for production modules.',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    outcome:
      'Successfully shipped key modules on schedule with enhanced system performance.',
    certificateUrl: '',
    companyWebsiteUrl: '',
    verification: 'placeholder',
  },
];
