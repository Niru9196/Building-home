import { test } from "@playwright/test";

import { gotoHome, scrollThrough } from "./utils";

// Full-page screenshots for review. Saved as test output, not compared
// against stored baselines, so they never cause flaky failures.
test.use({ reducedMotion: "reduce" });

test("full-page screenshot", async ({ page }, testInfo) => {
  await gotoHome(page);
  await scrollThrough(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: `screenshots/${testInfo.project.name}.png`,
    fullPage: true,
  });
});
