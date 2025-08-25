export async function getBlogs(params = {}) {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`/api/blogs${queryString ? `?${queryString}` : ""}`);

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
}

export async function getBlogBySlug(slug) {
  const res = await fetch(`/api/blogs/${slug}`);

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch blog");
  }

  return res.json();
}

export async function createBlog(data) {
  const res = await fetch(`/api/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.log(res);

    throw new Error("Failed to create blog");
  }

  return res.json();
}

export async function updateBlog(slug, data) {
  const res = await fetch(`/api/blogs/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update blog");
  }

  return res.json();
}

export async function deleteBlog(slug) {
  const res = await fetch(`/api/blogs/${slug}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete blog");
  }

  return res.json();
}

export async function likeBlog(slug) {
  const res = await fetch(`/api/blogs/${slug}/like`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to like blog");
  }

  return res.json();
}

export async function seedBlogs() {
  const res = await fetch(`/api/blogs/seed`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to seed blogs");
  }

  return res.json();
}

export async function incrementBlogView(slug) {
  const res = await fetch(`/api/blogs/${slug}/view`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Failed to increment view");
  }

  return res.json();
}
