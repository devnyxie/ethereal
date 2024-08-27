import { ConfigInterface } from "@/lib/types";

const Config: ConfigInterface = {
  // metadata
  site: {
    title: "Tim",
    description: "A fantastic website with great content",
    url: "https://www.devnyxie.me",
    language: "en",
  },
  user: {
    name: "Timothee",
    avatar: "/avatar.jpg",
    role: "Full Stack Engineer",
  },
  // sites settings
  settings: {
    grain: true,
    gradient: true,
    // Header Navigation Links
    pages: [
      //to be reworked
      { title: "Home", path: "/", meta_description: "" }, // TODO: add invidial page descriptions and settings
      { title: "Articles", path: "/articles", meta_description: "" },
      { title: "Projects", path: "/projects", meta_description: "" },
      { title: "About", path: "/about", meta_description: "" },
    ],
    header: {
      brand: {
        format: "name", // 'name' or 'avatar'
      },
      fixed: false,
      themeSwitcher: true,
    },
    footer: {},
    socialLinks: [
      { name: "GitHub", url: "https://github.com/devnyxie" },
      { name: "LinkedIn", url: "https://linkedin.com/in/talmkg" },
    ],
  },
};

export default Config;
