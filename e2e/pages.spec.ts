import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("H3VAL");
  await expect(page.getByText("H3VAL", { exact: false }).first()).toBeVisible();
});

test("about page loads", async ({ page }) => {
  await page.goto("/about");
  await expect(page).toHaveTitle("H3VAL Music | About");
  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
});

test("imprint page loads", async ({ page }) => {
  await page.goto("/imprint");
  await expect(page).toHaveTitle("H3VAL Music | Imprint");
  await expect(page.getByRole("heading", { name: "Imprint" })).toBeVisible();
});

test("links page loads", async ({ page }) => {
  await page.goto("/links");
  await expect(page).toHaveTitle("H3VAL | Links");
});
