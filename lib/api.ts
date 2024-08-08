import fs from "fs";
import { join } from "path";

export interface PostData {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  slug: string; // route name
  content: string;
}

const postsDirectory = join(process.cwd(), "_articles");

function titleToSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove non-word chars (except spaces and hyphens)
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Trim hyphens from start and end
}

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
    acc[key.trim() as keyof PostData] = value.join(":").trim();
    return acc;
  }, {} as PostData);

  if (!data.title || !data.date) {
    throw new Error("Title and date are required in front matter");
  }

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

export const getAllPosts = (): PostData[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const filePath = join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = parseFrontMatter(fileContents);
    data.slug = titleToSlug(data.title);
    return data;
  });

  return allPosts;
};
