import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "H3VAL Music" },
    { name: "description", content: "H3VAL Music" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-background">
      <div className="text-center max-w-[450px]">
        <h1 className="font-black text-foreground text-5xl md:text-9xl tracking-tighter">
          H3VAL
        </h1>
        <h2 className="text-foreground text-xl md:text-5xl">[hɛˈvɑːl]</h2>
        <blockquote className="mt-6 italic text-lg">
          &ldquo;friend&rdquo; or &ldquo;comrade&rdquo;, signifying someone who
          is trustworthy, loyal, and an essential part of a community.
        </blockquote>
      </div>
    </div>
  );
}
