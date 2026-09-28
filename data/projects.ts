export type Project = {
  id: string;
  index: string;
  category: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  duration: string;
  stack: string[];
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  size: "lead" | "standard";
  mockupType: "radar-hud" | "anomaly-matrix" | "neural-edge";
};

// PLACEHOLDER DATA: Authentic defense & critical-systems AI/ML projects for Aswin Binu
export const projects: Project[] = [
  {
    id: "sentinel-uav",
    index: "01",
    category: "TACTICAL AVIONICS",
    title: "Project Aegis — UAV Threat Vectoring",
    subtitle: "Real-time edge neural inference for GPS-denied recon",
    year: "2026",
    role: "Lead Systems Architect",
    duration: "12 weeks",
    stack: ["PyTorch", "TensorRT", "CUDA", "C++20", "ROS 2"],
    description:
      "Zero-latency optical telemetry engine on embedded Jetson nodes under extreme thermal limits. 94.2% mAP at 60 FPS without external uplink.",
    githubUrl: "https://github.com/aswinbinu",
    demoUrl: "https://github.com/aswinbinu",
    size: "lead",
    mockupType: "radar-hud",
  },
  {
    id: "spectral-anomaly",
    index: "02",
    category: "INFRASTRUCTURE AI",
    title: "Subsurface Anomaly Detection Matrix",
    subtitle: "Unsupervised pipeline for transit integrity monitoring",
    year: "2025",
    role: "Core ML Researcher",
    duration: "8 weeks",
    stack: ["Python", "JAX", "OpenCV", "FastAPI"],
    description:
      "Self-supervised autoencoders for multivariate sensor streams across transit corridors. Isolates structural micro-fractures in sub-millisecond intervals.",
    githubUrl: "https://github.com/aswinbinu",
    caseStudyUrl: "https://github.com/aswinbinu",
    size: "standard",
    mockupType: "anomaly-matrix",
  },
  {
    id: "quantized-edge",
    index: "03",
    category: "EDGE RUNTIME",
    title: "MicroQuant — 2-Bit Edge Engine",
    subtitle: "Low-power neural runtime for microcontroller telemetry",
    year: "2025",
    role: "Optimization Lead",
    duration: "6 weeks",
    stack: ["Rust", "Embedded C", "TinyML", "ARM CMSIS"],
    description:
      "Deterministic neural runtime consuming <40mW on STM32 microcontrollers. 36-month battery lifespan for continuous seismic anomaly triage.",
    githubUrl: "https://github.com/aswinbinu",
    demoUrl: "https://github.com/aswinbinu",
    size: "standard",
    mockupType: "neural-edge",
  },
];
