import { expect, test } from "@playwright/test";

import { elementsPastViewport, gotoHome, horizontalOverflow, scrollThrough } from "./utils";

test.describe("page layout", () => {
  test("has no horizontal overflow anywhere on the page", async ({ page }) => {
    await gotoHome(page);
    await scrollThrough(page);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    // Content that is clipped rather than scrollable still counts as broken.
    const offenders = await elementsPastViewport(
      page,
      ".site-header .header-inner *, main a, main button, main h1, main h2, main h3, main h4, main p, .site-footer a",
    );
    expect(offenders).toEqual([]);
  });

  test("has exactly one main landmark and one h1", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
  });

  test("skip link moves focus to the main content", async ({ page }) => {
    await gotoHome(page);
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press("Enter");
    await expect(page.locator("main#main")).toBeFocused();
  });

  test("renders sections in the designed order", async ({ page }) => {
    await gotoHome(page);
    const ids = await page
      .locator("main > section")
      .evaluateAll((sections) =>
        sections.map((section) => section.id || section.getAttribute("aria-labelledby")),
      );
    expect(ids).toEqual(["hero-title", "trust-title", "why-us", "how-it-works", "cta-title"]);
  });
});
