import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/900.css";
import {
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { cn } from "./lib/utils";
import { authenticator } from "./services/auth.server";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "icon", href: "favicon-16x16.png" },
  { rel: "icon", href: "favicon-32x32.png" },
];

export const meta: MetaFunction = () => {
  return [{ title: "H3VAL" }, { name: "description", content: "H3VAL Music" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);

  return { authenticated: !!user };
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="dark font-sans">
        <div
          className={cn(
            "grid min-h-svh bg-background",
            isRoot ? "grid-rows-[1fr,auto]" : "grid-rows-[auto,1fr,auto]",
          )}
        >
          {!isRoot ? <Header /> : null}
          <main className="container mx-auto p-4 lg:p-8">{children}</main>
          <Footer authenticated={data?.authenticated} />
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
