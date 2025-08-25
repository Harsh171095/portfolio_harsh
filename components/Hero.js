import React from "react";
import { motion } from "framer-motion";

const Hero = ({ homeRef }) => {
  return (
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
                  href="/blogs"
                  className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-all flex items-center"
                >
                  <span className="mr-2">📝</span>
                  Read Blogs
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
  );
};

export default Hero;