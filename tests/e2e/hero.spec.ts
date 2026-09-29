import { expect, test } from "@playwright/test";

import { gotoHome, horizontalOverflow } from "./utils";

test.describe("hero", () => {
  test("headline and both CTAs are above the fold", async ({ page }) => {
    await gotoHome(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
    await expect(page.getByRole("link", { name: "Start Guided Home Buying" }).first()).toBeInViewport();
    await expect(page.getByRole("link", { name: "Explore Our Services" })).toBeInViewport();
  });

  test("hero image has descriptive alt text", async ({ page }) => {
    await gotoHome(page);
    const img = page.locator(".hero-photo");
    await expect(img).toHaveAttribute("alt", /couple/i);
  });

  test("journey card links to the 25-day section", async ({ page }) => {
    await gotoHome(page);
    const card = page.getByRole("link", { name: /Your home in 25 days/ });
    await expect(card).toHaveAttribute("href", "#how-it-works");
  });

  test("does not overflow at 320px", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await gotoHome(page);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    const box = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  });
});
