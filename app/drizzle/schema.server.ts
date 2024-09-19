import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text("name"),
  email: text("email"),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const usersRelations = relations(users, ({ many }) => ({
  links: many(links),
}));

export const links = sqliteTable("links", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  href: text("href").notNull(),
  visible: integer("visible", { mode: "boolean" }).default(true),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  userId: text("userId")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const insertLinkSchema = createInsertSchema(links);
export const selectLinkSchema = createSelectSchema(links);

export const postsRelations = relations(links, ({ one }) => ({
  owner: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
}));
