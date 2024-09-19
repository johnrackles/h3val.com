import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Authenticator } from "remix-auth";
import { Auth0Strategy } from "remix-auth-auth0";
import { z } from "zod";
import { selectUserSchema, users } from "~/drizzle/schema.server";
import { env } from "~/env";
import { sessionStorage } from "./session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export const authenticator = new Authenticator<
  z.infer<typeof selectUserSchema>
>(sessionStorage);

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: env.AUTH0_CALLBACK_URL,
    clientID: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_SECRET,
    domain: env.AUTH0_DOMAIN,
  },
  async ({ profile, ...rest }) => {
    console.log(rest);
    const { context } = rest;
    if (context && profile.emails?.length) {
      const db = drizzle(context?.cloudflare.env.DB);
      // Get the user data from your DB or API using the tokens and profile
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, profile.emails[0].value))
        .get();

      // if we find the user, return the information
      if (user) {
        return user;
      }
      // if the user doesn't exist, create it
      const result = await db
        .insert(users)
        .values({
          email: profile.emails[0].value,
          name: profile.displayName,
        })
        .returning()
        .get();

      if (result) {
        return result;
      }
      throw new Error("User creation failed");
    }
    throw new Error("Authorization failed");
  }
);

authenticator.use(auth0Strategy);
