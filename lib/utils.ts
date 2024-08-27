import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function longDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadTime(text: string) {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes}min`;
}

export function extractDomain(url: string) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace(/^www\./, "");
  } catch (e) {
    console.error("Invalid URL:", e);
    return null;
  }
}

export function getDomainLabel(urlString: string) {
  try {
    const url = new URL(urlString);
    const domainParts = url.hostname.split(".");
    // Assume the domain label you want is the second-to-last part
    return domainParts.length > 2
      ? domainParts[domainParts.length - 2]
      : domainParts[0];
  } catch (error) {
    return "Unknown";
  }
}
