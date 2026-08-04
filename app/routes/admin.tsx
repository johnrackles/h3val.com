import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { H1, H2 } from "~/components/typography";
import { authClient } from "~/lib/auth-client";
import {
  createLink,
  deleteLink,
  getLinks,
  type LinkRecord,
  setLinkHidden,
} from "~/lib/links";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "H3VAL | Admin" },
      { name: "description", content: "Manage H3VAL links" },
    ],
  }),
});

function AdminPage() {
  const [session, setSession] = useState<null | { user?: { name?: string } }>(
    null,
  );
  const [links, setLinks] = useState<LinkRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [href, setHref] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      try {
        const [sessionResult, linkResult] = await Promise.all([
          authClient.getSession(),
          getLinks({ data: { includeHidden: true } }),
        ]);
        setSession(sessionResult.data ?? null);
        setLinks(linkResult);
      } catch (error) {
        setStatus(
          error instanceof Error ? error.message : "Unable to load data.",
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const nextLinks = await createLink({ data: { name, href } });
      setLinks(nextLinks);
      setName("");
      setHref("");
      setStatus("Link added.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to add link.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setSubmitting(true);
    setStatus(null);

    try {
      const nextLinks = await deleteLink({ data: { id } });
      setLinks(nextLinks);
      setStatus("Link deleted.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unable to delete link.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleHidden(id: string, hidden: boolean) {
    setSubmitting(true);
    setStatus(null);

    try {
      const nextLinks = await setLinkHidden({ data: { id, hidden } });
      setLinks(nextLinks);
      setStatus(hidden ? "Link hidden." : "Link visible again.");
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Unable to update link.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-(--breakpoint-md) space-y-6 text-center">
        <H1>Admin</H1>
        <p>Loading…</p>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-(--breakpoint-md) space-y-6 text-center">
        <H1>Admin</H1>
        <p>You need to sign in before you can manage links.</p>
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

  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-8">
      <div className="space-y-2 text-center">
        <H1>Admin</H1>
        <p className="text-sm text-muted-foreground">
          Signed in as {session.user.name ?? "a GitHub user"}.
        </p>
      </div>

      <form
        className="space-y-4 rounded-xl border border-muted bg-muted/20 p-6"
        onSubmit={handleSubmit}
      >
        <H2>Add link</H2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-left text-sm font-medium">
            <span>Name</span>
            <input
              className="w-full rounded-md border border-muted bg-background px-3 py-2"
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: Bandcamp"
              required
              value={name}
            />
          </label>
          <label className="space-y-2 text-left text-sm font-medium">
            <span>Link</span>
            <input
              className="w-full rounded-md border border-muted bg-background px-3 py-2"
              onChange={(event) => setHref(event.target.value)}
              placeholder="https://example.com"
              required
              type="url"
              value={href}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            className="rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Saving…" : "Add link"}
          </button>
          {status ? (
            <p className="text-sm text-muted-foreground">{status}</p>
          ) : null}
        </div>
      </form>

      <div className="space-y-4">
        <H2>Existing links</H2>
        {links.length === 0 ? (
          <p className="text-sm text-muted-foreground">No links yet.</p>
        ) : (
          <ul className="space-y-3">
            {links.map((link) => (
              <li
                className="flex items-center justify-between gap-3 rounded-lg border border-muted bg-background p-4"
                key={link.id}
              >
                <div>
                  <p className="font-medium">
                    {link.name}
                    {link.hidden ? (
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        (hidden)
                      </span>
                    ) : null}
                  </p>
                  <p className="text-sm text-muted-foreground">{link.href}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    className="rounded-md border border-muted px-3 py-2 text-sm font-medium"
                    disabled={submitting}
                    onClick={() =>
                      void handleToggleHidden(link.id, !link.hidden)
                    }
                    type="button"
                  >
                    {link.hidden ? "Show" : "Hide"}
                  </button>
                  <button
                    className="rounded-md border border-muted px-3 py-2 text-sm font-medium"
                    disabled={submitting}
                    onClick={() => void handleDelete(link.id)}
                    type="button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
