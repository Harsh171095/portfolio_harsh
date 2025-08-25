import React from "react";

const Navigation = ({
  scrollY,
  activeSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 py-4"
      style={{
        backgroundColor:
          scrollY > 50 ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 1)",
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
          {["Home", "About", "Skills", "Blogs", "Contact"].map((item) => (
            <a
              key={item}
              href={item === "Blogs" ? "/blogs" : `#${item.toLowerCase()}`}
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
          {["Home", "About", "Skills", "Blogs", "Contact"].map((item) => (
            <a
              key={item}
              href={item === "Blogs" ? "/blogs" : `#${item.toLowerCase()}`}
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
  );
};

export default Navigation;
