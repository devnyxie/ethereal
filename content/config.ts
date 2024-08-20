import { ConfigInterface } from "@/lib/types";

const Config: ConfigInterface = {
  // metadata
  site: {
    title: "Tims Personal Garden",
    description: "A fantastic website with great content",
    url: "http://127.0.0.1:3000",
    language: "en",
  },
  user: {
    name: "crlmgp",
    avatar: "/avatar.jpg",
    role: "Frontend Mew Mew",
  },
  // sites settings
  settings: {
    // Header Navigation Links
    pages: [
      { title: "Home", path: "/", meta_description: "" },
      { title: "Articles", path: "/articles", meta_description: "" },
      { title: "Projects", path: "/projects", meta_description: "" },
      { title: "About", path: "/about", meta_description: "" },
    ],
    footer: {
      // Footer Social Links
      socialLinks: [
        { platform: "Twitter", url: "https://twitter.com/ethereal" },
        { platform: "GitHub", url: "https://github.com/ethereal" },
      ],
    },
  },
};

export default Config;
