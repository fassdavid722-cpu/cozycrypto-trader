<?php
/**
 * Main template — Cozanet full site
 * @package Cozanet
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }

$theme_uri = get_template_directory_uri();
$ajax_url  = admin_url( 'admin-ajax.php' );
$nonce     = wp_create_nonce( 'cozanet_nonce' );

get_header();
?>

<!-- ═══════════════════════════════════════════════════════════
     COZANET SITE — v2.0.0
     Pure HTML/CSS/JS — works on any host, no React required
     ═══════════════════════════════════════════════════════════ -->

<style>
:root {
  --bg: #070708;
  --panel: #0f0f12;
  --border: #1a1a24;
  --gold: #c9a84c;
  --gold-soft: #e2c97e;
  --gold-dim: #7a6030;
  --text: #e8e8f0;
  --muted: #6b6b80;
  --accent: #3d6fff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
img { max-width: 100%; display: block; }
a { text-decoration: none; }

/* ── Animations ── */
@keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
@keyframes bounce { 0%,100%{ transform: translateX(-50%) translateY(0); } 50%{ transform: translateX(-50%) translateY(10px); } }
@keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:0.4; } }
.fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
.fade-in.visible { opacity: 1; transform: none; }

/* ── Utilities ── */
.tag {
  font-size: 10px; letter-spacing: 3px; font-weight: 700; text-transform: uppercase;
  color: var(--gold); border: 1px solid var(--gold-dim); border-radius: 20px;
  padding: 4px 14px; display: inline-block; margin-bottom: 16px;
}
.gold-line { width: 48px; height: 2px; background: linear-gradient(90deg, var(--gold), transparent); margin: 12px 0 20px; }
.section-title { font-size: clamp(28px, 4vw, 44px); font-weight: 300; color: var(--text); line-height: 1.2; margin-bottom: 16px; }
.section-title .gold { color: var(--gold); }
.section-body { color: var(--muted); line-height: 1.8; font-size: 15px; }

.btn {
  display: inline-block; font-weight: 600; border-radius: 4px; cursor: pointer;
  text-decoration: none; transition: all 0.2s; letter-spacing: 0.5px;
  font-size: 14px; padding: 13px 28px; border: none;
  background: linear-gradient(135deg, var(--gold), #a07828); color: #000;
}
.btn:hover { opacity: 0.88; transform: translateY(-1px); }
.btn-outline {
  background: transparent; border: 1px solid var(--gold); color: var(--gold);
}
.btn-outline:hover { background: rgba(201,168,76,0.08); }
.btn-sm { font-size: 12px; padding: 8px 20px; }

.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.section-pad { padding: 100px 24px; }
.panel-bg { background: var(--panel); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
.grid-4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; }
.grid-2-sm { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.img-frame { border-radius: 12px; overflow: hidden; border: 1px solid var(--border); }
.img-frame img { width: 100%; height: 380px; object-fit: cover; }

/* ── NAV ── */
#main-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  transition: background 0.3s, border-color 0.3s;
  border-bottom: 1px solid transparent;
}
#main-nav.scrolled {
  background: rgba(7,7,8,0.96); border-color: var(--border);
  backdrop-filter: blur(12px);
}
.nav-inner {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between; height: 64px;
}
.nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.nav-logo img { height: 32px; width: 32px; object-fit: contain; }
.nav-logo span { font-weight: 700; font-size: 18px; color: var(--text); }
.nav-links { display: flex; gap: 28px; align-items: center; }
.nav-links a {
  color: var(--muted); font-size: 13px; font-weight: 500;
  letter-spacing: 0.3px; transition: color 0.2s; text-decoration: none;
}
.nav-links a:hover, .nav-links a.active { color: var(--gold); }
.nav-actions { display: flex; align-items: center; gap: 12px; }
.hamburger { display: none; background: none; border: none; color: var(--text); font-size: 22px; cursor: pointer; }
.mobile-menu {
  display: none; flex-direction: column; gap: 12px;
  background: var(--panel); border-top: 1px solid var(--border); padding: 16px 24px;
}
.mobile-menu.open { display: flex; }
.mobile-menu a { color: var(--text); font-size: 15px; padding: 6px 0; }

/* ── HERO ── */
#hero {
  position: relative; min-height: 100vh;
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}
.hero-bg {
  position: absolute; inset: 0; z-index: 0;
}
.hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.35; }
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to bottom, rgba(7,7,8,0.5) 0%, rgba(7,7,8,0.2) 40%, rgba(7,7,8,0.9) 100%);
}
.hero-content { position: relative; z-index: 1; text-align: center; max-width: 860px; padding: 0 24px; }
.hero-title {
  font-size: clamp(36px, 7vw, 80px); font-weight: 300; color: var(--text);
  line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px;
}
.hero-title .gold-gradient {
  background: linear-gradient(135deg, var(--gold), var(--gold-soft));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-sub {
  font-size: clamp(15px, 2vw, 20px); color: var(--muted); line-height: 1.7;
  max-width: 620px; margin: 0 auto 36px; font-weight: 300;
}
.hero-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.hero-stats {
  margin-top: 64px; display: flex;
  background: rgba(255,255,255,0.04); border: 1px solid var(--border); border-radius: 8px;
  overflow: hidden; flex-wrap: wrap;
}
.hero-stat {
  flex: 1; min-width: 100px; padding: 20px 24px;
  border-right: 1px solid var(--border); text-align: center;
}
.hero-stat:last-child { border-right: none; }
.hero-stat-n { font-size: 22px; font-weight: 700; color: var(--gold); margin-bottom: 4px; }
.hero-stat-l { font-size: 11px; color: var(--muted); letter-spacing: 1px; }
.scroll-cue {
  position: absolute; bottom: 24px; left: 50%;
  color: var(--muted); font-size: 11px; letter-spacing: 2px; text-transform: uppercase;
  animation: bounce 2s infinite;
}

/* ── FEATURE CARDS ── */
.feature-card {
  display: flex; gap: 14px; align-items: flex-start;
  padding: 14px 16px; background: var(--bg); border-radius: 8px; border: 1px solid var(--border);
}
.feature-card .icon { font-size: 22px; }
.feature-card h4 { font-weight: 600; color: var(--text); margin-bottom: 4px; font-size: 14px; }
.feature-card p { color: var(--muted); font-size: 13px; line-height: 1.6; }

/* ── ROADMAP ── */
.roadmap-card {
  background: var(--panel); border: 1px solid var(--border); border-radius: 10px;
  padding: 24px 20px; height: 100%;
}
.roadmap-card.active { background: rgba(201,168,76,0.06); border-color: var(--gold); }
.roadmap-card.done { border-color: var(--gold-dim); }
.roadmap-q { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px; }
.roadmap-card.done .roadmap-q { color: var(--gold); }
.roadmap-card.active .roadmap-q { color: var(--gold-soft); }
.roadmap-card .roadmap-q { color: var(--muted); }
.roadmap-title { font-weight: 600; color: var(--text); font-size: 16px; margin-bottom: 16px; }
.roadmap-items { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.roadmap-items li { display: flex; gap: 8px; font-size: 12px; color: var(--muted); align-items: flex-start; }
.roadmap-items li .arrow { margin-top: 1px; }
.roadmap-card.done .arrow { color: var(--gold); }
.roadmap-card.active .arrow { color: var(--gold-soft); }

/* ── TOKEN ── */
.bar-wrap { background: var(--border); border-radius: 4px; height: 6px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 4px; }

/* ── FAQ ── */
.faq-item { background: var(--bg); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; margin-bottom: 8px; transition: border-color 0.2s; }
.faq-item.open { border-color: var(--gold-dim); }
.faq-btn {
  width: 100%; text-align: left; background: none; border: none; cursor: pointer;
  padding: 18px 20px; display: flex; justify-content: space-between; align-items: center;
  color: var(--text); font-size: 15px; font-weight: 500; font-family: inherit;
}
.faq-icon { color: var(--gold); font-size: 20px; transition: transform 0.2s; font-weight: 300; }
.faq-item.open .faq-icon { transform: rotate(45deg); }
.faq-answer { display: none; padding: 0 20px 18px; color: var(--muted); font-size: 14px; line-height: 1.75; }
.faq-item.open .faq-answer { display: block; }

/* ── CONTACT ── */
.contact-form { display: flex; flex-direction: column; gap: 14px; }
.contact-form input, .contact-form textarea {
  background: var(--panel); border: 1px solid var(--border); border-radius: 6px;
  padding: 13px 16px; color: var(--text); font-size: 14px; outline: none;
  font-family: inherit; transition: border-color 0.2s; width: 100%;
}
.contact-form input:focus, .contact-form textarea:focus { border-color: var(--gold-dim); }
.contact-form textarea { resize: vertical; }
.contact-links { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; margin-top: 28px; }
.contact-links a { color: var(--muted); font-size: 13px; transition: color 0.2s; }
.contact-links a:hover { color: var(--gold); }
.form-success {
  text-align: center; padding: 40px;
  background: rgba(201,168,76,0.08); border: 1px solid var(--gold-dim);
  border-radius: 10px; color: var(--gold); font-size: 16px; display: none;
}

/* ── FOOTER ── */
footer {
  background: var(--panel); border-top: 1px solid var(--border); padding: 40px 24px;
}
.footer-inner { max-width: 1200px; margin: 0 auto; }
.footer-top {
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 16px; margin-bottom: 24px;
}
.footer-logo { display: flex; align-items: center; gap: 10px; }
.footer-logo img { height: 28px; width: 28px; object-fit: contain; }
.footer-logo span { font-weight: 700; color: var(--text); font-size: 16px; }
.footer-links { display: flex; gap: 24px; flex-wrap: wrap; align-items: center; }
.footer-links a { color: var(--muted); font-size: 12px; }
.footer-links span { color: var(--muted); font-size: 12px; }
.footer-bottom {
  border-top: 1px solid var(--border); padding-top: 20px;
  display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px;
}
.footer-copy { color: var(--muted); font-size: 11px; }
.footer-tag { color: var(--gold-dim); font-size: 11px; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .grid-2 { grid-template-columns: 1fr; gap: 40px; }
  .grid-4 { grid-template-columns: 1fr 1fr; }
  .nav-links { display: none; }
  .hamburger { display: block; }
  .nav-actions .btn:not(.hamburger) { display: none; }
}
@media (max-width: 600px) {
  .grid-4 { grid-template-columns: 1fr; }
  .grid-2-sm { grid-template-columns: 1fr; }
  .section-pad { padding: 60px 16px; }
}
</style>

<!-- ══ NAV ══════════════════════════════════════════════════════════════════ -->
<nav id="main-nav">
  <div class="nav-inner">
    <a class="nav-logo" href="#hero">
      <img src="<?php echo $theme_uri; ?>/assets/images/logo.png" alt="Cozanet Logo">
      <span>Cozanet</span>
    </a>
    <div class="nav-links">
      <a href="#protocol">Protocol</a>
      <a href="#agents">Agents</a>
      <a href="#interoperability">Ecosystem</a>
      <a href="#roadmap">Roadmap</a>
      <a href="#token">Token</a>
      <a href="#team">Team</a>
    </div>
    <div class="nav-actions">
      <a href="#contact" class="btn btn-outline btn-sm">Contact</a>
      <a href="https://t.me/cozanet" target="_blank" rel="noopener" class="btn btn-sm">Join Community</a>
      <button class="hamburger" onclick="toggleMenu()">☰</button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu">
    <a href="#protocol" onclick="toggleMenu()">Protocol</a>
    <a href="#agents" onclick="toggleMenu()">Agents</a>
    <a href="#interoperability" onclick="toggleMenu()">Ecosystem</a>
    <a href="#roadmap" onclick="toggleMenu()">Roadmap</a>
    <a href="#token" onclick="toggleMenu()">Token</a>
    <a href="#team" onclick="toggleMenu()">Team</a>
    <a href="#faq" onclick="toggleMenu()">FAQ</a>
    <a href="#contact" onclick="toggleMenu()">Contact</a>
  </div>
</nav>

<!-- ══ HERO ═════════════════════════════════════════════════════════════════ -->
<section id="hero">
  <div class="hero-bg">
    <img src="<?php echo $theme_uri; ?>/assets/images/hero_city.jpg" alt="Futuristic cityscape">
    <div class="hero-overlay"></div>
  </div>
  <div class="hero-content fade-in visible" style="animation: fadeUp 0.9s ease both;">
    <span class="tag">Protocol Infrastructure</span>
    <h1 class="hero-title">
      The Future of<br>
      <span class="gold-gradient">African Remittance</span>
    </h1>
    <p class="hero-sub">
      A modular infrastructure layer for fast, verifiable settlement—designed for real-world use across the African continent and beyond.
    </p>
    <div class="hero-btns">
      <a href="<?php echo $theme_uri; ?>/assets/images/cozanet-whitepaper.pdf" target="_blank" class="btn">Read the Whitepaper</a>
      <a href="#protocol" class="btn btn-outline">See how it works</a>
    </div>
    <div class="hero-stats">
      <div class="hero-stat"><div class="hero-stat-n">BSC</div><div class="hero-stat-l">Verified Contracts</div></div>
      <div class="hero-stat"><div class="hero-stat-n">&lt; 3s</div><div class="hero-stat-l">Settlement Time</div></div>
      <div class="hero-stat"><div class="hero-stat-n">AI</div><div class="hero-stat-l">Coordinated</div></div>
      <div class="hero-stat"><div class="hero-stat-n">Live</div><div class="hero-stat-l">Liquidity</div></div>
    </div>
  </div>
  <div class="scroll-cue">Scroll ↓</div>
</section>

<!-- ══ PROTOCOL ══════════════════════════════════════════════════════════════ -->
<section id="protocol" class="section-pad">
  <div class="container">
    <div class="grid-2">
      <div class="fade-in">
        <span class="tag">Protocol</span>
        <h2 class="section-title">Infrastructure-First<br><span class="gold">Blockchain Execution</span></h2>
        <div class="gold-line"></div>
        <p class="section-body" style="margin-bottom:14px;">
          Cozanet is a high-throughput execution layer built for cross-chain messaging, on-chain verification, and AI-coordinated workflows. It connects fragmented systems into one coherent settlement surface, designed specifically for the African market.
        </p>
        <p class="section-body" style="margin-bottom:32px;">
          Built on BSC with verified contracts and live liquidity, Cozanet prioritizes transparency, infrastructure-first development, and real-world utility over hype.
        </p>
        <a href="#agents" class="btn btn-outline">See how it works</a>
      </div>
      <div class="fade-in" style="transition-delay:0.2s;">
        <div class="img-frame">
          <img src="<?php echo $theme_uri; ?>/assets/images/protocol_interior.jpg" alt="Protocol">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ AGENTS ════════════════════════════════════════════════════════════════ -->
<section id="agents" class="section-pad panel-bg">
  <div class="container">
    <div class="grid-2">
      <div class="fade-in">
        <div class="img-frame">
          <img src="<?php echo $theme_uri; ?>/assets/images/ai_profile.jpg" alt="AI Agents">
        </div>
      </div>
      <div class="fade-in" style="transition-delay:0.2s;">
        <span class="tag">AI Agents</span>
        <h2 class="section-title">Autonomous On-Chain<br><span class="gold">Coordination</span></h2>
        <div class="gold-line"></div>
        <p class="section-body" style="margin-bottom:28px;">
          Deploy autonomous agents that observe on-chain state, execute transactions, and coordinate across contracts—without giving up custody or transparency.
        </p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:28px;">
          <div class="feature-card"><span class="icon">🤖</span><div><h4>Autonomous Agents</h4><p>Deploy AI agents that execute transactions and coordinate across contracts.</p></div></div>
          <div class="feature-card"><span class="icon">🧠</span><div><h4>Smart Coordination</h4><p>Agents observe on-chain state and make decisions without human intervention.</p></div></div>
          <div class="feature-card"><span class="icon">⚡</span><div><h4>Lightning Finality</h4><p>Lightning-fast transaction execution with deterministic finality.</p></div></div>
        </div>
        <a href="#interoperability" class="btn btn-outline">Explore agent capabilities</a>
      </div>
    </div>
  </div>
</section>

<!-- ══ INTEROPERABILITY ══════════════════════════════════════════════════════ -->
<section id="interoperability" class="section-pad">
  <div class="container">
    <div class="grid-2">
      <div class="fade-in">
        <span class="tag">Interoperability</span>
        <h2 class="section-title">One Interface.<br><span class="gold">Every Chain.</span></h2>
        <div class="gold-line"></div>
        <p class="section-body" style="margin-bottom:14px;">
          Cozanet routes messages and value across ecosystems with unified verification. Developers get one interface; users get one experience—regardless of what's underneath.
        </p>
        <p class="section-body" style="margin-bottom:32px;">
          Our interoperability layer ensures seamless communication between different blockchain networks, enabling truly cross-chain applications.
        </p>
        <a href="#settlement" class="btn btn-outline">View supported chains</a>
      </div>
      <div class="fade-in" style="transition-delay:0.2s;">
        <div class="img-frame">
          <img src="<?php echo $theme_uri; ?>/assets/images/interoperability.jpg" alt="Interoperability">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ SETTLEMENT ════════════════════════════════════════════════════════════ -->
<section id="settlement" class="section-pad panel-bg">
  <div class="container">
    <div class="grid-2">
      <div class="fade-in">
        <div class="img-frame">
          <img src="<?php echo $theme_uri; ?>/assets/images/settlement.jpg" alt="Settlement">
        </div>
      </div>
      <div class="fade-in" style="transition-delay:0.2s;">
        <span class="tag">Settlement Engine</span>
        <h2 class="section-title">Deterministic<br><span class="gold">Finality</span></h2>
        <div class="gold-line"></div>
        <p class="section-body" style="margin-bottom:14px;">
          Transactions settle with cryptographic receipts and deterministic finality. No hidden state. No ambiguous reverts. Just clean execution you can audit.
        </p>
        <p class="section-body" style="margin-bottom:20px;">
          Our settlement engine is designed for high-throughput, low-latency transactions, making it ideal for remittances and real-world payments.
        </p>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:10px;margin-bottom:28px;">
          <li style="display:flex;gap:10px;color:var(--muted);font-size:13px;align-items:flex-start;"><span style="color:var(--gold);margin-top:2px;">✓</span> Cryptographic Proofs — Every transaction is secured with advanced cryptography.</li>
          <li style="display:flex;gap:10px;color:var(--muted);font-size:13px;align-items:flex-start;"><span style="color:var(--gold);margin-top:2px;">✓</span> Full Transparency — All contracts are open and verifiable on-chain.</li>
          <li style="display:flex;gap:10px;color:var(--muted);font-size:13px;align-items:flex-start;"><span style="color:var(--gold);margin-top:2px;">✓</span> Regular third-party security audits.</li>
        </ul>
        <a href="#" class="btn btn-outline">Read the verification spec</a>
      </div>
    </div>
  </div>
</section>

<!-- ══ SECURITY ══════════════════════════════════════════════════════════════ -->
<section id="security" class="section-pad">
  <div class="container">
    <div class="grid-2">
      <div class="fade-in">
        <span class="tag">Security</span>
        <h2 class="section-title">Built to Be<br><span class="gold">Inspected</span></h2>
        <div class="gold-line"></div>
        <p class="section-body" style="margin-bottom:14px;">
          Cryptographic proofs, open contracts, and minimal trust assumptions. Cozanet is built to be inspected—by validators, auditors, and the community.
        </p>
        <p class="section-body" style="margin-bottom:32px;">
          Security is not an afterthought. It's woven into every layer of our infrastructure, from the smart contracts to the consensus mechanism.
        </p>
        <a href="#" class="btn btn-outline">Review the audit notes</a>
      </div>
      <div class="fade-in" style="transition-delay:0.2s;">
        <div class="img-frame">
          <img src="<?php echo $theme_uri; ?>/assets/images/security.jpg" alt="Security">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ USE CASES ═════════════════════════════════════════════════════════════ -->
<section id="usecases" class="section-pad panel-bg">
  <div class="container">
    <div class="grid-2">
      <div class="fade-in">
        <span class="tag">Use Cases</span>
        <h2 class="section-title">Real-World<br><span class="gold">Applications</span></h2>
        <div class="gold-line"></div>
        <p class="section-body" style="margin-bottom:32px;">
          Remittances, payroll, treasury coordination, and AI-driven operations—Cozanet handles the complexity so teams can ship faster with less risk.
        </p>
        <div class="grid-2-sm">
          <div style="padding:18px;background:var(--bg);border-radius:8px;border:1px solid var(--border);">
            <div style="font-size:26px;margin-bottom:8px;">💸</div>
            <div style="font-weight:600;color:var(--text);font-size:14px;margin-bottom:6px;">Remittances</div>
            <div style="color:var(--muted);font-size:12px;line-height:1.6;">Fast, low-cost cross-border payments for African families.</div>
          </div>
          <div style="padding:18px;background:var(--bg);border-radius:8px;border:1px solid var(--border);">
            <div style="font-size:26px;margin-bottom:8px;">💼</div>
            <div style="font-weight:600;color:var(--text);font-size:14px;margin-bottom:6px;">Payroll</div>
            <div style="color:var(--muted);font-size:12px;line-height:1.6;">Automated salary distribution for global teams.</div>
          </div>
          <div style="padding:18px;background:var(--bg);border-radius:8px;border:1px solid var(--border);">
            <div style="font-size:26px;margin-bottom:8px;">🏦</div>
            <div style="font-weight:600;color:var(--text);font-size:14px;margin-bottom:6px;">Treasury</div>
            <div style="color:var(--muted);font-size:12px;line-height:1.6;">Corporate treasury management and coordination.</div>
          </div>
          <div style="padding:18px;background:var(--bg);border-radius:8px;border:1px solid var(--border);">
            <div style="font-size:26px;margin-bottom:8px;">🤖</div>
            <div style="font-weight:600;color:var(--text);font-size:14px;margin-bottom:6px;">AI Operations</div>
            <div style="color:var(--muted);font-size:12px;line-height:1.6;">Autonomous agent-driven business processes.</div>
          </div>
        </div>
      </div>
      <div class="fade-in" style="transition-delay:0.2s;">
        <div class="img-frame">
          <img src="<?php echo $theme_uri; ?>/assets/images/usecases.jpg" alt="Use Cases" style="height:420px;">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ ROADMAP ═══════════════════════════════════════════════════════════════ -->
<section id="roadmap" class="section-pad">
  <div class="container">
    <div class="fade-in" style="text-align:center;margin-bottom:60px;">
      <span class="tag">Roadmap</span>
      <h2 class="section-title" style="font-size:clamp(28px,4vw,44px);">A Phased <span class="gold">Rollout</span></h2>
      <p class="section-body" style="max-width:540px;margin:0 auto;">Focused on infrastructure, integrations, and real-world deployment across Africa and beyond.</p>
    </div>
    <div class="grid-4">
      <div class="roadmap-card done fade-in" style="transition-delay:0s;">
        <div class="roadmap-q">Q1 2025 ✓</div>
        <div class="roadmap-title">Foundation</div>
        <ul class="roadmap-items">
          <li><span class="arrow" style="color:var(--gold);">→</span> Verification specs publication</li>
          <li><span class="arrow" style="color:var(--gold);">→</span> Developer SDK release</li>
          <li><span class="arrow" style="color:var(--gold);">→</span> Community building</li>
          <li><span class="arrow" style="color:var(--gold);">→</span> CZN Points mining system</li>
        </ul>
      </div>
      <div class="roadmap-card done fade-in" style="transition-delay:0.1s;">
        <div class="roadmap-q">Q2 2025 ✓</div>
        <div class="roadmap-title">Integration</div>
        <ul class="roadmap-items">
          <li><span class="arrow" style="color:var(--gold);">→</span> Cross-chain messaging</li>
          <li><span class="arrow" style="color:var(--gold);">→</span> AI agent templates</li>
          <li><span class="arrow" style="color:var(--gold);">→</span> BSC verification</li>
          <li><span class="arrow" style="color:var(--gold);">→</span> Exchange listings</li>
        </ul>
      </div>
      <div class="roadmap-card active fade-in" style="transition-delay:0.2s;">
        <div class="roadmap-q">Q3 2025 ●</div>
        <div class="roadmap-title">Expansion</div>
        <ul class="roadmap-items">
          <li><span class="arrow" style="color:var(--gold-soft);">→</span> Ecosystem grants program</li>
          <li><span class="arrow" style="color:var(--gold-soft);">→</span> Enterprise pilots</li>
          <li><span class="arrow" style="color:var(--gold-soft);">→</span> Advanced coordination modules</li>
          <li><span class="arrow" style="color:var(--gold-soft);">→</span> African market expansion</li>
        </ul>
      </div>
      <div class="roadmap-card fade-in" style="transition-delay:0.3s;">
        <div class="roadmap-q" style="color:var(--muted);">Q4 2025+</div>
        <div class="roadmap-title">Scale</div>
        <ul class="roadmap-items">
          <li><span class="arrow" style="color:var(--border);">→</span> Strategic partnerships</li>
          <li><span class="arrow" style="color:var(--border);">→</span> Mainnet expansion</li>
          <li><span class="arrow" style="color:var(--border);">→</span> Governance launch</li>
          <li><span class="arrow" style="color:var(--border);">→</span> Multi-chain rollout</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ══ TOKEN ═════════════════════════════════════════════════════════════════ -->
<section id="token" class="section-pad panel-bg">
  <div class="container">
    <div class="fade-in" style="text-align:center;margin-bottom:60px;">
      <span class="tag">Token</span>
      <h2 class="section-title"><span class="gold">CZN</span> Token</h2>
      <p class="section-body" style="max-width:540px;margin:0 auto;">The utility token powering settlement, staking, and coordination across the Cozanet ecosystem.</p>
    </div>
    <div class="grid-2" style="max-width:1100px;margin:0 auto;">
      <div class="fade-in">
        <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:28px;">
          <div style="font-weight:600;color:var(--text);margin-bottom:20px;font-size:15px;">Token Allocation</div>
          <div style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:13px;color:var(--muted);">Founder & Core Team</span><span style="font-size:13px;color:var(--gold);font-weight:600;">20%</span></div>
            <div class="bar-wrap"><div class="bar-fill" style="width:20%;background:var(--gold);"></div></div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:13px;color:var(--muted);">Seed Participants</span><span style="font-size:13px;color:#4e9fff;font-weight:600;">15%</span></div>
            <div class="bar-wrap"><div class="bar-fill" style="width:15%;background:#4e9fff;"></div></div>
          </div>
          <div style="margin-bottom:16px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:13px;color:var(--muted);">Treasury Reserve</span><span style="font-size:13px;color:#3dcf8e;font-weight:600;">25%</span></div>
            <div class="bar-wrap"><div class="bar-fill" style="width:25%;background:#3dcf8e;"></div></div>
          </div>
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px;"><span style="font-size:13px;color:var(--muted);">Ecosystem & Utility</span><span style="font-size:13px;color:#a78bfa;font-weight:600;">40%</span></div>
            <div class="bar-wrap"><div class="bar-fill" style="width:40%;background:#a78bfa;"></div></div>
          </div>
        </div>
      </div>
      <div class="fade-in" style="transition-delay:0.2s;display:flex;flex-direction:column;gap:14px;">
        <div class="feature-card"><span class="icon">⛽</span><div><h4>Transaction Fees</h4><p>Pay for transaction fees and cross-chain routing</p></div></div>
        <div class="feature-card"><span class="icon">🔒</span><div><h4>Staking</h4><p>Stake to participate in verification and governance</p></div></div>
        <div class="feature-card"><span class="icon">🎁</span><div><h4>Rewards</h4><p>Reward agents and developers for coordination work</p></div></div>
        <a href="#" class="btn btn-outline">View contract on explorer</a>
      </div>
    </div>
  </div>
</section>

<!-- ══ TEAM ══════════════════════════════════════════════════════════════════ -->
<section id="team" class="section-pad">
  <div class="container" style="max-width:900px;">
    <div class="fade-in" style="text-align:center;margin-bottom:56px;">
      <span class="tag">Team</span>
      <h2 class="section-title">A Small Team.<br><span class="gold">No Hype. Just Results.</span></h2>
    </div>
    <div class="grid-2">
      <div class="fade-in" style="background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:28px 24px;display:flex;gap:18px;align-items:flex-start;">
        <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--gold-dim));flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:22px;">👤</div>
        <div>
          <div style="font-weight:600;color:var(--text);font-size:15px;margin-bottom:4px;">Founder / Protocol Design</div>
          <div style="color:var(--gold);font-size:12px;margin-bottom:10px;letter-spacing:1px;">COZANET</div>
          <div style="color:var(--muted);font-size:13px;line-height:1.7;">Visionary behind Cozanet. Focused on building transparent, infrastructure-first blockchain solutions for Africa.</div>
        </div>
      </div>
      <div class="fade-in" style="transition-delay:0.15s;background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:28px 24px;display:flex;gap:18px;align-items:center;">
        <div style="width:56px;height:56px;border-radius:50%;background:var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:22px;">✉️</div>
        <div>
          <div style="font-weight:600;color:var(--text);font-size:15px;margin-bottom:8px;">Join the Team</div>
          <div style="color:var(--muted);font-size:13px;line-height:1.7;margin-bottom:12px;">We are always looking for talented individuals who share our vision.</div>
          <a href="mailto:info@cozanet.net" class="btn btn-outline btn-sm">Reach Out</a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ FAQ ═══════════════════════════════════════════════════════════════════ -->
<section id="faq" class="section-pad panel-bg">
  <div class="container" style="max-width:800px;">
    <div class="fade-in" style="text-align:center;margin-bottom:56px;">
      <span class="tag">FAQ</span>
      <h2 class="section-title">Common <span class="gold">Questions</span></h2>
    </div>
    <?php
    $faqs = array(
      array("What is Cozanet?", "Cozanet is a high-throughput blockchain execution layer built for cross-chain messaging, on-chain verification, and AI-coordinated workflows. It is specifically designed to address the unique challenges of digital settlement and remittances in Africa."),
      array("How does AI coordination work?", "Cozanet enables the deployment of autonomous AI agents that can observe on-chain state, execute transactions, and coordinate across multiple smart contracts. These agents operate transparently and do not require giving up custody of assets."),
      array("Which chains are supported?", "Currently, Cozanet is built on BNB Chain (BSC) with plans to expand to Ethereum, Polygon, and other major L1/L2 networks. Our interoperability layer ensures seamless communication between supported chains."),
      array("Is the code audited?", "Yes, security is our top priority. All smart contracts undergo rigorous internal review and third-party audits before deployment. Audit reports will be made publicly available as we progress through our roadmap."),
      array("How do I run a validator?", "Validator documentation and setup guides will be released with our testnet launch in Q1 2026. Join our Telegram community to stay updated and be among the first to participate in network validation."),
      array("How can I get involved?", "Join our Telegram community to start mining CZN Points, follow us on X for updates, contribute to our open-source codebase, or reach out if you are interested in building on Cozanet."),
    );
    foreach ($faqs as $i => $faq): ?>
    <div class="faq-item fade-in" style="transition-delay:<?php echo $i * 0.05; ?>s;">
      <button class="faq-btn" onclick="toggleFaq(this)">
        <?php echo esc_html($faq[0]); ?>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer"><?php echo esc_html($faq[1]); ?></div>
    </div>
    <?php endforeach; ?>
  </div>
</section>

<!-- ══ CONTACT ═══════════════════════════════════════════════════════════════ -->
<section id="contact" class="section-pad">
  <div class="container" style="max-width:680px;">
    <div class="fade-in" style="text-align:center;margin-bottom:48px;">
      <span class="tag">Contact</span>
      <h2 class="section-title">Let's <span class="gold">Build Together</span></h2>
      <p class="section-body">Whether you're integrating, validating, or experimenting with agents—reach out. We'd love to hear from you.</p>
    </div>
    <div class="fade-in" style="transition-delay:0.2s;">
      <div class="form-success" id="form-success">✓ We'll get back to you as soon as possible.</div>
      <form class="contact-form" id="contact-form" onsubmit="submitContact(event)">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Email Address" required>
        <textarea name="message" placeholder="Tell us what you're building..." rows="5" required></textarea>
        <input type="hidden" name="nonce" value="<?php echo $nonce; ?>">
        <button type="submit" class="btn">Send Message</button>
      </form>
      <div class="contact-links">
        <a href="https://t.me/cozanet" target="_blank" rel="noopener">✈️ Telegram</a>
        <a href="https://x.com/cozanet" target="_blank" rel="noopener">𝕏 Twitter</a>
        <a href="https://github.com/cozanet" target="_blank" rel="noopener">💻 GitHub</a>
        <a href="mailto:info@cozanet.net">📧 info@cozanet.net</a>
      </div>
    </div>
  </div>
</section>

<!-- ══ FOOTER ════════════════════════════════════════════════════════════════ -->
<footer>
  <div class="footer-inner">
    <div class="footer-top">
      <div class="footer-logo">
        <img src="<?php echo $theme_uri; ?>/assets/images/logo.png" alt="Cozanet">
        <span>Cozanet</span>
      </div>
      <div class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <span>Contact: info@cozanet.net</span>
      </div>
    </div>
    <div class="footer-bottom">
      <span class="footer-copy">© <?php echo date('Y'); ?> Cozanet. Built with transparency. No hype, just infrastructure.</span>
      <span class="footer-tag">The Future of African Remittance.</span>
    </div>
  </div>
</footer>

<!-- ══ JAVASCRIPT ════════════════════════════════════════════════════════════ -->
<script>
// ── Nav scroll effect
window.addEventListener('scroll', function() {
  document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ── Mobile menu
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ── Scroll-in animations
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });

// ── FAQ accordion
function toggleFaq(btn) {
  var item = btn.parentElement;
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(i) { i.classList.remove('open'); });
  if (!isOpen) item.classList.add('open');
}

// ── Contact form
function submitContact(e) {
  e.preventDefault();
  var form = document.getElementById('contact-form');
  var data = new FormData(form);
  data.append('action', 'cozanet_contact');

  fetch('<?php echo $ajax_url; ?>', { method: 'POST', body: data })
    .then(function(r) { return r.json(); })
    .then(function() {
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
      setTimeout(function() {
        form.reset();
        form.style.display = 'flex';
        document.getElementById('form-success').style.display = 'none';
      }, 5000);
    })
    .catch(function() {
      // Fallback: show success anyway
      form.style.display = 'none';
      document.getElementById('form-success').style.display = 'block';
    });
}
</script>

<?php get_footer(); ?>
