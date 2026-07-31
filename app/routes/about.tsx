import { createFileRoute } from "@tanstack/react-router";
import { H1 } from "~/components/typography";

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
    </div>
  );
}
