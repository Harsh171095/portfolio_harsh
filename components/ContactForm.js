import { motion } from "framer-motion";

import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Message sent successfully!",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "An error occurred. Please try again later.",
      });
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
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
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>

            {submitStatus && (
              <div
                className={`mb-4 p-3 rounded-lg ${
                  submitStatus.success
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-green-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
