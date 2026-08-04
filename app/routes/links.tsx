import { createFileRoute } from "@tanstack/react-router";
import { Music } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "~/components/link";
import { H1 } from "~/components/typography";
import { getLinks } from "~/lib/links";

export const Route = createFileRoute("/links")({
  loader: async () => ({ links: await getLinks() }),
  head: () => ({
    meta: [
      { title: "H3VAL | Links" },
      {
        name: "description",
        content: "Links to my various pages all over the Internet",
      },
    ],
  }),
  component: LinksPage,
});

// lucide-react dropped brand icons; inline the glyph instead of a new dep
const instagramIcon = (
  <svg
    aria-hidden="true"
    className="mr-2 size-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

// icons are cosmetic and keyed off the domain, not stored in the DB
function iconFor(href: string): ReactNode {
  if (href.includes("instagram.com")) {
    return instagramIcon;
  }
  if (new URL(href).pathname === "/h3val") {
    return <Music className="mr-2" size={16} />;
  }
  return null;
}

function LinksPage() {
  const { links } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-6">
      <div className="space-y-4 text-center">
        <H1>Links</H1>
      </div>

      <ul className="mx-auto grid w-full max-w-sm gap-3">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-muted bg-muted/30 px-4 py-3 text-center text-sm font-medium leading-snug no-underline transition-colors hover:bg-muted/60 sm:text-base"
              to={link.href}
            >
              {iconFor(link.href)}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
