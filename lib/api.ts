import fs from "fs";
import { join } from "path";
import { calculateReadTime } from "./utils";

export interface PostData {
  title: string;
  excerpt: string; // ! not used currently
  coverImage: string; // e.g. "/images/cover.jpg"
  date: string; // e.g. "2021-08-01"
  slug: string; // route name
  readTime: string; // e.g. "5min"
  content: string; // markdown content
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
    acc[key.trim() as keyof PostData] = value
      .join(":")
      .trim()
      .replace(/^"(.*)"$/, "$1");
    return acc;
  }, {} as PostData);

  if (!data.title || !data.date) {
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
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return allPosts;
};
