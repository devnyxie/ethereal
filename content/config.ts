import { ConfigInterface } from "@/lib/types";

const Config: ConfigInterface = {
  // metadata
  site: {
    title: "Tims Personal Garden",
    description: "A fantastic website with great content",
    url: "https://ethereal-orpin.vercel.app",
    language: "en",
  },
  user: {
    name: "Timothee",
    avatar: "/avatar.jpg",
    role: "Full Stack Engineer",
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
