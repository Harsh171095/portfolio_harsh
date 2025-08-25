import React from "react";
import { motion } from "framer-motion";

const Skills = ({ skillsRef }) => {
  return (
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
  );
};

export default Skills;