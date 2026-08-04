import { describe, expect, test } from "vitest";
import { Route as AboutRoute } from "./about";
import { Route as ImprintRoute } from "./imprint";
import { Route as IndexRoute } from "./index";
import { Route as LinksRoute } from "./links";
import { Route as PrivacyRoute } from "./privacy";

function title(route: { options: { head?: unknown } }) {
  const head = route.options.head as
    | (() => { meta?: { title?: string }[] })
    | undefined;
  return head?.().meta?.find((m) => m.title)?.title;
}

describe("route head metadata", () => {
  test.each([
    [IndexRoute, "H3VAL"],
    [AboutRoute, "H3VAL | About"],
    [ImprintRoute, "H3VAL | Imprint"],
    [PrivacyRoute, "H3VAL | Privacy Policy"],
    [LinksRoute, "H3VAL | Links"],
  ] as const)("sets the expected <title>", (route, expected) => {
    expect(title(route)).toBe(expected);
  });
});
