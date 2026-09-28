export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  role: string;
  duration: string;
  stack: string[];
  description: string;
  image: string;
  fullStory?: string;
  metrics?: { label: string; value: string }[];
  architectureHighlights?: string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;
  size: 'lead' | 'standard';
};

export const projects: Project[] = [
  {
    id: 'sentinel-uav',
    title: 'Project Aegis — UAV Threat Vectoring',
    category: 'TACTICAL AVIONICS',
    year: '2026',
    role: 'Lead Systems Architect',
    duration: '12 weeks',
    stack: ['PyTorch', 'TensorRT', 'CUDA', 'C++20', 'ROS 2'],
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1000&auto=format&fit=crop',
    description:
      'Zero-latency optical telemetry engine on embedded Jetson nodes under extreme thermal limits. 94.2% mAP at 60 FPS without external uplink.',
    fullStory:
      'Architected an autonomous tactical target tracking pipeline running onboard NVIDIA Jetson Orin micro-nodes. The system operates entirely air-gapped in contested electronic warfare environments, processing raw dual-band optical streams with TensorRT INT8 quantization to achieve sub-16ms inference latency at 60 frames per second.',
    metrics: [
      { label: 'Inference Latency', value: '<16ms @ 60 FPS' },
      { label: 'Accuracy', value: '94.2% mAP50' },
      { label: 'Thermal Envelope', value: '<25W TDP Locked' },
    ],
    architectureHighlights: [
      'Dual-camera sensor fusion pipeline with hardware-accelerated CUDA kernels',
      'Zero-copy memory transport between ROS 2 micro-nodes and TensorRT engine',
      'Self-healing watchdog process with sub-50ms deterministic crash recovery',
    ],
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
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    description:
      'Self-supervised autoencoders for multivariate sensor streams across transit corridors. Isolates structural micro-fractures in sub-millisecond intervals.',
    fullStory:
      'Designed and deployed self-supervised variational autoencoders to continuously analyze high-frequency acoustic and vibrational telemetry from transit railway infrastructure. The system automatically filters out ambient environmental noise to detect early-stage mechanical fatigue and subterranean structural anomalies before catastrophic failure occurs.',
    metrics: [
      { label: 'Triage Speed', value: '0.8ms / Sensor Packet' },
      { label: 'False Alarm Rate', value: '<0.02%' },
      { label: 'Sensor Channels', value: '128 Concurrently' },
    ],
    architectureHighlights: [
      'JAX-compiled vector transformations for parallelized multi-stream processing',
      'Adaptive dynamic thresholding for environmental noise rejection',
      'High-throughput asynchronous telemetry streaming via FastAPI & WebSockets',
    ],
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
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
    description:
      'Deterministic neural runtime consuming <40mW on STM32 microcontrollers. 36-month battery lifespan for continuous seismic anomaly triage.',
    fullStory:
      'Engineered an ultra-low-power, bare-metal neural network runtime customized for ARM Cortex-M microcontrollers. Utilizing extreme 2-bit weight quantization and custom fixed-point SIMD instructions, the runtime enables real-time anomaly detection while consuming under 40 milliwatts, allowing remote seismic monitoring devices to run autonomously for years without battery replacement.',
    metrics: [
      { label: 'Power Draw', value: '<40mW Continuous' },
      { label: 'Model Footprint', value: '18KB SRAM / 64KB Flash' },
      { label: 'Autonomous Life', value: '36+ Months on Battery' },
    ],
    architectureHighlights: [
      'Zero-allocation memory layout avoiding heap fragmentation on bare-metal systems',
      'Hand-crafted ARM CMSIS assembly kernels for 2-bit matrix-vector multiplication',
      'Hardware-level low-power sleep state integration with interrupt-driven wakeup',
    ],
    githubUrl: 'https://github.com/aswinbinu',
    demoUrl: 'https://github.com/aswinbinu',
    size: 'standard',
  },
];