import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getBlogs } from "../lib/api";
import dbConnect from "../lib/mongodb";
import Blog from "../models/Blog";

const BlogsPage = ({ initialBlogs, initialPagination }) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [pagination, setPagination] = useState(initialPagination);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "iOS Development",
    "Cross-Platform",
    "AI/ML",
    "Flutter",
    "Industry Trends",
  ];

  const fetchBlogs = async (params = {}) => {
    setLoading(true);
    try {
      const response = await getBlogs({
        ...params,
        category: selectedCategory === "All" ? "" : selectedCategory,
        search: searchQuery,
      });
      setBlogs(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory || searchQuery) {
      fetchBlogs();
    }
  }, [selectedCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md  py-4">
        <div className="container mx-auto px-4 py-4 ">
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
            <Link href="/">
              <span className="text-gray-600 hover:text-amber-500 transition-colors cursor-pointer">
                ← Back to Portfolio
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-500 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Blog</h1>
            <p className="text-xl mb-8">
              Thoughts on mobile development, technology, and innovation
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pr-10 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-amber-500"
                >
                  🔍
                </button>
              </div>
            </form>

            {/* Create Blog Button */}
            {/* <Link href="/create-blog">
              <button className="px-6 py-3 bg-white text-amber-600 rounded-full font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                <span>✍️</span>
                <span>Create New Blog</span>
              </button>
            </Link> */}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category === "All" ? "" : category)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  (category === "All" && !selectedCategory) ||
                  selectedCategory === category
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blogs...</p>
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() =>
                      (window.location.href = `/blog/${blog.slug}`)
                    }
                  >
                    <div className="h-48 bg-gradient-to-br from-amber-400 to-teal-500 flex items-center justify-center">
                      <span className="text-white text-4xl">📝</span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-amber-600 font-medium">
                          {blog.category}
                        </span>
                        <span className="text-sm text-gray-500">
                          {blog.readTime}
                        </span>
                      </div>
                      <Link href={`/blog/${blog.slug}`}>
                        <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-amber-500 transition-colors cursor-pointer">
                          {blog.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>👁 {blog.views || 0}</span>
                          <span>❤️ {blog.likes || 0}</span>
                        </div>
                        <Link href={`/blog/${blog.slug}`}>
                          <button className="text-amber-500 font-medium hover:text-amber-600 transition-colors">
                            Read More →
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => fetchBlogs({ page: i + 1 })}
                      className={`px-4 py-2 rounded ${
                        pagination.page === i + 1
                          ? "bg-amber-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No blogs found.</p>
              <p className="text-gray-500 mt-2">
                Make sure to seed the database with initial data.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Subscribe to My Newsletter
            </h2>
            <p className="text-gray-600 mb-8">
              Get the latest articles and insights delivered directly to your
              inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-teal-600 text-white rounded-lg font-medium hover:from-amber-600 hover:to-teal-700 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

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

// Fetch blogs from MongoDB on the server side
export async function getServerSideProps({ query }) {
  await dbConnect();

  try {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query for MongoDB
    const dbQuery = { published: true };

    if (query.category) {
      dbQuery.category = query.category;
    }

    if (query.search) {
      dbQuery.$or = [
        { title: { $regex: query.search, $options: "i" } },
        { excerpt: { $regex: query.search, $options: "i" } },
        { content: { $regex: query.search, $options: "i" } },
      ];
    }

    // Fetch blogs and count from database
    const [blogs, total] = await Promise.all([
      Blog.find(dbQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-content") // Exclude content for list view
        .lean(),
      Blog.countDocuments(dbQuery),
    ]);

    // Serialize the data for Next.js
    const serializedBlogs = JSON.parse(JSON.stringify(blogs));

    return {
      props: {
        initialBlogs: serializedBlogs,
        initialPagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching blogs from database:", error);

    // If database fails, return empty state
    return {
      props: {
        initialBlogs: [],
        initialPagination: {
          page: 1,
          limit: 10,
          total: 0,
          pages: 0,
        },
      },
    };
  }
}

export default BlogsPage;
