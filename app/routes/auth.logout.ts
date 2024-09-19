import { redirect, type ActionFunctionArgs } from "@remix-run/node";

import { destroySession, getSession } from "~/services/session.server";

const env = process.env;

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const logoutURL = new URL(env.AUTH0_LOGOUT_URL!); // i.e https://YOUR_TENANT.us.auth0.com/v2/logout

  logoutURL.searchParams.set("client_id", env.AUTH0_CLIENT_ID!);
  logoutURL.searchParams.set("returnTo", env.AUTH0_RETURN_TO_URL!);

  return redirect(logoutURL.toString(), {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
