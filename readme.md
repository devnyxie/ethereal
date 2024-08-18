# ethereal / ayanami

## Description

This is a minimalistic website template. It is designed to be simple, fast and easy to use.

## Features

- Minimalistic design
- Advanced theming both for UI and Syntax Highlighting

## To Do

- [x] Finish Mobile Navigation
- Metadata: Add metadata to the pages, even statically generated ones.
- Optimize Dark Mode Gradient: enable gpu acceleration, stop animating on mobile devices and decrease amount of effects (-1).
- Generated Sitemap: Generate a sitemap for the website.
- `about` page: switch to markdown file and prepare `/content` folder structure.
- Finish Tags/Folders Functionality & Pages
- User Activity - Discord Intergation:

  - `[backend] On-demand Revalidation + [frontend] SWR (Stale-While-Revalidate)` would be a better option, since it would send always the **fresh data** to the client and also update the data in the background if needed.

    The name “SWR” is derived from stale-while-revalidate, a HTTP cache invalidation strategy popularized by HTTP RFC 5861 (opens in a new tab). SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data.

    Example:

    - User visits the page.
    - The page sends a request to the server.

      Client example:

      ```ts
      import useSWR from "swr";
      const fetcher = (...args) => fetch(...args).then((res) => res.json());

      export default function DiscordStatus() {
        const { data, error } = useSWR("/api/discord-status", fetcher, {
          refreshInterval: 60000,
          revalidateOnFocus: true,
        });

        if (error) return <div>Failed to load</div>;
        if (!data) return <div>Loading...</div>;
        return <div>Discord Status: {data.status}</div>;
      }
      ```

      Server example with caching:

      ```ts
      // pages/api/discord-status.js
      import { getDiscordStatus } from "../../lib/discord";

      let cachedStatus = null;
      let lastFetchTime = 0;
      const CACHE_DURATION = 60 * 1000; // 1 minute in milliseconds

      export default async function handler(req, res) {
        const currentTime = Date.now();

        if (!cachedStatus || currentTime - lastFetchTime > CACHE_DURATION) {
          cachedStatus = await getDiscordStatus();
          lastFetchTime = currentTime;
        }

        res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
        res.status(200).json(cachedStatus);
      }
      ```

    - The server sends the data to the client (always fresh data).
    - The client displays the data.

- Git-based Content Management Solution:
