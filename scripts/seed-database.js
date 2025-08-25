const mongoose = require('mongoose');
const { blogData } = require('../data/blogData');

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio-blog';

// Blog Schema (copied from models/Blog.js for Node.js compatibility)
const BlogSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  author: {
    type: String,
    required: [true, 'Please provide an author'],
    default: 'Harsh Kadiya',
  },
  readTime: {
    type: String,
    required: [true, 'Please provide read time'],
    default: '5 min read',
  },
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  published: {
    type: Boolean,
    default: false,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  coverImage: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Create slug from title if not provided
BlogSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing blogs (optional - comment out if you want to keep existing data)
    await Blog.deleteMany({});
    console.log('Cleared existing blogs');

    // Insert blog data
    const blogs = await Blog.insertMany(
      blogData.map(blog => ({
        ...blog,
        published: true,
        featured: blog.id <= 3, // Feature first 3 blogs
      }))
    );

    console.log(`Successfully seeded ${blogs.length} blogs`);

    // Show sample of seeded data
    const sampleBlogs = await Blog.find().limit(3).select('title slug category');
    console.log('\nSample of seeded blogs:');
    sampleBlogs.forEach(blog => {
      console.log(`- ${blog.title} (${blog.category}) - /blog/${blog.slug}`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the seed function
seedDatabase();