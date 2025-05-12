import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ContactForm from "./ContactForm";
import Image from "next/image";

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Set up intersection observers for sections
  const [homeRef, homeInView] = useInView({ threshold: 0.5 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update active section based on which section is in view
  useEffect(() => {
    if (homeInView) setActiveSection("home");
    else if (aboutInView) setActiveSection("about");
    else if (skillsInView) setActiveSection("skills");
    else if (projectsInView) setActiveSection("projects");
    else if (contactInView) setActiveSection("contact");
  }, [homeInView, aboutInView, skillsInView, projectsInView, contactInView]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 py-4"
        style={{
          backgroundColor:
            scrollY > 50
              ? "rgba(255, 255, 255, 0.9)"
              : "rgba(255, 255, 255, 1)",
          backdropFilter: scrollY > 50 ? "blur(10px)" : "none",
        }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
              <span className="text-white font-bold">HK</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-teal-600 bg-clip-text text-transparent">
              Harsh Kadiya
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-sm font-medium hover:text-amber-500 transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "text-amber-500"
                    : "text-gray-700"
                }`}
              >
                {item}
              </a>
            ))}
            <button className="bg-gradient-to-r from-amber-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-amber-600 hover:to-teal-700 transition-all">
              Resume
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-2 px-4 shadow-lg">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`block py-2 text-sm font-medium hover:text-amber-500 transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "text-amber-500"
                    : "text-gray-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="mt-2 w-full bg-gradient-to-r from-amber-500 to-teal-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-amber-600 hover:to-teal-700 transition-all">
              Resume
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className="pt-24 pb-16 md:pt-32 md:pb-24"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  Senior Mobile Developer
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Harsh Kadiya
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-teal-600 mb-6"></div>
                <p className="text-xl md:text-2xl text-gray-600 mb-6">
                  I create exceptional mobile experiences with cutting-edge
                  technologies
                </p>
                <p className="text-gray-600 mb-8">
                  Specializing in iOS (Swift, SwiftUI, Objective-C), Flutter,
                  and React Native development with over 5 years of experience
                  building innovative applications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="bg-gradient-to-r from-amber-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium hover:from-amber-600 hover:to-teal-700 transition-all flex items-center"
                  >
                    <span className="mr-2">✉️</span>
                    Contact Me
                  </a>
                  <a
                    href="#projects"
                    className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all flex items-center"
                  >
                    <span className="mr-2">💼</span>
                    View Projects
                  </a>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-amber-300 rounded-full opacity-30 filter blur-xl"></div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-teal-300 rounded-full opacity-30 filter blur-xl"></div>
                <div className="relative z-10 bg-white p-2 rounded-2xl shadow-xl">
                  <div className="rounded-xl w-64 h-64 md:w-80 md:h-80 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src="/harsh.jpg"
                      alt="Harsh Gohil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <a
              href="#about"
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-all hover:shadow-lg"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              About Me
            </span>
            <h2 className="text-3xl font-bold mb-4">My Journey</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-teal-600 mx-auto"></div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-8 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-amber-500 to-teal-600 rounded-xl transform rotate-3"></div>
                <div className="relative z-10 rounded-xl shadow-lg bg-gray-200 w-full h-64 flex items-center justify-center overflow-hidden">
                  {/* Replace with your about image */}

                  <img
                    src="/about-image.svg"
                    alt="Harsh Gohil"
                    className="w-full h-full object-cover"
                  />
                  {/* <span className="text-gray-400 text-lg">About Image</span> */}
                </div>
              </div>
            </motion.div>
            <motion.div
              className="md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Creating impactful mobile experiences since 2018
              </h3>
              <p className="text-gray-600 mb-4">
                With over 5 years of experience in the IT industry, I've
                developed expertise in iOS (Swift, Objective-C) and Flutter app
                development. I've worked on diverse technical components
                including push notifications, Google Maps integration, Firebase
                Real-time databases, in-app purchases, and SDK development.
              </p>
              <p className="text-gray-600 mb-6">
                Beyond mobile development, I've expanded my skills to include
                emerging technologies like AI, ML, IoT, and LLM integration. I
                believe in creating applications that are not just functional,
                but deliver exceptional user experiences.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">5+ Years Experience</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">25+ Projects Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">10+ Technologies</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-gray-700">5+ Industries</span>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-block bg-gradient-to-r from-amber-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium hover:from-amber-600 hover:to-teal-700 transition-all"
              >
                Get In Touch
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              My Expertise
            </span>
            <h2 className="text-3xl font-bold mb-4">Technical Skills</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-teal-600 mx-auto mb-4"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              I've mastered a variety of technologies and frameworks to deliver
              high-quality mobile applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* iOS Development */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-amber-500 text-xl">🍎</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                iOS Development
              </h3>
              <p className="text-gray-600 mb-5">
                Expert-level development in Swift, SwiftUI, and Objective-C with
                comprehensive knowledge of iOS frameworks.
              </p>
              <div className="space-y-3">
                {[
                  "Swift",
                  "SwiftUI",
                  "Objective-C",
                  "UIKit",
                  "Core Data",
                  "CoreLocation",
                  "AVFoundation",
                  "XCTest",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Cross-Platform */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-teal-500 text-xl">📱</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Cross-Platform Development
              </h3>
              <p className="text-gray-600 mb-5">
                Building high-performance applications with Flutter and React
                Native for consistent experiences across platforms.
              </p>
              <div className="space-y-3">
                {[
                  "Flutter",
                  "Dart",
                  "React Native",
                  "JavaScript",
                  "Node.js",
                  "Next.js",
                  "Redux",
                  "Firebase",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Advanced Technologies */}
            <motion.div
              className="bg-white rounded-xl shadow-md p-6 transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-500 text-xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                Advanced Technologies
              </h3>
              <p className="text-gray-600 mb-5">
                Integrating cutting-edge technologies to create innovative and
                future-proof solutions.
              </p>
              <div className="space-y-3">
                {[
                  "Artificial Intelligence",
                  "Machine Learning",
                  "IoT Integration",
                  "AWS",
                  "LLM Integration",
                  "RESTful APIs",
                  "Jest.js",
                  "Laravel (Backend)",
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Additional Skills */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
              Additional Expertise
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "In-App Purchases",
                "Push Notifications",
                "Google Maps",
                "Firebase",
                "MongoDB",
                "Payment Gateways",
                "Social Media Integration",
                "Analytics",
                "Core Animation",
                "Threading & Concurrency",
                "Memory Management",
                "CI/CD",
                "Clean Architecture",
                "MVVM",
              ].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 border border-gray-200 hover:border-amber-500 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              My Work
            </span>
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-teal-600 mx-auto mb-4"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              A showcase of my recent mobile development projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project cards with sample projects */}
            {[
              {
                title: "IAM SDK",
                category: "iOS",
                description:
                  "A cryptographical identification iOS SDK developed for banking sector clients including ICICI Bank and Yes Bank.",
                tags: ["Swift", "Objective-C", "Cordova", "Framework"],
                color: "amber",
              },
              {
                title: "Poptronics",
                category: "iOS",
                description:
                  "Educational management application with student and teacher platforms, featuring secure media encryption.",
                tags: ["Swift", "Encryption", "Education"],
                link: "https://apps.apple.com/us/app/byteachers-app-for-coachings/id6446082896",
                color: "amber",
              },
              {
                title: "Soapbx Engage",
                category: "iOS",
                description:
                  "Social media platform for political engagement with polling, blog creation, and subscription features.",
                tags: ["Swift", "In-App Purchase", "Social Media"],
                link: "https://apps.apple.com/in/app/engage-soapbx/id6472717891",
                color: "amber",
              },
              {
                title: "MyJuno",
                category: "iOS/Objective-C",
                description:
                  "Real-time translation app supporting 30+ languages for group chats and business communications.",
                tags: ["Swift", "Objective-C", "Translation"],
                link: "https://apps.apple.com/in/app/myjuno-group-chat-translation/id1499973731",
                color: "teal",
              },
              {
                title: "Skyloov",
                category: "iOS",
                description:
                  "Revolutionary property portal with 360-degree views of cities, communities, and buildings.",
                tags: ["Swift", "3D Visualization", "Real Estate"],
                link: "https://apps.apple.com/us/app/skyloov/id1499596800",
                color: "amber",
              },
              {
                title: "OctoServe",
                category: "Flutter",
                description:
                  "Hotel accommodation booking app with room preview features and streamlined payment process.",
                tags: ["Flutter", "Dart", "Hospitality"],
                link: "https://play.google.com/store/apps/details?id=com.technoarts.octa_serve",
                color: "blue",
              },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Project Image</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-gray-800">
                      {project.title}
                    </h3>
                    <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-500 font-medium flex items-center"
                    >
                      View in App Store
                      <span className="ml-1">→</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}

      <section id="contact" ref={contactRef} className="py-16 bg-gray-50">
        {/* <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
              Get In Touch
            </span>
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-amber-500 to-teal-600 mx-auto mb-4"></div>
            <p className="max-w-2xl mx-auto text-gray-600">
              Interested in working together? Let's discuss your project
              requirements.
            </p>
          </div>

          <motion.div
            className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:w-2/5 bg-gradient-to-br from-amber-500 to-teal-600 p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="mt-1 mr-3">📱</span>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p>+91 99980 42877</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3">✉️</span>
                  <div>
                    <p className="font-medium">Email</p>
                    <p>harshraj.gohil171095@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="mt-1 mr-3">📍</span>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-medium mb-3">Connect with me</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                  >
                    <span>🔗</span>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/40 transition-colors"
                  >
                    <span>🐦</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="md:w-3/5 p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Send Message
              </h3>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  ></textarea>
                </div>
                <button className="w-full bg-gradient-to-r from-amber-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-amber-600 hover:to-teal-700">
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div> */}
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">Harsh Kadiya</h2>
              <p className="text-gray-400">Senior iOS & Flutter Developer</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-500 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                GitHub
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Twitter
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Harsh Kadiya. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
