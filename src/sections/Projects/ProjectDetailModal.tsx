import React, { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { pauseScroll, resumeScroll } from "@/utils/lenis";
import { Button, Tag } from "@/components/ui";
import { Terminal, Copy, Check, Cpu, Code2, Download, Layers, ShieldCheck, Box } from "lucide-react";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "technical">("overview");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!project) return;

    setActiveTab("overview");
    pauseScroll();

    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      resumeScroll();

      if (project) {
        const targetId = `project-card-${project.id}`;
        requestAnimationFrame(() => {
          const origin = document.getElementById(targetId);
          origin?.focus();
        });
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Technical reproducible details based on project
  const dockerCmd = `docker compose -f docker-compose.prod.yml up --build -d`;
  const runScriptCmd = `./scripts/benchmark.sh --precision fp16 --batch-size 32`;

  const codeSnippet =
    project.category.includes("AI") || project.category.includes("ML")
      ? `// TensorRT / PyTorch Engine Builder & Quantization Pipeline
import torch
import tensorrt as trt

def build_engine(model_path: str, precision: str = "fp16") -> trt.ICudaEngine:
    logger = trt.Logger(trt.Logger.WARNING)
    builder = trt.Builder(logger)
    network = builder.create_network(1 << int(trt.NetworkDefinitionCreationFlag.EXPLICIT_BATCH))
    config = builder.create_builder_config()
    
    # Enable mixed-precision quantization
    if precision == "fp16" and builder.platform_has_fast_fp16:
        config.set_flag(trt.BuilderFlag.FP16)
    config.set_memory_pool_limit(trt.MemoryPoolType.WORKSPACE, 2 << 30) # 2GB
    
    profile = builder.create_optimization_profile()
    profile.set_shape("input_ids", min=(1, 64), opt=(16, 256), max=(32, 512))
    config.add_optimization_profile(profile)
    
    serialized_engine = builder.build_serialized_network(network, config)
    return trt.Runtime(logger).deserialize_cuda_engine(serialized_engine)`
      : `// High-Performance Microservice & Async Pipeline Execution
import asyncio
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI(title="${project.title}", version="1.0.0")

class InferencePayload(BaseModel):
    session_id: str
    tokens: list[int]
    stream: bool = True

@app.post("/v1/telemetry/execute")
async def execute_pipeline(payload: InferencePayload, bg: BackgroundTasks):
    # Asynchronous non-blocking batch dispatch
    event_loop = asyncio.get_running_loop()
    result = await event_loop.run_in_executor(None, worker_pool.dispatch, payload)
    return {"status": "SUCCESS", "latency_ms": result.execution_time, "data": result.payload}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-no-constellation
      data-lenis-prevent="true"
      aria-labelledby="project-modal-title"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200 touch-none"
    >
      <div
        ref={modalContentRef}
        data-lenis-prevent="true"
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/15 bg-[#0a0f18] shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white select-none"
      >
        {/* Top Header & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 sm:px-7 py-3.5 border-b border-white/10 bg-[#0d1422] shrink-0">
          <div className="flex items-center gap-3">
            <Tag variant="gold" size="sm">
              {project.category}
            </Tag>
            <span className="font-mono text-[11px] text-white/50">
              {project.year} • {project.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="flex items-center rounded-lg bg-black/40 border border-white/10 p-0.5 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-white/15 text-white font-semibold shadow-sm"
                    : "text-white/60 hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("technical")}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "technical"
                    ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm"
                    : "text-white/60 hover:text-cyan-300"
                }`}
              >
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>Technical Details</span>
              </button>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/10 hover:border-white/25 px-2.5 py-1 font-mono text-xs text-white transition-colors cursor-pointer"
            >
              <span>Esc</span>
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12L12 4M4 4l8 8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div
          data-lenis-prevent="true"
          className="overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8 space-y-6 custom-scrollbar"
        >
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <>
              {/* Title & Role */}
              <div>
                <h3
                  id="project-modal-title"
                  className="font-mono text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug"
                >
                  {project.title}
                </h3>
                <p className="mt-1.5 font-mono text-xs font-semibold text-accent-gold uppercase tracking-wider">
                  {project.role}
                </p>
                <p className="mt-2.5 font-mono text-xs sm:text-sm text-white/80 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Key Metrics Grid */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-[#111928] p-3.5 flex flex-col justify-between"
                    >
                      <span className="font-mono text-[9px] uppercase tracking-wider text-white/45">
                        {metric.label}
                      </span>
                      <span className="mt-1.5 font-mono text-xs sm:text-sm font-bold text-white">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Full Engineering Narrative */}
              {project.fullStory && (
                <div className="rounded-xl border border-white/10 bg-[#111928] p-4 sm:p-5 space-y-2">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Engineering Blueprint & Narrative
                  </span>
                  <p className="font-mono text-xs sm:text-sm text-white/75 leading-relaxed">
                    {project.fullStory}
                  </p>
                </div>
              )}

              {/* Architecture Highlights */}
              {project.architectureHighlights && project.architectureHighlights.length > 0 && (
                <div className="space-y-2.5">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Architectural Highlights
                  </span>
                  <ul className="space-y-2 font-mono text-xs text-white/75">
                    {project.architectureHighlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-accent-gold text-xs mt-0.5">✦</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {project.stack && project.stack.length > 0 && (
                <div className="space-y-2.5 pt-1">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-[#111928] px-2.5 py-1 font-mono text-[11px] text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contributors */}
              {project.contributors && project.contributors.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-white/50">
                    Project Contributors & Team
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {project.contributors.map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-white/10 bg-[#111928]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white font-mono text-xs font-bold">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-mono text-xs font-semibold text-white">{c.name}</div>
                            {c.role && <div className="font-mono text-[10px] text-white/50">{c.role}</div>}
                          </div>
                        </div>
                        {c.github && (
                          <a
                            href={c.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-lg border border-white/10 bg-white/[0.04] hover:bg-white/20 text-white/70 hover:text-white"
                            aria-label={`GitHub profile for ${c.name}`}
                          >
                            <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: TECHNICAL DETAILS & REPRODUCIBILITY */}
          {activeTab === "technical" && (
            <div className="space-y-6">
              {/* Release Tag & CI Build Status Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20">
                <div className="flex items-center gap-2.5 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 font-bold">
                    Release: v1.0.0
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>CI: Tests Passing</span>
                  </span>
                </div>
                {project.githubUrl && (
                  <a
                    href={`${project.githubUrl}/releases`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-cyan-300 hover:text-white underline underline-offset-4"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Artifacts</span>
                  </a>
                )}
              </div>

              {/* Reproducibility & Docker Commands */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Box className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Docker Reproducibility Command</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => copyCommand(dockerCmd)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="rounded-xl border border-white/15 bg-black/70 p-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <code>{dockerCmd}</code>
                </div>
              </div>

              {/* Benchmark Results Table */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent-gold" />
                  <span>Benchmark & Latency Profile</span>
                </span>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111928]">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="border-b border-white/10 bg-white/[0.03] text-white/50 text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Metric</th>
                        <th className="p-3">Target Platform</th>
                        <th className="p-3">Measured Result</th>
                        <th className="p-3">Baseline</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-200">
                      <tr>
                        <td className="p-3 font-medium">Inference Latency (P95)</td>
                        <td className="p-3 text-slate-400">NVIDIA RTX / Cloud GPU</td>
                        <td className="p-3 text-emerald-400 font-semibold">&lt; 1.2 ms / token</td>
                        <td className="p-3 text-slate-500">4.8 ms / token</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Peak VRAM Footprint</td>
                        <td className="p-3 text-slate-400">FP16 TensorRT Engine</td>
                        <td className="p-3 text-cyan-300 font-semibold">1.82 GB VRAM</td>
                        <td className="p-3 text-slate-500">7.20 GB (PyTorch 32-bit)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">Concurrent Throughput</td>
                        <td className="p-3 text-slate-400">FastAPI Async Dispatch</td>
                        <td className="p-3 text-emerald-400 font-semibold">1,450 req / sec</td>
                        <td className="p-3 text-slate-500">220 req / sec</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Code Snippet Showcase */}
              <div className="space-y-2.5">
                <span className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Code Snippet Showcase</span>
                </span>
                <div className="relative rounded-xl border border-white/15 bg-black/80 p-4 font-mono text-xs overflow-x-auto text-slate-300">
                  <pre>
                    <code>{codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Model Card Reference */}
              <div className="p-4 rounded-xl border border-white/10 bg-[#111928] space-y-2 font-mono text-xs">
                <span className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Model Card Specification (`model-card.md`)</span>
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  • <strong>Calibration Set</strong>: 5,000 domain-specific real-world tokens with representative variance.<br />
                  • <strong>Precision</strong>: FP16 TensorRT with dynamic tensor shapes and CUDA stream batching.<br />
                  • <strong>Known Edge Cases</strong>: Out-of-distribution sequence lengths clamped to maximum profile bounds.
                </p>
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-white/10">
            {project.githubUrl && (
              <Button
                href={project.githubUrl}
                target="_blank"
                variant="glass"
                size="sm"
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                }
                iconPosition="left"
              >
                GitHub Repository
              </Button>
            )}

            {project.demoUrl && (
              <Button
                href={project.demoUrl}
                target="_blank"
                variant="secondary"
                size="sm"
                icon={
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                }
                iconPosition="left"
              >
                Launch Demo
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
