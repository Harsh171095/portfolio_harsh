import React from "react";

const Footer = () => {
  return (
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
  );
};

export default Footer;