import fs from "fs";
import { join } from "path";
import { calculateReadTime } from "./utils";
import { PostData } from "./types";

const postsDirectory = join(process.cwd(), "content/articles");

function titleToSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Trim hyphens from start and end
}

const parseFrontMatter = (
  content: string
): { data: PostData; content: string } => {
  const frontMatterRegex = /^---\n([\s\S]+?)\n---/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    throw new Error("Invalid front matter: \n" + content);
  }

  const frontMatter = match[1];
  const bodyContent = content.slice(match[0].length);

  const data: PostData = frontMatter.split("\n").reduce((acc, line) => {
    const [key, ...value] = line.split(":");
    const trimmedKey = key.trim() as keyof PostData;
    if (trimmedKey === "tags") {
      acc[trimmedKey] = value
        .join(":")
        .trim()
        .replace(/^\[|\]$/g, "") // Remove square brackets if they exist
        .split(",")
        .map((tag) => tag.trim().replace(/^"(.*)"$/, "$1")); // Remove quotes if they exist
    } else {
      acc[trimmedKey] = value
        .join(":")
        .trim()
        .replace(/^"(.*)"$/, "$1");
    }
    return acc;
  }, {} as PostData);

  if (!data.title || !data.publishedAt) {
    throw new Error("Title and date are required in front matter");
  }

  data.readTime = calculateReadTime(bodyContent);

  return { data, content: bodyContent };
};

export const getPostBySlug = (slug: string): PostData => {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    const filePath = join(postsDirectory, name);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = parseFrontMatter(fileContents);
    const postSlug = titleToSlug(data.title);
    return postSlug === slug;
  });

  if (!fileName) {
    throw new Error(`No article found with slug: ${slug}`);
  }
  const filePath = join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontMatter(fileContents);
  return { ...data, content };
};

export const getPostsByTag = (tag: string): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames
    .map((fileName) => {
      const filePath = join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = parseFrontMatter(fileContents);
      data.slug = titleToSlug(data.title);
      return data;
    })
    .filter((post) => post.tags?.includes(tag));

  posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return posts;
};

export const getAllPosts = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPosts = fileNames.map((fileName) => {
    const filePath = join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = parseFrontMatter(fileContents);
    data.slug = titleToSlug(data.title);
    return data;
  });

  allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
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
