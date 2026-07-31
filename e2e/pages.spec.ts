import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("H3VAL");
  await expect(page.getByText("H3VAL", { exact: false }).first()).toBeVisible();
});

test("about page loads", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveTitle("H3VAL | About");
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
});

test("imprint page loads", async ({ page }) => {
  await page.goto("/imprint");
  await expect(page).toHaveTitle("H3VAL | Imprint");
  await expect(page.getByRole("heading", { name: "Imprint" })).toBeVisible();
});

test("about page soundcloud widgets load with no CSP violations", async ({
  page,
}) => {
  const cspViolations: string[] = [];
  page.on("console", (msg) => {
    if (msg.text().toLowerCase().includes("content security policy")) {
      cspViolations.push(msg.text());
    }
  });

  await page.goto("/about");
  const frames = page.locator("iframe[src*='w.soundcloud.com/player']");
  await expect(frames).toHaveCount(3);

  for (const frame of await frames.all()) {
    const src = await frame.getAttribute("src");
    expect(src).toBeTruthy();
    const res = await page.request.get(src as string);
    expect(res.ok()).toBe(true);

    const widget = await frame.contentFrame();
    await expect(widget?.getByRole("button", { name: "Share" })).toBeVisible();
  }

  expect(cspViolations).toEqual([]);
});

test("links page loads", async ({ page }) => {
  await page.goto("/links");
  await expect(page).toHaveTitle("H3VAL | Links");
});
