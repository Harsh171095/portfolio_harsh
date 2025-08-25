import dbConnect from '../../../../lib/mongodb';
import Blog from '../../../../models/Blog';

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  if (method !== 'POST') {
    return res.status(400).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const blog = await Blog.findOneAndUpdate(
      { slug },
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.status(200).json({ success: true, likes: blog.likes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}