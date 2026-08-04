import { env as cfEnv } from "cloudflare:workers";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { z } from "zod";
import { auth } from "~/lib/auth";

export type LinkRecord = {
  id: string;
  name: string;
  href: string;
  sortOrder: number;
  createdAt: number;
};

export const getLinks = createServerFn({ method: "GET" }).handler(async () => {
  const result = await cfEnv.DB.prepare(
    `SELECT id, name, href, sort_order AS sortOrder, created_at AS createdAt
       FROM link
       ORDER BY sort_order ASC`,
  ).all<LinkRecord>();

  return result.results;
});

const linkInputSchema = z.object({
  name: z.string().trim().min(1),
  href: z.string().trim().min(1),
});

export const createLink = createServerFn({ method: "POST" })
  .validator(linkInputSchema)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      throw new Error("You must be signed in to manage links.");
    }

    const { name, href } = data;
    const id = crypto.randomUUID();
    const createdAt = Date.now();

    const maxOrderResult = await cfEnv.DB.prepare(
      `SELECT COALESCE(MAX(sort_order), 0) AS maxOrder FROM link`,
    ).first<{ maxOrder: number }>();
    const sortOrder = (maxOrderResult?.maxOrder ?? 0) + 1;

    await cfEnv.DB.prepare(
      `INSERT INTO link (id, name, href, sort_order, created_at)
       VALUES (?, ?, ?, ?, ?)`,
    )
      .bind(id, name, href, sortOrder, createdAt)
      .run();

    return getLinks();
  });

export const deleteLink = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().trim().min(1) }))
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const session = await auth.api.getSession({ headers });

    if (!session?.user) {
      throw new Error("You must be signed in to manage links.");
    }

    await cfEnv.DB.prepare(`DELETE FROM link WHERE id = ?`).bind(data.id).run();

    return getLinks();
  });
