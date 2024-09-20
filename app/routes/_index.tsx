import { type MetaFunction } from "@remix-run/cloudflare";
import { GlowingHeadline } from "~/components/glowing-headline";

export const meta: MetaFunction = () => {
  return [
    { title: "H3VAL" },
    { name: "description", content: "H3VAL Music Home" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background">
      <div className="max-w-[450px] text-center">
        <GlowingHeadline>H3VAL</GlowingHeadline>
        <h2 className="text-xl text-foreground lg:text-5xl">[hɛˈvɑːl]</h2>
        <blockquote className="text-md mt-6 italic text-muted-foreground lg:text-lg">
          kurdish for &ldquo;friend&rdquo; or &ldquo;comrade&rdquo;
        </blockquote>
      </div>
    </div>
  );
}
