import { getAllPosts } from "@/lib/api";

export const baseUrl = "http://127.0.0.1:3000";

export default async function sitemap() {
  let articles = getAllPosts().map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.publishedAt).toISOString().split("T")[0],
  }));

  let routes = ["", "/articles", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...articles];
}
