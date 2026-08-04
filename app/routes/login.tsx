import { createFileRoute } from "@tanstack/react-router";
import { H1 } from "~/components/typography";
import { authClient } from "~/lib/auth-client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "H3VAL | Login" },
      { name: "description", content: "H3VAL Login" },
    ],
  }),
});

function LoginPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-6 text-center">
      <H1>Login</H1>
      <button
        className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground"
        onClick={() => authClient.signIn.social({ provider: "github" })}
        type="button"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
