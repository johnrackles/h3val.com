import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// <title> metadata is covered by the fast unit test in app/routes/head.test.ts
// (vitest) — no browser needed for a static string.

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("H3VAL", { exact: false }).first()).toBeVisible();
});

test("about page loads", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
});

test("imprint page loads", async ({ page }) => {
  await page.goto("/imprint");
  await expect(page.getByRole("heading", { name: "Imprint" })).toBeVisible();
});

test("about page hides soundcloud players behind a consent gate", async ({
  page,
}) => {
  await page.goto("/about");

  const gateButtons = page.getByRole("button", { name: /^Load "/ });
  await expect(gateButtons).toHaveCount(3);
  await expect(
    page.locator("iframe[src*='w.soundcloud.com/player']"),
  ).toHaveCount(0);
});

test("clicking one gate loads all soundcloud players with no CSP violations", async ({
  page,
}) => {
  const cspViolations: string[] = [];
  page.on("console", (msg) => {
    if (msg.text().toLowerCase().includes("content security policy")) {
      cspViolations.push(msg.text());
    }
  });

  await page.goto("/about");
  await page
    .getByRole("button", { name: /^Load "/ })
    .first()
    .click();

  const frames = page.locator("iframe[src*='w.soundcloud.com/player']");
  await expect(frames).toHaveCount(3);
  await expect(page.getByRole("button", { name: /^Load "/ })).toHaveCount(0);

  for (const frame of await frames.all()) {
    const src = await frame.getAttribute("src");
    expect(src).toBeTruthy();
    const res = await page.request.get(src as string);
    expect(res.ok()).toBe(true);

    const widget = await frame.contentFrame();
    await expect(widget?.getByRole("button", { name: "Share" })).toBeVisible();
  }

  expect(cspViolations).toEqual([]);

  // consent is persisted, so a reload should not show the gate again
  await page.reload();
  await expect(
    page.locator("iframe[src*='w.soundcloud.com/player']"),
  ).toHaveCount(3);
});

// links page navigation + rendering is exercised by the a11y check below.

for (const path of ["/", "/about", "/imprint", "/links"]) {
  test(`${path} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    // iframe embeds (SoundCloud widget) are third-party markup we don't control
    const results = await new AxeBuilder({ page }).exclude("iframe").analyze();
    expect(results.violations).toEqual([]);
  });
}
