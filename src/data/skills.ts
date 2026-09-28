export type SkillCluster = 'Core' | 'AI' | 'Product' | 'Leadership';

export interface Skill {
  id: string;
  label: string;
  cluster: SkillCluster;
  connectedSkillIds: string[];
  // Normalized 2D coordinates (0-100%) for 4-quadrant constellation layout
  x: number;
  y: number;
}

export const skills: Skill[] = [
  // --- QUADRANT 1: CORE ARCHITECTURE (Top-Left) ---
  {
    id: 'git',
    label: 'Git',
    cluster: 'Core',
    connectedSkillIds: ['python', 'fastapi', 'react'],
    x: 12,
    y: 18,
  },
  {
    id: 'python',
    label: 'Python',
    cluster: 'Core',
    connectedSkillIds: ['git', 'fastapi', 'postgresql', 'react', 'tensorflow', 'streamlit'],
    x: 24,
    y: 24,
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    cluster: 'Core',
    connectedSkillIds: ['python', 'postgresql', 'railway'],
    x: 14,
    y: 38,
  },
  {
    id: 'postgresql',
    label: 'PostgreSQL',
    cluster: 'Core',
    connectedSkillIds: ['python', 'fastapi', 'firebase'],
    x: 28,
    y: 40,
  },
  {
    id: 'react',
    label: 'React',
    cluster: 'Core',
    connectedSkillIds: ['git', 'python', 'vercel'],
    x: 38,
    y: 22,
  },

  // --- QUADRANT 2: NEURAL & STATISTICAL (Top-Right) ---
  {
    id: 'tensorflow',
    label: 'TensorFlow',
    cluster: 'AI',
    connectedSkillIds: ['python', 'scikit-learn', 'xgboost'],
    x: 64,
    y: 20,
  },
  {
    id: 'scikit-learn',
    label: 'Scikit-learn',
    cluster: 'AI',
    connectedSkillIds: ['tensorflow', 'xgboost', 'shap', 'python'],
    x: 78,
    y: 26,
  },
  {
    id: 'xgboost',
    label: 'XGBoost',
    cluster: 'AI',
    connectedSkillIds: ['tensorflow', 'scikit-learn', 'shap'],
    x: 90,
    y: 18,
  },
  {
    id: 'shap',
    label: 'SHAP',
    cluster: 'AI',
    connectedSkillIds: ['scikit-learn', 'xgboost', 'csi'],
    x: 84,
    y: 38,
  },

  // --- QUADRANT 3: DEPLOYMENT & RUNTIME (Bottom-Left) ---
  {
    id: 'streamlit',
    label: 'Streamlit',
    cluster: 'Product',
    connectedSkillIds: ['python', 'railway', 'vercel'],
    x: 26,
    y: 64,
  },
  {
    id: 'railway',
    label: 'Railway',
    cluster: 'Product',
    connectedSkillIds: ['fastapi', 'streamlit', 'firebase'],
    x: 12,
    y: 74,
  },
  {
    id: 'firebase',
    label: 'Firebase',
    cluster: 'Product',
    connectedSkillIds: ['postgresql', 'railway', 'vercel'],
    x: 26,
    y: 84,
  },
  {
    id: 'vercel',
    label: 'Vercel',
    cluster: 'Product',
    connectedSkillIds: ['react', 'streamlit', 'firebase', 'ieee'],
    x: 40,
    y: 76,
  },

  // --- QUADRANT 4: COMMUNITY & DIRECTIVE (Bottom-Right) ---
  {
    id: 'ieee',
    label: 'IEEE',
    cluster: 'Leadership',
    connectedSkillIds: ['vercel', 'csi', 'event-management'],
    x: 66,
    y: 66,
  },
  {
    id: 'csi',
    label: 'CSI',
    cluster: 'Leadership',
    connectedSkillIds: ['shap', 'ieee', 'event-management'],
    x: 86,
    y: 66,
  },
  {
    id: 'event-management',
    label: 'Event Management',
    cluster: 'Leadership',
    connectedSkillIds: ['ieee', 'csi'],
    x: 76,
    y: 82,
  },
];

// Cluster metadata for 4-quadrant layout positioning
export interface ClusterMeta {
  name: SkillCluster;
  label: string;
  x: number; // percentage
  y: number; // percentage
}

export const clusterMetas: ClusterMeta[] = [
  { name: 'Core', label: '01 · CORE ARCHITECTURE', x: 8, y: 9 },
  { name: 'AI', label: '02 · NEURAL & STATISTICAL', x: 58, y: 9 },
  { name: 'Product', label: '03 · DEPLOYMENT & RUNTIME', x: 8, y: 55 },
  { name: 'Leadership', label: '04 · COMMUNITY & DIRECTIVE', x: 58, y: 55 },
];