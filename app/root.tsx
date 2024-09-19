import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/900.css";
import { type LinksFunction } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "favicon-16x16.png" },
  { rel: "icon", href: "favicon-32x32.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark font-sans">
        <div className="grid min-h-svh grid-rows-[auto,1fr,auto] bg-background">
          {location.pathname !== "/" ? <Header /> : null}
          <main className="container mx-auto p-4 lg:p-8">{children}</main>
          <Footer />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
