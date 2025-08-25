import React from "react";
import { motion } from "framer-motion";

const About = ({ aboutRef }) => {
  return (
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
                <img
                  src="/about-image.svg"
                  alt="Harsh Gohil"
                  className="w-full h-full object-cover"
                />
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
  );
};

export default About;