import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/900.css";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { cn } from "~/lib/utils";
import styles from "~/tailwind.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "H3VAL" },
      { name: "description", content: "H3VAL Music" },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "icon", href: "/favicon-16x16.png" },
      { rel: "icon", href: "/favicon-32x32.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <html className="dark" lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans">
        <div
          className={cn(
            "grid min-h-svh bg-background",
            isRoot ? "grid-rows-[1fr_auto]" : "grid-rows-[auto_1fr_auto]",
          )}
        >
          {!isRoot ? <Header /> : null}
          <main className="container mx-auto p-4 lg:p-8">
            <Outlet />
          </main>
          <Footer />
        </div>
        <Scripts />
      </body>
    </html>
  );
}
