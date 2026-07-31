import { createCspMiddleware } from "@enalmada/start-secure";
import { createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => ({
  requestMiddleware: [
    createCspMiddleware({
      rules: [
        {
          description: "soundcloud-widgets (embedded on /about)",
          "frame-src": "https://w.soundcloud.com",
        },
      ],
      options: { isDev: import.meta.env.DEV },
    }),
  ],
}));
