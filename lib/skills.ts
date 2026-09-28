export type SkillCluster = "Core" | "AI" | "Product" | "Leadership";

export interface Skill {
  id: string;
  label: string;
  cluster: SkillCluster;
  connectedSkillIds: string[];
  // Normalized 2D coordinates (0-100%) for asymmetrical editorial constellation layout
  x: number;
  y: number;
}

export const skills: Skill[] = [
  // --- CORE CLUSTER (Top-Left / Mid-Left) ---
  {
    id: "python",
    label: "Python",
    cluster: "Core",
    connectedSkillIds: ["fastapi", "postgresql", "tensorflow", "scikit-learn", "streamlit", "git"],
    x: 22,
    y: 28,
  },
  {
    id: "fastapi",
    label: "FastAPI",
    cluster: "Core",
    connectedSkillIds: ["python", "postgresql", "react", "railway"],
    x: 14,
    y: 44,
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    cluster: "Core",
    connectedSkillIds: ["python", "fastapi", "railway"],
    x: 28,
    y: 46,
  },
  {
    id: "git",
    label: "Git",
    cluster: "Core",
    connectedSkillIds: ["python", "react", "railway"],
    x: 10,
    y: 18,
  },
  {
    id: "react",
    label: "React",
    cluster: "Core",
    connectedSkillIds: ["git", "fastapi", "vercel", "firebase"],
    x: 36,
    y: 22,
  },

  // --- AI CLUSTER (Center-Right / Upper-Right) ---
  {
    id: "tensorflow",
    label: "TensorFlow",
    cluster: "AI",
    connectedSkillIds: ["python", "scikit-learn", "xgboost", "shap"],
    x: 62,
    y: 18,
  },
  {
    id: "scikit-learn",
    label: "Scikit-learn",
    cluster: "AI",
    connectedSkillIds: ["python", "tensorflow", "xgboost", "shap", "streamlit"],
    x: 74,
    y: 30,
  },
  {
    id: "xgboost",
    label: "XGBoost",
    cluster: "AI",
    connectedSkillIds: ["tensorflow", "scikit-learn", "shap", "python"],
    x: 88,
    y: 24,
  },
  {
    id: "shap",
    label: "SHAP",
    cluster: "AI",
    connectedSkillIds: ["xgboost", "scikit-learn", "tensorflow"],
    x: 82,
    y: 42,
  },

  // --- PRODUCT CLUSTER (Mid-Center / Lower-Center) ---
  {
    id: "streamlit",
    label: "Streamlit",
    cluster: "Product",
    connectedSkillIds: ["python", "scikit-learn", "vercel", "event-management"],
    x: 48,
    y: 50,
  },
  {
    id: "firebase",
    label: "Firebase",
    cluster: "Product",
    connectedSkillIds: ["react", "vercel"],
    x: 38,
    y: 68,
  },
  {
    id: "vercel",
    label: "Vercel",
    cluster: "Product",
    connectedSkillIds: ["react", "firebase", "streamlit"],
    x: 52,
    y: 72,
  },
  {
    id: "railway",
    label: "Railway",
    cluster: "Product",
    connectedSkillIds: ["fastapi", "postgresql", "git"],
    x: 24,
    y: 66,
  },

  // --- LEADERSHIP CLUSTER (Lower-Right / Mid-Lower) ---
  {
    id: "ieee",
    label: "IEEE",
    cluster: "Leadership",
    connectedSkillIds: ["csi", "event-management", "python"],
    x: 68,
    y: 64,
  },
  {
    id: "csi",
    label: "CSI",
    cluster: "Leadership",
    connectedSkillIds: ["ieee", "event-management"],
    x: 84,
    y: 62,
  },
  {
    id: "event-management",
    label: "Event Management",
    cluster: "Leadership",
    connectedSkillIds: ["ieee", "csi", "streamlit"],
    x: 76,
    y: 78,
  },

  // TODO(Phase 3): Expand to ~20 skills after confirmation.
];

// Cluster metadata for quiet ambient editorial positioning
export interface ClusterMeta {
  name: SkillCluster;
  label: string;
  x: number; // percentage
  y: number; // percentage
}

export const clusterMetas: ClusterMeta[] = [
  { name: "Core", label: "CORE ARCHITECTURE", x: 14, y: 12 },
  { name: "AI", label: "NEURAL & STATISTICAL", x: 68, y: 10 },
  { name: "Product", label: "DEPLOYMENT & RUNTIME", x: 34, y: 84 },
  { name: "Leadership", label: "COMMUNITY & DIRECTIVE", x: 70, y: 88 },
];
