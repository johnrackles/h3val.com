import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { type ActionFunctionArgs } from "@remix-run/node";

import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
}

export const action = ({ request }: ActionFunctionArgs) => {
  return authenticator.authenticate("auth0", request);
};
