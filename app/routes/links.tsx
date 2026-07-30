import { type MetaFunction } from "@remix-run/cloudflare";
import { Music } from "lucide-react";
import { type ReactNode } from "react";
import { Link } from "~/components/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const meta: MetaFunction = () => {
  return [
    { title: "H3VAL | Links" },
    {
      name: "description",
      content: "Links to my various pages all over the Internet",
    },
  ];
};

const links: { name: string; body?: string; href: string; icon?: ReactNode }[] =
  [
    {
      name: "Opening @ TUMULT 25.07.2025",
      href: "https://soundcloud.com/h3val/opening-tumult-25072025",
    },
    {
      name: "H3VAL b2b Kowsky @ Fusion 2025 | Luftschloss",
      href: "https://soundcloud.com/h3val/h3val-b2b-kowsky-fusion-2025-luftschloss",
    },
    {
      name: "TumultCast · 003 · H3VAL",
      href: "https://soundcloud.com/tumult-berlin/tumultcast-003-h3val",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/h3val.dj",
      // lucide-react dropped brand icons; inline the glyph instead of a new dep
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-2 size-4"
          aria-hidden
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Soundcloud",
      href: "https://soundcloud.com/h3val",
      icon: <Music className="mr-2" size={16} />,
    },
  ];

export default function LinksPage() {
  return (
    <div className="flex flex-col items-center">
      <ul className="grid w-full max-w-[350px] gap-4">
        {links.map((link) => {
          return (
            <li key={link.name}>
              <Link to={link.href} className="no-underline">
                <Card className="bg-muted">
                  <CardHeader>
                    <CardTitle className="flex flex-row items-center">
                      {link.icon ? link.icon : null}
                      {link.name}
                    </CardTitle>
                    <CardDescription>
                      {new URL(link.href).hostname}
                    </CardDescription>
                  </CardHeader>
                  {link.body ? <CardContent>{link.body}</CardContent> : null}
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
