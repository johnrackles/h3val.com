import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://h3val.com";

// Static pages only — add a path here when a new route is added.
const PAGES = ["/", "/about", "/links", "/imprint", "/privacy"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = PAGES.map(
          (path) => `  <url><loc>${SITE_URL}${path}</loc></url>`,
        ).join("\n");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;

        return new Response(body, {
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
