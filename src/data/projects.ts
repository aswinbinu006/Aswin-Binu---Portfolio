export type ProjectType = 'project' | 'lab-work';

export type Contributor = {
  name: string;
  role?: string;
  github?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  type: ProjectType;
  badgeType: 'Live System' | 'Agentic Engine' | 'Full Stack' | 'ML Benchmark' | 'Predictive Model' | 'GovTech AI' | 'Lab Work';
  year: string;
  role: string;
  duration: string;
  stack: string[];
  description: string;
  image: string;
  fullStory?: string;
  metrics?: { label: string; value: string }[];
  architectureHighlights?: string[];
  contributors?: Contributor[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  size: 'lead' | 'standard';
};

export const projects: Project[] = [
  // ==========================================
  // SECTION 1: FEATURED PROJECTS (8)
  // ==========================================
  {
    id: 'learnpath-ai',
    title: 'LearnPath AI — Developer Learning Platform',
    category: 'AI & ADAPTIVE EDTECH',
    type: 'project',
    badgeType: 'Live System',
    year: '2026',
    role: 'Lead Architect & ML Lead',
    duration: '10 weeks',
    stack: ['TypeScript', 'Python', 'FastAPI', 'React', 'Gemini AI', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop',
    description:
      'AI-driven developer career acceleration platform generating dynamic learning roadmaps, tracking verified competencies, and featuring an interactive Socratic AI pair programmer.',
    fullStory:
      'Architected a full-stack, AI-driven developer career acceleration platform. Generates dynamic customized multi-phase curriculum roadmaps tailored to learner baselines, provides an interactive high-speed conversational AI mentor powered by LLMs with session context, and enforces action-gated streak verification.',
    metrics: [
      { label: 'Roadmap Synthesis', value: 'Multi-Phase Custom' },
      { label: 'AI Mentor Latency', value: '<1.2s Streaming' },
      { label: 'Learning Verification', value: 'Action-Gated Streak' },
    ],
    architectureHighlights: [
      'Dynamic multi-phase roadmap synthesis with verified competency checkpoints',
      'Context-aware Socratic AI coding coach with persistent session memory',
      'Unified cross-page state synchronization with reactive glassmorphism telemetry',
    ],
    contributors: [
      { name: 'Aswin Binu', role: 'Lead Architect & ML Lead', github: 'https://github.com/aswinbinu006' },
      { name: 'Devashish', role: 'Full-Stack Contributor', github: 'https://github.com/Devashish-cloude' },
    ],
    githubUrl: 'https://github.com/aswinbinu006/LearnPath-AI-',
    demoUrl: 'https://learnpath-ai-xhdw.onrender.com',
    size: 'lead',
  },
  {
    id: 'prashikshan',
    title: 'Prashikshan — AI Internship Platform',
    category: 'AI PLATFORM & GOVTECH',
    type: 'project',
    badgeType: 'GovTech AI',
    year: '2025',
    role: 'Core Systems Architect',
    duration: '8 weeks',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'AI Scoring', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop',
    description:
      'AI-powered internship management platform connecting students, colleges, and enterprises through verified APAAR/ABC IDs, automated AI resume scoring, and NEP credit mapping.',
    fullStory:
      'Engineered an enterprise internship and academic credit ecosystem aligned with NEP 2020 guidelines. Automates nationwide student internship applications with APAAR identity verification, AI resume parsing, candidate ATS scoring, and corporate meeting rooms.',
    metrics: [
      { label: 'Identity Verification', value: '100% APAAR/ABC ID' },
      { label: 'Resume ATS Engine', value: 'Automated AI Scoring' },
      { label: 'Credit Mapping', value: 'NEP 2020 Aligned' },
    ],
    architectureHighlights: [
      'Automated semantic resume scoring matched against live industry job requisitions',
      'Tamper-evident APAAR/ABC national student ID validation pipeline',
      'Multi-role portal supporting Students, Institutional Coordinators, and Enterprise HRs',
    ],
    contributors: [
      { name: 'Aswin Binu', role: 'Core Systems & Backend', github: 'https://github.com/aswinbinu006' },
      { name: 'Prashikshan Team', role: 'Frontend & Verification Operations' },
    ],
    githubUrl: 'https://github.com/aswinbinu006/Prashikshan',
    size: 'standard',
  },
  {
    id: 'finsight-ai',
    title: 'FinSight AI — Institutional Intelligence',
    category: 'FINTECH & PREDICTIVE AI',
    type: 'project',
    badgeType: 'Agentic Engine',
    year: '2026',
    role: 'AI & Backend Engineer',
    duration: '6 weeks',
    stack: ['Python', 'FastAPI', 'React', 'Firebase', 'Gemini AI', 'Pandas'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
    description:
      'Institutional-grade financial intelligence platform powered by Gemini AI and FastAPI, providing automated predictive analytics, risk modeling, and market intelligence.',
    fullStory:
      'Engineered a microservices-based financial intelligence engine powered by Gemini AI and FastAPI. Streams real-time financial telemetry, performs sentiment analysis on regulatory filings, and executes portfolio variance and risk simulations.',
    metrics: [
      { label: 'API Execution', value: 'FastAPI Microservice' },
      { label: 'Intelligence Core', value: 'Gemini AI LLM' },
      { label: 'Authentication', value: 'Firebase JWT Auth' },
    ],
    architectureHighlights: [
      'High-throughput asynchronous FastAPI backend integrated with Gemini AI',
      'Firebase cloud authentication and real-time document storage integration',
      'Interactive reactive financial dashboard with live market indicator charts',
    ],
    contributors: [
      { name: 'Aswin Binu', role: 'AI & Backend Engineer', github: 'https://github.com/aswinbinu006' },
      { name: 'FinSight AI Team', role: 'Frontend & Ingestion Pipeline' },
    ],
    githubUrl: 'https://github.com/aswinbinu006/FinSight-AI',
    size: 'standard',
  },
  {
    id: 'civicsetu',
    title: 'CivicSetu — Smart Civic Issue Management',
    category: 'CIVIC TECH & INFRASTRUCTURE',
    type: 'project',
    badgeType: 'Full Stack',
    year: '2026',
    role: 'Full-Stack Developer',
    duration: '7 weeks',
    stack: ['React', 'Flutter', 'Firebase', 'Node.js', 'Geo-Tagging'],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop',
    description:
      'Full-stack civic issue reporting and infrastructure management system with mobile citizen app and administrative web portal for municipality departments.',
    fullStory:
      'Constructed a comprehensive civic infrastructure management platform bridging citizens and municipal authorities. Enables citizens to report municipal breakdowns with geolocation and photo attachments, while giving city departments dispatch workflows and SLA resolution tracking.',
    metrics: [
      { label: 'Platform Scope', value: 'Mobile App + Web Portal' },
      { label: 'Geo-Verification', value: 'Precise GPS Pinning' },
      { label: 'Incident Tracking', value: 'Real-Time SLA Pipeline' },
    ],
    architectureHighlights: [
      'Citizen mobile app built with Flutter and administrative management portal in React',
      'Firebase cloud backend for real-time issue dispatching and photo storage',
      'Automated status notification pipelines for reporting citizens',
    ],
    contributors: [
      { name: 'Aswin Binu', role: 'Full-Stack Architecture & API', github: 'https://github.com/aswinbinu006' },
      { name: 'CivicSetu Team', role: 'Mobile Development & Municipality Ops' },
    ],
    githubUrl: 'https://github.com/aswinbinu006/CivicSetu',
    size: 'standard',
  },
  {
    id: 'career-pilot',
    title: 'CareerPilot AI — Multi-Agent Career Navigator',
    category: 'CAREER INTELLIGENCE',
    type: 'project',
    badgeType: 'Agentic Engine',
    year: '2025',
    role: 'Lead AI Engineer & Architect',
    duration: '8 weeks',
    stack: ['LangGraph', 'Groq Llama-3.3-70B', 'FastAPI', 'React + Vite', 'MCP Server', 'Tavily'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop',
    description:
      'Agentic, multi-stream career navigation platform using LangGraph, Groq Llama-3.3-70B, and Model Context Protocol (MCP) to synthesize verified 4-year undergraduate roadmaps.',
    fullStory:
      'Engineered an orchestrated multi-agent career strategy platform for high school graduates. Built with LangGraph, Groq Llama-3.3-70B, and a custom Model Context Protocol (MCP) server. Features specialized agents (Planner, Aptitude, Pathway, Guidance, Mentor) operating over a shared blackboard state to query live college databases and generate actionable 4-year career roadmaps.',
    metrics: [
      { label: 'Orchestration', value: 'LangGraph State Machine' },
      { label: 'LLM Engine', value: 'Groq Llama-3.3-70B' },
      { label: 'Tool Protocol', value: 'TinyMCP Server' },
    ],
    architectureHighlights: [
      'Multi-agent orchestration over shared Blackboard state with conditional fallback routing',
      'TinyMCPServer exposing verified college and exam lookup tools with Tavily grounding',
      'Conversational AI mentor with persistent session memory and step-by-step roadmap generation',
    ],
    githubUrl: 'https://github.com/aswinbinu006/CareerPilot',
    demoUrl: 'https://careerpilot-006.vercel.app/',
    size: 'lead',
  },
  {
    id: 'smart-scholars',
    title: 'SmartScholars — Grant & Scholarship Engine',
    category: 'DATA SCIENCE & EDTECH',
    type: 'project',
    badgeType: 'Predictive Model',
    year: '2025',
    role: 'ML & Backend Developer',
    duration: '5 weeks',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'Flask', 'Data Mining'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop',
    description:
      'Intelligent scholarship recommendation engine utilizing eligibility vector mapping, automated qualification scoring, and student grant matching.',
    fullStory:
      'Constructed a data-driven scholarship discovery portal that maps student demographic, academic, and economic criteria against institutional and private grant schemes, eliminating search friction for underprivileged students.',
    metrics: [
      { label: 'Scholarships Indexed', value: '500+ Schemes' },
      { label: 'Matching Accuracy', value: '95.2%' },
      { label: 'Search Latency', value: '<400ms' },
    ],
    architectureHighlights: [
      'Multi-variable vector matching algorithm based on weighted eligibility constraints',
      'Automated scraper and data ingestion pipeline for live scholarship deadlines',
      'Lightweight Python/Flask API with cached query results',
    ],
    githubUrl: 'https://github.com/aswinbinu006/SmartScholars',
    size: 'standard',
  },
  {
    id: 'model-comparison',
    title: 'ML Model Optimization & Comparison',
    category: 'APPLIED MACHINE LEARNING',
    type: 'project',
    badgeType: 'ML Benchmark',
    year: '2025',
    role: 'Machine Learning Engineer',
    duration: '4 weeks',
    stack: ['Python', 'Scikit-Learn', 'Linear Regression', 'Pandas', 'Matplotlib', 'Joblib'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop',
    description:
      'Rigorous ML evaluation pipeline analyzing feature engineering, data scaling, and multi-model regression benchmarking on the California Housing dataset.',
    fullStory:
      'Engineered an end-to-end regression evaluation pipeline on the California Housing dataset (1990 U.S. Census). Implemented comprehensive data preprocessing, feature scaling, model training, residual error analysis, and comparative benchmark chart generation.',
    metrics: [
      { label: 'Dataset', value: 'California Housing (Census)' },
      { label: 'Target Variable', value: 'Median House Value' },
      { label: 'Artifact Output', value: 'Joblib Model (.pkl)' },
    ],
    architectureHighlights: [
      'Standardized feature scaling and exploratory data distribution analysis',
      'Comparative RMSE and R² evaluation metrics across candidate algorithms',
      'Automated generation of actual-vs-predicted scatter plots and residual diagnostic curves',
    ],
    githubUrl: 'https://github.com/aswinbinu006/Model-Comparison',
    demoUrl: 'https://github.com/aswinbinu006/Model-Comparison',
    size: 'standard',
  },
  {
    id: 'california-housing-ml',
    title: 'California House Price Prediction',
    category: 'PREDICTIVE MODELING',
    type: 'project',
    badgeType: 'Predictive Model',
    year: '2025',
    role: 'Data Scientist / ML Developer',
    duration: '3 weeks',
    stack: ['Python 3.8+', 'Scikit-Learn', 'Jupyter Notebook', 'NumPy', 'Matplotlib'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
    description:
      'Supervised regression pipeline modeling median house values based on neighborhood demographic metrics, income levels, and geospatial coordinates.',
    fullStory:
      'Implemented a complete supervised linear regression machine learning pipeline predicting block group housing values in California. Walked through full lifecycle: exploratory data analysis, correlation heatmaps, feature engineering, and model persistence.',
    metrics: [
      { label: 'Supervised Type', value: 'Linear Regression' },
      { label: 'Features Evaluated', value: '8 Block Group Metrics' },
      { label: 'Notebook Pipeline', value: 'End-to-End EDA & Model' },
    ],
    architectureHighlights: [
      'Exhaustive correlation analysis of median income and geospatial coordinates against housing value',
      'Preprocessing pipeline with train/test splits and standard normalization',
      'Serialized model export with validation metrics documentation',
    ],
    githubUrl: 'https://github.com/aswinbinu006/California-House-Price-Prediction-Model',
    demoUrl: 'https://github.com/aswinbinu006/California-House-Price-Prediction-Model',
    size: 'standard',
  },

  // ==========================================
  // SECTION 2: SYSTEMS & CORE CS LAB WORK (9)
  // ==========================================
  {
    id: 'compiler-construction-lab',
    title: 'Compiler Construction Laboratory',
    category: 'COMPILER DESIGN & AUTOMATA',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2026',
    role: 'Systems Programmer',
    duration: 'Semester Course',
    stack: ['C', 'Lex / Flex', 'Yacc / Bison', 'AST', 'Symbol Tables'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    description:
      'Hands-on compiler architecture laboratory implementing lexical tokenizers, LALR(1) context-free grammar parsers, symbol table managers, and AST generation.',
    fullStory:
      'Constructed modular compiler frontend stages in C using Lex and Yacc. Implemented regular-expression tokenizers, syntax-directed translation grammar rules, symbol tables for variable scoping, and three-address intermediate code representations.',
    metrics: [
      { label: 'Lexical Analysis', value: 'Lex / Flex Regular Expressions' },
      { label: 'Parser Model', value: 'LALR(1) Yacc Grammars' },
      { label: 'Intermediate Code', value: 'Three-Address Code (TAC)' },
    ],
    architectureHighlights: [
      'Lexical scanner recognizing identifiers, operators, keywords, and literals with error handling',
      'Context-free grammar specification with operator precedence and associativity rules in Yacc',
      'Hierarchical symbol table data structure for scope-level identifier resolution',
    ],
    githubUrl: 'https://github.com/aswinbinu006/Compiler-Construction-Lab',
    size: 'standard',
  },
  {
    id: 'os-lab-sem4',
    title: 'Operating Systems Laboratory',
    category: 'SYSTEMS & KERNEL PROGRAMMING',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2026',
    role: 'Systems Programmer',
    duration: 'Semester IV',
    stack: ['C', 'Bash Shell', 'Ubuntu Linux', 'GCC', 'POSIX APIs'],
    image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop',
    description:
      '10 practical OS implementations on Ubuntu Linux: process creation (fork), CPU scheduling (FCFS, SJF, Priority), Banker’s deadlock safety, and FIFO page replacement.',
    fullStory:
      'Comprehensive hands-on implementation of core operating systems algorithms in C and Bash on Ubuntu Linux. Covers process management (fork, wait, exec), CPU scheduling algorithms (FCFS, SJF, Priority), deadlock detection via Banker’s algorithm, and FIFO page replacement simulations.',
    metrics: [
      { label: 'Experiments', value: '10 Core OS Modules' },
      { label: 'Environment', value: 'Ubuntu Linux / GCC' },
      { label: 'Algorithms', value: 'CPU, Deadlock & Paging' },
    ],
    architectureHighlights: [
      'Process lifecycle control and parent-child hierarchy coordination using fork() and wait()',
      'Comparative CPU scheduling implementations (FCFS, Non-preemptive SJF, Priority)',
      'Banker’s deadlock avoidance state matrix validation and FIFO memory page replacement',
    ],
    githubUrl: 'https://github.com/aswinbinu006/OS-LAB-Sem-4-24070521222',
    size: 'standard',
  },
  {
    id: 'daa-lab',
    title: 'Design and Analysis of Algorithms',
    category: 'ALGORITHMS & COMPLEXITY',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2025',
    role: 'Algorithms Researcher',
    duration: 'Semester Course',
    stack: ['C', 'Dynamic Programming', 'Graph Theory', 'Greedy Methods', 'Divide & Conquer'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1000&auto=format&fit=crop',
    description:
      'Algorithmic complexity evaluation, greedy methods, dynamic programming, divide-and-conquer, and graph algorithms (Dijkstra, Kruskal, Prim, Knapsack).',
    fullStory:
      'Implemented foundational algorithm paradigms in C to evaluate empirical execution times versus theoretical asymptotic Big-O complexities. Experiments include divide-and-conquer sorting, greedy minimum spanning trees (Kruskal, Prim), and dynamic programming (0/1 Knapsack, LCS).',
    metrics: [
      { label: 'Complexity Analysis', value: 'Empirical vs Big-O' },
      { label: 'Graph Algorithms', value: 'Dijkstra, Prim, Kruskal' },
      { label: 'Optimization', value: 'Dynamic Programming' },
    ],
    architectureHighlights: [
      'Dynamic programming state-transition matrices for optimization problems',
      'Greedy graph traversal algorithms with adjacency lists and disjoint-set union (DSU)',
      'Divide-and-conquer recurrence relation benchmarking',
    ],
    githubUrl: 'https://github.com/aswinbinu006/Design-and-Analysis-of-Algorithms-',
    size: 'standard',
  },
  {
    id: 'data-structures-lab',
    title: 'Data Structures Laboratory',
    category: 'DATA STRUCTURES & MEMORY',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2025',
    role: 'Software Developer',
    duration: 'Semester Course',
    stack: ['C', 'Pointers', 'AVL Trees', 'Binary Heaps', 'Hash Tables'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    description:
      '13 rigorous data structure experiments implemented with manual memory management in C: circular linked lists, stacks, queues, binary trees, heaps, and hashing.',
    fullStory:
      'Built custom implementations of linear and non-linear data structures in C with explicit pointer and memory management. Spans 13 laboratory experiments covering singly/doubly circular linked lists, expression parsing with stacks, priority queues with binary heaps, and hash collision resolution.',
    metrics: [
      { label: 'Laboratory Units', value: '13 Lab Experiments' },
      { label: 'Memory Paradigm', value: 'Manual malloc/free' },
      { label: 'Core Structures', value: 'Lists, Trees, Heaps, Maps' },
    ],
    architectureHighlights: [
      'Pointer-based linked structures avoiding memory leaks and dangling references',
      'Tree traversal algorithms (Inorder, Preorder, Postorder) and heapify operations',
      'Stack-based infix-to-postfix conversion and postfix expression evaluator',
    ],
    githubUrl: 'https://github.com/aswinbinu006/Data-Structure-Aswin-Binu-24070521222-',
    size: 'standard',
  },
  {
    id: 'dbms-lab',
    title: 'Database Management Systems Laboratory',
    category: 'DATABASE & RELATIONAL DESIGN',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2026',
    role: 'Database Engineer',
    duration: 'Semester Course',
    stack: ['SQL', 'Relational Schema', 'Normalization', 'Triggers', 'Stored Procedures'],
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1000&auto=format&fit=crop',
    description:
      'Relational database schema modeling, ER-to-relational mapping, 3NF/BCNF normalization, complex joins, stored procedures, and triggers.',
    fullStory:
      'Hands-on relational database laboratory covering conceptual ER modeling, table schema creation with primary/foreign keys, BCNF normalization, multi-table joins, subqueries, view definitions, stored procedures, and automated trigger workflows.',
    metrics: [
      { label: 'Query Language', value: 'Standard SQL (DDL/DML/DCL)' },
      { label: 'Schema Design', value: '3NF / BCNF Normalization' },
      { label: 'Automation', value: 'Procedures & Triggers' },
    ],
    architectureHighlights: [
      'Relational normalization eliminating insertion, deletion, and update anomalies',
      'Complex query optimization using indexing, nested subqueries, and aggregation',
      'Automated integrity enforcement via database triggers and stored functions',
    ],
    githubUrl: 'https://github.com/aswinbinu006/DBMS_Lab---24070521222',
    size: 'standard',
  },
  {
    id: 'mes-assembly-lab',
    title: 'Microprocessors & Embedded Systems',
    category: 'ASSEMBLY & COMPUTER ARCHITECTURE',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2026',
    role: 'Embedded Systems Programmer',
    duration: 'Assignment Suite',
    stack: ['Assembly (8086/ARM)', 'Registers', 'Memory Segmentation', 'BIOS Interrupts'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    description:
      'Low-level assembly language assignment suite targeting 8086 microprocessor registers, bitwise ALU operations, memory addressing modes, and hardware interrupts.',
    fullStory:
      'Practical low-level microprocessor programming suite writing raw assembly language for 8086 architectures. Implements multi-precision arithmetic, string manipulation routines, memory segment register manipulation, and BIOS interrupt calls.',
    metrics: [
      { label: 'Architecture', value: '8086 Microprocessor' },
      { label: 'Instruction Set', value: 'x86 Assembly' },
      { label: 'Scope', value: 'Arithmetic, Memory & Interrupts' },
    ],
    architectureHighlights: [
      'Direct register addressing and segmented memory offset computation',
      'Arithmetic, bitwise shifting, and loop-based control structures in assembly',
      'Low-level hardware interrupt handling and stack pointer register manipulation',
    ],
    githubUrl: 'https://github.com/aswinbinu006/MES-Assignment-24070521222-Aswin-Binu',
    size: 'standard',
  },
  {
    id: 'java-flexi-credit',
    title: 'Object-Oriented Programming in Java',
    category: 'OBJECT-ORIENTED ARCHITECTURE',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2026',
    role: 'Java Developer',
    duration: 'Semester Course',
    stack: ['Java', 'OOP Principles', 'Collection Framework', 'Multithreading', 'Interfaces'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop',
    description:
      'OOP architecture suite in Java covering class inheritance hierarchies, encapsulation, abstract classes, method overloading/overriding, collection frameworks, and multithreading.',
    fullStory:
      'Deep dive into Object-Oriented Software Engineering with Java. Implements core OOP principles (inheritance, encapsulation, polymorphism, abstraction), Java Collection Framework (LinkedList, Stack), wrapper classes, and multi-threaded synchronization routines.',
    metrics: [
      { label: 'Language', value: 'Java SE (OOP)' },
      { label: 'Core Paradigms', value: 'Inheritance, Polymorphism, Abstract' },
      { label: 'Concurrency', value: 'Java Multithreading' },
    ],
    architectureHighlights: [
      'Single-level and multilevel inheritance models with abstract class contracts',
      'Data structure manipulation using Java Collection Framework',
      'Thread lifecycle management and synchronized concurrent task execution',
    ],
    githubUrl: 'https://github.com/aswinbinu006/Java-Flexi-Credit--24070521222',
    size: 'standard',
  },
  {
    id: 'javascript-lab',
    title: 'JavaScript & Web Technologies Lab',
    category: 'CLIENT-SIDE SCRIPTING',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2026',
    role: 'Frontend Developer',
    duration: 'Semester Course',
    stack: ['JavaScript (ES6+)', 'HTML5', 'DOM APIs', 'Event Loop', 'Form Validation'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop',
    description:
      'Client-side web development experiments and practical case studies focusing on asynchronous event handling, dynamic DOM manipulation, and interactive web apps.',
    fullStory:
      'Comprehensive laboratory experiments and case studies in client-side web technologies. Covers modern ES6+ JavaScript features, dynamic DOM traversal and element creation, form validation pipelines, local storage persistence, and event delegation.',
    metrics: [
      { label: 'Technology', value: 'JavaScript ES6+ & HTML5' },
      { label: 'Focus Area', value: 'DOM APIs & Event Systems' },
      { label: 'Deliverables', value: 'Experiments + Case Studies' },
    ],
    architectureHighlights: [
      'Dynamic DOM element manipulation with event listener delegation',
      'Asynchronous workflows, callback handling, and modern ES6 syntax',
      'End-to-end practical client-side web application case studies',
    ],
    githubUrl: 'https://github.com/aswinbinu006/JavaScript_Lab',
    size: 'standard',
  },
  {
    id: 'pps-python-lab',
    title: 'Programming & Problem Solving in Python',
    category: 'PYTHON & COMPUTATIONAL LOGIC',
    type: 'lab-work',
    badgeType: 'Lab Work',
    year: '2025',
    role: 'Python Developer',
    duration: '26 Practical Modules',
    stack: ['Python 3', 'Algorithms', 'Matrix Operations', 'Data Structures', 'String Parsing'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
    description:
      '26 practical algorithmic modules implementing computational algorithms, mathematical transformations, recursive sequences, and data structures in Python.',
    fullStory:
      'Complete 26-module problem solving curriculum in Python 3. Implements mathematical algorithms, prime sieves, matrix manipulations, recursive functions, text tokenization, and search algorithms.',
    metrics: [
      { label: 'Modules', value: '26 Problem Sets' },
      { label: 'Language', value: 'Python 3' },
      { label: 'Scope', value: 'Math, Recursion & Data' },
    ],
    architectureHighlights: [
      'Modular functional decomposition across 26 distinct computational problem sets',
      'Recursive algorithmic implementations and mathematical series evaluations',
      'Custom list, dictionary, and multidimensional matrix transformations',
    ],
    githubUrl: 'https://github.com/aswinbinu006/PPS-Aswin-Binu-24070521222-',
    size: 'standard',
  },
];