
import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Mail,
  Sparkles,
  GraduationCap,
  BriefcaseBusiness,
  ExternalLink
} from "lucide-react";

import "./Portfolio.css";

const defaultData = {
  name: "Your Name",
  role: "Creative Developer",
  tagline: "Building thoughtful digital experiences.",
  email: "",
  phone: "",
  location: "",
  photo: "",
  about: "",
  whoAmI: "",
  focus: "",
  approach: "",
  skills: [],
  education: [],
  experience: [],
  achievements: [],
  projects: [],
  github: "",
  linkedin: "",
  instagram: "",
  resume: "",
  contactHeading: "Let’s build something great together.",
  contactDescription: "Have a project in mind? Let's connect."
};

function safeReadPortfolio() {
  try {
    const saved = sessionStorage.getItem("portify-portfolio");

    if (!saved) return defaultData;

    const parsed = JSON.parse(saved);

    return {
      ...defaultData,
      ...parsed,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      education: Array.isArray(parsed.education) ? parsed.education : [],
      experience: Array.isArray(parsed.experience) ? parsed.experience : [],
      achievements: Array.isArray(parsed.achievements)
        ? parsed.achievements
        : [],
      projects: Array.isArray(parsed.projects) ? parsed.projects : []
    };
  } catch {
    return defaultData;
  }
}

function SocialLink({ href, label, children }) {
  if (!href) return null;

  return (
    <a
      className="portfolio-social-link"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
    >
      {children}
    </a>
  );
}

/* =========================================
   INTERACTIVE NETWORK BACKGROUND
========================================= */

function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId = null;
    let particles = [];
    let resizeTimer;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouse = { x: -1000, y: -1000 };

    const getParticleCount = () =>
      window.innerWidth < 600 ? 42 : 90;

    const getConnectionDistance = () =>
      window.innerWidth < 600 ? 105 : 145;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getParticleCount();

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.65,
        vy: (Math.random() - 0.5) * 0.65,
        radius: Math.random() * 1.6 + 0.8,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resizeCanvas, 120);
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const connectionDistance = getConnectionDistance();

      // Move particles and react to the mouse
      particles.forEach((particle) => {
        particle.phase += 0.025;

        if (!reduceMotion) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > width) {
            particle.vx *= -1;
          }

          if (particle.y < 0 || particle.y > height) {
            particle.vy *= -1;
          }

          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance < 145 && distance > 0) {
            const force = (145 - distance) / 145;

            particle.x += (dx / distance) * force * 1.15;
            particle.y += (dy / distance) * force * 1.15;
          }
        }

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      });

      // Draw connecting network lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const first = particles[i];
          const second = particles[j];

          const distance = Math.hypot(
            first.x - second.x,
            first.y - second.y
          );

          if (distance < connectionDistance) {
            const opacity =
              (1 - distance / connectionDistance) * 0.46;

            ctx.beginPath();
            ctx.moveTo(first.x, first.y);
            ctx.lineTo(second.x, second.y);

            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw glowing nodes
      particles.forEach((particle, index) => {
        const pulse =
          0.7 + Math.sin(particle.phase) * 0.3;

        const isBlue = index % 3 === 0;

        ctx.beginPath();
        ctx.arc(
          particle.x,
          particle.y,
          particle.radius + pulse,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = isBlue
          ? `rgba(56, 189, 248, ${pulse})`
          : `rgba(196, 181, 253, ${pulse})`;

        ctx.shadowBlur = 12;
        ctx.shadowColor = isBlue ? "#38bdf8" : "#a78bfa";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (!reduceMotion) {
        animationId = window.requestAnimationFrame(draw);
      }
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.clearTimeout(resizeTimer);

      if (animationId !== null) {
        window.cancelAnimationFrame(animationId);
      }

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="portfolio-network-background" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="portfolio-network-canvas"
      />

      <div className="portfolio-network-glow glow-purple" />
      <div className="portfolio-network-glow glow-blue" />
      <div className="portfolio-network-vignette" />
    </div>
  );
}

/* =========================================
   MAIN PORTFOLIO
========================================= */

export default function Portfolio() {
  const [data] = useState(safeReadPortfolio);
  const [introStage, setIntroStage] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setIntroStage(1), 250),
      window.setTimeout(() => setIntroStage(2), 2200),
      window.setTimeout(() => setIntroStage(3), 4400),
      window.setTimeout(() => setIntroFinished(true), 5900)
    ];

    return () => timers.forEach(window.clearTimeout);
  }, []);

  const skills = data.skills.length
    ? data.skills
    : ["HTML5", "CSS3", "JavaScript", "React"];

  const projects = data.projects.filter(
    (project) => project.title || project.description
  );

  const education = data.education.length
    ? data.education
    : ["Add your education from the generator form."];

  const experience = data.experience;
  const achievements = data.achievements;

  return (
    <div className="portfolio-page">
      {/* Animated background stays behind the portfolio */}
      <NetworkBackground />

      {!introFinished && (
        <div
          className={`cinematic-intro intro-stage-${introStage} ${
            introStage >= 2 ? "intro-transforming" : ""
          }`}
        >
          <div className="intro-ambient intro-ambient-a" />
          <div className="intro-ambient intro-ambient-b" />

          <div className="intro-topline">
            <span>AN INTRODUCTION</span>
            <span>PORTFOLIO / 2026</span>
          </div>

          <div className="intro-center">
            <p className="intro-overline">THE CREATIVE WORLD OF</p>

            <h1 className="intro-name">
              {data.name.trim().split(/\s+/).map((word, index) => (
                <span
                  key={`${word}-${index}`}
                  style={{ "--word-index": index }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <div className="intro-title" aria-label="PORTFOLIO">
              {"PORTFOLIO".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  style={{
                    "--letter-index": index,
                    "--letter-tilt": index % 2 ? "7deg" : "-7deg"
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <p className="intro-caption">
              A PERSONAL DIGITAL EXPERIENCE
            </p>
          </div>

          <div className="intro-bottomline">
            <span>DESIGN · CODE · CREATE</span>
            <span className="intro-progress"><i /></span>
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      )}

      <div
        className={`portfolio-content ${
          introFinished ? "portfolio-content-ready" : ""
        }`}
      >
        <header className="portfolio-nav">
          <a href="#home" className="portfolio-brand">
            <span>{data.name.trim().charAt(0) || "P"}</span>
            {data.name || "Portfolio"}<b>.</b>
          </a>

          <nav>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </nav>

          <a href="#contact" className="portfolio-nav-cta">
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <button
  type="button"
  className="build-another-btn"
  onClick={() => {
    sessionStorage.removeItem("portify-portfolio");
    window.location.href = "/?new=1";
  }}
>
  + Build Another Portfolio
</button>
        </header>

        <main>
          {/* HERO */}
          <section className="portfolio-hero" id="home">
            <div className="portfolio-hero-copy">
              <span className="portfolio-eyebrow">
                <i /> AVAILABLE TO LEARN & COLLABORATE
              </span>

              <h1>
                Building my skills,
                <br />
                one project <span>at a time.</span>
              </h1>

              <p className="portfolio-hero-role">{data.role}</p>

              <p className="portfolio-hero-description">
                {data.tagline ||
                  data.about ||
                  "Creating useful, thoughtful and engaging digital experiences."}
              </p>

              <div className="portfolio-hero-actions">
                <a href="#projects" className="portfolio-primary">
                  Explore my work <ArrowDown size={16} />
                </a>

                <a href="#contact" className="portfolio-secondary">
                  Get in touch <ArrowUpRight size={16} />
                </a>
              </div>

              <div className="portfolio-hero-socials">
                <SocialLink href={data.github} label="GitHub">
                  <Code2 size={17} />
                </SocialLink>

                <SocialLink href={data.linkedin} label="LinkedIn">
                  <span className="social-letter">in</span>
                </SocialLink>

                <SocialLink href={data.instagram} label="Instagram">
                  <span className="social-letter">ig</span>
                </SocialLink>

                <SocialLink
                  href={data.email ? `mailto:${data.email}` : ""}
                  label="Email"
                >
                  <Mail size={17} />
                </SocialLink>
              </div>
            </div>

            <div className="portfolio-hero-visual">
              <div className="portfolio-visual-grid" />
              <div className="portfolio-visual-orbit orbit-one" />
              <div className="portfolio-visual-orbit orbit-two" />

              <div className="portfolio-profile-frame">
                {data.photo ? (
                  <img src={data.photo} alt={data.name} />
                ) : (
                  <div className="portfolio-profile-placeholder">
                    {data.name.trim().charAt(0) || "P"}
                  </div>
                )}
              </div>

              <div className="portfolio-float-label float-label-top">
                <Sparkles size={15} /> Always learning
              </div>

              <div className="portfolio-float-label float-label-bottom">
                <Code2 size={15} /> Turning ideas into code
              </div>
            </div>

            <a className="portfolio-scroll-cue" href="#about">
              <span /> Scroll to explore
            </a>
          </section>

          {/* ABOUT */}
          <section className="portfolio-section" id="about">
            <div className="portfolio-section-heading">
              <span className="portfolio-eyebrow">A LITTLE ABOUT ME</span>

              <h2>
                Building my skills,
                <br />
                <span>one project at a time.</span>
              </h2>

              <p>
                {data.about ||
                  "I’m a developer who enjoys learning by building projects, exploring new technologies, and improving a little with every experience."}
              </p>
            </div>

            <div className="about-card-grid">
              <article className="portfolio-glass-card">
                <span className="about-card-number">01</span>
                <div className="about-card-icon"><Sparkles size={19} /></div>
                <h3>Who am I?</h3>
                <p>
                  {data.whoAmI ||
                    data.about ||
                    "A curious developer learning, experimenting and turning ideas into practical digital experiences."}
                </p>
              </article>

              <article className="portfolio-glass-card">
                <span className="about-card-number">02</span>
                <div className="about-card-icon"><Code2 size={19} /></div>
                <h3>My Focus</h3>
                <p>
                  {data.focus ||
                    "Building clean interfaces, improving frontend fundamentals and creating projects that solve real problems."}
                </p>
              </article>

              <article className="portfolio-glass-card">
                <span className="about-card-number">03</span>
                <div className="about-card-icon"><ArrowUpRight size={19} /></div>
                <h3>My Approach</h3>
                <p>
                  {data.approach ||
                    "Learn by doing, keep things user-friendly, stay curious and improve through consistent practice."}
                </p>
              </article>
            </div>
          </section>

          {/* SKILLS */}
          <section className="portfolio-section skills-section" id="skills">
            <div className="portfolio-section-heading centered-heading">
              <span className="portfolio-eyebrow">WHAT I WORK WITH</span>
              <h2>My Technical <span>Skills</span></h2>
              <p>
                Tools and technologies I use to learn, create and bring ideas to life.
              </p>
            </div>

            <div className="portfolio-skills-grid">
              {skills.map((skill, index) => (
                <article className="skill-card" key={`${skill}-${index}`}>
                  <span className="skill-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="skill-symbol"><Code2 size={22} /></div>
                  <h3>{skill}</h3>

                  <span className="skill-status">
                    <i /> In my toolkit
                  </span>
                </article>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="portfolio-section" id="projects">
            <div className="portfolio-section-heading">
              <span className="portfolio-eyebrow">SELECTED WORK</span>
              <h2>Projects I’m <span>Building</span></h2>
              <p>
                A selection of projects where I practise, experiment and turn concepts into working experiences.
              </p>
            </div>

            {projects.length ? (
              <div className="portfolio-project-grid">
                {projects.map((project, index) => (
                  <article
                    className="portfolio-project-card"
                    key={`${project.title}-${index}`}
                  >
                    <div className={`project-preview project-preview-${index % 3}`}>
                      <span className="project-preview-index">
                        PROJECT / {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="project-preview-art">
                        <Code2 size={42} strokeWidth={1.1} />
                      </div>

                      <span className="project-preview-name">
                        {project.title}
                      </span>
                    </div>

                    <div className="project-card-content">
                      <h3>{project.title}</h3>
                      <p>
                        {project.description ||
                          "A project built as part of my learning journey."}
                      </p>

                      <div className="project-tags">
                        {(Array.isArray(project.technologies)
                          ? project.technologies
                          : []
                        ).map((technology) => (
                          <span key={technology}>{technology}</span>
                        ))}
                      </div>

                      <div className="project-links">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub <ArrowUpRight size={14} />
                          </a>
                        )}

                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Live Demo <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="portfolio-empty-state">
                <Code2 size={25} />
                <h3>Your projects will appear here.</h3>
                <p>
                  Return to the generator and add project details and links.
                </p>
              </div>
            )}
          </section>

          {/* EDUCATION AND EXPERIENCE */}
          <section className="portfolio-section education-section" id="education">
            <div className="portfolio-section-heading">
              <span className="portfolio-eyebrow">MY LEARNING JOURNEY</span>
              <h2>Education <span>& Growth</span></h2>
              <p>Every step adds something new to the journey.</p>
            </div>

            <div className="journey-layout">
              <div className="journey-line" />

              <div className="journey-items">
                {education.map((item, index) => (
                  <article className="journey-card" key={`${item}-${index}`}>
                    <span className="journey-dot" />
                    <span className="journey-index">
                      EDUCATION / {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="journey-icon"><GraduationCap size={20} /></div>
                    <p>{item}</p>
                  </article>
                ))}

                {experience.map((item, index) => (
                  <article className="journey-card" key={`experience-${index}`}>
                    <span className="journey-dot" />
                    <span className="journey-index">
                      EXPERIENCE / {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="journey-icon"><BriefcaseBusiness size={20} /></div>
                    <p>{item}</p>
                  </article>
                ))}

                {achievements.map((item, index) => (
                  <article className="journey-card" key={`achievement-${index}`}>
                    <span className="journey-dot" />
                    <span className="journey-index">
                      ACHIEVEMENT / {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="journey-icon"><Sparkles size={20} /></div>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="portfolio-contact-section" id="contact">
            <div className="contact-panel">
              <div className="contact-glow contact-glow-a" />
              <div className="contact-glow contact-glow-b" />

              <span className="portfolio-eyebrow">
                HAVE A PROJECT IN MIND?
              </span>

              <h2>
                {data.contactHeading ||
                  "Let’s build something great together."}
              </h2>

              <p>
                {data.contactDescription ||
                  "Have a project in mind? Let's connect."}
              </p>

              <div className="contact-actions">
                {data.email && (
                  <a className="portfolio-primary" href={`mailto:${data.email}`}>
                    Say Hello <Mail size={16} />
                  </a>
                )}

                {data.resume && (
                  <a
                    className="portfolio-secondary"
                    href={data.resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume <ArrowUpRight size={16} />
                  </a>
                )}
              </div>

              <div className="contact-socials">
                <SocialLink href={data.linkedin} label="LinkedIn">
                  <span className="social-letter">in</span>
                </SocialLink>

                <SocialLink href={data.instagram} label="Instagram">
                  <span className="social-letter">ig</span>
                </SocialLink>

                <SocialLink href={data.github} label="GitHub">
                  <Code2 size={17} />
                </SocialLink>

                {data.location && (
                  <span className="contact-location">{data.location}</span>
                )}
              </div>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="portfolio-footer">
          <a href="#home" className="portfolio-brand">
            <span>{data.name.trim().charAt(0) || "P"}</span>
            {data.name || "Portfolio"}<b>.</b>
          </a>

          <p>Designed & built with React. Keep learning, keep building.</p>

          <a href="#home" className="portfolio-back-top">
            Back to top ↑
          </a>
        </footer>

        <button
          className="portfolio-back-button"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <ArrowLeft size={16} /> Edit details
        </button>
      </div>
    </div>
  );
}
