import { createFileRoute } from "@tanstack/react-router";
import { H1, H2 } from "~/components/typography";

const sets = [
  {
    name: "Opening @ TUMULT 25.07.2025",
    url: "https://soundcloud.com/h3val/opening-tumult-25072025",
  },
  {
    name: "H3VAL b2b Kowsky @ Fusion 2025 | Luftschloss",
    url: "https://soundcloud.com/h3val/h3val-b2b-kowsky-fusion-2025-luftschloss",
  },
  {
    name: "TumultCast · 003 · H3VAL",
    url: "https://soundcloud.com/tumult-berlin/tumultcast-003-h3val",
  },
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "H3VAL Music | About" },
      { name: "description", content: "H3VAL Music About Page" },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-md) space-y-6 text-center">
      <H1>About</H1>
      <p className="mx-auto max-w-prose text-base font-medium">
        Berlin-based groove techno DJ. A decade behind the decks, hypnotic
        rhythm-driven sets, and a commitment to accessible, community-first
        parties.
      </p>

      <div className="space-y-6 text-left">
        <H2>Sets</H2>
        {sets.map((set) => (
          <div
            className="overflow-hidden rounded-xl bg-muted/60 p-1"
            key={set.url}
          >
            <iframe
              allow="autoplay"
              className="block rounded-lg"
              height="166"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(set.url)}&color=%23ff5500&auto_play=false&show_comments=false&visual=true`}
              title={set.name}
              width="100%"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
