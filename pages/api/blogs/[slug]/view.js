import dbConnect from '../../../../lib/mongodb';
import Blog from '../../../../models/Blog';

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
  } = req;

  if (method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  await dbConnect();

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.status(200).json({ success: true, views: blog.views });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}