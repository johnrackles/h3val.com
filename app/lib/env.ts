import { env as cfEnv } from "cloudflare:workers";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const processEnv = (
  typeof process !== "undefined" ? process.env : {}
) as Record<string, string | undefined>;

// ponytail: secrets (BETTER_AUTH_SECRET, GITHUB_CLIENT_SECRET) are set via
// `wrangler secret put`, never declared in wrangler.jsonc, so the generated
// Env type never has them — read those two through an untyped view instead
// of relying on cf-typegen output that CI regenerates from wrangler.jsonc alone.
const cfEnvUntyped = cfEnv as unknown as Record<string, string | undefined>;

export const env = createEnv({
  server: {
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
  },
  runtimeEnv: {
    BETTER_AUTH_SECRET:
      processEnv.BETTER_AUTH_SECRET ?? cfEnvUntyped.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: processEnv.BETTER_AUTH_URL ?? cfEnv.BETTER_AUTH_URL,
    GITHUB_CLIENT_ID: processEnv.GITHUB_CLIENT_ID ?? cfEnv.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET:
      processEnv.GITHUB_CLIENT_SECRET ?? cfEnvUntyped.GITHUB_CLIENT_SECRET,
  },
  // ponytail: only server vars exist today, add `client: {}` + clientPrefix when the app needs one
  emptyStringAsUndefined: true,
});
