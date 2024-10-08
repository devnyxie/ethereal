export interface ConfigInterface {
  site: {
    title: string;
    description: string;
    url: string;
    language: string;
  };
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  settings: {
    grain: boolean;
    gradient: boolean;
    pages: {
      title: string;
      path: string;
      meta_description: string | undefined;
    }[];
    header: {
      brand: {
        format: "name" | "avatar";
        text?: string;
      };
      fixed: boolean;
      themeSwitcher?: boolean;
    };
    footer: {
      themeSwitcher?: boolean;
    };
    socialLinks: {
      name?: string;
      url: string;
    }[];
  };
}

export interface PostData {
  title: string;
  image: string; // e.g. "/images/cover.jpg"
  publishedAt: string; // e.g. "2021-08-01"
  slug: string; // route name
  readTime: string; // e.g. "5min" (generated in this file)
  content: string; // markdown content
  folder?: string; // e.g. "cockpit"
  tags?: string[]; // e.g. ["linux", "hardware", "reverse engineering"]
  // metadata
  summary: string; // [!] not used currently
}
