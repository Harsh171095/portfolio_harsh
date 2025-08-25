import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [200, "Title cannot be more than 200 characters"],
    },
    excerpt: {
      type: String,
      required: [true, "Please provide an excerpt"],
      maxlength: [500, "Excerpt cannot be more than 500 characters"],
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      //enum: ['iOS Development', 'Cross-Platform', 'AI/ML', 'Flutter', 'Industry Trends', 'Tutorial', 'Other'],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      required: [true, "Please provide an author"],
      default: "Harsh Kadiya",
    },
    readTime: {
      type: String,
      required: [true, "Please provide read time"],
      default: "5 min read",
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
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Create slug from title if not provided
BlogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  next();
});

// Calculate read time based on content
BlogSchema.pre("save", function (next) {
  if (this.content) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    this.readTime = `${readTime} min read`;
  }
  next();
});

// Indexes for better query performance
// BlogSchema.index({ slug: 1 });
BlogSchema.index({ category: 1 });
BlogSchema.index({ tags: 1 });
BlogSchema.index({ published: 1, createdAt: -1 });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
