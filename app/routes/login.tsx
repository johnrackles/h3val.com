import { type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Form, json, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authenticator.sessionErrorKey);

  return json(
    { error },
    {
      headers: {
        "Set-Cookie": await commitSession(session), // You must commit the session whenever you read a flash
      },
    }
  );
}

export default function Login() {
  const { error } = useLoaderData<typeof loader>();
  return (
    <Form action="/auth/auth0" method="post">
      <button>Login with Auth0</button>

      {error && <p>{error.message}</p>}
    </Form>
  );
}
