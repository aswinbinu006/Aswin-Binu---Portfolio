"use client";

// PLACEHOLDER: confirm final links before shipping
const CONTACT_LINKS = [
  { label: "GitHub", href: "https://github.com/aswinbinu" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aswinbinu" },
  { label: "Resume", href: "/resume.pdf" },
  { label: "Email", href: "mailto:aswinbinu@proton.me" },
];

/**
 * Chapter 8 — Contact
 *
 * Everything slows down.
 * One closing sentence: "Let's build something memorable."
 * Restrained soft blue glow settles behind the CTA.
 * Buttons follow the locked material rules (matte metal / subtle frosted glass)
 * without oversized glowing effects.
 */
export default function Contact() {
  return (
    <section className="relative z-10 flex min-h-[75vh] flex-col items-center justify-center px-6 py-32 text-center select-none">
      {/* Restrained soft blue ambient glow behind the CTA */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: "520px",
          height: "360px",
          background:
            "radial-gradient(circle, rgba(15, 76, 129, 0.28) 0%, rgba(6, 26, 58, 0.15) 50%, transparent 70%)",
        }}
      />

      <span className="mb-4 inline-block font-mono text-xs tracking-widest text-soft-glow/80 uppercase">
        Chapter 08 // Signal
      </span>

      <p className="max-w-xl text-3xl font-bold tracking-tight text-white md:text-5xl">
        Let&apos;s build something memorable.
      </p>

      <p className="mt-4 max-w-[50ch] font-mono text-xs text-white/60 md:text-sm">
        Open for high-impact AI/ML research collaborations, critical systems
        engineering, and architectural discussions.
      </p>

      {/* Restrained Action Buttons */}
      <div data-no-constellation className="mt-10 flex flex-wrap items-center justify-center gap-4">
        {CONTACT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.label !== "Email" ? "_blank" : undefined}
            rel="noreferrer"
            className="focus-ring frosted-glass group relative overflow-hidden rounded-full px-6 py-2.5 font-mono text-xs font-btn text-white/80 transition-all duration-300 hover:border-soft-glow/50 hover:bg-white/[0.06] hover:text-white"
          >
            <span className="relative z-10">{link.label}</span>
            {/* Subtle blue rim highlight on hover */}
            <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:shadow-[inset_0_0_12px_rgba(95,168,255,0.25)]" />
          </a>
        ))}
      </div>

      <div className="mt-20 font-mono text-[11px] tracking-wider text-white/30">
        ASWIN BINU © {new Date().getFullYear()} // ALL SYSTEMS NOMINAL
      </div>
    </section>
  );
}
