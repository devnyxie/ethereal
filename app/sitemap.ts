import Config from "@/content/config";
import { getAllPosts } from "@/lib/api";

export const baseUrl = Config.site.url;

export default async function sitemap() {
  let articles = getAllPosts().map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.publishedAt).toISOString().split("T")[0],
  }));

  let routes = ["", "about", "/articles", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...articles];
}
