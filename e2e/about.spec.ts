import { expect, test } from "@playwright/test";

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
