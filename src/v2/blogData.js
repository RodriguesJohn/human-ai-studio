export const blogPosts = [];

export function getBlogPost(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}
