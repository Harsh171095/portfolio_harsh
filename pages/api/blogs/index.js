import dbConnect from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const { 
          page = 1, 
          limit = 10, 
          category, 
          tags, 
          published = true,
          featured,
          search 
        } = req.query;

        // Build query
        const query = {};
        
        if (published !== 'all') {
          query.published = published === 'true';
        }
        
        if (category) {
          query.category = category;
        }
        
        if (tags) {
          query.tags = { $in: tags.split(',') };
        }
        
        if (featured !== undefined) {
          query.featured = featured === 'true';
        }
        
        if (search) {
          query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { excerpt: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
          ];
        }

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [blogs, total] = await Promise.all([
          Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-content'), // Exclude content for list view
          Blog.countDocuments(query),
        ]);

        res.status(200).json({
          success: true,
          data: blogs,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / parseInt(limit)),
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const blog = await Blog.create(req.body);
        res.status(201).json({ success: true, data: blog });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}