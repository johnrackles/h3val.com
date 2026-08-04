import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import { link } from "~/lib/auth-schema";

// ponytail: dynamic imports keep "cloudflare:workers" and auth.ts's own
// top-level cloudflare:workers import out of the client-side
// server-fn-module-lookup scan (and out of vitest, which imports route
// modules under plain node) — same pattern as app/start.ts
async function getDb() {
  const { env: cfEnv } = await import("cloudflare:workers");
  return drizzle(cfEnv.DB, { schema: { link } });
}

async function requireSession() {
  const { auth } = await import("~/lib/auth");
  const session = await auth.api.getSession({ headers: getRequestHeaders() });

  if (!session?.user) {
    throw new Error("You must be signed in to manage links.");
  }
}

export type LinkRecord = typeof link.$inferSelect;

// ponytail: module-scope cache for the public (non-hidden) list only — it's
// read on every /links page view but only changes via admin mutations, which
// clear it below. Per-isolate, so cold isolates just miss once; no KV/queue
// needed for a handful of rows. Upgrade to Cache API if traffic ever spans
// enough isolates for this to stop mattering.
let publicLinksCache: { data: LinkRecord[]; expires: number } | null = null;
const PUBLIC_LINKS_TTL_MS = 60_000;

export const getLinks = createServerFn({ method: "GET" })
  .validator(z.object({ includeHidden: z.boolean().optional() }).optional())
  .handler(async ({ data }) => {
    if (
      !data?.includeHidden &&
      publicLinksCache &&
      publicLinksCache.expires > Date.now()
    ) {
      return publicLinksCache.data;
    }

    const db = await getDb();
    const rows = await db
      .select()
      .from(link)
      .where(
        and(
          eq(link.deleted, false),
          data?.includeHidden ? undefined : eq(link.hidden, false),
        ),
      )
      .orderBy(link.sortOrder);

    if (!data?.includeHidden) {
      publicLinksCache = {
        data: rows,
        expires: Date.now() + PUBLIC_LINKS_TTL_MS,
      };
    }

    return rows;
  });

const linkInputSchema = z.object({
  name: z.string().trim().min(1),
  href: z.string().trim().min(1),
});

export const createLink = createServerFn({ method: "POST" })
  .validator(linkInputSchema)
  .handler(async ({ data }) => {
    await requireSession();

    const db = await getDb();
    // one round trip instead of select-max-then-insert
    await db.insert(link).values({
      id: crypto.randomUUID(),
      name: data.name,
      href: data.href,
      sortOrder: sql`(select coalesce(max(sort_order), 0) + 1 from link)`,
      createdAt: new Date(),
    });

    publicLinksCache = null;
    return getLinks();
  });

export const deleteLink = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().trim().min(1) }))
  .handler(async ({ data }) => {
    await requireSession();

    const db = await getDb();
    await db.update(link).set({ deleted: true }).where(eq(link.id, data.id));

    publicLinksCache = null;
    return getLinks({ data: { includeHidden: true } });
  });

export const setLinkHidden = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().trim().min(1), hidden: z.boolean() }))
  .handler(async ({ data }) => {
    await requireSession();

    const db = await getDb();
    await db
      .update(link)
      .set({ hidden: data.hidden })
      .where(eq(link.id, data.id));

    publicLinksCache = null;
    return getLinks({ data: { includeHidden: true } });
  });
