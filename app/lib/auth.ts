import { env } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./auth-schema";

const db = drizzle(env.DB, { schema });

const githubClientId = env.GITHUB_CLIENT_ID;
const githubClientSecret = env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  // ponytail: only wired when real credentials are present, add more providers the same way
  ...(githubClientId && githubClientSecret
    ? {
        socialProviders: {
          github: {
            clientId: githubClientId,
            clientSecret: githubClientSecret,
          },
        },
      }
    : {}),
});
