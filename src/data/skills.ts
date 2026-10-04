export type SkillCategory = 'ai-ml' | 'robotics' | 'backend' | 'systems' | 'leadership';

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  categoryName: string;
  tag: string;
  proficiency: 'Expert' | 'Advanced' | 'Proficient';
  levelPercentage: number;
  highlight: string;
  description: string;
  keyWork: string[];
  connectedTech: string[];
}

export interface SkillClusterGroup {
  id: SkillCategory;
  title: string;
  shortTitle: string;
  subtitle: string;
  tagline: string;
  disciplineNumber: string;
  skills: SkillItem[];
}

export const skillCategories: { id: SkillCategory; label: string; shortLabel: string; icon: string }[] = [
  { id: 'ai-ml', label: 'AI & Deep Learning', shortLabel: 'AI & ML', icon: '⚡' },
  { id: 'robotics', label: 'Robotics & Embedded', shortLabel: 'Robotics', icon: '🤖' },
  { id: 'backend', label: 'Backend & Cloud', shortLabel: 'Backend', icon: '🌐' },
  { id: 'systems', label: 'System Architecture', shortLabel: 'Systems', icon: '⚙️' },
  { id: 'leadership', label: 'Community & Directive', shortLabel: 'Leadership', icon: '👥' },
];

export const skillsData: SkillItem[] = [
  // ── AI & DEEP LEARNING ──
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'ai-ml',
    categoryName: 'AI & Deep Learning',
    tag: 'CORE ML ENGINE',
    proficiency: 'Expert',
    levelPercentage: 96,
    highlight: 'Neural architectures & custom CUDA autograd layers',
    description:
      'Designing and fine-tuning deep convolutional and transformer backbones for real-time spatial vision and autonomous tracking under compute-constrained environments.',
    keyWork: ['Project Aegis Target Tracking', 'Variational Autoencoders', 'Custom Loss Functions'],
    connectedTech: ['NVIDIA TensorRT', 'CUDA & C++', 'OpenCV & Vision', 'Python'],
  },
  {
    id: 'tensorrt',
    name: 'NVIDIA TensorRT',
    category: 'ai-ml',
    categoryName: 'AI & Deep Learning',
    tag: 'INT8 ACCELERATION',
    proficiency: 'Expert',
    levelPercentage: 95,
    highlight: 'Sub-16ms inference @ 60 FPS on Jetson Orin micro-nodes',
    description:
      'Post-training INT8 quantization, layer fusion, dynamic batching, and serialized engine generation for zero-latency tactical target detection in air-gapped environments.',
    keyWork: ['Jetson Orin Quantization', 'INT8 Calibration Engines', 'Zero-copy Pipeline'],
    connectedTech: ['PyTorch', 'CUDA & C++', 'NVIDIA Jetson Systems', 'ROS 2 (Humble / Iron)'],
  },
  {
    id: 'cuda',
    name: 'CUDA & C++',
    category: 'ai-ml',
    categoryName: 'AI & Deep Learning',
    tag: 'GPU COMPUTE',
    proficiency: 'Advanced',
    levelPercentage: 88,
    highlight: 'Custom GPU kernels & zero-copy unified memory management',
    description:
      'Writing custom parallel GPU kernels for raw optical stream preprocessing, matrix convolutions, and fast tensor transformations bypassing CPU bottlenecking.',
    keyWork: ['Dual-Camera Sensor Fusion', 'Raw Optical Stream Unpacking', 'SIMD Parallelism'],
    connectedTech: ['NVIDIA TensorRT', 'PyTorch', 'Modern C++ (C++20)', 'OpenCV & Vision'],
  },
  {
    id: 'opencv',
    name: 'OpenCV & Vision',
    category: 'ai-ml',
    categoryName: 'AI & Deep Learning',
    tag: 'SPATIAL VISION',
    proficiency: 'Advanced',
    levelPercentage: 92,
    highlight: 'Real-time multi-camera frame extraction & optical flow',
    description:
      'Optical telemetry pipelines, homography estimation, bounding box spatial filtering, and high-framerate video matrix processing with OpenCV C++ & Python bindings.',
    keyWork: ['UAV Optical Telemetry', 'Homography Tracking', 'Spatial Bounding Filter'],
    connectedTech: ['Python', 'CUDA & C++', 'ROS 2 (Humble / Iron)', 'PyTorch'],
  },
  {
    id: 'jax',
    name: 'JAX & NumPy',
    category: 'ai-ml',
    categoryName: 'AI & Deep Learning',
    tag: 'FAST MATH',
    proficiency: 'Advanced',
    levelPercentage: 86,
    highlight: 'Vectorized auto-differentiation & multi-stream triage',
    description:
      'JIT-compiled multivariate array operations for parallel sensor signal anomaly triage, processing 128 concurrent vibration and acoustic channels in sub-millisecond intervals.',
    keyWork: ['Subsurface Anomaly Matrix', 'Vectorized Transformations', 'JIT Acceleration'],
    connectedTech: ['Python', 'FastAPI & AsyncIO', 'PyTorch'],
  },
  {
    id: 'scikit-xgboost',
    name: 'Scikit-Learn & XGBoost',
    category: 'ai-ml',
    categoryName: 'AI & Deep Learning',
    tag: 'ENSEMBLE MODELS',
    proficiency: 'Expert',
    levelPercentage: 94,
    highlight: 'High-precision gradient boosting for critical telemetry classification',
    description:
      'Structured tabular anomaly detection, cross-validation tuning, SHAP feature importance explainability, and hyperparameter optimization for robust signal classification.',
    keyWork: ['Telemetry Classification', 'SHAP Attribution', 'Hyperparameter Search'],
    connectedTech: ['Python', 'SHAP & Explainability', 'JAX & NumPy'],
  },
  {
    id: 'shap',
    name: 'SHAP & Explainability',
    category: 'ai-ml',
    categoryName: 'AI & Deep Learning',
    tag: 'EXPLAINABLE AI',
    proficiency: 'Advanced',
    levelPercentage: 88,
    highlight: 'Game-theoretic Shapley feature attribution for ML models',
    description:
      'Generating explainable AI insights into deep learning and ensemble predictions, ensuring transparency for critical system decision thresholds.',
    keyWork: ['Decision Attribution Analysis', 'Feature Sensitivity Plots'],
    connectedTech: ['Scikit-Learn & XGBoost', 'Python'],
  },

  // ── ROBOTICS & EMBEDDED ──
  {
    id: 'ros2',
    name: 'ROS 2 (Humble / Iron)',
    category: 'robotics',
    categoryName: 'Robotics & Autonomous Systems',
    tag: 'ROBOTIC NODES',
    proficiency: 'Expert',
    levelPercentage: 94,
    highlight: 'Zero-copy DDS transport & deterministic multi-node architecture',
    description:
      'Constructing robust robotic micro-node topologies, custom message definitions, TF2 transform trees, and real-time sensor fusion pub-sub pipelines.',
    keyWork: ['Target Tracking Node Topology', 'TF2 Coordinate Transformations', 'Zero-copy IPC'],
    connectedTech: ['Modern C++ (C++20)', 'Python', 'NVIDIA TensorRT', 'NVIDIA Jetson Systems'],
  },
  {
    id: 'cpp',
    name: 'Modern C++ (C++20)',
    category: 'robotics',
    categoryName: 'Robotics & Autonomous Systems',
    tag: 'LOW-LATENCY RUNTIME',
    proficiency: 'Expert',
    levelPercentage: 92,
    highlight: 'Zero-allocation memory layouts & deterministic concurrency',
    description:
      'Developing low-latency edge algorithms with RAII, move semantics, smart pointers, SIMD intrinsics, and hardware-near memory layouts avoiding heap fragmentation.',
    keyWork: ['Autonomous Target Engine', 'ROS 2 Custom Nodes', 'CUDA Kernel Wrappers'],
    connectedTech: ['CUDA & C++', 'ROS 2 (Humble / Iron)', 'Embedded C & ARM CMSIS'],
  },
  {
    id: 'jetson',
    name: 'NVIDIA Jetson Systems',
    category: 'robotics',
    categoryName: 'Robotics & Autonomous Systems',
    tag: 'EDGE AI COMPUTE',
    proficiency: 'Expert',
    levelPercentage: 93,
    highlight: 'Orin & Nano deployment locked within 25W TDP envelopes',
    description:
      'Board bring-up, Jetpack SDK flashing, hardware clock locking, thermal throttling optimization, and air-gapped field deployment for autonomous robotic platforms.',
    keyWork: ['Air-gapped UAV Micro-nodes', 'Power/Thermal Management', 'Jetpack SDK Optimization'],
    connectedTech: ['NVIDIA TensorRT', 'ROS 2 (Humble / Iron)', 'Linux & RTOS', 'Modern C++ (C++20)'],
  },
  {
    id: 'embedded-c',
    name: 'Embedded C & ARM CMSIS',
    category: 'robotics',
    categoryName: 'Robotics & Autonomous Systems',
    tag: 'BARE-METAL FIRMWARE',
    proficiency: 'Advanced',
    levelPercentage: 88,
    highlight: '<40mW ultra-low power runtime on STM32 microcontrollers',
    description:
      'Writing bare-metal drivers, interrupt service routines, UART/SPI/I2C sensor communication, and hand-optimized assembly kernels for TinyML on ARM Cortex-M.',
    keyWork: ['MicroQuant 2-Bit Runtime', 'STM32 Hardware Sleep Modes', 'Direct Register Programming'],
    connectedTech: ['Modern C++ (C++20)', 'Linux & RTOS', 'Rust Systems'],
  },
  {
    id: 'rust',
    name: 'Rust Systems',
    category: 'robotics',
    categoryName: 'Robotics & Autonomous Systems',
    tag: 'MEMORY-SAFE CODE',
    proficiency: 'Advanced',
    levelPercentage: 84,
    highlight: 'Safe concurrent pipelines & memory-efficient micro-services',
    description:
      'Building memory-safe telemetry decoders, high-speed serialization tools, and concurrency-safe event loops with zero garbage collection pauses.',
    keyWork: ['MicroQuant Edge Utilities', 'Safe Async Pipeline Tools'],
    connectedTech: ['Modern C++ (C++20)', 'Linux & RTOS'],
  },
  {
    id: 'linux-rtos',
    name: 'Linux & RTOS',
    category: 'robotics',
    categoryName: 'Robotics & Autonomous Systems',
    tag: 'OPERATING SYSTEMS',
    proficiency: 'Expert',
    levelPercentage: 91,
    highlight: 'Deterministic task scheduling & systemd daemon services',
    description:
      'Linux kernel tuning, PREEMPT_RT patch configuration, systemd service management, bash scripting, and air-gapped network configuration for embedded compute nodes.',
    keyWork: ['Air-gapped Field Deployments', 'Deterministic Task Scheduling', 'Automated Boot Daemons'],
    connectedTech: ['NVIDIA Jetson Systems', 'Embedded C & ARM CMSIS', 'ROS 2 (Humble / Iron)'],
  },

  // ── BACKEND & CLOUD ──
  {
    id: 'fastapi',
    name: 'FastAPI & AsyncIO',
    category: 'backend',
    categoryName: 'Backend & Cloud Infrastructure',
    tag: 'ASYNC WEBSOCKETS',
    proficiency: 'Expert',
    levelPercentage: 95,
    highlight: 'Sub-millisecond WebSocket data streams & Pydantic validation',
    description:
      'High-throughput asynchronous microservices, bi-directional WebSocket telemetry streaming, automated OpenAPI specs, and high-concurrency event loops.',
    keyWork: ['High-throughput Sensor Ingestion', 'WebSocket Telemetry Streams', 'REST APIs'],
    connectedTech: ['Python', 'PostgreSQL & Databases', 'Docker & Builds', 'Redis'],
  },
  {
    id: 'python',
    name: 'Python Systems & Cython',
    category: 'backend',
    categoryName: 'Backend & Cloud Infrastructure',
    tag: 'CORE RUNTIME',
    proficiency: 'Expert',
    levelPercentage: 98,
    highlight: 'Core architecture language across ML, backend & telemetry systems',
    description:
      'Deep architectural mastery of Python internals, C-extensions, Cython acceleration, multiprocessing, AsyncIO event handling, and numerical computing pipelines.',
    keyWork: ['ML Research Codebases', 'Backend Ingestion Engines', 'Cython Fast Math'],
    connectedTech: ['PyTorch', 'FastAPI & AsyncIO', 'JAX & NumPy', 'OpenCV & Vision'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL & Databases',
    category: 'backend',
    categoryName: 'Backend & Cloud Infrastructure',
    tag: 'TIME-SERIES DB',
    proficiency: 'Advanced',
    levelPercentage: 90,
    highlight: 'Relational data modeling, indexing & time-series logging',
    description:
      'Designing fault-tolerant relational database schemas, complex SQL aggregations, JSONB indexing, and time-series telemetry storage for high-frequency logs.',
    keyWork: ['Telemetry Event Archive', 'Query Optimization', 'Relational Schemas'],
    connectedTech: ['FastAPI & AsyncIO', 'Python', 'Firebase Cloud'],
  },
  {
    id: 'docker',
    name: 'Docker & Multi-Stage Builds',
    category: 'backend',
    categoryName: 'Backend & Cloud Infrastructure',
    tag: 'CONTAINERIZATION',
    proficiency: 'Advanced',
    levelPercentage: 89,
    highlight: 'Deterministic, reproducible environments for CUDA & edge nodes',
    description:
      'Creating minimal multi-stage Docker images with CUDA runtime support, cross-compilation toolchains, and automated CI containerized test environments.',
    keyWork: ['Containerized ML Deployments', 'Cross-compilation Images', 'Air-gapped Bundles'],
    connectedTech: ['Linux & RTOS', 'FastAPI & AsyncIO', 'Git & CI/CD Pipelines'],
  },
  {
    id: 'firebase',
    name: 'Firebase Cloud',
    category: 'backend',
    categoryName: 'Backend & Cloud Infrastructure',
    tag: 'REALTIME CLOUD',
    proficiency: 'Advanced',
    levelPercentage: 88,
    highlight: 'Realtime database, authentication & cloud function triggers',
    description:
      'Real-time data synchronization, cloud firestore indexing, serverless function deployments, and scalable user authentication management.',
    keyWork: ['Realtime Portals', 'Cloud Functions', 'Event Synchronization'],
    connectedTech: ['FastAPI & AsyncIO', 'React & TypeScript', 'PostgreSQL & Databases'],
  },
  {
    id: 'git-cicd',
    name: 'Git & CI/CD Pipelines',
    category: 'backend',
    categoryName: 'Backend & Cloud Infrastructure',
    tag: 'DEVSECOPS',
    proficiency: 'Expert',
    levelPercentage: 95,
    highlight: 'Deterministic branch strategies & automated build workflows',
    description:
      'Semantic versioning, complex merge resolution, GitHub Actions CI/CD matrix testing, automated linting, and continuous delivery pipelines.',
    keyWork: ['Automated Testing Workflows', 'Monorepo Management', 'Continuous Deployment'],
    connectedTech: ['Docker & Multi-Stage Builds', 'Linux & RTOS', 'Python'],
  },

  // ── SYSTEM ARCHITECTURE & FRONTEND ──
  {
    id: 'react-ts',
    name: 'React & TypeScript',
    category: 'systems',
    categoryName: 'System Architecture & Frontend',
    tag: 'MISSION CONTROL UI',
    proficiency: 'Advanced',
    levelPercentage: 92,
    highlight: 'Tactical interfaces, WebGL rendering & type-safe frontends',
    description:
      'Crafting high-speed mission control dashboards, WebGL visualizers, state management architectures, and component design systems with strict TypeScript types.',
    keyWork: ['Cosmic Portfolio Experience', 'Tactical Telemetry Dashboards', 'WebGL Canvases'],
    connectedTech: ['TypeScript', 'FastAPI & AsyncIO', 'Streamlit & Cloud Hosting'],
  },
  {
    id: 'streamlit-vercel',
    name: 'Streamlit & Cloud Hosting',
    category: 'systems',
    categoryName: 'System Architecture & Frontend',
    tag: 'RAPID PROTOTYPING',
    proficiency: 'Advanced',
    levelPercentage: 90,
    highlight: 'Rapid interactive telemetry dashboards & zero-config cloud deployments',
    description:
      'Building live interactive ML demonstration frontends, rapid parameter tuning dashboards, and automated edge cloud deployments on Vercel and Railway.',
    keyWork: ['Interactive AI Demonstrations', 'Railway Cloud Run', 'Vercel Edge Hosting'],
    connectedTech: ['Python', 'FastAPI & AsyncIO', 'React & TypeScript'],
  },
  {
    id: 'system-architecture',
    name: 'Fault-Tolerant Architecture',
    category: 'systems',
    categoryName: 'System Architecture & Frontend',
    tag: 'WATCHDOG & TRIAGE',
    proficiency: 'Expert',
    levelPercentage: 94,
    highlight: 'Self-healing watchdogs & sub-50ms deterministic crash recovery',
    description:
      'Architecting resilient distributed systems with graceful degradation, watchdog supervisor processes, air-gapped isolation, and comprehensive failure-mode mitigations.',
    keyWork: ['Watchdog Crash Recovery', 'Failure-Mode Analysis', 'Air-gapped System Boundaries'],
    connectedTech: ['Linux & RTOS', 'ROS 2 (Humble / Iron)', 'FastAPI & AsyncIO', 'Modern C++ (C++20)'],
  },

  // ── COMMUNITY & DIRECTIVE ──
  {
    id: 'ieee-chair',
    name: 'IEEE Student Branch Chair',
    category: 'leadership',
    categoryName: 'Community & Directive Leadership',
    tag: 'EXECUTIVE LEAD',
    proficiency: 'Expert',
    levelPercentage: 96,
    highlight: 'Spearheading technical initiatives & directing 450+ member chapter',
    description:
      'Directing branch strategy, mentoring student developers in robotics and edge ML, orchestrating national-level technical symposia, and building industry partnerships.',
    keyWork: ['Branch Executive Directive', 'National Technical Symposia', '450+ Member Community'],
    connectedTech: ['CSI Technical Lead', 'Fault-Tolerant Architecture'],
  },
  {
    id: 'csi-lead',
    name: 'CSI Technical Lead',
    category: 'leadership',
    categoryName: 'Community & Directive Leadership',
    tag: 'TECH WORKSHOPS',
    proficiency: 'Expert',
    levelPercentage: 94,
    highlight: 'Leading hands-on deep learning & TensorRT masterclasses',
    description:
      'Organizing hackathons, designing curriculum for edge AI workshops, delivering hands-on coding masterclasses on PyTorch, TensorRT, and embedded robotics.',
    keyWork: ['Hands-on ML Masterclasses', 'Hackathon Architecture', 'Technical Curriculum Design'],
    connectedTech: ['IEEE Student Branch Chair', 'PyTorch', 'NVIDIA TensorRT'],
  },
];

export const skillClusters: SkillClusterGroup[] = [
  {
    id: 'ai-ml',
    title: 'AI & Deep Learning',
    shortTitle: 'AI & ML',
    subtitle: 'Neural Architectures & Inference Acceleration',
    tagline: 'High-throughput perception models quantized for ultra-low latency execution.',
    disciplineNumber: '01',
    skills: skillsData.filter((s) => s.category === 'ai-ml'),
  },
  {
    id: 'robotics',
    title: 'Robotics & Embedded Systems',
    shortTitle: 'Robotics',
    subtitle: 'Autonomous Node Topologies & Bare-Metal Firmware',
    tagline: 'Deterministic real-time control loops, ROS 2 middleware, and low-power hardware.',
    disciplineNumber: '02',
    skills: skillsData.filter((s) => s.category === 'robotics'),
  },
  {
    id: 'backend',
    title: 'Backend & Cloud Pipelines',
    shortTitle: 'Backend',
    subtitle: 'Async APIs, Telemetry Ingestion & Databases',
    tagline: 'High-concurrency data streaming, time-series storage, and containerized microservices.',
    disciplineNumber: '03',
    skills: skillsData.filter((s) => s.category === 'backend'),
  },
  {
    id: 'systems',
    title: 'System Architecture & UI',
    shortTitle: 'Systems',
    subtitle: 'Fault-Tolerant Design & Mission Control Dashboards',
    tagline: 'Resilient system watchdogs, WebGL visualizers, and mission-critical telemetry UIs.',
    disciplineNumber: '04',
    skills: skillsData.filter((s) => s.category === 'systems'),
  },
  {
    id: 'leadership',
    title: 'Community & Directive Leadership',
    shortTitle: 'Leadership',
    subtitle: 'IEEE Chair & Technical Mentorship',
    tagline: 'Leading 450+ engineers, hosting ML masterclasses, and steering technical directives.',
    disciplineNumber: '05',
    skills: skillsData.filter((s) => s.category === 'leadership'),
  },
];