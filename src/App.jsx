import { useState } from "react";
import Portfolio from "./Portfolio";
import "./App.css";

/* Icons without an external icon library */
function Icon({ name, size = 18 }) {
  const icons = {
    ArrowRight: "→",
    ArrowUpRight: "↗",
    Sparkles: <i class="ri-sparkling-fill"></i>,
    UserRound: <i class="ri-emotion-line"></i>,
    Mail: <i class="ri-mail-fill"></i>,
    Instagram: <i class="ri-instagram-line"></i>,
    Linkedin: <i class="ri-linkedin-box-fill"></i>,
    Plus: "+",
    Trash2: "×",
    Upload: <i class="ri-chat-upload-fill"></i>,
    Code2: "</>",
    GraduationCap: <i class="ri-graduation-cap-fill"></i>,
    BriefcaseBusiness: <i class="ri-briefcase-fill"></i>,
    Send: <i class="ri-send-ins-fill"></i>,
    X: "×",
  };

  return (
    <span
      className={`text-icon text-icon-${name.toLowerCase()}`}
      style={{
        fontSize: name === "Code2" ? Math.max(10, size * 0.65) : size,
      }}
      aria-hidden="true"
    >
      {icons[name] || "•"}
    </span>
  );
}

const initialForm = {
  name: "",
  role: "",
  tagline: "",
  email: "",
  phone: "",
  location: "",
  photo: "",
  about: "",
  whoAmI: "",
  focus: "",
  approach: "",
  skills: "",
  education: "",
  experience: "",
  achievements: "",
  github: "",
  linkedin: "",
  instagram: "",
  resume: "",
  contactHeading: "Let’s build something great together.",
  contactDescription: "Have a project in mind? Let's connect.",
};

const initialProjects = [
  {
    title: "",
    description: "",
    technologies: "",
    github: "",
    live: "",
  },
];

const developers = [
  {
    name: "Alok Kumar",
    role: "Database & API Developer",
    email: "alokalex8292@gmail.com",
    image: "/alok_image.jpg",
    instagram:
      "https://www.instagram.com/kr_alok_06?dlrf=YWF3ZjlqczF1bW1l",
    linkedin: "https://www.linkedin.com/in/alok-kumar-35070334a/",
    initials: "AK",
    color: "violet",
  },
  {
    name: "Anurag Pateriya",
    role: "Backend Developer",
    email: "anuragpateriya149@gmail.com",
    image: "/anurag_image.jpg",
    instagram:
      "https://www.instagram.com/anurag_pandit786?vrfl=MThrbDBrZnN1eW1xcQ==",
    linkedin: "https://www.linkedin.com/in/anurag-pateriya-348037347/",
    initials: "AP",
    color: "blue",
  },
  {
    name: "Namo Tripathi",
    role: "Frontend Developer",
    email: "tripathinamo291@gmail.com",
    image: "/namo_image.jpg",
    instagram:
      "https://www.instagram.com/namo_tripathi_27?obrf=MTR3cHZqbzJrcndvYw==",
    linkedin: "https://www.linkedin.com/in/namo-tripathi-2a571033b/",
    initials: "NT",
    color: "pink",
  },
];

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
  required = false,
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <i> *</i>}
      </span>

      {multiline ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={4}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </label>
  );
}

function DevelopersSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="developers-section" id="developers">
      <div className="developers-heading">
        <span className="eyebrow">
          <Icon name="Sparkles" size={14} /> THE PEOPLE BEHIND THE CODE
        </span>

        <h2>
          Meet the <span>Developers.</span>
        </h2>

        <p>Three minds. One passion for building digital experiences.</p>
      </div>

      <button
        type="button"
        className={`meet-button ${expanded ? "is-open" : ""}`}
        onClick={() => setExpanded((current) => !current)}
        aria-expanded={expanded}
      >
        <span className="meet-button-icon">
          <Icon name="UserRound" size={19} />
        </span>

        <span>{expanded ? "Close our team" : "Meet Our Team"}</span>

        {expanded ? (
          <Icon name="X" size={17} />
        ) : (
          <Icon name="ArrowUpRight" size={18} />
        )}
      </button>

      <div
        className={`developer-grid ${
          expanded ? "developer-grid-open" : ""
        }`}
      >
        {expanded &&
          developers.map((person) => (
            <article
              className={`developer-card ${person.color}`}
              key={person.name}
            >
              <div className="developer-card-glow" />

              <div className="developer-avatar">
                <img
                  src={person.image}
                  alt={person.name}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    event.currentTarget.parentElement.classList.add(
                      "avatar-fallback"
                    );
                  }}
                />

                <span className="developer-initials">
                  {person.initials}
                </span>
              </div>

              <span className="developer-label">TEAM MEMBER</span>

              <h3>{person.name}</h3>

              <p className="developer-role">{person.role}</p>

              <div className="developer-socials">
                <a
                  href={`mailto:${person.email}`}
                  aria-label={`Email ${person.name}`}
                  title={`Email ${person.name}`}
                >
                  <Icon name="Mail" size={18} />
                </a>

                <a
                  href={person.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} Instagram`}
                  title="Instagram"
                >
                  <Icon name="Instagram" size={18} />
                </a>

                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${person.name} LinkedIn`}
                    title="LinkedIn"
                  >
                    <Icon name="Linkedin" size={18} />
                  </a>
                )}
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

function MainPage() {
  const [form, setForm] = useState(() => {
    try {
      const savedData = sessionStorage.getItem("portify-portfolio");

      if (savedData) {
        const data = JSON.parse(savedData);

        return {
          ...initialForm,
          ...data,
          skills: Array.isArray(data.skills)
            ? data.skills.join(", ")
            : data.skills || "",
          education: Array.isArray(data.education)
            ? data.education.join("\n")
            : data.education || "",
          experience: Array.isArray(data.experience)
            ? data.experience.join("\n")
            : data.experience || "",
          achievements: Array.isArray(data.achievements)
            ? data.achievements.join("\n")
            : data.achievements || "",
        };
      }
    } catch (error) {
      console.error("Could not restore portfolio details:", error);
    }

    return { ...initialForm };
  });

  const [projects, setProjects] = useState(() => {
    try {
      const savedData = sessionStorage.getItem("portify-portfolio");

      if (savedData) {
        const data = JSON.parse(savedData);

        if (Array.isArray(data.projects) && data.projects.length > 0) {
          return data.projects.map((project) => ({
            title: project.title || "",
            description: project.description || "",
            technologies: Array.isArray(project.technologies)
              ? project.technologies.join(", ")
              : project.technologies || "",
            github: project.github || "",
            live: project.live || "",
          }));
        }
      }
    } catch (error) {
      console.error("Could not restore projects:", error);
    }

    return initialProjects.map((project) => ({ ...project }));
  });

  const [photoPreview, setPhotoPreview] = useState(() => {
    try {
      const savedData = sessionStorage.getItem("portify-portfolio");
      return savedData ? JSON.parse(savedData).photo || "" : "";
    } catch {
      return "";
    }
  });

  const [notice, setNotice] = useState("");

  // NEW: Reset the form for another person.
  const buildAnotherPortfolio = () => {
    try {
      sessionStorage.removeItem("portify-portfolio");
    } catch (error) {
      console.error("Could not clear saved portfolio:", error);
    }

    setForm({ ...initialForm });
    setProjects(initialProjects.map((project) => ({ ...project })));
    setPhotoPreview("");
    setNotice("");

    // Remove any previously selected image file.
    const photoInput = document.getElementById("portfolio-photo-input");
    if (photoInput) {
      photoInput.value = "";
    }

    // Bring the user to the form on the main page.
    window.history.replaceState({}, "", "/");
    window.location.hash = "generator";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Scroll to the generator after the browser updates the URL.
    requestAnimationFrame(() => {
      document.getElementById("generator")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const updateField = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const updateProject = (index, event) => {
    const { name, value } = event.target;

    setProjects((current) =>
      current.map((project, i) =>
        i === index ? { ...project, [name]: value } : project
      )
    );
  };

  const addProject = () => {
    if (projects.length >= 8) {
      setNotice("You can add up to 8 projects.");
      return;
    }

    setProjects((current) => [
      ...current,
      {
        title: "",
        description: "",
        technologies: "",
        github: "",
        live: "",
      },
    ]);

    setNotice("");
  };

  const removeProject = (index) => {
    setProjects((current) => current.filter((_, i) => i !== index));
  };

  const uploadPhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setNotice("Please choose an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setNotice("Please choose an image under 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = String(reader.result);

      setPhotoPreview(imageData);
      setForm((current) => ({
        ...current,
        photo: imageData,
      }));
      setNotice("");
    };

    reader.onerror = () => {
      setNotice("Unable to read this image. Please try another one.");
    };

    reader.readAsDataURL(file);
  };

  const generatePortfolio = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.role.trim()) {
      setNotice("Please enter your full name and professional role.");
      return;
    }

    const cleanedProjects = projects
      .filter(
        (project) =>
          String(project.title || "").trim() ||
          String(project.description || "").trim() ||
          String(project.live || "").trim() ||
          String(project.github || "").trim() ||
          String(project.technologies || "").trim()
      )
      .map((project) => ({
        ...project,
        technologies: Array.isArray(project.technologies)
          ? project.technologies
          : String(project.technologies || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
      }));

    const portfolioData = {
      ...form,
      photo: form.photo || photoPreview,
      skills: String(form.skills || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      education: String(form.education || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      experience: String(form.experience || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      achievements: String(form.achievements || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      projects: cleanedProjects,
    };

    try {
      sessionStorage.setItem(
        "portify-portfolio",
        JSON.stringify(portfolioData)
      );

      window.location.href = "/portfolio";
    } catch (error) {
      console.error("Could not save portfolio:", error);

      setNotice(
        "Could not save your portfolio. Try a smaller photo or remove some data."
      );
    }
  };

  if (window.location.pathname === "/portfolio") {
    return <Portfolio />;
  }

  return (
    <div className="app-shell">
      <div className="background-scene" aria-hidden="true">
        <div className="scene-orb orb-one" />
        <div className="scene-orb orb-two" />
        <div className="scene-orb orb-three" />
        <div className="scene-grid" />
      </div>

      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">P.</span> Portify
          <span className="brand-dot">3D</span>
        </a>

        <nav>
          <a href="#generator">Generator</a>
          <a href="#how-it-works">How it works</a>
          <a href="#developers">Our team</a>
        </nav>

        <a href="#generator" className="header-cta">
          Start creating <Icon name="ArrowUpRight" size={16} />
        </a>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="live-dot" /> YOUR STORY. YOUR PORTFOLIO.
            </span>

            <h1>
              Make your work
              <br />
              look <span className="gradient-text">exceptional.</span>
            </h1>

            <p className="hero-description">
              Create a personal portfolio that feels like you. Add your
              details, showcase your projects, and turn your journey into a
              digital experience.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#generator">
                Build my portfolio <Icon name="ArrowRight" size={18} />
              </a>

              <a className="text-button" href="#how-it-works">
                Explore the process <Icon name="ArrowUpRight" size={17} />
              </a>
            </div>

            <div className="hero-proof">
              <span>
                <Icon name="Sparkles" size={15} /> Personalised sections
              </span>
              <span>
                <Icon name="Code2" size={15} /> Developer focused
              </span>
            </div>
          </div>

          <div
            className="hero-art"
            aria-label="Abstract 3D portfolio artwork"
          >
            <div className="art-ring ring-a" />
            <div className="art-ring ring-b" />
            <div className="art-ring ring-c" />

            <div className="art-orb">
              <div className="art-orb-core" />
              <span className="orb-cross cross-one" />
              <span className="orb-cross cross-two" />
            </div>

            <div className="floating-chip chip-top">
              <span className="chip-dot" /> Creative developer
            </div>

            <div className="floating-chip chip-bottom">
              <Icon name="Code2" size={15} /> Crafted with purpose
            </div>

            <div className="floating-chip chip-side">
              <Icon name="Sparkles" size={15} /> Your next chapter
            </div>
          </div>
        </section>

        <section className="generator-section" id="generator">
          <div className="section-heading">
            <span className="eyebrow">PORTFOLIO GENERATOR</span>

            <h2>
              Let’s build <span className="gradient-text">your story.</span>
            </h2>

            <p>
              Fill in what you want to share. You can leave optional fields
              blank.
            </p>

            {/* NEW BUTTON: On the main page, above the form */}
            <div className="build-another-wrapper">
              <button
                type="button"
                className="build-another-btn"
                onClick={buildAnotherPortfolio}
              >
                <Icon name="Plus" size={17} />
                Build Another Portfolio
              </button>
            </div>
          </div>

          <form className="portfolio-form" onSubmit={generatePortfolio}>
            <div className="form-section-title">
              <span className="form-icon">
                <Icon name="UserRound" size={19} />
              </span>

              <div>
                <h3>Personal details</h3>
                <p>Give your portfolio a name and personality.</p>
              </div>
            </div>

            <div className="photo-upload-row">
              <div className="photo-preview">
                {photoPreview ? (
                  <img src={photoPreview} alt="Profile preview" />
                ) : (
                  <Icon name="UserRound" size={32} />
                )}
              </div>

              <label className="upload-button">
                <Icon name="Upload" size={17} /> Upload profile photo

                <input
                  id="portfolio-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={uploadPhoto}
                />
              </label>

              <span className="field-hint">JPG / PNG · Max 2 MB</span>
            </div>

            <div className="form-grid">
              <Field
                label="Full name"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="e.g. Your Full Name"
                required
              />

              <Field
                label="Professional role"
                name="role"
                value={form.role}
                onChange={updateField}
                placeholder="e.g. Frontend Developer"
                required
              />

              <Field
                label="Hero tagline"
                name="tagline"
                value={form.tagline}
                onChange={updateField}
                placeholder="A short line about what you do"
              />

              <Field
                label="Email address"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                type="email"
              />

              <Field
                label="Phone (optional)"
                name="phone"
                value={form.phone}
                onChange={updateField}
                placeholder="+91 ..."
              />

              <Field
                label="Location"
                name="location"
                value={form.location}
                onChange={updateField}
                placeholder="City, Country"
              />

              <Field
                label="LinkedIn profile"
                name="linkedin"
                value={form.linkedin}
                onChange={updateField}
                placeholder="https://linkedin.com/in/..."
              />

              <Field
                label="Instagram profile"
                name="instagram"
                value={form.instagram}
                onChange={updateField}
                placeholder="https://instagram.com/..."
              />

              <Field
                label="GitHub profile"
                name="github"
                value={form.github}
                onChange={updateField}
                placeholder="https://github.com/..."
              />

              <Field
                label="Resume URL"
                name="resume"
                value={form.resume}
                onChange={updateField}
                placeholder="Link to your resume PDF"
              />
            </div>

            <div className="form-section-title">
              <span className="form-icon">
                <Icon name="Sparkles" size={19} />
              </span>

              <div>
                <h3>About you</h3>
                <p>
                  Keep the reference’s section structure, with your own
                  details.
                </p>
              </div>
            </div>

            <div className="form-grid">
              <Field
                label="About description"
                name="about"
                value={form.about}
                onChange={updateField}
                placeholder="Write a short introduction..."
                multiline
              />

              <Field
                label="Who am I?"
                name="whoAmI"
                value={form.whoAmI}
                onChange={updateField}
                placeholder="Your background and journey..."
                multiline
              />

              <Field
                label="My Focus"
                name="focus"
                value={form.focus}
                onChange={updateField}
                placeholder="What are you learning or building?"
                multiline
              />

              <Field
                label="My Approach"
                name="approach"
                value={form.approach}
                onChange={updateField}
                placeholder="How do you solve problems?"
                multiline
              />

              <Field
                label="Technical skills (comma separated)"
                name="skills"
                value={form.skills}
                onChange={updateField}
                placeholder="HTML, CSS, JavaScript, React"
                multiline
              />
            </div>

            <div className="form-section-title">
              <span className="form-icon">
                <Icon name="Code2" size={19} />
              </span>

              <div>
                <h3>Projects</h3>
                <p>Add live work, GitHub repositories and technologies.</p>
              </div>
            </div>

            <div className="project-form-list">
              {projects.map((project, index) => (
                <div className="project-form-card" key={index}>
                  <div className="project-form-heading">
                    <span>
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </span>

                    {projects.length > 1 && (
                      <button
                        type="button"
                        className="icon-button"
                        onClick={() => removeProject(index)}
                        aria-label="Remove project"
                      >
                        <Icon name="Trash2" size={16} />
                      </button>
                    )}
                  </div>

                  <div className="form-grid">
                    <Field
                      label="Project title"
                      name="title"
                      value={project.title}
                      onChange={(event) => updateProject(index, event)}
                      placeholder="Project name"
                    />

                    <Field
                      label="Technologies (comma separated)"
                      name="technologies"
                      value={project.technologies}
                      onChange={(event) => updateProject(index, event)}
                      placeholder="React, CSS, API"
                    />

                    <Field
                      label="Description"
                      name="description"
                      value={project.description}
                      onChange={(event) => updateProject(index, event)}
                      placeholder="What does this project do?"
                      multiline
                    />

                    <Field
                      label="Live demo URL"
                      name="live"
                      value={project.live}
                      onChange={(event) => updateProject(index, event)}
                      placeholder="https://..."
                    />

                    <Field
                      label="GitHub repository URL"
                      name="github"
                      value={project.github}
                      onChange={(event) => updateProject(index, event)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="add-project-button"
              onClick={addProject}
            >
              <Icon name="Plus" size={17} /> Add another project
            </button>

            <div className="form-section-title">
              <span className="form-icon">
                <Icon name="GraduationCap" size={19} />
              </span>

              <div>
                <h3>Education &amp; growth</h3>
                <p>Use one line for each qualification or experience item.</p>
              </div>
            </div>

            <div className="form-grid">
              <Field
                label="Education"
                name="education"
                value={form.education}
                onChange={updateField}
                placeholder={"B.Tech CSE — College name\nYear or current semester"}
                multiline
              />

              <Field
                label="Experience / internships"
                name="experience"
                value={form.experience}
                onChange={updateField}
                placeholder={"Role — Company or organisation\nWhat you worked on"}
                multiline
              />

              <Field
                label="Achievements / certifications"
                name="achievements"
                value={form.achievements}
                onChange={updateField}
                placeholder={"Certification or achievement\nAward or accomplishment"}
                multiline
              />

              <Field
                label="Contact section heading"
                name="contactHeading"
                value={form.contactHeading}
                onChange={updateField}
                placeholder="Let’s build something great together."
              />

              <Field
                label="Contact section description"
                name="contactDescription"
                value={form.contactDescription}
                onChange={updateField}
                placeholder="Have a project in mind? Let's connect."
                multiline
              />
            </div>

            {notice && <p className="form-notice">{notice}</p>}

            <div className="form-submit-row">
              <p>
                <span className="required-star">*</span> Required fields.
                Optional fields can be left empty.
              </p>

              <button
                className="primary-button submit-button"
                type="submit"
              >
                Generate portfolio <Icon name="ArrowRight" size={18} />
              </button>
            </div>
          </form>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <span className="eyebrow">SIMPLE BY DESIGN</span>

            <h2>
              Your story, in{" "}
              <span className="gradient-text">three steps.</span>
            </h2>
          </div>

          <div className="steps-grid">
            <article>
              <span>01</span>
              <Icon name="UserRound" size={22} />
              <h3>Share your details</h3>
              <p>Add your introduction, skills, projects and links.</p>
            </article>

            <article>
              <span>02</span>
              <Icon name="Code2" size={22} />
              <h3>Build your portfolio</h3>
              <p>Your information is arranged into portfolio sections.</p>
            </article>

            <article>
              <span>03</span>
              <Icon name="ArrowUpRight" size={22} />
              <h3>Show your work</h3>
              <p>Review your generated page and share your journey.</p>
            </article>
          </div>
        </section>

        <DevelopersSection />
      </main>

      <footer className="site-footer">
        <a className="brand" href="#top">
          <span className="brand-mark">P.</span> Portify
          <span className="brand-dot">3D</span>
        </a>

        <p>Designed &amp; built with React. Keep learning, keep building.</p>

        <a href="#top" className="back-top">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}

export default function App() {
  return <MainPage />;
}