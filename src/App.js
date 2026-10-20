import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Outlet, Route, useLocation, Routes } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Data strategy",
    description:
      "Find the right questions, signals, and structure before investing in the wrong solution.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Analytics & insight",
    description:
      "Turn scattered information into useful answers your whole team can act on.",
    icon: "⌁",
  },
  {
    number: "03",
    title: "AI & automation",
    description:
      "Build practical, responsible workflows that give good ideas room to grow.",
    icon: "✳",
  },
  {
    number: "04",
    title: "Digital experiences",
    description:
      "Make complex tools feel simple, with thoughtful products designed around people.",
    icon: "◫",
  },
];

const projects = [
  {
    type: "Customer intelligence",
    title: "Seeing the whole customer journey",
    tone: "project-blue",
    visual: "journey",
    description:
      "A sample case-study layout. Add the real challenge, approach, evidence, and approved outcomes here.",
  },
  {
    type: "Data experience",
    title: "Making complex information feel clear",
    tone: "project-green",
    visual: "signal",
    description:
      "A sample case-study layout. Replace this copy with a verified project story and client-approved details.",
  },
];

const caseStudies = [
  {
    type: "Multilingual AI",
    title: "Empowering global AI through expert language solutions",
    client: "Global AI initiatives",
    overview:
      "Datovia Playhouse supports multilingual AI systems with language services, data annotation, localization, and AI training solutions—combining linguistic expertise with technology to help systems communicate across languages and cultures.",
    challenge: [
      "Inconsistent multilingual training data and limited access to qualified language experts.",
      "Cultural nuances lost in translation and quality challenges when scaling across markets.",
      "The need for more accurate, localized AI experiences that earn user trust.",
    ],
    approach: [
      "Analyze project requirements, target markets, and intended use.",
      "Match linguists and AI specialists to the required languages and domains.",
      "Prepare, annotate, and validate datasets with linguistic quality assurance.",
      "Refine deliverables using feedback and evolving project requirements.",
    ],
    outcomes: [
      "More culturally relevant language data for AI development.",
      "Scalable linguistic quality support across global markets.",
      "A structured delivery approach designed to support localization and model improvement.",
    ],
    scope: ["Data annotation", "AI training and evaluation", "Localization & transcreation", "Linguistic QA"],
  },
  {
    type: "Speech data collection & transcription",
    title: "Delivering 1,000+ hours of speech data for AI innovation",
    client: "Shaip",
    overview:
      "Shaip, an AI data platform company, needed a delivery partner to collect and process large-scale multilingual audio data for speech and language model development. Datovia Playhouse provided an end-to-end managed speech data and transcription workflow.",
    challenge: [
      "Collect large volumes of speech across varied demographics and regions.",
      "Transcribe raw audio accurately while maintaining consistent quality.",
      "Meet project timelines, privacy requirements, and changing scale needs.",
    ],
    approach: [
      "Recruit and onboard a diverse pool of native-speaking contributors and transcription specialists.",
      "Coordinate speech collection across regions and participant groups.",
      "Transcribe audio and run multiple rounds of validation and expert review.",
      "Apply quality checks and securely deliver datasets to the project requirements.",
    ],
    outcomes: [
      "Delivered more than 1,000 hours of raw speech data.",
      "Completed transcription and delivery milestones within the project timelines.",
      "Supported multilingual speech-model training with a scalable, managed workflow.",
      "Maintained the project’s stated security and confidentiality requirements.",
    ],
    scope: ["Speech data collection", "Transcription", "Multiple languages and dialects", "End-to-end managed delivery"],
  },
  {
    type: "Speech AI & audio annotation",
    title: "Advancing speech AI with high-accuracy audio annotation",
    client: "Fano Labs",
    overview:
      "Fano Labs develops speech recognition, natural language processing, and conversational intelligence solutions. Datovia Playhouse supported its speech-to-text and audio intelligence work by turning complex multilingual recordings into structured, AI-ready data.",
    challenge: [
      "Handle diverse accents, dialects, and speaking styles across large audio datasets.",
      "Transcribe conversations accurately, including noisy and overlapping speech.",
      "Keep annotation workflows consistent and quality high at scale.",
    ],
    approach: [
      "Assess audio complexity and design workflows around the project guidelines.",
      "Assign linguists and annotators based on language, accent, and domain expertise.",
      "Segment, annotate, and transcribe audio using standardized protocols.",
      "Run layered validation, error correction, and expert review before secure delivery.",
    ],
    outcomes: [
      "Achieved the project-reported 95%+ accuracy target across annotation and transcription tasks.",
      "Delivered structured speech data to support model training and optimization.",
      "Helped strengthen speech-model coverage across accents, dialects, and real-world audio.",
      "Met delivery timelines while maintaining the project’s quality requirements.",
    ],
    scope: ["Audio annotation", "Speech-to-text transcription", "General audio transcription", "Managed delivery"],
  },
];

const solutionCards = [
  {
    title: "Data annotation",
    description:
      "Datovia Playhouse delivers carefully labeled, high-quality datasets that help AI systems learn from real-world content. Our teams annotate text, images, audio, and video to your guidelines, with linguistic expertise and quality checks at every stage.",
    deliverables: ["Text, image, audio & video labeling", "Multilingual and domain-specific annotation", "Validation and quality review"],
  },
  {
    title: "Data collection",
    description:
      "Datovia Playhouse gathers diverse, high-quality data to power AI training and research. We coordinate contributor recruitment and managed collection workflows for speech, text, and other media—built around your project scope and requirements.",
    deliverables: ["Speech and multimedia data collection", "Contributor sourcing and coordination", "Managed, scalable project delivery"],
  },
  {
    title: "Data and model evaluation",
    description:
      "Datovia Playhouse helps teams understand how well their data and AI models perform. We review model outputs for accuracy, consistency, relevance, and language quality, then provide structured human feedback to guide improvement.",
    deliverables: ["Dataset review and validation", "Model response evaluation", "Human feedback and actionable quality insights"],
  },
  {
    title: "Conversational AI",
    description:
      "Datovia Playhouse helps conversational AI understand people and respond naturally. We support chatbot and voice-assistant development with language data, dialogue annotation, transcription, and testing across languages and real-world conversations.",
    deliverables: ["Dialogue and intent annotation", "Speech transcription and language review", "Multilingual conversational testing"],
  },
];

const languages = ["English", "Hindi", "Add supported language"];
const partnerLogos = [
  { name: "Appen" },
  { name: "Google Cloud", src: "/logos/google-cloud.svg" },
  { name: "TransPerfect", src: "/logos/transperfect-cropped.png" },
  { name: "LXT AI", src: "/logos/lxt-ai-cropped.png" },
  { name: "Razorpay", src: "/logos/razorpay-logo.svg" },
  { name: "Shiprocket", src: "/logos/shiprocket.svg" },
  { name: "DataBacker", src: "/logos/databacker-cropped.png" },
  { name: "Uber", src: "/logos/uber.svg" },
];

function ArrowIcon({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Brand({ light = false, logo = false }) {
  return (
    <Link className={`brand${light ? " brand-light" : ""}`} to="/" aria-label="Datovia Playhouse home">
      {logo ? (
        <span className="brand-logo-crop" aria-hidden="true">
          <img src="/logos/datoviaplayhouselogo.png" alt="" />
        </span>
      ) : (
        <>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">
            datovia<span>playhouse</span>
          </span>
        </>
      )}
    </Link>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand logo />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          <a href="/#work" onClick={closeMenu}>Our work</a>
          <a href="/#services" onClick={closeMenu}>Capabilities</a>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/careers" onClick={closeMenu}>Careers</Link>
          <Link className="nav-contact" to="/contact" onClick={closeMenu}>Contact <ArrowIcon diagonal /></Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-main">
        <div className="footer-brand-col">
          <Brand light logo />
          <p>Curious by nature.<br />Clear by design.</p>
        </div>
        <div className="footer-links-col">
          <span className="footer-label">EXPLORE</span>
          <a href="/#work">Our work</a><Link to="/about">About</Link><Link to="/careers">Careers</Link>
        </div>
        <div className="footer-links-col">
          <span className="footer-label">SOLUTIONS</span>
          <a href="/#services">Capabilities</a><Link to="/solutions">Our solutions</Link>
        </div>
        <div className="footer-links-col">
          <span className="footer-label">RESOURCES</span>
          <Link to="/blog">Blog</Link><Link to="/case-studies">Case studies</Link><Link to="/faq">FAQ</Link>
        </div>
        <div className="footer-links-col">
          <span className="footer-label">SAY HELLO</span>
          <Link to="/contact">Contact us</Link>
          <a href="mailto:hello@datoviaplayhouse.com">hello@datoviaplayhouse.com</a>
          <a href="tel:+916000034322">(+91) 6000-034-322</a>
          <address className="footer-address">NRRD Office: House No. 210, Ashraful House, 2nd Floor, Shernagar, Dhubri, Assam – 783335, India</address>
        </div>
        <div className="footer-links-col footer-legal">
          <span className="footer-label">THE DETAILS</span>
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/terms-and-conditions">Terms & conditions</Link>
          <Link to="/supplier-code-of-conduct">Supplier code of conduct</Link>
          <Link to="/data-governance-and-compliance-policy">Data governance and compliance policy</Link>
          <Link to="/remote-work-device-security-agreement">Remote work device security agreement</Link>
        </div>
      </div>
      <div className="section-wrap footer-bottom">
        <span>© {new Date().getFullYear()} Datovia Playhouse. All rights reserved.</span>
        <span>Made with curiosity <i>✳</i></span>
      </div>
    </footer>
  );
}

function DashboardVisual() {
  return (
    <div className="dashboard" aria-label="Illustrative data dashboard">
      <div className="dashboard-top">
        <div>
          <span className="dashboard-eyebrow">SIGNAL / 01</span>
          <p>Growth, in focus.</p>
        </div>
        <span className="dashboard-menu" aria-hidden="true">•••</span>
      </div>
      <div className="dashboard-stat">
        <strong>+24.8%</strong>
        <span><i /> Directional trend</span>
      </div>
      <div className="chart-area">
        <div className="chart-y-labels" aria-hidden="true">
          <span>100</span><span>75</span><span>50</span><span>25</span>
        </div>
        <svg viewBox="0 0 420 150" role="img" aria-label="Illustrative rising trend line">
          <defs>
            <linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3c7f7a" stopOpacity=".32" />
              <stop offset="100%" stopColor="#3c7f7a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 126 C45 112 55 119 91 96 S145 102 176 72 226 87 262 54 314 68 346 34 390 42 420 12 V150 H0Z" fill="url(#chart-fill)" />
          <path d="M0 126 C45 112 55 119 91 96 S145 102 176 72 226 87 262 54 314 68 346 34 390 42 420 12" fill="none" stroke="#3c7f7a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="346" cy="34" r="5" fill="#a7cfcc" stroke="#214542" strokeWidth="3" />
        </svg>
        <div className="chart-x-labels" aria-hidden="true">
          <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span>
        </div>
      </div>
      <div className="dashboard-bottom">
        <span><i className="legend-dot" /> Illustrative data only</span>
        <span>View insights <ArrowIcon diagonal /></span>
      </div>
      <div className="floating-note">
        <span className="note-icon">✳</span>
        <span><b>More signal.</b><small>Less noise.</small></span>
      </div>
    </div>
  );
}

function ProjectVisual({ type }) {
  if (type === "journey") {
    return (
      <div className="journey-visual" aria-hidden="true">
        <div className="journey-ring ring-one" />
        <div className="journey-ring ring-two" />
        <div className="journey-ring ring-three" />
        <span className="journey-center">people<br />+ data</span>
        <span className="journey-label label-one">Listen</span>
        <span className="journey-label label-two">Learn</span>
        <span className="journey-label label-three">Improve</span>
      </div>
    );
  }

  return (
    <div className="signal-visual" aria-hidden="true">
      {[34, 54, 42, 72, 63, 87, 68, 96, 76, 105, 88, 122, 98, 136].map((height, index) => (
        <span key={index} style={{ height: `${height}px`, opacity: 0.35 + index * 0.045 }} />
      ))}
      <div className="signal-caption">FIND THE PATTERN<span>→</span></div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> DATA, MADE HUMAN</div>
            <h1>Clarity in<br />every <span>data point.</span></h1>
            <p className="hero-description">
              We help ambitious teams turn complex data into confident decisions and better digital experiences.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#contact">Let’s make sense of it <ArrowIcon diagonal /></a>
              <a className="text-link" href="#work">Explore our approach <ArrowIcon /></a>
            </div>
            <div className="hero-proof">
              <span className="proof-icon">✳</span>
              <p>Curious by nature.<br /><b>Clear by design.</b></p>
            </div>
          </div>
          <div className="hero-art">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-spark spark-one">✳</div>
            <div className="art-spark spark-two">+</div>
            <DashboardVisual />
            <div className="art-index">INSIGHT / MADE / USEFUL</div>
          </div>
          <div className="hero-scroll"><span /> SCROLL TO EXPLORE</div>
        </section>

        <section className="trust-strip" aria-label="Ways we partner">
          <div className="section-wrap trust-inner">
            <p>Good work starts with good questions.</p>
            <div className="trust-values">
              <span><i>✳</i> Thoughtful by default</span>
              <span><i>↗</i> Built for real life</span>
              <span><i>◌</i> Better, together</span>
            </div>
          </div>
        </section>

        <section className="partner-logos" aria-label="Our partners">
          <div className="section-wrap">
            <h2 className="partner-logos-heading">Trusted by leading AI innovators</h2>
            <div className="partner-logos-grid">
              {partnerLogos.map(({ name, src }) => (
                <div className={`partner-logo partner-logo-${name.toLowerCase().replace(/\s+/g, "-")}`} key={name}>
                  {src ? <img src={src} alt={`${name} logo`} /> : <span>{name}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap work-section section-pad" id="work">
          <div className="section-heading">
            <div>
              <div className="eyebrow">A SAMPLE OF WHAT WE DO</div>
              <h2>Good questions.<br /><span>Better outcomes.</span></h2>
            </div>
            <p className="heading-aside">A couple of example project stories to show the shape of our work. We’ll replace these with approved case studies and evidence.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${project.tone}`} key={project.title}>
                <div className="project-card-top">
                  <span>{project.type}</span>
                  <span className="project-number">0{index + 1}</span>
                </div>
                <ProjectVisual type={project.visual} />
                <div className="project-card-copy">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <a href="#contact" aria-label={`Ask about ${project.title}`}><ArrowIcon diagonal /></a>
                </div>
              </article>
            ))}
          </div>
          <div className="client-note">
            <span className="client-note-icon">✳</span>
            <p><b>What we do.</b> Datovia Playhouse delivers data annotation, data collection, data and model evaluation, and conversational AI services to help teams build better AI experiences.</p>
            <Link className="client-note-tag" to="/solutions">EXPLORE OUR SOLUTIONS ↗</Link>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-wrap">
            <div className="section-heading services-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> WHAT WE BRING TO THE TABLE</div>
                <h2>From first question<br />to <span>what’s next.</span></h2>
              </div>
              <p className="heading-aside">The right mix of thinking, craft, and technology to move your work forward.</p>
            </div>
            <div className="services-list">
              {services.map((service) => (
                <article className="service-row" key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                  <div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p></div>
                  <a href="#contact" aria-label={`Ask us about ${service.title}`}><ArrowIcon diagonal /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-wrap section-pad" id="about">
          <div className="about-visual">
            <div className="about-orbit orbit-a" />
            <div className="about-orbit orbit-b" />
            <div className="about-orbit orbit-c" />
            <div className="about-center"><span>DP</span><small>PEOPLE<br />FIRST</small></div>
            <span className="about-side-label">A LITTLE LOGIC.<br />A LOT OF CURIOSITY.</span>
            <span className="about-star">✳</span>
          </div>
          <div className="about-copy">
            <div className="eyebrow">A LITTLE ABOUT US</div>
            <h2>Data is powerful.<br /><span>People make it matter.</span></h2>
            <p>We’re a curious, collaborative team that believes good data work should make life clearer—not more complicated. We bring strategy, technology, and human understanding together to help ideas go somewhere useful.</p>
            <p className="about-note">This space is ready for your real company story, team introductions, working culture, and behind-the-scenes photos.</p>
            <Link to="/about" className="text-link">Get to know us <ArrowIcon /></Link>
            <div className="culture-tags"><span>Open minds</span><span>Shared ownership</span><span>Always learning</span></div>
          </div>
        </section>

        <section className="languages-section">
          <div className="section-wrap languages-inner">
            <div>
              <div className="eyebrow">GOOD IDEAS HAVE NO BORDERS</div>
              <h2>Thoughtful work,<br /><span>in your language.</span></h2>
            </div>
            <div className="language-list">
              {languages.map((language, index) => (
                <div className={index === 2 ? "language-item language-placeholder" : "language-item"} key={language}>
                  <span>{String(index + 1).padStart(2, "0")}</span><b>{language}</b>{index < 2 && <i>●</i>}
                </div>
              ))}
              <p>Confirm the languages your team supports and the level of service available in each.</p>
            </div>
          </div>
        </section>

        <section className="evidence-section section-wrap section-pad">
          <div className="evidence-card">
            <div className="evidence-mark">↗</div>
            <div className="evidence-copy">
              <div className="eyebrow">SHOW YOUR WORK</div>
              <h2>Good claims come<br />with <span>good evidence.</span></h2>
              <p>Add approved metrics, research methods, dataset details, and source notes to demonstrate how each result was reached. We’ll only publish evidence you can stand behind.</p>
              <a className="text-link" href="#contact">Ask us about our approach <ArrowIcon /></a>
            </div>
            <div className="evidence-side">
              <div className="evidence-data-row"><span>01</span><b>Traceable sources</b><i>↗</i></div>
              <div className="evidence-data-row"><span>02</span><b>Clear methodology</b><i>↗</i></div>
              <div className="evidence-data-row"><span>03</span><b>Responsible data use</b><i>↗</i></div>
              <small>DATASETS / PROVIDER DETAILS TO BE CONFIRMED</small>
            </div>
          </div>
        </section>

        <section className="testimonial-section">
          <div className="section-wrap testimonial-inner">
            <span className="quote-mark">“</span>
            <div className="testimonial-content">
              <div className="eyebrow">A GOOD WORD GOES A LONG WAY</div>
              <blockquote>A place for a real client’s words about what it’s like to work with Datovia Playhouse.</blockquote>
              <div className="testimonial-attribution"><span className="avatar-placeholder">+</span><span><b>Approved client name</b><small>Role / Company · Add with permission</small></span></div>
            </div>
            <span className="testimonial-count">01 <i>/</i> 01</span>
          </div>
        </section>

        <section className="contact-section section-wrap section-pad" id="contact">
          <div className="contact-card">
            <div className="contact-left">
              <div className="eyebrow"><span className="status-dot" /> YOUR NEXT GOOD QUESTION</div>
              <h2>Let’s make<br />something <span>clear.</span></h2>
              <p>Have a challenge, a hunch, or a wonderfully messy spreadsheet? We’d love to hear about it.</p>
              <Link className="button button-lime" to="/contact">Get in touch <ArrowIcon diagonal /></Link>
            </div>
            <div className="contact-right">
              <div className="contact-orbit" />
              <div className="contact-symbol">✳</div>
              <span>GOOD THINGS<br />START HERE</span>
              <Link to="/contact" aria-label="Contact Datovia Playhouse"><ArrowIcon diagonal /></Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <main className="inner-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> ABOUT DATOVIA PLAYHOUSE</div>
        <h1>Data is powerful.<br /><span>People make it matter.</span></h1>
        <p>We bring strategy, technology, and human understanding together to make complex data useful in everyday decisions.</p>
      </section>
      <section className="inner-content section-wrap">
        <div className="inner-story-visual"><div className="about-orbit orbit-a" /><div className="about-orbit orbit-b" /><div className="about-orbit orbit-c" /><div className="about-center"><span>DP</span><small>PEOPLE<br />FIRST</small></div></div>
        <div className="inner-story-copy">
          <div className="eyebrow">OUR APPROACH</div>
          <h2>Curious by nature.<br /><span>Clear by design.</span></h2>
          <p>We’re a collaborative team that believes good data work should make life clearer—not more complicated. We start by listening, ask better questions, and shape the right mix of insight and technology around the people who will use it.</p>
          <p>This page is ready for your company story, team introductions, working culture, and behind-the-scenes photos.</p>
          <div className="culture-tags"><span>Open minds</span><span>Shared ownership</span><span>Always learning</span></div>
        </div>
      </section>
      <section className="inner-values">
        <div className="section-wrap">
          <div className="eyebrow">WHAT WE BELIEVE</div>
          <div className="inner-value-grid">
            <article><span>01</span><h3>Make it understandable.</h3><p>Good work gives people clarity, not another layer of complexity.</p></article>
            <article><span>02</span><h3>Build it together.</h3><p>The best outcomes come from listening and sharing ownership.</p></article>
            <article><span>03</span><h3>Stay curious.</h3><p>We keep learning, testing assumptions, and improving the work.</p></article>
          </div>
        </div>
      </section>
      <section className="inner-cta section-wrap"><h2>Have a good question?<br /><span>Let’s talk.</span></h2><Link className="button button-dark" to="/contact">Contact us <ArrowIcon diagonal /></Link></section>
    </main>
  );
}

function CareersPage() {
  return (
    <main className="inner-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> CAREERS / GROW WITH US</div>
        <h1>Bring your curiosity.<br /><span>Make things clearer.</span></h1>
        <p>We value thoughtful people who enjoy solving meaningful problems and making complex things easier to understand.</p>
      </section>
      <section className="careers-content section-wrap">
        <div className="careers-intro">
          <div className="eyebrow">HOW WE WORK</div>
          <h2>Good work is a<br /><span>team effort.</span></h2>
          <p>Our culture is built around open minds, shared ownership, and continuous learning. We make space for different perspectives and care about the impact of what we create.</p>
          <div className="culture-tags"><span>Collaborative</span><span>People-first</span><span>Always learning</span></div>
        </div>
        <div className="careers-visual" aria-hidden="true"><div className="careers-orbit orbit-a" /><div className="careers-orbit orbit-b" /><div className="careers-orbit orbit-c" /><span>GOOD IDEAS<br />COME FROM<br /><b>GOOD PEOPLE.</b></span><i>✳</i></div>
      </section>
      <section className="open-roles section-wrap">
        <div className="eyebrow">OPPORTUNITIES</div>
        <div className="open-roles-card">
          <div><h2>Let’s start a conversation.</h2><p>There are no specific openings listed here right now. If you’re interested in working with us, send an introduction and a link to your work.</p></div>
          <a className="button button-dark" href="mailto:hello@datoviaplayhouse.com?subject=Careers%20at%20Datovia%20Playhouse">Introduce yourself <ArrowIcon diagonal /></a>
        </div>
      </section>
    </main>
  );
}

function ContactPage() {
  function handleContactSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const fullName = formData.get("fullName");
    const emailAddress = formData.get("emailAddress");
    const subject = formData.get("subject");
    const message = formData.get("message");
    const body = `Name: ${fullName}\nEmail: ${emailAddress}\n\n${message}`;

    window.location.href = `mailto:hello@datoviaplayhouse.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="inner-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> CONTACT / START HERE</div>
        <h1>Have a challenge?<br /><span>Let’s talk it through.</span></h1>
        <p>Tell us what you’re working on, what’s getting in the way, or what you’d like to make possible.</p>
      </section>
      <section className="contact-page-content section-wrap">
        <div className="contact-page-card">
          <div className="contact-page-copy">
            <div className="eyebrow">SAY HELLO</div>
            <h2>Tell us what’s<br /><span>on your mind.</span></h2>
            <p>Share a little about what you’re working on. Your email app will open with your message ready to send.</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-field">
                <label htmlFor="contact-full-name">Full name</label>
                <input id="contact-full-name" name="fullName" type="text" autoComplete="name" placeholder="Your name" required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email address</label>
                <input id="contact-email" name="emailAddress" type="email" autoComplete="email" placeholder="you@example.com" required />
              </div>
              <div className="form-field form-field-wide">
                <label htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" name="subject" type="text" placeholder="What would you like to discuss?" required />
              </div>
              <div className="form-field form-field-wide">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows="5" placeholder="Tell us a little about your project..." required />
              </div>
              <button className="button button-dark form-submit" type="submit">Prepare email <ArrowIcon diagonal /></button>
              <p className="form-note">This form opens your default email app; it does not send or store your information on this website.</p>
            </form>
          </div>
          <div className="contact-page-side">
            <div className="contact-illustration" aria-hidden="true">
              <div className="illustration-orbit illustration-orbit-one" />
              <div className="illustration-orbit illustration-orbit-two" />
              <svg className="mail-illustration" viewBox="0 0 240 190" fill="none">
                <rect x="39" y="45" width="162" height="111" rx="8" fill="#A7CFCC" />
                <path d="M45 54L115 109C118 111.4 122 111.4 125 109L195 54" stroke="#285956" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M47 146L98 101M193 146L143 101" stroke="#3C7F7A" strokeWidth="5" strokeLinecap="round" />
                <circle cx="190" cy="41" r="17" fill="#E5F0EE" />
                <path d="M190 32V50M181 41H199" stroke="#3C7F7A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="46" cy="35" r="5" fill="#3C7F7A" />
                <circle cx="205" cy="132" r="4" fill="#78A9A4" />
              </svg>
              <span className="illustration-caption">GOOD THINGS<br />START WITH A HELLO</span>
            </div>
            <div className="contact-detail"><small>EMAIL</small><a href="mailto:hello@datoviaplayhouse.com">hello@datoviaplayhouse.com</a></div>
            <div className="contact-detail"><small>PHONE</small><a href="tel:+916000034322">(+91) 6000-034-322</a></div>
            <div className="contact-detail"><small>NRRD OFFICE</small><address>House No. 210, Ashraful House, 2nd Floor, Shernagar, Dhubri, Assam – 783335, India</address></div>
          </div>
        </div>
      </section>
    </main>
  );
}

const privacySections = [
  {
    title: "Who and what this policy covers",
    paragraphs: [
      "This policy explains how Datovia Playhouse LLP handles personal information in connection with this website, enquiries, services, and business engagements. Depending on the relationship, this may include information about clients, employees, applicants, independent contractors, freelancers, project participants, and other people whose information is handled as part of a project.",
      "Where we handle personal information for a client as part of a project, the relevant project instructions and contractual commitments also apply.",
    ],
  },
  {
    title: "Information we handle and why",
    paragraphs: [
      "Depending on how you work with us, information may include contact details and the contents of messages you send; information needed for onboarding or payment; and personal information contained in project materials, such as language, audio, image, video, or text data.",
      "We use information to respond to enquiries, provide and administer services, manage project requirements, support quality and payment processes, and meet applicable legal or contractual obligations. We seek to collect only the information needed for the relevant purpose and handle it on a lawful basis.",
    ],
  },
  {
    title: "Confidentiality and access",
    paragraphs: [
      "Personal information and project materials are treated as confidential and used only for authorized business purposes. Access is limited to authorized people who need the information for their work. People and service providers handling information on our behalf are expected to follow applicable confidentiality obligations.",
    ],
  },
  {
    title: "Sharing and international processing",
    paragraphs: [
      "We may make information available to authorized personnel and service providers where needed for the purposes described above, subject to appropriate confidentiality obligations. Information may be processed using cloud-based infrastructure and transferred across borders where permitted by applicable law and relevant contractual commitments.",
    ],
  },
  {
    title: "Retention and security",
    paragraphs: [
      "We retain personal information only for as long as needed for its purpose, or for longer where required by law or contract, and then securely dispose of it. Personal information used for onboarding and payment processes is handled securely. Project contributors may be required to delete project materials when instructed or when the applicable project requirements say to do so.",
      "We use appropriate administrative, technical, and physical safeguards to help protect information against unauthorized access, disclosure, loss, or misuse. No method of handling or storing information can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your privacy rights",
    paragraphs: [
      "Where applicable law provides, you may ask to access, correct, or delete your personal information. To make a request or report a suspected privacy incident, contact privacy@datoviaplayhouse.com. Access requests are handled within 30 calendar days unless a different period is required by law.",
    ],
  },
  {
    title: "Website services and external resources",
    paragraphs: [
      "This website loads fonts from Google Fonts. When your browser requests those fonts, Google may receive technical information such as your IP address and browser details. Google's handling of that information is governed by Google's own privacy information.",
      "The website may link to third-party sites. We do not control their content or privacy practices, so please review their policies separately.",
      "This website does not have an account-registration or online-submission service. If you use the contact form, it opens your default email application with the details you entered and a message addressed to hello@datoviaplayhouse.com. The website itself does not send or store that message. Your email application and email provider handle it if you choose to send it. If you email us directly, we will receive the information in your message and the contact details associated with it.",
    ],
  },
  {
    title: "Changes to this policy",
    paragraphs: [
      "We review this policy regularly and may update it as our services, practices, or legal requirements change. The latest version will be published on this page.",
    ],
  },
];

const termsSections = [
  {
    title: "Using this website",
    paragraphs: [
      "You may use this website for lawful, personal or business purposes. Do not misuse the website, attempt to disrupt its operation, or use its content in a way that violates applicable law or another person's rights.",
    ],
  },
  {
    title: "Website information",
    paragraphs: [
      "The website provides general information about Datovia Playhouse and its services. Descriptions, examples, illustrations, and sample project stories are for general information only and are not a promise of a particular result or professional advice.",
      "We aim to keep the information useful and current, but we make no guarantee that all content is complete, accurate, or available at all times.",
    ],
  },
  {
    title: "Ownership and permitted use",
    paragraphs: [
      "Unless stated otherwise, the website's text, visual design, graphics, and other content are owned by Datovia Playhouse or used with permission. You may view and share links to the website for lawful purposes. Please do not reproduce or commercially use website content without permission, except where applicable law allows.",
    ],
  },
  {
    title: "Third-party websites",
    paragraphs: [
      "Links to third-party websites are provided for convenience. We are not responsible for their content, services, or terms.",
    ],
  },
  {
    title: "Limits and applicable law",
    paragraphs: [
      "Nothing in these terms limits any rights or remedies that cannot legally be limited. Any other liability limits and the law that applies to these terms depend on the circumstances and applicable law; have this section reviewed and completed for the jurisdiction where Datovia Playhouse operates before relying on it.",
    ],
  },
  {
    title: "Changes to these terms",
    paragraphs: [
      "We may update these terms when the website or our services change. The latest version will be published on this page.",
    ],
  },
];

const dataGovernanceSections = [
  {
    title: "Purpose",
    paragraphs: [
      "This policy describes the framework Datovia Playhouse LLP uses to govern, protect, manage, and monitor data throughout its lifecycle, with the aim of meeting applicable legal requirements, client contractual obligations, and internal standards.",
      "It applies to operations involving data collection, processing, annotation, transcription, translation, localization, AI training, quality assurance, and related services.",
    ],
  },
  {
    title: "Scope",
    paragraphs: [
      "This policy applies to employees, contractors, freelancers, vendors, project participants, temporary staff, and third-party service providers who handle data for Datovia Playhouse LLP.",
      "It covers client data, participant information, confidential business information, and company records processed in connection with our work.",
    ],
  },
  {
    title: "Data governance principles",
    paragraphs: [
      "Our governance principles are accountability, transparency, lawful processing, data minimization, purpose limitation, accuracy, confidentiality, integrity, availability, and continuous improvement.",
    ],
  },
  {
    title: "Data classification",
    paragraphs: [
      "Information is classified according to its sensitivity and intended use. Public information is approved for public release. Internal information is intended for business use within the organization. Confidential information includes client information, project documents, pricing, operational procedures, and proprietary business information.",
      "Restricted information requires the highest level of protection and may include personal or sensitive personal information, authentication credentials, financial records, confidential client datasets, AI training datasets, and security information.",
    ],
  },
  {
    title: "Roles and responsibilities",
    paragraphs: [
      "Management is responsible for approving governance policies, allocating appropriate resources, monitoring compliance, and reviewing governance performance.",
      "Project managers are responsible for checking project and client requirements, monitoring project security, and reporting compliance concerns. Employees and contractors must follow company policies, protect confidential information, report incidents promptly, and complete required compliance training.",
    ],
  },
  {
    title: "Data lifecycle management",
    paragraphs: [
      "Data is managed through its lifecycle, including collection, validation, processing, quality assurance, secure storage, secure transmission, retention, and secure deletion. Each stage should follow documented procedures and the applicable project instructions.",
    ],
  },
  {
    title: "Security controls and access management",
    paragraphs: [
      "Safeguards may include role-based access controls, password protection, multi-factor authentication where applicable, encryption during storage and transmission, secure backups, endpoint protection, network monitoring, regular security updates, audit logging, and restricted administrative access.",
      "Access to client information is granted only on a need-to-know basis, approved as appropriate, limited according to job responsibilities, reviewed periodically, and removed when no longer required.",
    ],
  },
  {
    title: "Compliance and risk management",
    paragraphs: [
      "Data handling must follow applicable privacy and data protection laws, client contractual obligations, confidentiality agreements, internal procedures, ethical standards, and information security requirements.",
      "Periodic risk assessments identify security, operational, compliance, and privacy risks. Appropriate mitigation measures are implemented and monitored.",
    ],
  },
  {
    title: "Incident management",
    paragraphs: [
      "Any suspected security or compliance incident should be reported immediately to the project contact or hello@datoviaplayhouse.com. The incident will be assessed and, as appropriate, investigated and contained; affected clients will be notified where required; corrective actions will be implemented; and incident records will be maintained.",
    ],
  },
  {
    title: "Compliance reviews and audits",
    paragraphs: [
      "Internal compliance reviews are conducted to assess adherence to company policies, client requirements, data protection obligations, and information security procedures. Management reviews findings and oversees corrective actions.",
    ],
  },
  {
    title: "Ethical business conduct",
    paragraphs: [
      "Personnel are expected to conduct business honestly, fairly, and professionally. Bribery, corruption, fraud, conflicts of interest, other unethical business practices, and unauthorized disclosure of confidential information are not acceptable.",
    ],
  },
  {
    title: "Vendor compliance",
    paragraphs: [
      "Third-party vendors must maintain confidentiality, protect client information, comply with applicable laws and contractual obligations, and follow company security requirements. Failure to meet these requirements may result in suspension or termination of the business relationship, subject to applicable agreements.",
    ],
  },
  {
    title: "Training and awareness",
    paragraphs: [
      "Personnel receive periodic training on data protection, information security, privacy, confidentiality, ethical conduct, incident reporting, and client-specific compliance requirements.",
    ],
  },
  {
    title: "Policy violations",
    paragraphs: [
      "Violations may result in corrective action, suspension of system access, termination of a contract or engagement, or legal action where applicable.",
    ],
  },
  {
    title: "Review and updates",
    paragraphs: [
      "This policy is reviewed annually and when significant legal, regulatory, client, or operational changes occur. Project-specific contracts and instructions apply where they set more specific requirements.",
    ],
  },
];

const remoteWorkSecuritySections = [
  {
    title: "Purpose and who this applies to",
    paragraphs: [
      "This agreement sets security responsibilities for employees, freelancers, contractors, vendors, and consultants who work remotely and access Datovia Playhouse systems, client information, or confidential data. It applies when using Company-issued devices, approved personal devices, cloud platforms, project portals, and communication systems. It supplements any stricter project, client, or legal requirements.",
    ],
  },
  {
    title: "User responsibilities and device security",
    paragraphs: [
      "Protect Company and client information from unauthorized access, use devices only for authorized business purposes, follow applicable security procedures, and maintain confidentiality of project information.",
      "Devices used for Company work must have a strong password, automatic screen locking, current operating-system and security updates, active antivirus or endpoint protection, and a firewall. Enable full-disk encryption where supported and protect devices from unauthorized physical access. Use only authorized devices and accounts, and do not disable security controls or change security configurations without authorization.",
    ],
  },
  {
    title: "Passwords, multi-factor authentication, and software",
    paragraphs: [
      "Enable multi-factor authentication for Company-supported systems whenever available. Do not share passwords, reuse Company passwords on personal accounts, or share access credentials. Use strong passwords and report suspected credential compromise immediately.",
      "Do not install unauthorized or pirated software, disable antivirus or other security protections, or make unauthorized changes to device security settings.",
    ],
  },
  {
    title: "Confidential information and secure working",
    paragraphs: [
      "Client information, project materials, business information, software, documentation, credentials, and data accessed during work are confidential. Do not copy confidential information without authorization, disclose it to unauthorized people, store it on unapproved cloud services, or use it for personal benefit. These confidentiality responsibilities continue after the engagement ends.",
      "Use trusted internet connections, avoid unsecured public Wi-Fi whenever possible, and use a VPN whenever required. Work where screens, conversations, documents, and devices cannot be viewed, overheard, or accessed by unauthorized people.",
    ],
  },
  {
    title: "Client data and incident reporting",
    paragraphs: [
      "Access client information only for assigned work, process it according to project instructions, store it securely, and return or delete it when instructed.",
      "Immediately report lost or stolen devices, malware, suspected unauthorized access, data breaches, phishing attempts, and security vulnerabilities to the IT Security Team at it-remote@datoviaplayhouse.com. Follow instructions to help contain and address the incident.",
    ],
  },
  {
    title: "Monitoring, return of property, and compliance",
    paragraphs: [
      "Company systems, devices, and client platforms may be monitored for security, compliance, and audit purposes, subject to applicable laws and contractual obligations.",
      "When requested or when an engagement ends, return Company property and securely return or delete Company documents, client information, access credentials, and storage media. Do not retain confidential information without authorization.",
      "Users must follow Company information security and data protection policies, privacy requirements, client security requirements, and applicable laws. Non-compliance may result in suspension of system access, removal from projects, termination of an employment or contract relationship, or other action permitted by applicable law and agreement.",
    ],
  },
  {
    title: "Applicable terms",
    paragraphs: [
      "This agreement forms part of the Company’s information security and remote work requirements and applies throughout the engagement. Applicable law and any client agreement may impose additional or different obligations; the relevant project and contractual requirements should be reviewed for each engagement.",
    ],
  },
];

function LegalPage({ title, description, sections, contactEmail = "hello@datoviaplayhouse.com" }) {
  return (
    <main className="inner-page legal-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / THE DETAILS</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <article className="section-wrap legal-document">
        <p className="legal-draft-note">
          Draft for review: this general website copy is not legal advice. Please confirm it reflects your actual practices and have it reviewed for your jurisdiction before publishing.
        </p>
        {sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <p className="legal-contact">Questions? <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      </article>
    </main>
  );
}

function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      description="How Datovia Playhouse handles personal information when you visit our website, contact us, or work with us."
      sections={privacySections}
      contactEmail="privacy@datoviaplayhouse.com"
    />
  );
}

function TermsPage() {
  return (
    <LegalPage
      title="Terms & conditions"
      description="The basic terms for visiting and using the Datovia Playhouse website."
      sections={termsSections}
    />
  );
}

function BlogPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / IDEAS</div>
        <h1>Blog</h1>
        <p>Notes and perspectives on data, AI, technology, and the people who make them useful.</p>
      </section>
      <section className="section-wrap content-page-body">
        <article className="content-notice">
          <span className="eyebrow">COMING SOON</span>
          <h2>We’re working on our first stories.</h2>
          <p>There aren’t any articles published yet. In the meantime, tell us what you’re working on and what you’d like to learn about.</p>
          <Link className="text-link" to="/contact">Talk with our team <ArrowIcon /></Link>
        </article>
      </section>
    </main>
  );
}

function CaseStudiesPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / OUR WORK</div>
        <h1>Case studies</h1>
        <p>Examples of how language expertise, careful quality work, and scalable delivery help teams build better AI experiences.</p>
      </section>
      <section className="section-wrap content-page-body">
        <div className="case-study-list">
          {caseStudies.map((study, index) => (
            <article className={`case-study-card project-${index % 2 === 0 ? "blue" : "green"}`} key={study.title}>
              <div className="case-study-heading">
                <div className="case-study-heading-copy">
                  <div className="project-card-top">
                    <span>{study.type}</span>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <h2>{study.title}</h2>
                  <p className="case-study-client">{study.client}</p>
                </div>
                <div className={`case-study-art case-study-art-${index + 1}`} aria-hidden="true">
                  <span className="case-study-orbit case-study-orbit-one" />
                  <span className="case-study-orbit case-study-orbit-two" />
                  <span className="case-study-art-center">{index === 0 ? "LANGUAGE × AI" : index === 1 ? "1,000+ HOURS" : "95%+ ACCURACY"}</span>
                  <span className="case-study-art-caption">{index === 1 ? "SPEECH DATA AT SCALE" : index === 2 ? "ANNOTATION FOR SPEECH AI" : "BUILT FOR EVERY VOICE"}</span>
                </div>
              </div>
              <p className="case-study-overview">{study.overview}</p>
              <div className="case-study-details">
                <section className="case-study-detail">
                  <h3>Project scope</h3>
                  <ul className="case-study-tags">{study.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="case-study-detail">
                  <h3>The challenge</h3>
                  <ul>{study.challenge.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="case-study-detail">
                  <h3>Our approach</h3>
                  <ol>{study.approach.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section className="case-study-detail">
                  <h3>Outcomes</h3>
                  <ul>{study.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>
              <Link className="case-study-cta text-link" to="/contact">Talk with us about a similar project <ArrowIcon diagonal /></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const faqs = [
  {
    question: "What does Datovia Playhouse do?",
    answer: "We help teams make complex data clearer and more useful through data strategy, analytics and insight, AI and automation, and digital experiences.",
  },
  {
    question: "How do I get started?",
    answer: "Get in touch and tell us what you’re trying to solve. We can learn more about your needs and discuss a suitable next step.",
  },
  {
    question: "Which industries or project sizes do you support?",
    answer: "The right fit depends on the challenge and the support you need. Contact us with a little context so we can understand your project.",
  },
  {
    question: "How can I ask about a partnership or supplier opportunity?",
    answer: "Email hello@datoviaplayhouse.com with a short introduction and the kind of opportunity you have in mind.",
  },
];

function FaqPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / HELP</div>
        <h1>Frequently asked questions</h1>
        <p>A few starting points about our work and how to get in touch.</p>
      </section>
      <section className="section-wrap content-page-body faq-list">
        {faqs.map(({ question, answer }) => (
          <article className="faq-item" key={question}>
            <h2>{question}</h2>
            <p>{answer}</p>
          </article>
        ))}
        <p className="faq-contact">Still have a question? <Link to="/contact">Contact our team</Link>.</p>
      </section>
    </main>
  );
}

function SolutionsPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / CAPABILITIES</div>
        <h1>Solutions</h1>
        <p>Practical support to help turn complex data challenges into clearer decisions and useful experiences.</p>
      </section>
      <section className="section-wrap content-page-body">
        <div className="solution-card-grid">
          {solutionCards.map((solution, index) => (
            <article className={`solution-card project-${index % 2 === 0 ? "blue" : "green"}`} key={solution.title}>
              <span className="solution-card-number">0{index + 1}</span>
              <h2>{solution.title}</h2>
              <p>{solution.description}</p>
              <h3>What we deliver</h3>
              <ul>{solution.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="solution-card-link" to="/contact">Discuss your project <ArrowIcon diagonal /></Link>
            </article>
          ))}
        </div>
        <Link className="button button-dark solution-cta" to="/contact">Discuss a project <ArrowIcon diagonal /></Link>
      </section>
    </main>
  );
}

const supplierCodeSections = [
  {
    title: "Integrity and lawful conduct",
    paragraphs: ["Suppliers are expected to act honestly, comply with applicable laws and regulations, and avoid bribery, corruption, fraud, and conflicts of interest."],
  },
  {
    title: "Respectful and fair work",
    paragraphs: ["Suppliers should treat people with dignity, provide a safe working environment, prohibit discrimination and harassment, and not use forced or child labor."],
  },
  {
    title: "Privacy, security, and responsible data use",
    paragraphs: ["Suppliers should protect confidential information and personal data, use them only for authorized purposes, and maintain safeguards appropriate to the information they handle."],
  },
  {
    title: "Environmental responsibility",
    paragraphs: ["Suppliers are encouraged to understand and reduce the environmental impacts of their operations and comply with applicable environmental requirements."],
  },
  {
    title: "Raising concerns",
    paragraphs: ["Suppliers may raise questions or concerns about this code by contacting hello@datoviaplayhouse.com. Retaliation for raising a concern in good faith is not acceptable."],
  },
];

function SupplierCodePage() {
  return (
    <LegalPage
      title="Supplier code of conduct"
      description="The principles we expect suppliers and business partners to follow when working with Datovia Playhouse."
      sections={supplierCodeSections}
    />
  );
}

function DataGovernancePage() {
  return (
    <LegalPage
      title="Data governance and compliance policy"
      description="Principles for responsible, secure, and compliant handling of data across its lifecycle."
      sections={dataGovernanceSections}
    />
  );
}

function RemoteWorkSecurityPage() {
  return (
    <LegalPage
      title="Remote work device security agreement"
      description="Security responsibilities for people accessing Datovia Playhouse systems, client information, or project data while working remotely."
      sections={remoteWorkSecuritySections}
      contactEmail="it-remote@datoviaplayhouse.com"
    />
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<><SiteHeader /><Outlet /><SiteFooter /></>}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="supplier-code-of-conduct" element={<SupplierCodePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsPage />} />
          <Route path="data-governance-and-compliance-policy" element={<DataGovernancePage />} />
          <Route path="remote-work-device-security-agreement" element={<RemoteWorkSecurityPage />} />
          <Route path="*" element={<main className="inner-page section-wrap not-found"><h1>Page not found.</h1><Link className="button button-dark" to="/">Back to home <ArrowIcon /></Link></main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
