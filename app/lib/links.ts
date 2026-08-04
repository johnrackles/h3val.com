import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, eq, max } from "drizzle-orm";
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

export const getLinks = createServerFn({ method: "GET" })
  .validator(z.object({ includeHidden: z.boolean().optional() }).optional())
  .handler(async ({ data }) => {
    const db = await getDb();
    return db
      .select()
      .from(link)
      .where(
        and(
          eq(link.deleted, false),
          data?.includeHidden ? undefined : eq(link.hidden, false),
        ),
      )
      .orderBy(link.sortOrder);
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
    const [{ maxOrder }] = await db
      .select({ maxOrder: max(link.sortOrder) })
      .from(link);

    await db.insert(link).values({
      id: crypto.randomUUID(),
      name: data.name,
      href: data.href,
      sortOrder: (maxOrder ?? 0) + 1,
      createdAt: new Date(),
    });

    return getLinks();
  });

export const deleteLink = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().trim().min(1) }))
  .handler(async ({ data }) => {
    await requireSession();

    const db = await getDb();
    await db.update(link).set({ deleted: true }).where(eq(link.id, data.id));

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

    return getLinks({ data: { includeHidden: true } });
  });
