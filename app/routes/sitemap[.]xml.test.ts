import { describe, expect, test } from "vitest";
import { Route } from "./sitemap[.]xml";

describe("sitemap.xml", () => {
  test("returns every static page as an XML <url> entry", async () => {
    const handlers = Route.options.server?.handlers as {
      GET: (ctx: unknown) => Response | Promise<Response>;
    };
    const res = await handlers.GET({});

    expect(res.headers.get("Content-Type")).toBe("application/xml");

    const body = await res.text();
    for (const path of ["/", "/about", "/links", "/imprint", "/privacy"]) {
      expect(body).toContain(`<loc>https://h3val.com${path}</loc>`);
    }
  });
});
