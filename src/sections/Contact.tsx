import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, CheckCircle2, Copy, Check, Clock, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/site';
import { Container } from '../components/layout/Container';
import { Reveal } from '../components/ui/Reveal';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const emailAddress = siteConfig.email || 'aswinbinu006@gmail.com';
  const githubUrl = siteConfig.githubUrl || 'https://github.com/aswinbinu006';
  const linkedinUrl = siteConfig.linkedinUrl || 'https://www.linkedin.com/in/aswin-binu-587978320';

  // Read Web3Forms access key from environment variable with reliable fallback
  const web3FormsAccessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '1deada78-38bd-466d-a548-3e01fd66f2ff';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getGmailComposeUrl = (subject?: string, body?: string) => {
    const base = 'https://mail.google.com/mail/?view=cm&fs=1';
    const toParam = `&to=${encodeURIComponent(emailAddress)}`;
    const suParam = subject ? `&su=${encodeURIComponent(subject)}` : '';
    const bodyParam = body ? `&body=${encodeURIComponent(body)}` : '';
    return `${base}${toParam}${suParam}${bodyParam}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // Submit directly to Web3Forms API in the background
      const formPayload = new FormData();
      formPayload.append('access_key', web3FormsAccessKey);
      formPayload.append('name', formData.name.trim());
      formPayload.append('email', formData.email.trim());
      formPayload.append('subject', formData.subject.trim() || `Portfolio Inquiry from ${formData.name.trim()}`);
      formPayload.append('message', formData.message.trim());
      formPayload.append('from_name', `${formData.name.trim()} via Portfolio`);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formPayload,
      });

      const data = await response.json();
      if (data.success) {
        setStatus('success');
      } else {
        setErrorMessage(data.message || 'Failed to send message. Please try again.');
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage('Network connection error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="dark-section w-full bg-[#070F38] text-ivory py-20 sm:py-24 md:py-28 transition-colors">
      <Container>
        {/* Section Header */}
        <Reveal direction="up" duration={500}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-gold font-semibold block mb-3">
              GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-ivory tracking-tight mb-4 leading-tight">
              Let’s build something meaningful<span className="text-gold">.</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-ivory/80 leading-relaxed max-w-2xl mx-auto font-normal">
              Have an internship opportunity, project collaboration, or an interesting engineering challenge? Reach out directly using the email service below.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Portfolio Layout: Direct Email Service on Left, Direct Contact Channels on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
          {/* Left Column: Direct Portfolio Email Service Card */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={50} duration={500}>
              <div className="p-7 sm:p-9 rounded-2xl bg-[#0D1847]/85 border border-gold/30 shadow-xl backdrop-blur-sm relative overflow-hidden">
                {/* Header Accent Bar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gold/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-midnight border border-gold/40 flex items-center justify-center text-gold">
                      <Mail className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold text-ivory">
                        Email Service
                      </h3>
                      <p className="text-xs text-ivory/70">
                        Direct message dispatch to <span className="text-gold-light font-mono">{emailAddress}</span>
                      </p>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-gold/15 text-gold border border-gold/30">
                    <Sparkles className="w-3 h-3 text-gold" />
                    Open to Opportunities
                  </span>
                </div>

                {status === 'success' ? (
                  <div className="py-8 text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-full bg-gold/20 border border-gold flex items-center justify-center text-gold">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-heading font-bold text-ivory">
                      Message Delivered!
                    </h4>
                    <p className="text-sm text-ivory/80 max-w-md mx-auto leading-relaxed">
                      Thank you for contacting me! Your message has been sent directly to Aswin Binu and He will respond to <span className="text-gold font-medium">{formData.email}</span> within 24 hours.
                    </p>
                    <div className="pt-2 flex justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ name: '', email: '', subject: '', message: '' });
                          setStatus('idle');
                        }}
                        className="px-6 py-2.5 rounded-full border border-gold/50 text-gold hover:bg-gold/10 transition-colors text-sm font-medium cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5 font-semibold">
                          Your Name <span className="text-gold">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Morgan"
                          className="w-full px-4 py-3 rounded-xl bg-midnight/90 border border-gold/30 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        />
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5 font-semibold">
                          Your Email <span className="text-gold">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-midnight/90 border border-gold/30 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                        />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label htmlFor="contact-subject" className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5 font-semibold">
                        Subject / Topic
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="AI/ML Internship, Project Collaboration, etc."
                        className="w-full px-4 py-3 rounded-xl bg-midnight/90 border border-gold/30 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5 font-semibold">
                        Message <span className="text-gold">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Hello Aswin, I came across your portfolio and wanted to reach out regarding..."
                        className="w-full px-4 py-3 rounded-xl bg-midnight/90 border border-gold/30 text-ivory placeholder:text-ivory/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="text-xs text-rose-300 font-mono">
                        {errorMessage || 'Please fill in all required fields (Name, Email, Message).'}
                      </p>
                    )}

                    {/* Action Row */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full sm:w-auto px-7 py-3 rounded-full bg-gold hover:bg-gold-light text-[#070F38] font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                      >
                        {status === 'sending' ? (
                          <>
                            <div className="w-4 h-4 border-2 border-[#070F38] border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 stroke-[2]" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-2 text-xs text-ivory/60 font-mono">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        <span>Replies within 24h</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Direct Channels (Email with 1-click copy, GitHub, LinkedIn, Availability) */}
          <div className="lg:col-span-5 space-y-4">
            {/* 1. Direct Email Card with 1-Click Copy */}
            <Reveal direction="up" delay={100} duration={500}>
              <div className="p-6 rounded-2xl bg-[#0D1847]/70 border border-gold/30 hover:border-gold transition-all duration-300 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-midnight border border-gold/40 flex items-center justify-center text-gold shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold font-semibold mb-0.5">
                      DIRECT EMAIL
                    </div>
                    <a
                      href={getGmailComposeUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-medium text-ivory hover:text-gold-light transition-colors truncate block"
                      title={emailAddress}
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="p-2.5 rounded-xl border border-gold/30 hover:border-gold text-gold hover:bg-gold/10 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  ) : (
                    <Copy className="w-4 h-4 stroke-[1.75]" />
                  )}
                </button>
              </div>
            </Reveal>

            {/* 2. GitHub Action Button Card */}
            <Reveal direction="up" delay={150} duration={500}>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 rounded-2xl bg-[#0D1847]/70 border border-gold/30 hover:border-gold hover:bg-[#0D1847] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-4 group block"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-midnight border border-gold/40 flex items-center justify-center text-gold shrink-0 group-hover:scale-105 transition-transform">
                    <Github className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold font-semibold mb-0.5">
                      GITHUB
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-ivory group-hover:text-gold-light transition-colors">
                      View GitHub Profile
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider group-hover:bg-gold group-hover:text-midnight transition-all flex items-center gap-1.5 shrink-0">
                  <span>Open</span>
                  <span className="text-sm">→</span>
                </div>
              </a>
            </Reveal>

            {/* 3. LinkedIn Action Button Card */}
            <Reveal direction="up" delay={200} duration={500}>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 rounded-2xl bg-[#0D1847]/70 border border-gold/30 hover:border-gold hover:bg-[#0D1847] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between gap-4 group block"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-midnight border border-gold/40 flex items-center justify-center text-gold shrink-0 group-hover:scale-105 transition-transform">
                    <Linkedin className="w-6 h-6 stroke-[1.75]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-gold font-semibold mb-0.5">
                      LINKEDIN
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-ivory group-hover:text-gold-light transition-colors">
                      Connect on LinkedIn
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-xl bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider group-hover:bg-gold group-hover:text-midnight transition-all flex items-center gap-1.5 shrink-0">
                  <span>Connect</span>
                  <span className="text-sm">→</span>
                </div>
              </a>
            </Reveal>

            {/* 4. Availability & Location Note */}
            <Reveal direction="up" delay={250} duration={500}>
              <div className="p-5 rounded-2xl bg-midnight/60 border border-gold/20 flex items-start gap-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                <div className="text-xs text-ivory/75 leading-relaxed">
                  <span className="font-semibold text-ivory block mb-0.5">Current Status</span>
                  Based in <strong className="text-ivory font-medium">Nagpur, India (IST)</strong>. Actively seeking AI/ML engineering internships, product roles, and collaborative projects.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
