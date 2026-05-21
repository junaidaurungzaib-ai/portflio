"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Phone,
  X
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  navItems,
  profile,
  projectItems,
  researchItems,
  skillCloud,
  experienceItems,
  educationItems,
  certificationItems
} from "@/data/portfolioData";

const filterOptions = ["All", "Web Apps", "AI/ML", "Mobile"] as const;
const WEB3FORMS_ACCESS_KEY = "ba4bd78b-94e2-44cb-849d-5aaee91fb2e8";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type FilterOption = (typeof filterOptions)[number];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedRole, setTypedRole] = useState(profile.typingRoles[0]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openResearch, setOpenResearch] = useState<number | null>(0);
  const [filter, setFilter] = useState<FilterOption>("All");
  const [formData, setFormData] = useState<FormState>(initialForm);
  const [formErrors, setFormErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [resultMessage, setResultMessage] = useState("");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    const observers = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    observers.forEach((section) => intersection.observe(section));

    return () => {
      observers.forEach((section) => intersection.unobserve(section));
      intersection.disconnect();
    };
  }, []);

  useEffect(() => {
    const currentRole = profile.typingRoles[roleIndex];
    const typingDelay = isDeleting ? 55 : 95;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        const nextChar = currentRole.slice(0, charIndex + 1);
        setTypedRole(nextChar);
        setCharIndex((prev) => prev + 1);

        if (nextChar === currentRole) {
          setIsDeleting(true);
        }
      } else {
        const nextChar = currentRole.slice(0, Math.max(charIndex - 1, 0));
        setTypedRole(nextChar);
        setCharIndex((prev) => Math.max(prev - 1, 0));

        if (nextChar.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % profile.typingRoles.length);
        }
      }
    }, charIndex === currentRole.length && !isDeleting ? 1200 : typingDelay);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const visibleProjects = useMemo(() => {
    if (filter === "All") {
      return projectItems;
    }
    return projectItems.filter((project) => project.category === filter);
  }, [filter]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const validateForm = (values: FormState) => {
    const errors: Partial<FormState> = {};
    if (!values.name.trim()) errors.name = "Name is required.";
    if (!values.subject.trim()) errors.subject = "Subject is required.";
    if (!values.message.trim()) errors.message = "Message is required.";

    if (!values.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Enter a valid email address.";
    }

    return errors;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitState("idle");
    setResultMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitState("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitState("idle");

    try {
      const formDataPayload = new FormData(event.currentTarget);
      formDataPayload.append("access_key", WEB3FORMS_ACCESS_KEY);
      formDataPayload.append("from_name", profile.name);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formDataPayload
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your message right now.");
      }

      setSubmitState("success");
      setResultMessage("Message sent successfully. Thank you for reaching out.");
      setFormData(initialForm);
    } catch (error) {
      setSubmitState("error");
      const message = error instanceof Error ? error.message : "Message delivery failed. Check the Web3Forms access key.";
      setResultMessage(message);
      setFormErrors((prev) => ({
        ...prev,
        message: prev.message ?? "Message delivery failed. Check the Web3Forms access key."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-md">
        <div className="section-wrap flex h-16 items-center justify-between">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-semibold tracking-wide text-white"
            aria-label="Go to home section"
          >
            {profile.name}
          </button>

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm transition ${
                  activeSection === item.id ? "text-emeraldAccent" : "text-slate-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="rounded-lg border border-white/15 bg-white/5 p-2 text-slate-100 md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className="fixed inset-y-0 right-0 z-[60] w-72 border-l border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl md:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-100">Navigate</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg border border-white/15 p-2"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                    activeSection === item.id
                      ? "bg-emeraldAccent/15 text-emeraldAccent"
                      : "text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <main className="pb-20 pt-16">
        <section id="hero" className="relative overflow-hidden border-b border-white/10 py-20 sm:py-24">
          <div className="absolute inset-0 -z-10">
            {[...Array(8)].map((_, index) => (
              <motion.span
                key={index}
                className="absolute h-24 w-24 rounded-full bg-emeraldAccent/10 blur-xl"
                initial={{ opacity: 0.15, y: 40 }}
                animate={{
                  opacity: [0.14, 0.28, 0.14],
                  y: [30, -20, 30],
                  x: [0, index % 2 === 0 ? 24 : -24, 0]
                }}
                transition={{ duration: 7 + index, repeat: Infinity, ease: "easeInOut" }}
                style={{ top: `${8 + index * 9}%`, left: `${index * 11}%` }}
              />
            ))}
          </div>

          <div className="section-wrap relative">
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="mb-3 inline-flex items-center rounded-full border border-emeraldAccent/30 bg-emeraldAccent/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-emerald-300"
            >
              Open for Global Remote Opportunities
            </motion.p>

            <motion.h1
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="max-w-4xl text-3xl font-semibold leading-tight text-white sm:text-5xl"
            >
              <span className="block">{profile.name}</span>
              <span className="block bg-gradient-to-r from-emerald-300 via-emerald-400 to-indigo-400 bg-clip-text pt-2 text-transparent">
                Machine Learning, Computer Vision, and Intelligent Software Systems
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg"
            >
              {profile.headline}
            </motion.p>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-5 flex items-center gap-2 text-sm text-slate-300"
            >
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{typedRole || " "}</span>
              <span className="text-slate-400">| {profile.location}</span>
            </motion.div>

            <motion.div
              initial={{ y: 18, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center gap-2 rounded-xl bg-emeraldAccent px-5 py-3 text-sm font-medium text-slate-950 transition hover:brightness-110"
              >
                View My Work
                <ArrowUpRight size={16} />
              </button>

              <a
                href="/Junaid_Aurungzaib_CV.pdf"
                download="Junaid_Aurungzaib_CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                Download CV
                <Download size={16} />
              </a>
            </motion.div>

            <p className="mt-5 text-sm text-slate-400">{profile.careerGoal}</p>

            <motion.aside
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]"
            >
              <div
                className="min-h-72 overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-glass"
                style={{
                  backgroundImage:
                    'linear-gradient(180deg, rgba(2,6,23,0.1), rgba(2,6,23,0.65)), url(/hero-ml.svg)',
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="flex h-full items-end p-6">
                  <div className="max-w-sm rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur-md">
                    <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Research Visual</p>
                    <p className="mt-2 text-sm text-slate-200">
                      Brain tumor detection, image classification, and machine learning model refinement.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ["Machine Learning", "TensorFlow, PyTorch, Keras"],
                  ["Computer Vision", "Medical imaging and image preprocessing"],
                  ["Engineering Focus", "Reliable software, QA, and secure delivery"]
                ].map(([title, detail]) => (
                  <div key={title} className="glass-card p-4">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm text-slate-300">{detail}</p>
                  </div>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>

        <section id="research" className="section-wrap py-16 sm:py-20">
          <h2 className="section-title">Research and Publications Focus</h2>
          <p className="mt-3 max-w-3xl text-slate-300">
            Focused on applied machine learning, computer vision, and medical image analysis, with the main research topic centered on optimized brain tumor detection using machine learning.
          </p>

          <div className="mt-8 space-y-4">
            {researchItems.map((item, index) => {
              const isOpen = openResearch === index;
              return (
                <motion.article
                  key={item.title}
                  layout
                  className="glass-card overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => setOpenResearch(isOpen ? null : index)}
                    className="flex w-full flex-col gap-4 px-5 py-5 text-left sm:flex-row sm:items-center sm:justify-between"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="h-16 w-16 shrink-0 rounded-2xl bg-cover bg-center ring-1 ring-white/10"
                        style={{ backgroundImage: `url(${item.image})` }}
                        aria-hidden="true"
                      />
                      <div>
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-emerald-300">{item.venue}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-300">{isOpen ? "Hide" : "Read Abstract"}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-white/10"
                      >
                        <div className="px-5 py-4">
                          <p className="text-sm leading-relaxed text-slate-300">{item.abstract}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full border border-emeraldAccent/30 bg-emeraldAccent/10 px-3 py-1 text-xs text-emerald-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="projects" className="border-y border-white/10 bg-slate-900/35 py-16 sm:py-20">
          <div className="section-wrap">
            <h2 className="section-title">Interactive Project Showcase</h2>
            <p className="mt-3 max-w-3xl text-slate-300">
              Portfolio entries mapped from real professional responsibilities, implementation experience, and documented tools from career history.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    filter === option
                      ? "border-emeraldAccent/50 bg-emeraldAccent/15 text-emerald-300"
                      : "border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2">
              <AnimatePresence>
                {visibleProjects.map((project) => (
                  <motion.article
                    layout
                    key={project.title}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18 }}
                    whileHover={{ y: -6 }}
                    className="glass-card group p-5"
                  >
                      <div
                        className="mb-4 h-40 overflow-hidden rounded-xl border border-white/10 bg-slate-900"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center"
                        }}
                      >
                        <div className="flex h-full items-end bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4">
                          <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs text-slate-100 backdrop-blur">
                            {project.imageAlt}
                          </span>
                        </div>
                      </div>

                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      <span className="rounded-full bg-indigoAccent/20 px-2.5 py-1 text-xs text-indigo-300">
                        {project.category}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-2 opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                      {project.github ? (
                        <a
                          href={project.github}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-3 py-2 text-xs text-slate-200 hover:bg-white/10"
                        >
                          <Github size={14} /> Repo
                        </a>
                      ) : null}
                      {project.demo ? (
                        <a
                          href={project.demo}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-3 py-2 text-xs text-slate-200 hover:bg-white/10"
                        >
                          <ExternalLink size={14} /> Demo
                        </a>
                      ) : null}
                      {!project.github && !project.demo ? (
                        <span className="text-xs text-slate-400">Project artifacts available on request.</span>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="section-wrap py-16 sm:py-20">
          <h2 className="section-title">Professional Experience</h2>

          <div className="mt-8 relative border-l border-white/15 pl-6 sm:pl-8">
            {experienceItems.map((item, index) => (
              <motion.article
                key={`${item.title}-${item.organization}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                className="relative mb-7"
              >
                <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-emerald-400 bg-emerald-400/20" />
                <div className="glass-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <span className="text-xs text-slate-400">{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-emerald-300">{item.organization}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                    {item.details.map((detail) => (
                      <li key={detail}>- {detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="education" className="section-wrap py-16 sm:py-20 border-t border-white/10">
          <h2 className="section-title">Education</h2>

          <div className="mt-8 relative border-l border-white/15 pl-6 sm:pl-8">
            {educationItems.map((item, index) => (
              <motion.article
                key={`${item.title}-${item.organization}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                className="relative mb-7"
              >
                <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-indigo-400 bg-indigo-400/20" />
                <div className="glass-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <span className="text-xs text-slate-400">{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-indigo-300">{item.organization}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                    {item.details.map((detail) => (
                      <li key={detail}>- {detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="certifications" className="section-wrap py-16 sm:py-20 border-t border-white/10">
          <h2 className="section-title">Certifications</h2>

          <div className="mt-8 relative border-l border-white/15 pl-6 sm:pl-8">
            {certificationItems.map((item, index) => (
              <motion.article
                key={`${item.title}-${item.organization}-${index}`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                className="relative mb-7"
              >
                <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-cyan-300 bg-cyan-300/20" />
                <div className="glass-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <span className="text-xs text-slate-400">{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-cyan-300">{item.organization}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-300">
                    {item.details.map((detail) => (
                      <li key={detail}>- {detail}</li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {skillCloud.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" className="border-t border-white/10 py-16 sm:py-20">
          <div className="section-wrap grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="section-title">Contact</h2>
              <p className="mt-3 max-w-md text-slate-300">
                Available for remote machine learning, computer vision, full-stack software, and technical collaboration opportunities with international teams and academic committees.
              </p>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white">
                  <Mail size={15} /> {profile.email}
                </a>
                <a href={`tel:${profile.phone}`} className="flex items-center gap-2 hover:text-white">
                  <Phone size={15} /> {profile.phone}
                </a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="glass-card p-5 sm:p-6">
              <div className="grid gap-4">
                {([
                  { field: "name", label: "Full Name", type: "text" },
                  { field: "email", label: "Email Address", type: "email" },
                  { field: "subject", label: "Subject", type: "text" }
                ] as const).map((input) => (
                  <label key={input.field} className="relative block">
                    <input
                      name={input.field}
                      type={input.type}
                      value={formData[input.field]}
                      onChange={(event) => handleChange(input.field, event.target.value)}
                      className="peer w-full rounded-xl border border-white/15 bg-white/5 px-4 pb-2 pt-6 text-sm text-white outline-none transition focus:border-emeraldAccent"
                      placeholder=" "
                    />
                    <span className="pointer-events-none absolute left-4 top-4 origin-left text-xs text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-300">
                      {input.label}
                    </span>
                    {formErrors[input.field] ? (
                      <small className="mt-1 block text-xs text-rose-300">{formErrors[input.field]}</small>
                    ) : null}
                  </label>
                ))}

                <label className="relative block">
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    className="peer w-full rounded-xl border border-white/15 bg-white/5 px-4 pb-2 pt-6 text-sm text-white outline-none transition focus:border-emeraldAccent"
                    placeholder=" "
                  />
                  <span className="pointer-events-none absolute left-4 top-4 origin-left text-xs text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-300">
                    Message
                  </span>
                  {formErrors.message ? (
                    <small className="mt-1 block text-xs text-rose-300">{formErrors.message}</small>
                  ) : null}
                </label>

                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                  aria-hidden="true"
                  style={{ display: "none" }}
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emeraldAccent px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>

                {resultMessage ? (
                  <p className={`text-sm ${submitState === "success" ? "text-emerald-300" : "text-rose-300"}`}>
                    {resultMessage}
                  </p>
                ) : null}

                <AnimatePresence mode="wait">
                  {submitState === "success" ? (
                    <motion.p
                      key="success"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm text-emerald-300"
                    >
                      Message sent successfully. Thank you for reaching out.
                    </motion.p>
                  ) : null}

                  {submitState === "error" && Object.keys(formErrors).length > 0 ? (
                    <motion.p
                      key="error"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm text-rose-300"
                    >
                      Please correct the highlighted fields before submitting.
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        <div className="section-wrap">© {new Date().getFullYear()} {profile.name}. All rights reserved.</div>
      </footer>
    </>
  );
}
