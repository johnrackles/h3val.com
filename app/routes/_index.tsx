import type { MetaFunction } from "@remix-run/node";
import { GlowingHeadline } from "~/components/glowing-headline";

export const meta: MetaFunction = () => {
  return [
    { title: "H3VAL Music" },
    { name: "description", content: "H3VAL Music" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-full min-h-svh flex-col items-center justify-center bg-background">
      <div className="max-w-[450px] text-center">
        <GlowingHeadline>H3VAL</GlowingHeadline>
        <h2 className="text-xl text-foreground lg:text-5xl">[hɛˈvɑːl]</h2>
        <blockquote className="text-md mt-6 italic text-muted-foreground lg:text-lg">
          &ldquo;friend&rdquo; or &ldquo;comrade&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
