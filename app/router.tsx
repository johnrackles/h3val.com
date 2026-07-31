import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export async function getRouter() {
  // Nonce for CSP script-src; only resolvable on the server (see
  // start-secure's middleware pattern docs). The client applies its own
  // nonce from the rendered <meta> tag automatically.
  let nonce: string | undefined;
  if (import.meta.env.SSR) {
    const { getStartContext } = await import("@tanstack/start-storage-context");
    nonce = getStartContext().contextAfterGlobalMiddlewares?.nonce;
  }

  return createRouter({
    routeTree,
    scrollRestoration: true,
    ssr: { nonce },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
