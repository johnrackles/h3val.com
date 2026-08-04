import { createCspMiddleware } from "@enalmada/start-secure";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { auth } from "~/lib/auth";

const authMiddleware = createMiddleware({ type: "request" }).server(
  ({ request, pathname, next }) => {
    if (pathname.startsWith("/api/auth")) {
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
