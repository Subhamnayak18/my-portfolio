import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Utensils,
  Shield,
  Zap,
  Star,
  ChevronDown,
  Code,
  Palette,
  ArrowRight,
  ExternalLink,
  Award,
  Terminal,
  Database,
  FileCode,
  GitBranch,
} from "lucide-react";

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));
    setParticles(initialParticles);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles((prev) =>
        prev.map((particle) => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;

          if (newX < 0 || newX > canvas.width) particle.vx *= -1;
          if (newY < 0 || newY > canvas.height) particle.vy *= -1;

          newX = Math.max(0, Math.min(canvas.width, newX));
          newY = Math.max(0, Math.min(canvas.height, newY));

          ctx.beginPath();
          ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
          ctx.fill();

          return { ...particle, x: newX, y: newY };
        })
      );

      requestAnimationFrame(animateParticles);
    };

    animateParticles();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  const projects = [
    {
      title: "Bridge the Gap",
      description:
        "A web platform built with HTML, CSS, and JavaScript that connects NGOs with event organizers to collect surplus food from weddings or parties and distribute it to homeless people in need.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "🌉",
      link: "https://subhamnayak18.github.io/sn29/",
      gradient: "from-green-500 to-lime-500",
    },
    {
      title: "Quantum Computing Simulator",
      description:
        "Web-based quantum circuit designer with state visualization and quantum algorithm examples for educational purposes.",
      tech: ["TypeScript", "D3.js", "WebAssembly", "Node.js"],
      image: "⚛️",
      link: "#",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "King of Deals",
      description:
        "A fully responsive e-commerce website built from scratch using HTML, CSS, and JavaScript. It features product listings, modern design, and smooth user interactions.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "🛍️",
      link: "https://subhamnayak18.github.io/kingofdeals/",
      gradient: "from-pink-500 to-red-500",
    },
  ];

  const skillCategories = [
    {
      title: "Languages",
      icon: <FileCode className="w-6 h-6" />,
      skills: [
        {
          name: "JavaScript",
          level: 95,
          color: "from-yellow-400 to-orange-500",
        },
        { name: "TypeScript", level: 90, color: "from-blue-400 to-blue-600" },
        { name: "C++", level: 85, color: "from-purple-400 to-purple-600" },
      ],
    },
    {
      title: "Frameworks",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "React", level: 95, color: "from-cyan-400 to-blue-500" },
        { name: "Node.js", level: 88, color: "from-green-400 to-green-600" },
        { name: "Express", level: 85, color: "from-gray-400 to-gray-600" },
        { name: "MongoDB", level: 80, color: "from-green-500 to-green-700" },
      ],
    },
    {
      title: "Tools",
      icon: <Terminal className="w-6 h-6" />,
      skills: [
        { name: "Git", level: 90, color: "from-orange-400 to-red-500" },
        { name: "GitHub", level: 88, color: "from-gray-400 to-gray-600" },
        { name: "Vite", level: 85, color: "from-purple-400 to-pink-500" },
        { name: "Tailwind CSS", level: 92, color: "from-cyan-400 to-teal-500" },
        { name: "VS Code", level: 95, color: "from-blue-400 to-indigo-500" },
      ],
    },
    {
      title: "Competitive Programming",
      icon: <Award className="w-6 h-6" />,
      skills: [
        {
          name: "Data Structures & Algorithms",
          level: 88,
          color: "from-red-400 to-pink-500",
          special: "LeetCode Enthusiast",
        },
        {
          name: "Problem Solving",
          level: 90,
          color: "from-emerald-400 to-green-500",
          special: "3⭐️ CodeChef",
        },
        {
          name: "Competitive Coding",
          level: 85,
          color: "from-purple-400 to-indigo-500",
          special: "Active on Codeforces",
        },
      ],
    },
  ];

  const FloatingIcon = ({ children, delay = 0 }) => (
    <div
      className="absolute animate-bounce"
      style={{
        animationDelay: `${delay}s`,
        animationDuration: "3s",
        transform: `translate(${Math.sin(scrollY * 0.01 + delay) * 20}px, ${
          Math.cos(scrollY * 0.01 + delay) * 15
        }px)`,
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden relative">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
          }}
        ></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${50 + scrollY * 0.01}% ${
              50 + scrollY * 0.02
            }%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)`,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hover:from-pink-400 hover:to-purple-400 transition-all duration-300">
              Subham Nayak Portfolio
            </div>
            <div className="flex space-x-8">
              {["home", "about", "skills", "projects", "contact"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="capitalize hover:text-purple-400 transition-all duration-300 relative group"
                  >
                    {section}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center z-10"
      >
        <FloatingIcon delay={0}>
          <div className="text-4xl opacity-30 top-20 left-20">⚡</div>
        </FloatingIcon>
        <FloatingIcon delay={1}>
          <div className="text-3xl opacity-40 top-40 right-32">🚀</div>
        </FloatingIcon>
        <FloatingIcon delay={2}>
          <div className="text-5xl opacity-25 bottom-40 left-16">💻</div>
        </FloatingIcon>
        <FloatingIcon delay={1.5}>
          <div className="text-3xl opacity-35 bottom-20 right-20">🌟</div>
        </FloatingIcon>

        <div
          className="text-center transform transition-all duration-1000"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="mb-8 relative">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-1 animate-spin">
              <div
                className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 animate-spin"
                style={{ animationDirection: "reverse" }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src="/PHOTO.jpg"
                    alt="Subham Nayak"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-ping opacity-20"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            <span className="inline-block animate-pulse">John</span>{" "}
            <span
              className="inline-block animate-pulse"
              style={{ animationDelay: "0.5s" }}
            >
              Doe
            </span>
          </h1>
          <div className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-semibold">
              Full-Stack Developer
            </span>
            <span className="mx-2">•</span>
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              DSA
            </span>
            <span className="mx-2">•</span>
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold">
              Problem Solver
            </span>
          </div>
          <div className="flex flex-col items-center space-y-4 mb-12">
            {/* First Row: Github, Linkedin, Mail */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/Subhamnayak18"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-purple-600/20 rounded-full hover:bg-purple-600/40 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <Github className="w-6 h-6 group-hover:text-purple-300 transition-colors duration-300" />
              </a>
              <a
                href="https://www.linkedin.com/in/subham-nayak2918/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 bg-blue-600/20 rounded-full hover:bg-blue-600/40 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <Linkedin className="w-6 h-6 group-hover:text-blue-300 transition-colors duration-300" />
              </a>
              <a
                href="mailto:subhamnayak2918@gmail.com"
                className="group p-4 bg-green-600/20 rounded-full hover:bg-green-600/40 transition-all duration-300 hover:scale-110 hover:rotate-12"
              >
                <Mail className="w-6 h-6 group-hover:text-green-300 transition-colors duration-300" />
              </a>
            </div>

            {/* Second Row: LeetCode, CodeChef, Codeforces */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://leetcode.com/u/subhamnayak2918/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-yellow-500 hover:bg-yellow-500/20 transition-all duration-300"
              >
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-yellow-600 font-medium">LeetCode</span>
              </a>
              <a
                href="https://www.codechef.com/users/subhamnayak291"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-orange-500 hover:bg-orange-500/20 transition-all duration-300"
              >
                <Utensils className="w-5 h-5 text-orange-500" />
                <span className="text-orange-600 font-medium">CodeChef</span>
              </a>
              <a
                href="https://codeforces.com/profile/subhamnayak2918"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-indigo-500 hover:bg-indigo-500/20 transition-all duration-300"
              >
                <Shield className="w-5 h-5 text-indigo-500" />
                <span className="text-indigo-600 font-medium">Codeforces</span>
              </a>
            </div>
          </div>
          <button
            onClick={() => scrollToSection("about")}
            className="animate-bounce hover:animate-pulse"
          >
            <ChevronDown className="w-8 h-8 text-purple-400 hover:text-purple-300 transition-colors duration-300" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 z-10 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className="transform transition-all duration-1000"
              style={{
                transform: `translateX(${Math.max(0, 300 - scrollY * 0.8)}px)`,
                opacity: Math.max(0, Math.min(1, (scrollY - 200) / 300)),
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                I’m a passionate developer driven by the thrill of building
                innovative solutions that blend technology with creativity. A
                proud student of <span className="font-bold">NIT Rourkela</span>
                , I bring solid experience in the MERN stack, modern web
                development, and a strong foundation in Data Structures &amp;
                Algorithms (DSA). I thrive on turning complex problems into
                elegant, user-friendly products.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Outside of crafting seamless digital experiences, I love
                tackling algorithmic challenges — I’m an active problem solver
                and competitive programmer on platforms like LeetCode, CodeChef
                (3⭐️!), and Codeforces. I’m deeply curious about emerging tech,
                from generative AI to cutting-edge frameworks, and I enjoy
                contributing to open source whenever I can.
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                For me, learning never stops — every line of code is an
                opportunity to push boundaries and grow as a Full Stack
                Developer.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full">
                  <Star className="w-4 h-4 text-orange-400" />
                  <span className="text-orange-300 font-semibold">
                    3⭐️ CodeChef
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-300 font-semibold">
                    Problem Solver
                  </span>
                </div>
              </div>
              <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group">
                Download Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            <div
              className="relative"
              style={{
                transform: `translateX(${Math.max(0, -300 + scrollY * 0.8)}px)`,
                opacity: Math.max(0, Math.min(1, (scrollY - 200) / 300)),
              }}
            >
              <div className="w-80 h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
                <div
                  className="absolute inset-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute inset-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="absolute inset-12 bg-black rounded-full flex items-center justify-center text-6xl">
                  💡
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 z-10 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 group"
                style={{
                  transform: `translateY(${Math.max(
                    0,
                    100 - (scrollY - 1200) * 0.3
                  )}px)`,
                  opacity: Math.max(0, Math.min(1, (scrollY - 1000) / 400)),
                  transitionDelay: `${categoryIndex * 150}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg group-hover:from-purple-600/40 group-hover:to-blue-600/40 transition-all duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name} className="relative">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">
                            {skill.level}%
                          </span>
                          {skill.special && (
                            <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
                              {skill.special}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-1000 relative`}
                          style={{
                            width: `${scrollY > 1200 ? skill.level : 0}%`,
                            transitionDelay: `${
                              (categoryIndex * 4 + skillIndex) * 100
                            }ms`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 z-10 relative">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden hover:rotate-1"
                style={{
                  transform: `translateY(${Math.max(
                    0,
                    100 - (scrollY - 1800) * 0.2
                  )}px) rotateX(${Math.max(
                    0,
                    15 - (scrollY - 1800) * 0.03
                  )}deg)`,
                  opacity: Math.max(0, Math.min(1, (scrollY - 1600) / 400)),
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-spin"
                    style={{ animationDuration: "3s" }}
                  ></div>
                  <div className="absolute inset-0.5 rounded-xl bg-gray-900/90 backdrop-blur-sm"></div>
                </div>

                {/* Glowing Orb Animation */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping"></div>
                </div>

                {/* Project Content */}
                <div className="relative z-10">
                  {/* Animated Project Icon */}
                  <div className="relative mb-6">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-all duration-500 group-hover:animate-pulse relative z-10">
                      {project.image}
                    </div>
                    {/* Rotating Ring Around Icon */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 border-2 border-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-700"></div>
                    <div
                      className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-16 border border-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-all duration-700"
                      style={{
                        animationDirection: "reverse",
                        animationDuration: "2s",
                      }}
                    ></div>
                  </div>

                  {/* Title with Typewriter Effect */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500">
                    {project.title}
                  </h3>

                  {/* Description with Slide-in Animation */}
                  <div className="overflow-hidden">
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed transform translate-y-0 group-hover:translate-y-0 transition-transform duration-500">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack with Staggered Animation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs hover:bg-purple-600/40 transition-all duration-300 cursor-default transform hover:scale-110 hover:-translate-y-1"
                        style={{
                          animationDelay: `${techIndex * 100}ms`,
                          transitionDelay: `${techIndex * 50}ms`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Animated CTA Button */}
                  <div className="relative">
                    <a
                      href={project.link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 hover:from-purple-600/40 hover:to-blue-600/40 hover:border-purple-400 transition-all duration-500 group/link relative overflow-hidden"
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-500 origin-left rounded-full"></div>

                      {/* Button Content */}
                      <span className="relative z-10 text-purple-400 group-hover/link:text-white transition-colors duration-300">
                        View Project
                      </span>
                      <ExternalLink className="w-4 h-4 relative z-10 text-purple-400 group-hover/link:text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-300" />

                      {/* Sparkle Effect */}
                      <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-0 group-hover/link:opacity-100 animate-ping"></div>
                    </a>
                  </div>
                </div>

                {/* Gradient Overlay Animation */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
                ></div>

                {/* Floating Particles */}
                <div
                  className="absolute top-8 left-8 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="absolute top-16 right-12 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute bottom-12 left-12 w-1 h-1 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-500"
                  style={{ animationDelay: "1s" }}
                ></div>

                {/* Corner Glow Effect */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 z-10 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your idea. My code. Let’s make it happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:john@example.com"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <Mail className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Get In Touch</span>
            </a>
            <a
              href="https://www.linkedin.com/in/subham-nayak2918/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border border-blue-500 rounded-full hover:bg-blue-500/10 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              <Linkedin className="w-5 h-5 relative z-10" />
              <span className="relative z-10">View LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-purple-500/20 z-10 relative">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-4">
            © 2025 Subham Nayak. Crafted with curiosity, creativity, and code.
          </p>

          <div className="flex justify-center items-center flex-wrap gap-4 text-sm text-gray-500">
            <span>Techstack used</span>

            {/* React */}
            <div className="group relative p-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg"
                alt="React"
                className="w-6 h-6"
              />
            </div>

            {/* Node.js */}
            <div className="group relative p-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg"
                alt="Node.js"
                className="w-6 h-6"
              />
            </div>

            {/* TypeScript */}
            <div className="group relative p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"
                alt="TypeScript"
                className="w-6 h-6"
              />
            </div>

            {/* Tailwind CSS */}
            <div className="group relative p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">
              <img
                src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg"
                alt="Tailwind CSS"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
