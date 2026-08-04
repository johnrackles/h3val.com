import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./app/lib/auth-schema.ts",
  out: "./migrations",
  dialect: "sqlite",
});
