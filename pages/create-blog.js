import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { createBlog } from "../lib/api";

const CreateBlog = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    coverImage: "",
    readTime: "",
    published: false,
    featured: false,
  });

  const categories = [
    "iOS Development",
    "Cross-Platform",
    "AI/ML",
    "Flutter",
    "Industry Trends",
    "Tutorial",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form
      if (
        !formData.title ||
        !formData.excerpt ||
        !formData.content ||
        !formData.category
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Validate custom category if "Other" is selected
      if (formData.category === "Other" && !customCategory.trim()) {
        throw new Error("Please enter a custom category name");
      }

      // Process tags
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const blogData = {
        slug: formData.title
          .toLowerCase()
          .replace(/[^\w ]+/g, "")
          .replace(/ +/g, "-"),
        ...formData,
        category:
          formData.category === "Other" ? customCategory : formData.category,
        tags: tagsArray,
      };

      const response = await createBlog(blogData);

      // Redirect to the new blog post
      router.push(`/blog/${response.data.slug}`);
    } catch (err) {
      setError(err.message || "Failed to create blog post");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">HK</span>
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-amber-500 to-teal-600 bg-clip-text text-transparent">
                  Harsh Kadiya
                </h1>
              </div>
            </Link>
            <Link href="/blogs">
              <span className="text-gray-600 hover:text-amber-500 transition-colors cursor-pointer">
                ← Back to Blogs
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <motion.div
        className="bg-gradient-to-br from-amber-500 to-teal-600 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Create New Blog Post
            </h1>
            <p className="text-xl text-white/90">
              Share your knowledge and experiences with the world
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.div
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                  {error}
                </div>
              )}

              {/* Title */}
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="Enter your blog title"
                  maxLength={200}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.title.length}/200 characters
                </p>
              </div>

              {/* Excerpt */}
              <div className="mb-6">
                <label
                  htmlFor="excerpt"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="Brief description of your blog post"
                  maxLength={500}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.excerpt.length}/500 characters
                </p>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {formData.category === "Other" && (
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                    placeholder="Enter custom category name"
                  />
                )}
              </div>

              {/* Read Time */}
              <div className="mb-6">
                <label
                  htmlFor="readTime"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Read Time
                </label>
                <input
                  type="text"
                  id="readTime"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="e.g., 5 min read (leave empty for auto-calculation)"
                />
                <p className="text-sm text-gray-500 mt-1">
                  If left empty, read time will be automatically calculated
                  based on content
                </p>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label
                  htmlFor="tags"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="Enter tags separated by commas (e.g., Swift, iOS, Tutorial)"
                />
              </div>

              {/* Cover Image URL */}
              <div className="mb-6">
                <label
                  htmlFor="coverImage"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="coverImage"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Content */}
              <div className="mb-6">
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Content * (Markdown supported)
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 font-mono text-sm"
                  placeholder="Write your blog content here. You can use Markdown for formatting:

# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered list
2. Second item

`inline code` and ```code blocks```

> Blockquotes

[Link text](https://example.com)"
                />
              </div>

              {/* Checkboxes */}
              <div className="mb-6 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">
                    Publish immediately (unchecked = save as draft)
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="mr-2 h-4 w-4 text-amber-500 focus:ring-amber-400 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">Mark as featured post</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Link href="/blogs">
                  <button
                    type="button"
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    isSubmitting
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-500 to-teal-600 text-white hover:from-amber-600 hover:to-teal-700"
                  }`}
                >
                  {isSubmitting ? "Creating..." : "Create Blog Post"}
                </button>
              </div>
            </form>

            {/* Markdown Help */}
            <motion.div
              className="mt-8 bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Markdown Quick Reference
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">
                    Text Formatting
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <code className="bg-gray-100 px-1">**bold text**</code> →{" "}
                      <strong>bold text</strong>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">*italic text*</code> →{" "}
                      <em>italic text</em>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">`inline code`</code> →{" "}
                      <code className="bg-gray-100 px-1">inline code</code>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">[link text](url)</code>{" "}
                      →{" "}
                      <a href="#" className="text-amber-500">
                        link text
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-2">Structure</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>
                      <code className="bg-gray-100 px-1"># Heading 1</code>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">## Heading 2</code>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">- Bullet point</code>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">1. Numbered list</code>
                    </li>
                    <li>
                      <code className="bg-gray-100 px-1">&gt; Blockquote</code>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Harsh Kadiya. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateBlog;
