import { useState, useEffect, useRef } from "react";

const IMGS = {
  logo: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/e06b66778_logo.png",
  hero: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/1f9a1a24c_hero_city.jpg",
  ai: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/afee23f36_ai_profile.jpg",
  interop: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/1bb128182_interoperability.jpg",
  settlement: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/0684da708_settlement.jpg",
  security: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/2e9348c3b_security.jpg",
  protocol: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/e1e5e231d_protocol_interior.jpg",
  usecases: "https://base44.app/api/apps/69e8a2fa997054e98db8a1ab/files/mp/public/69e8a2fa997054e98db8a1ab/b3a5e9c90_usecases.jpg",
};

const C = {
  bg: "#070708",
  panel: "#0f0f12",
  border: "#1a1a24",
  gold: "#c9a84c",
  goldSoft: "#e2c97e",
  goldDim: "#7a6030",
  text: "#e8e8f0",
  muted: "#6b6b80",
  accent: "#3d6fff",
};

const navLinks = ["Protocol", "Agents", "Ecosystem", "Roadmap", "Token", "Team", "FAQ", "Contact"];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Fade({ children, delay = 0, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(30px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

function GoldLine() {
  return <div style={{ width: 48, height: 2, background: `linear-gradient(90deg, ${C.gold}, transparent)`, margin: "12px 0 20px" }} />;
}

function Tag({ children }) {
  return (
    <span style={{
      fontSize: 10, letterSpacing: 3, fontWeight: 700, textTransform: "uppercase",
      color: C.gold, border: `1px solid ${C.goldDim}`, borderRadius: 20,
      padding: "4px 14px", display: "inline-block", marginBottom: 16,
    }}>{children}</span>
  );
}

function Btn({ children, outline, href, onClick, small }) {
  const base = {
    display: "inline-block", fontWeight: 600, borderRadius: 4, cursor: "pointer",
    textDecoration: "none", transition: "all 0.2s", letterSpacing: 0.5,
    fontSize: small ? 12 : 14, padding: small ? "8px 20px" : "13px 28px",
    border: outline ? `1px solid ${C.gold}` : "none",
    background: outline ? "transparent" : `linear-gradient(135deg, ${C.gold}, #a07828)`,
    color: outline ? C.gold : "#000",
  };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={base}>{children}</a>
    : <button onClick={onClick} style={base}>{children}</button>;
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  const scrollY = useScrollY();
  const [open, setOpen] = useState(false);
  const solid = scrollY > 60;

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: solid ? "rgba(7,7,8,0.96)" : "transparent",
      borderBottom: solid ? `1px solid ${C.border}` : "none",
      backdropFilter: solid ? "blur(12px)" : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => go("hero")}>
          <img src={IMGS.logo} alt="Cozanet" style={{ height: 32, width: 32, objectFit: "contain" }} />
          <span style={{ fontWeight: 700, fontSize: 18, color: C.text, letterSpacing: 0.5 }}>Cozanet</span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navLinks.slice(0, 6).map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              style={{ background: "none", border: "none", color: active === l.toLowerCase() ? C.gold : C.muted, cursor: "pointer", fontSize: 13, fontWeight: 500, letterSpacing: 0.3, transition: "color 0.2s" }}>
              {l}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Btn outline small onClick={() => go("contact")}>Contact</Btn>
          <Btn small href="https://t.me/cozanet">Join Community</Btn>
          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "none", color: C.text, cursor: "pointer", fontSize: 22, display: "none" }}>☰</button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: C.panel, borderTop: `1px solid ${C.border}`, padding: "16px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          {navLinks.map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())} style={{ background: "none", border: "none", color: C.text, cursor: "pointer", fontSize: 15, textAlign: "left", padding: "6px 0" }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      {/* BG */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img src={IMGS.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(7,7,8,0.5) 0%, rgba(7,7,8,0.2) 40%, rgba(7,7,8,0.85) 100%)" }} />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 860, padding: "0 24px" }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(40px)", transition: "all 0.9s ease 0.1s" }}>
          <Tag>Protocol Infrastructure</Tag>
          <h1 style={{ fontSize: "clamp(36px, 7vw, 80px)", fontWeight: 300, color: C.text, lineHeight: 1.1, marginBottom: 24, letterSpacing: -1 }}>
            The Future of{" "}
            <span style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldSoft})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              African Remittance
            </span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 20px)", color: C.muted, lineHeight: 1.7, maxWidth: 620, margin: "0 auto 36px", fontWeight: 300 }}>
            A modular infrastructure layer for fast, verifiable settlement—designed for real-world use across the African continent and beyond.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn href="#">Read the Whitepaper</Btn>
            <Btn outline onClick={() => document.getElementById("protocol")?.scrollIntoView({ behavior: "smooth" })}>See how it works</Btn>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.5s",
          marginTop: 64, display: "flex", gap: 0, justifyContent: "center",
          background: "rgba(255,255,255,0.04)", border: `1px solid ${C.border}`,
          borderRadius: 8, overflow: "hidden", flexWrap: "wrap",
        }}>
          {[["BSC", "Verified Contracts"], ["< 3s", "Settlement Time"], ["AI", "Coordinated"], ["Live", "Liquidity"]].map(([n, l], i) => (
            <div key={i} style={{ flex: 1, minWidth: 100, padding: "20px 24px", borderRight: i < 3 ? `1px solid ${C.border}` : "none", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: C.gold, marginBottom: 4 }}>{n}</div>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", color: C.muted, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", animation: "bounce 2s infinite" }}>
        Scroll ↓
      </div>
    </section>
  );
}

// ── PROTOCOL ─────────────────────────────────────────────────────────────────
function Protocol() {
  return (
    <section id="protocol" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
        <Fade>
          <Tag>Protocol</Tag>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text, lineHeight: 1.2, marginBottom: 16 }}>
            Infrastructure-First<br />
            <span style={{ color: C.gold }}>Blockchain Execution</span>
          </h2>
          <GoldLine />
          <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 16, fontSize: 15 }}>
            Cozanet is a high-throughput execution layer built for cross-chain messaging, on-chain verification, and AI-coordinated workflows. It connects fragmented systems into one coherent settlement surface, designed specifically for the African market.
          </p>
          <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
            Built on BSC with verified contracts and live liquidity, Cozanet prioritizes transparency, infrastructure-first development, and real-world utility over hype.
          </p>
          <Btn outline onClick={() => document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" })}>See how it works</Btn>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
            <img src={IMGS.protocol} alt="Protocol" style={{ width: "100%", height: 380, objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(201,168,76,0.1), transparent)" }} />
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ── AGENTS ───────────────────────────────────────────────────────────────────
function Agents() {
  const features = [
    { icon: "🤖", title: "Autonomous Agents", desc: "Deploy AI agents that execute transactions and coordinate across contracts." },
    { icon: "🧠", title: "Smart Coordination", desc: "Agents observe on-chain state and make decisions without human intervention." },
    { icon: "⚡", title: "Lightning Finality", desc: "Lightning-fast transaction execution with deterministic finality." },
  ];

  return (
    <section id="agents" style={{ padding: "100px 24px", background: C.panel, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <Fade>
            <div style={{ position: "relative", borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={IMGS.ai} alt="AI Agents" style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(61,111,255,0.15), transparent)" }} />
            </div>
          </Fade>
          <Fade delay={0.2}>
            <Tag>AI Agents</Tag>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text, lineHeight: 1.2, marginBottom: 16 }}>
              Autonomous On-Chain<br />
              <span style={{ color: C.gold }}>Coordination</span>
            </h2>
            <GoldLine />
            <p style={{ color: C.muted, lineHeight: 1.8, marginBottom: 32, fontSize: 15 }}>
              Deploy autonomous agents that observe on-chain state, execute transactions, and coordinate across contracts—without giving up custody or transparency.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
              {features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "14px 16px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 22 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: C.text, marginBottom: 4, fontSize: 14 }}>{f.title}</div>
                    <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Btn outline onClick={() => document.getElementById("ecosystem")?.scrollIntoView({ behavior: "smooth" })}>Explore agent capabilities</Btn>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ── ECOSYSTEM (Interop + Settlement + Security) ───────────────────────────────
function Ecosystem() {
  const sections = [
    {
      id: "interoperability",
      tag: "Interoperability",
      title: "One Interface.\nEvery Chain.",
      img: IMGS.interop,
      desc: "Cozanet routes messages and value across ecosystems with unified verification. Developers get one interface; users get one experience—regardless of what's underneath.",
      sub: "Our interoperability layer ensures seamless communication between different blockchain networks, enabling truly cross-chain applications.",
      cta: "View supported chains",
    },
    {
      id: "settlement",
      tag: "Settlement Engine",
      title: "Deterministic\nFinality",
      img: IMGS.settlement,
      desc: "Transactions settle with cryptographic receipts and deterministic finality. No hidden state. No ambiguous reverts. Just clean execution you can audit.",
      sub: "Our settlement engine is designed for high-throughput, low-latency transactions, making it ideal for remittances and real-world payments.",
      cta: "Read the verification spec",
      features: ["Cryptographic Proofs — Every transaction is secured with advanced cryptography.", "Full Transparency — All contracts are open and verifiable on-chain.", "Regular third-party security audits."],
      reverse: true,
    },
    {
      id: "security",
      tag: "Security",
      title: "Built to Be\nInspected",
      img: IMGS.security,
      desc: "Cryptographic proofs, open contracts, and minimal trust assumptions. Cozanet is built to be inspected—by validators, auditors, and the community.",
      sub: "Security is not an afterthought. It's woven into every layer of our infrastructure, from the smart contracts to the consensus mechanism.",
      cta: "Review the audit notes",
    },
  ];

  return (
    <section id="ecosystem" style={{ padding: "80px 0" }}>
      {sections.map((s, si) => (
        <div key={s.id} id={s.id} style={{
          padding: "80px 24px",
          background: si % 2 === 1 ? C.panel : "transparent",
          borderTop: si % 2 === 1 ? `1px solid ${C.border}` : "none",
          borderBottom: si % 2 === 1 ? `1px solid ${C.border}` : "none",
        }}>
          <div style={{
            maxWidth: 1200, margin: "0 auto",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
            direction: s.reverse ? "rtl" : "ltr",
          }}>
            <Fade style={{ direction: "ltr" }}>
              <Tag>{s.tag}</Tag>
              <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 300, color: C.text, lineHeight: 1.25, marginBottom: 16, whiteSpace: "pre-line" }}>
                {s.title.split("\n")[0]}<br />
                <span style={{ color: C.gold }}>{s.title.split("\n")[1]}</span>
              </h2>
              <GoldLine />
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, marginBottom: 14 }}>{s.desc}</p>
              <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, marginBottom: s.features ? 20 : 32 }}>{s.sub}</p>
              {s.features && (
                <ul style={{ margin: "0 0 28px", paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {s.features.map((f, i) => (
                    <li key={i} style={{ display: "flex", gap: 10, color: C.muted, fontSize: 13, alignItems: "flex-start" }}>
                      <span style={{ color: C.gold, marginTop: 2 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              )}
              <Btn outline href="#">{s.cta}</Btn>
            </Fade>
            <Fade delay={0.2} style={{ direction: "ltr" }}>
              <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <img src={s.img} alt={s.tag} style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }} />
              </div>
            </Fade>
          </div>
        </div>
      ))}
    </section>
  );
}

// ── USE CASES ─────────────────────────────────────────────────────────────────
function UseCases() {
  const cases = [
    { icon: "💸", title: "Remittances", desc: "Fast, low-cost cross-border payments for African families." },
    { icon: "💼", title: "Payroll", desc: "Automated salary distribution for global teams." },
    { icon: "🏦", title: "Treasury", desc: "Corporate treasury management and coordination." },
    { icon: "🤖", title: "AI Operations", desc: "Autonomous agent-driven business processes." },
  ];

  return (
    <section id="usecases" style={{ padding: "100px 24px", background: C.panel, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <Fade>
            <Tag>Use Cases</Tag>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text, lineHeight: 1.2, marginBottom: 16 }}>
              Real-World<br /><span style={{ color: C.gold }}>Applications</span>
            </h2>
            <GoldLine />
            <p style={{ color: C.muted, lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
              Remittances, payroll, treasury coordination, and AI-driven operations—Cozanet handles the complexity so teams can ship faster with less risk.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {cases.map((c, i) => (
                <div key={i} style={{ padding: "18px", background: C.bg, borderRadius: 8, border: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 26, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 14, marginBottom: 6 }}>{c.title}</div>
                  <div style={{ color: C.muted, fontSize: 12, lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </Fade>
          <Fade delay={0.2}>
            <div style={{ borderRadius: 12, overflow: "hidden", border: `1px solid ${C.border}` }}>
              <img src={IMGS.usecases} alt="Use Cases" style={{ width: "100%", height: 420, objectFit: "cover", display: "block" }} />
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ── ROADMAP ───────────────────────────────────────────────────────────────────
function Roadmap() {
  const phases = [
    { q: "Q1 2025", title: "Foundation", items: ["Verification specs publication", "Developer SDK release", "Community building", "CZN Points mining system"], done: true },
    { q: "Q2 2025", title: "Integration", items: ["Cross-chain messaging", "AI agent templates", "BSC verification", "Exchange listings"], done: true },
    { q: "Q3 2025", title: "Expansion", items: ["Ecosystem grants program", "Enterprise pilots", "Advanced coordination modules", "African market expansion"], active: true },
    { q: "Q4 2025+", title: "Scale", items: ["Strategic partnerships", "Mainnet expansion", "Governance launch", "Multi-chain rollout"] },
  ];

  return (
    <section id="roadmap" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 60 }}>
          <Tag>Roadmap</Tag>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text, marginBottom: 16 }}>
            A Phased <span style={{ color: C.gold }}>Rollout</span>
          </h2>
          <p style={{ color: C.muted, maxWidth: 560, margin: "0 auto", lineHeight: 1.7, fontSize: 15 }}>
            Focused on infrastructure, integrations, and real-world deployment across Africa and beyond.
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {phases.map((p, i) => (
            <Fade key={i} delay={i * 0.1}>
              <div style={{
                background: p.active ? "rgba(201,168,76,0.06)" : C.panel,
                border: `1px solid ${p.active ? C.gold : p.done ? C.goldDim : C.border}`,
                borderRadius: 10, padding: "24px 20px", height: "100%",
              }}>
                <div style={{ fontSize: 11, color: p.done ? C.gold : p.active ? C.goldSoft : C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" }}>
                  {p.q} {p.done ? "✓" : p.active ? "●" : ""}
                </div>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 16, marginBottom: 16 }}>{p.title}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, fontSize: 12, color: C.muted, alignItems: "flex-start" }}>
                      <span style={{ color: p.done ? C.gold : p.active ? C.goldSoft : C.border, marginTop: 1 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TOKEN ─────────────────────────────────────────────────────────────────────
function Token() {
  const alloc = [
    { label: "Founder & Core Team", pct: 20, color: C.gold },
    { label: "Seed Participants", pct: 15, color: "#4e9fff" },
    { label: "Treasury Reserve", pct: 25, color: "#3dcf8e" },
    { label: "Ecosystem & Utility", pct: 40, color: "#a78bfa" },
  ];

  return (
    <section id="token" style={{ padding: "100px 24px", background: C.panel, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 60 }}>
          <Tag>Token</Tag>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text, marginBottom: 16 }}>
            <span style={{ color: C.gold }}>CZN</span> Token
          </h2>
          <p style={{ color: C.muted, maxWidth: 540, margin: "0 auto", fontSize: 15, lineHeight: 1.7 }}>
            The utility token powering settlement, staking, and coordination across the Cozanet ecosystem.
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
          {/* Allocation */}
          <Fade>
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: 28 }}>
              <div style={{ fontWeight: 600, color: C.text, marginBottom: 20, fontSize: 15 }}>Token Allocation</div>
              {alloc.map((a, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: C.muted }}>{a.label}</span>
                    <span style={{ fontSize: 13, color: a.color, fontWeight: 600 }}>{a.pct}%</span>
                  </div>
                  <div style={{ background: C.border, borderRadius: 4, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${a.pct}%`, height: "100%", background: a.color, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          </Fade>

          {/* Utility */}
          <Fade delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "⛽", title: "Transaction Fees", desc: "Pay for transaction fees and cross-chain routing" },
                { icon: "🔒", title: "Staking", desc: "Stake to participate in verification and governance" },
                { icon: "🎁", title: "Rewards", desc: "Reward agents and developers for coordination work" },
              ].map((u, i) => (
                <div key={i} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22 }}>{u.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, color: C.text, fontSize: 14, marginBottom: 4 }}>{u.title}</div>
                    <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.5 }}>{u.desc}</div>
                  </div>
                </div>
              ))}
              <Btn outline href="#">View contract on explorer</Btn>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ── TEAM ─────────────────────────────────────────────────────────────────────
function Team() {
  return (
    <section id="team" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 56 }}>
          <Tag>Team</Tag>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text, marginBottom: 16 }}>
            A Small Team.<br /><span style={{ color: C.gold }}>No Hype. Just Results.</span>
          </h2>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Fade>
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 24px", display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDim})`, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👤</div>
              <div>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 15, marginBottom: 4 }}>Founder / Protocol Design</div>
                <div style={{ color: C.gold, fontSize: 12, marginBottom: 10, letterSpacing: 1 }}>COZANET</div>
                <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
                  Visionary behind Cozanet. Focused on building transparent, infrastructure-first blockchain solutions for Africa.
                </div>
              </div>
            </div>
          </Fade>
          <Fade delay={0.15}>
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 12, padding: "28px 24px", display: "flex", gap: 18, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: C.border, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✉️</div>
              <div>
                <div style={{ fontWeight: 600, color: C.text, fontSize: 15, marginBottom: 8 }}>Join the Team</div>
                <div style={{ color: C.muted, fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
                  We are always looking for talented individuals who share our vision.
                </div>
                <Btn outline small href="mailto:info@cozanet.net">Reach Out</Btn>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const items = [
    { q: "What is Cozanet?", a: "Cozanet is a high-throughput blockchain execution layer built for cross-chain messaging, on-chain verification, and AI-coordinated workflows. It is specifically designed to address the unique challenges of digital settlement and remittances in Africa." },
    { q: "How does AI coordination work?", a: "Cozanet enables the deployment of autonomous AI agents that can observe on-chain state, execute transactions, and coordinate across multiple smart contracts. These agents operate transparently and do not require giving up custody of assets." },
    { q: "Which chains are supported?", a: "Currently, Cozanet is built on BNB Chain (BSC) with plans to expand to Ethereum, Polygon, and other major L1/L2 networks. Our interoperability layer ensures seamless communication between supported chains." },
    { q: "Is the code audited?", a: "Yes, security is our top priority. All smart contracts undergo rigorous internal review and third-party audits before deployment. Audit reports will be made publicly available as we progress through our roadmap." },
    { q: "How do I run a validator?", a: "Validator documentation and setup guides will be released with our testnet launch in Q1 2026. Join our Telegram community to stay updated and be among the first to participate in network validation." },
    { q: "How can I get involved?", a: "Join our Telegram community to start mining CZN Points, follow us on X for updates, contribute to our open-source codebase, or reach out if you are interested in building on Cozanet." },
  ];

  return (
    <section id="faq" style={{ padding: "100px 24px", background: C.panel, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 56 }}>
          <Tag>FAQ</Tag>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text }}>
            Common <span style={{ color: C.gold }}>Questions</span>
          </h2>
        </Fade>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item, i) => (
            <Fade key={i} delay={i * 0.05}>
              <div style={{ background: C.bg, border: `1px solid ${open === i ? C.goldDim : C.border}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.2s" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{
                  width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer",
                  padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  color: C.text, fontSize: 15, fontWeight: 500,
                }}>
                  {item.q}
                  <span style={{ color: C.gold, fontSize: 18, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
                </button>
                {open === i && (
                  <div style={{ padding: "0 20px 18px", color: C.muted, fontSize: 14, lineHeight: 1.75 }}>{item.a}</div>
                )}
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <Fade style={{ textAlign: "center", marginBottom: 48 }}>
          <Tag>Contact</Tag>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: C.text, marginBottom: 14 }}>
            Let's <span style={{ color: C.gold }}>Build Together</span>
          </h2>
          <p style={{ color: C.muted, fontSize: 15, lineHeight: 1.7 }}>
            Whether you're integrating, validating, or experimenting with agents—reach out. We'd love to hear from you.
          </p>
        </Fade>
        <Fade delay={0.2}>
          {sent ? (
            <div style={{ textAlign: "center", padding: 40, background: "rgba(201,168,76,0.08)", border: `1px solid ${C.goldDim}`, borderRadius: 10, color: C.gold, fontSize: 16 }}>
              ✓ We'll get back to you as soon as possible.
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { field: "name", placeholder: "Name", type: "text" },
                { field: "email", placeholder: "Email", type: "email" },
              ].map(({ field, placeholder, type }) => (
                <input key={field} type={type} placeholder={placeholder} required
                  value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                  style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: "13px 16px", color: C.text, fontSize: 14, outline: "none" }} />
              ))}
              <textarea placeholder="Tell us what you're building..." required rows={5}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 6, padding: "13px 16px", color: C.text, fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
              <Btn>Send Message</Btn>
            </form>
          )}
          <div style={{ marginTop: 36, display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
            {[["✈️ Telegram", "https://t.me/cozanet"], ["𝕏 Twitter", "https://x.com/cozanet"], ["💻 GitHub", "https://github.com/cozanet"]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                style={{ color: C.muted, textDecoration: "none", fontSize: 13, display: "flex", gap: 6, alignItems: "center", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.gold}
                onMouseLeave={e => e.target.style.color = C.muted}>
                {label}
              </a>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: C.panel, borderTop: `1px solid ${C.border}`, padding: "40px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src={IMGS.logo} alt="Cozanet" style={{ height: 28, width: 28, objectFit: "contain" }} />
            <span style={{ fontWeight: 700, color: C.text, fontSize: 16 }}>Cozanet</span>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {["Privacy Policy", "Terms of Service"].map(l => (
              <a key={l} href="#" style={{ color: C.muted, fontSize: 12, textDecoration: "none" }}>{l}</a>
            ))}
            <span style={{ color: C.muted, fontSize: 12 }}>Contact: info@cozanet.net</span>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 20, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ color: C.muted, fontSize: 11 }}>© 2025 Cozanet. Built with transparency. No hype, just infrastructure.</span>
          <span style={{ color: C.goldDim, fontSize: 11 }}>The Future of African Remittance.</span>
        </div>
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    document.title = "Cozanet — The Future of African Remittance";
  }, []);

  return (
    <div style={{ background: C.bg, color: C.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        input::placeholder, textarea::placeholder { color: ${C.muted}; }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @media (max-width: 768px) {
          section > div { grid-template-columns: 1fr !important; direction: ltr !important; }
          nav > div > div:nth-child(2), nav > div > div:nth-child(3) > a:last-child { display: none !important; }
          nav > div > div:nth-child(3) > button { display: block !important; }
        }
      `}</style>
      <Nav active={active} setActive={setActive} />
      <Hero />
      <Protocol />
      <Agents />
      <Ecosystem />
      <UseCases />
      <Roadmap />
      <Token />
      <Team />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
