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

test("privacy page loads", async ({ page }) => {
  await page.goto("/privacy");
  await expect(
    page.getByRole("heading", { name: "Privacy Policy" }),
  ).toBeVisible();
});

test("admin page gates anonymous visitors behind sign-in", async ({ page }) => {
  await page.goto("/admin");
  await expect(
    page.getByText("You need to sign in before you can manage links."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Sign in with GitHub" }),
  ).toBeVisible();
});
