import { runWithStartContext } from "@tanstack/start-storage-context";
import { describe, expect, test, vi } from "vitest";

// Simulates an unauthenticated request hitting the admin-only mutation
// server fns directly (bypassing the UI), which is exactly what the
// session guard in requireSession() (app/lib/links.ts) must reject.
vi.mock("~/lib/auth", () => ({
  auth: { api: { getSession: vi.fn(async () => null) } },
}));
vi.mock("@tanstack/react-start/server", () => ({
  getRequestHeaders: () => new Headers(),
}));

const { createLink, deleteLink, setLinkHidden } = await import("./links");

function withRequest<T>(fn: () => Promise<T>) {
  return runWithStartContext(
    { request: new Request("http://localhost/") } as never,
    fn,
  );
}

describe("admin link mutations require a session", () => {
  test("createLink rejects without a session", async () => {
    await expect(
      withRequest(() => createLink({ data: { name: "x", href: "https://x" } })),
    ).rejects.toThrow("You must be signed in");
  });

  test("deleteLink rejects without a session", async () => {
    await expect(
      withRequest(() => deleteLink({ data: { id: "1" } })),
    ).rejects.toThrow("You must be signed in");
  });

  test("setLinkHidden rejects without a session", async () => {
    await expect(
      withRequest(() => setLinkHidden({ data: { id: "1", hidden: true } })),
    ).rejects.toThrow("You must be signed in");
  });
});
