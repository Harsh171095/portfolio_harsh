# Blog System Setup Guide

This guide will help you set up the MongoDB-powered blog system for your portfolio website.

## Prerequisites

- Node.js installed
- MongoDB installed locally OR a MongoDB Atlas account
- Environment variables configured

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/portfolio-blog

# For MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-blog?retryWrites=true&w=majority

# Optional: API URL for client-side requests

```

### 3. Start MongoDB (if using local)

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows
mongod

# On Linux
sudo systemctl start mongod
```

### 4. Seed the Database

Run the seed script to populate your database with initial blog data:

```bash
npm run seed
```

Or use the API endpoint:

```bash
curl -X POST http://localhost:3000/api/blogs/seed
```

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Access Your Blog

- Blog listing: http://localhost:3000/blogs
- Individual blog: http://localhost:3000/blog/[slug]

## Features

### Blog Listing Page

- Server-side rendered for SEO
- Search functionality
- Category filtering
- Pagination
- View and like counts
- Responsive grid layout

### Blog Detail Page

- Full markdown content rendering
- View tracking (auto-increments)
- Like functionality (stored in localStorage)
- Related posts
- Responsive design

### API Endpoints

#### GET /api/blogs

List all blogs with filters:

- `?page=1&limit=10` - Pagination
- `?category=iOS%20Development` - Filter by category
- `?search=swift` - Search in title, excerpt, and content
- `?published=true` - Filter by published status
- `?featured=true` - Filter featured posts

#### POST /api/blogs

Create a new blog post

#### GET /api/blogs/[slug]

Get a single blog post (increments view count)

#### PUT /api/blogs/[slug]

Update a blog post

#### DELETE /api/blogs/[slug]

Delete a blog post

#### POST /api/blogs/[slug]/like

Like a blog post

#### POST /api/blogs/seed

Seed database with initial data

## Database Schema

The Blog model includes:

- `slug` - URL-friendly identifier
- `title` - Blog title
- `excerpt` - Short description
- `content` - Full markdown content
- `category` - Blog category
- `tags` - Array of tags
- `author` - Author name
- `readTime` - Estimated read time
- `views` - View count
- `likes` - Like count
- `published` - Published status
- `featured` - Featured flag
- `coverImage` - Cover image URL
- `createdAt` - Creation date
- `updatedAt` - Last update date

## Troubleshooting

### Database Connection Issues

1. Check MongoDB is running
2. Verify connection string in `.env.local`
3. Check firewall/network settings

### No Blogs Showing

1. Run the seed script: `npm run seed`
2. Check MongoDB connection
3. Verify `published: true` in database

### Styles Not Loading

1. Clear Next.js cache: `rm -rf .next`
2. Restart development server
3. Check Tailwind CSS configuration

## Production Deployment

1. Use MongoDB Atlas for production database
2. Set environment variables in your hosting platform
3. Run build command: `npm run build`
4. Start production server: `npm start`

## Maintenance

### Backup Database

```bash
mongodump --db portfolio-blog --out ./backup
```

### Restore Database

```bash
mongorestore --db portfolio-blog ./backup/portfolio-blog
```

### Clear Database

```bash
# Use with caution!
mongo portfolio-blog --eval "db.dropDatabase()"
```
