import fs from "fs";
import { join } from "path";
import { calculateReadTime } from "./utils";
import { PostData } from "./types";
import fm, { FrontMatterOptions, FrontMatterResult } from "front-matter";

const postsDirectory = join(process.cwd(), "content/articles");

function titleToSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Trim hyphens from start and end
}

const parseFile = (content: string): PostData => {
  const result = fm(content);
  const attrs = result.attributes as FrontMatterOptions & {
    title?: string;
    date?: string;
    tags?: string[];
    folder?: string;
    image?: string;
    description?: string;
  };
  const parsedResult: PostData = {
    title: attrs.title || "",
    date: attrs.date || "",
    tags: attrs.tags || [],
    folder: attrs.folder || "",
    image: attrs.image || "",
    description: attrs.description || "",
    readTime: calculateReadTime(result.body),
    slug: "",
    content: result.body || "",
  };
  return parsedResult;
};

export const getPostBySlug = (slug: string): PostData => {
  let post = getAllPosts().find((post) => post.slug === slug);
  return (
    post ||
    ({
      title: "",
      date: "",
      tags: [],
      folder: "",
      image: "",
      description: "",
      readTime: "",
      slug: "",
      content: "",
    } as PostData)
  );
};

export const getPostsByTag = (tag: string): PostData[] => {
  const allPosts = getAllPosts();
  const posts = allPosts.filter((post) => post.tags?.includes(tag));
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
};

export const getAllPosts = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts: PostData[] = fileNames.map((fileName) => {
    const filePath = join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const parsedData = parseFile(fileContents);
    parsedData.slug = titleToSlug(parsedData.title);
    return parsedData;
  });
  allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return allPosts;
};

export function getAllTags() {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tags.add(tag);
    });
  });
  return Array.from(tags);
}

export function getAllFolders() {
  const allPosts = getAllPosts();
  const folders = new Set<string>();
  allPosts.forEach((post) => {
    folders.add(post.folder || "");
  });
  return Array.from(folders);
}
