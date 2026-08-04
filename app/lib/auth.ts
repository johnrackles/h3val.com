import { env as cfEnv } from "cloudflare:workers";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./auth-schema";
import { env } from "./env";

const db = drizzle(cfEnv.DB, { schema });

const {
  GITHUB_CLIENT_ID: githubClientId,
  GITHUB_CLIENT_SECRET: githubClientSecret,
} = env;

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: false,
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
