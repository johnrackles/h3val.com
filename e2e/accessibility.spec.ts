import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// links page navigation + rendering is exercised by the pagination test and
// the a11y check below.

for (const path of [
  "/",
  "/about",
  "/imprint",
  "/links",
  "/privacy",
  "/login",
  "/admin",
]) {
  test(`${path} has no accessibility violations`, async ({ page }) => {
    await page.goto(path);
    // iframe embeds (SoundCloud widget) are third-party markup we don't control
    const results = await new AxeBuilder({ page }).exclude("iframe").analyze();
    expect(results.violations).toEqual([]);
  });
}
