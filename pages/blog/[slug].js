import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import dbConnect from "../../lib/mongodb";
import Blog from "../../models/Blog";
import { likeBlog, incrementBlogView } from "../../lib/api";

const BlogDetail = ({ blog, relatedPosts }) => {
  const router = useRouter();
  const [likes, setLikes] = useState(blog?.likes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(blog?.views || 0);
  const [hasTrackedView, setHasTrackedView] = useState(false);

  // Handle loading state
  if (router.isFallback || !blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLike = async () => {
    if (hasLiked) return;

    try {
      const response = await likeBlog(blog.slug);
      setLikes(response.likes);
      setHasLiked(true);

      // Store in localStorage to prevent multiple likes
      localStorage.setItem(`liked-${blog.slug}`, "true");
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  // Check if user has already liked this post
  React.useEffect(() => {
    const liked = localStorage.getItem(`liked-${blog.slug}`);
    if (liked) {
      setHasLiked(true);
    }
  }, [blog.slug]);

  // Track scroll progress and increment view when user reaches bottom
  React.useEffect(() => {
    if (hasTrackedView) return;

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;

      // Calculate scroll percentage
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;

      // If user has scrolled to 90% or more of the page
      if (scrollPercentage >= 0.9 && !hasTrackedView) {
        // Check if this view has already been tracked in this session
        const viewTracked = sessionStorage.getItem(`viewed-${blog.slug}`);

        if (!viewTracked) {
          sessionStorage.setItem(`viewed-${blog.slug}`, "true");
          incrementBlogView(blog.slug)
            .then((response) => {
              setViews(response.views);
              setHasTrackedView(true);
              // Store in sessionStorage to prevent multiple counts in same session
            })
            .catch((error) => {
              sessionStorage.setItem(`viewed-${blog.slug}`, "false");
              console.error("Error tracking view:", error);
            });
        } else {
          setHasTrackedView(true);
        }
      }
    };

    // Check if view was already tracked in this session
    const viewTracked = sessionStorage.getItem(`viewed-${blog.slug}`);
    if (viewTracked) {
      setHasTrackedView(true);
      return;
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [blog.slug, hasTrackedView]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 py-4">
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

      {/* Blog Header */}
      <motion.header
        className="bg-gradient-to-br from-amber-500 to-teal-600 text-white py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                {blog.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {blog.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 text-white/90">
                <span>{blog.author}</span>
                <span>•</span>
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
              <div className="mt-4 flex items-center justify-center gap-6 text-white/80">
                <span>👁 {views} views</span>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-all ${
                    hasLiked
                      ? "cursor-default"
                      : "hover:scale-110 cursor-pointer"
                  }`}
                  disabled={hasLiked}
                >
                  <span className={hasLiked ? "text-red-500" : ""}>❤️</span>
                  <span>{likes} likes</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Blog Content */}
      <motion.article
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-6 text-gray-800">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold mt-6 mb-3 text-gray-800">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 text-gray-600">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 text-gray-600">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="mb-2">{children}</li>,
                    code: ({ inline, children }) =>
                      inline ? (
                        <code className="bg-gray-100 text-amber-600 px-1 py-0.5 rounded text-sm">
                          {children}
                        </code>
                      ) : (
                        <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                          {children}
                        </code>
                      ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-amber-500 pl-4 italic text-gray-600 mb-4">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>

              {/* Like Button */}
              <div className="mt-12 text-center">
                <button
                  onClick={handleLike}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                    hasLiked
                      ? "bg-gray-200 text-gray-500 cursor-default"
                      : "bg-gradient-to-r from-amber-500 to-teal-600 text-white hover:from-amber-600 hover:to-teal-700"
                  }`}
                  disabled={hasLiked}
                >
                  <span className={hasLiked ? "text-red-500" : ""}>❤️</span>
                  <span>
                    {hasLiked ? "You liked this post" : "Like this post"}
                  </span>
                </button>
              </div>
            </div>

            {/* Author Info */}
            <motion.div
              className="mt-12 bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                About the Author
              </h3>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-xl">HK</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{blog.author}</h4>
                  <p className="text-gray-600">
                    Senior iOS & Flutter Developer
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Related Posts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedBlog) => (
                    <Link
                      key={relatedBlog._id}
                      href={`/blog/${relatedBlog.slug}`}
                    >
                      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <h4 className="font-bold text-gray-800 mb-2">
                          {relatedBlog.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {relatedBlog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-sm">
                            {relatedBlog.views} views • {relatedBlog.likes}{" "}
                            likes
                          </span>
                          <span className="text-amber-500 text-sm font-medium">
                            Read more →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.article>

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

export default BlogDetail;

// Get static paths for all blog posts
export async function getStaticPaths() {
  await dbConnect();

  try {
    const blogs = await Blog.find({ published: true }).select("slug");

    const paths = blogs.map((blog) => ({
      params: { slug: blog.slug },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error("Error fetching blog paths:", error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

// Get static props for each blog post
export async function getStaticProps({ params }) {
  await dbConnect();

  try {
    // Fetch the blog post
    const blog = await Blog.findOne({
      slug: params.slug,
      published: true,
    }).lean();

    if (!blog) {
      return {
        notFound: true,
      };
    }

    // Convert MongoDB document to plain object
    const serializedBlog = JSON.parse(JSON.stringify(blog));

    // Fetch related posts
    const relatedPosts = await Blog.find({
      category: blog.category,
      slug: { $ne: blog.slug },
      published: true,
    })
      .select("slug title excerpt views likes")
      .limit(2)
      .lean();

    const serializedRelatedPosts = JSON.parse(JSON.stringify(relatedPosts));

    return {
      props: {
        blog: serializedBlog,
        relatedPosts: serializedRelatedPosts,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching blog:", error);

    return {
      notFound: true,
    };
  }
}
