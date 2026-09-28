export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  duration: string;
  stack: string[];
  description: string;
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  size: 'lead' | 'standard';
};

/**
 * Project data - focused on essential info for editorial presentation.
 * Cards are data-driven, making it easy to add new projects.
 * Mockup images removed to keep focus on the project narrative.
 */
export const projects: Project[] = [
  {
    id: 'sentinel-uav',
    title: 'Project Aegis — UAV Threat Vectoring',
    category: 'TACTICAL AVIONICS',
    year: '2026',
    role: 'Lead Systems Architect',
    duration: '12 weeks',
    stack: ['PyTorch', 'TensorRT', 'CUDA', 'C++20', 'ROS 2'],
    description:
      'Zero-latency optical telemetry engine on embedded Jetson nodes under extreme thermal limits. 94.2% mAP at 60 FPS without external uplink.',
    githubUrl: 'https://github.com/aswinbinu',
    demoUrl: 'https://github.com/aswinbinu',
    size: 'lead',
  },
  {
    id: 'spectral-anomaly',
    title: 'Subsurface Anomaly Detection Matrix',
    category: 'INFRASTRUCTURE AI',
    year: '2025',
    role: 'Core ML Researcher',
    duration: '8 weeks',
    stack: ['Python', 'JAX', 'OpenCV', 'FastAPI'],
    description:
      'Self-supervised autoencoders for multivariate sensor streams across transit corridors. Isolates structural micro-fractures in sub-millisecond intervals.',
    githubUrl: 'https://github.com/aswinbinu',
    demoUrl: 'https://github.com/aswinbinu',
    size: 'standard',
  },
  {
    id: 'quantized-edge',
    title: 'MicroQuant — 2-Bit Edge Engine',
    category: 'EDGE RUNTIME',
    year: '2025',
    role: 'Optimization Lead',
    duration: '6 weeks',
    stack: ['Rust', 'Embedded C', 'TinyML', 'ARM CMSIS'],
    description:
      'Deterministic neural runtime consuming <40mW on STM32 microcontrollers. 36-month battery lifespan for continuous seismic anomaly triage.',
    githubUrl: 'https://github.com/aswinbinu',
    demoUrl: 'https://github.com/aswinbinu',
    size: 'standard',
  },
];