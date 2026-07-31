import { createFileRoute } from "@tanstack/react-router";
import { SoundcloudEmbed } from "~/components/soundcloud-embed";
import { H1, H2 } from "~/components/typography";
import { soundcloudSets } from "~/lib/soundcloud-sets";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "H3VAL | About" },
      { name: "description", content: "H3VAL About Page" },
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
        {soundcloudSets.map((set) => (
          <div
            className="overflow-hidden rounded-xl bg-muted/60 p-1"
            key={set.url}
          >
            <SoundcloudEmbed name={set.name} url={set.url} />
          </div>
        ))}
      </div>
    </div>
  );
}
