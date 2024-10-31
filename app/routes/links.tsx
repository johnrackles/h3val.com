import { type MetaFunction } from "@remix-run/cloudflare";
import { Instagram, Music } from "lucide-react";
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
      name: "02.11. AMT BLANK - soliparty für cadus e.v",
      href: "https://ra.co/events/2033928",
    },
    {
      name: "15.11. WIR BEREUEN NIX - 15 Jahre Straßen aus Zucker Party",
      href: "https://ra.co/events/2029482",
    },
    {
      name: "TumultCast · 003 · H3VAL",
      href: "https://soundcloud.com/tumult-berlin/tumultcast-003-h3val",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/h3val.dj",
      icon: <Instagram className="mr-2" size={16} />,
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
