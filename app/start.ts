import { createCspMiddleware } from "@enalmada/start-secure";
import { createMiddleware, createStart } from "@tanstack/react-start";

const authMiddleware = createMiddleware({ type: "request" }).server(
  async ({ request, pathname, next }) => {
    if (pathname.startsWith("/api/auth")) {
      // ponytail: dynamic import keeps "cloudflare:workers" out of the
      // client-side server-fn-module-lookup scan, which chokes on it
      const { auth } = await import("~/lib/auth");
      return auth.handler(request);
    }
    return next();
  },
);

export const startInstance = createStart(() => ({
  requestMiddleware: [
    authMiddleware,
    createCspMiddleware({
      rules: [
        {
          description: "soundcloud-widgets (embedded on /about)",
          "frame-src": "https://w.soundcloud.com",
        },
      ],
      options: { isDev: import.meta.env.DEV },
      additionalHeaders: {
        "Cross-Origin-Resource-Policy": "same-origin",
      },
    }),
  ],
}));
