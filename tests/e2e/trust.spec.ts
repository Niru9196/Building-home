import { expect, test } from "@playwright/test";

import { gotoHome } from "./utils";

const finalValues = ["8,500+", "290+", "2,500+", "700+"];

test.describe("trust strip", () => {
  test("metrics count up to their final values once visible", async ({ page }) => {
    await gotoHome(page);
    const metrics = page.locator(".metric [data-count]");
    await page.locator(".metrics").scrollIntoViewIfNeeded();
    await expect.poll(() => metrics.allInnerTexts(), { timeout: 5000 }).toEqual(finalValues);
  });

  test("screen readers always get the final values", async ({ page }) => {
    await gotoHome(page);
    const hidden = page.locator(".metric .visually-hidden");
    await expect(hidden).toHaveText(finalValues);
  });

  test("contains no focusable elements", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator(".trust :is(a, button, input, [tabindex])")).toHaveCount(0);
  });
});

test.describe("trust strip with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("renders final metric values immediately", async ({ page }) => {
    await gotoHome(page);
    await expect(page.locator(".metric [data-count]")).toHaveText(finalValues);
  });

  test("stops the logo marquee", async ({ page }) => {
    await gotoHome(page);
    const animation = await page
      .locator(".marquee-track")
      .evaluate((element) => getComputedStyle(element).animationName);
    expect(animation).toBe("none");
  });
});
