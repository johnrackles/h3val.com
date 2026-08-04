import { expect, test } from "@playwright/test";
import { toCrossJSON } from "seroval";

test("links page paginates when there are more links than fit on one page", async ({
  page,
}) => {
  // 20 links > the 8-per-page limit, so pagination controls must show and work.
  const mockLinks = Array.from({ length: 20 }, (_, i) => ({
    id: `link-${i}`,
    name: `Link ${i}`,
    href: `https://example.com/${i}`,
    sortOrder: i,
    hidden: false,
    deleted: false,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  }));

  // getLinks is a TanStack Start server function: the client fetches it over
  // the network (as "x-tss-serialized" seroval cross-JSON, not plain JSON)
  // only on a client-side navigation — SSR calls it in-process. Serialize the
  // mock with the same lib the client deserializes with, then go via the
  // footer link so the navigation actually hits this mocked response.
  await page.route("**/_serverFn/**", async (route) => {
    if (route.request().method() !== "GET") {
      await route.continue();
      return;
    }
    const body = JSON.stringify(
      toCrossJSON({ result: mockLinks, error: undefined, context: {} }),
    );
    await route.fulfill({
      contentType: "application/json",
      headers: { "x-tss-serialized": "true" },
      body,
    });
  });

  await page.goto("/");
  await page.getByRole("link", { name: "Links" }).click();
  await expect(page).toHaveURL(/\/links$/);

  await expect(page.getByRole("link", { name: "Link 0" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Link 7" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Link 8" })).toHaveCount(0);
  await expect(page.getByText("Page 1 of 3")).toBeVisible();
  await expect(page.getByRole("button", { name: "Previous" })).toBeDisabled();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("link", { name: "Link 8" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Link 15" })).toBeVisible();
  await expect(page.getByText("Page 2 of 3")).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("link", { name: "Link 16" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Link 19" })).toBeVisible();
  await expect(page.getByText("Page 3 of 3")).toBeVisible();
  await expect(page.getByRole("button", { name: "Next" })).toBeDisabled();
});
