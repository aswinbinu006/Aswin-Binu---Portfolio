"use client";

interface WireframeMockupProps {
  type: "radar-hud" | "anomaly-matrix" | "neural-edge";
  isSharpened?: boolean;
}

/**
 * Handcrafted Matte Wireframe Mockup Placeholder
 * Built purely with SVG & CSS per the locked image specification.
 * Contains: {/* PLACEHOLDER: replace with real asset *\/}
 */
export default function WireframeMockup({
  type,
  isSharpened = false,
}: WireframeMockupProps) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-[#040e20] p-4 select-none">
      {/* PLACEHOLDER: replace with real asset */}
      <div
        className="relative h-full w-full transition-all duration-300"
        style={{
          filter: isSharpened ? "blur(0px) contrast(1.1)" : "blur(1px) contrast(0.95)",
        }}
      >
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(95,168,255,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(95,168,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {type === "radar-hud" && (
          <svg viewBox="0 0 400 240" width="100%" height="100%" style={{ maxHeight: "100%", width: "100%", height: "auto" }} className="h-full w-full" fill="none">
            {/* Polar Radar Rings */}
            <circle cx="200" cy="120" r="90" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.3" />
            <circle cx="200" cy="120" r="60" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.4" />
            <circle cx="200" cy="120" r="30" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.5" />
            
            {/* Radar Crosshairs */}
            <line x1="80" y1="120" x2="320" y2="120" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="3 3" />
            <line x1="200" y1="20" x2="200" y2="220" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="3 3" />
            
            {/* UAV Vector Target Bounding Box */}
            <rect x="230" y="70" width="46" height="46" stroke="#5FA8FF" strokeWidth="1.2" strokeOpacity="0.8" />
            <line x1="226" y1="70" x2="236" y2="70" stroke="#5FA8FF" strokeWidth="1.5" />
            <line x1="230" y1="66" x2="230" y2="76" stroke="#5FA8FF" strokeWidth="1.5" />
            
            {/* Target Trajectory Vector */}
            <line x1="253" y1="93" x2="290" y2="60" stroke="#5FA8FF" strokeWidth="1" strokeOpacity="0.7" />
            <circle cx="290" cy="60" r="2.5" fill="#5FA8FF" />
            
            {/* Telemetry Readouts */}
            <text x="14" y="24" fill="#5FA8FF" fontSize="9" fontFamily="monospace" opacity="0.8">
              AEGIS_TRK // TGT_01 [CONF: 94.2%]
            </text>
            <text x="14" y="38" fill="#F7FBFF" fontSize="8" fontFamily="monospace" opacity="0.6">
              ALT: 420M | HDG: 174° | LATENCY: 3.8MS
            </text>
            <text x="320" y="224" fill="#5FA8FF" fontSize="8" fontFamily="monospace" opacity="0.7">
              60.0 FPS
            </text>
          </svg>
        )}

        {type === "anomaly-matrix" && (
          <svg viewBox="0 0 400 240" width="100%" height="100%" style={{ maxHeight: "100%", width: "100%", height: "auto" }} className="h-full w-full" fill="none">
            {/* Spectral Waveform Channel 1 */}
            <path
              d="M10,80 Q40,40 70,80 T130,80 T190,40 T250,80 T310,120 T390,80"
              stroke="#5FA8FF"
              strokeWidth="1.2"
              strokeOpacity="0.5"
            />
            {/* Spectral Waveform Channel 2 (Acoustic stress) */}
            <path
              d="M10,140 Q50,150 90,120 T170,160 T250,110 T330,170 T390,140"
              stroke="#5FA8FF"
              strokeWidth="1.2"
              strokeOpacity="0.75"
            />
            
            {/* Isolated Anomaly Anomaly Pulse Marker */}
            <circle cx="250" cy="110" r="14" stroke="#5FA8FF" strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.9" />
            <circle cx="250" cy="110" r="3" fill="#5FA8FF" />
            <line x1="250" y1="40" x2="250" y2="180" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.3" />

            <text x="14" y="24" fill="#5FA8FF" fontSize="9" fontFamily="monospace" opacity="0.8">
              SPECTRAL_FFT // CH_B [ANOMALY_CONF: 98.7%]
            </text>
            <text x="14" y="38" fill="#F7FBFF" fontSize="8" fontFamily="monospace" opacity="0.6">
              FREQ: 4.82 KHZ | MICROSIGNAL DETECTED
            </text>
            <text x="258" y="104" fill="#5FA8FF" fontSize="8" fontFamily="monospace">
              Δt: 0.14ms
            </text>
          </svg>
        )}

        {type === "neural-edge" && (
          <svg viewBox="0 0 400 240" width="100%" height="100%" style={{ maxHeight: "100%", width: "100%", height: "auto" }} className="h-full w-full" fill="none">
            {/* Neural Topology Network DAG */}
            {/* Input layer */}
            <circle cx="60" cy="70" r="6" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />
            <circle cx="60" cy="120" r="6" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />
            <circle cx="60" cy="170" r="6" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />
            
            {/* Quantized Conv Nodes */}
            <rect x="150" y="55" width="22" height="22" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />
            <rect x="150" y="109" width="22" height="22" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />
            <rect x="150" y="163" width="22" height="22" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />
            
            {/* Dense 2-bit Nodes */}
            <circle cx="270" cy="90" r="7" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />
            <circle cx="270" cy="150" r="7" stroke="#5FA8FF" strokeWidth="1.2" fill="#061A3A" />

            {/* Output Node */}
            <circle cx="350" cy="120" r="8" stroke="#5FA8FF" strokeWidth="1.5" fill="#0F4C81" />

            {/* Inter-layer synapses */}
            <line x1="66" y1="70" x2="150" y2="66" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="66" y1="70" x2="150" y2="120" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="66" y1="120" x2="150" y2="66" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.3" />
            <line x1="66" y1="120" x2="150" y2="120" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.5" />
            <line x1="66" y1="170" x2="150" y2="174" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="172" y1="66" x2="270" y2="90" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="172" y1="120" x2="270" y2="90" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="172" y1="120" x2="270" y2="150" stroke="#5FA8FF" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="277" y1="90" x2="342" y2="120" stroke="#5FA8FF" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="277" y1="150" x2="342" y2="120" stroke="#5FA8FF" strokeWidth="1" strokeOpacity="0.6" />

            <text x="14" y="24" fill="#5FA8FF" fontSize="9" fontFamily="monospace" opacity="0.8">
              INT2_QUANT // CMSIS_NN [38.4 mW]
            </text>
            <text x="14" y="38" fill="#F7FBFF" fontSize="8" fontFamily="monospace" opacity="0.6">
              SRAM: 18.2KB | FLASH: 64KB | RUNTIME: STM32L4
            </text>
          </svg>
        )}

        {/* Status bar footer */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between border-t border-white/5 pt-1.5 text-[8px] font-mono text-white/40">
          <span>WIREFRAME_ID: {type.toUpperCase()}</span>
          <span>ARCH_SLOT_CONFIRMED</span>
        </div>
      </div>
    </div>
  );
}
