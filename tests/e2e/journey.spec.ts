import { expect, test } from "@playwright/test";

import { gotoHome } from "./utils";

const stepTitles = [
  "A quick free call",
  "Discovery form",
  "Longlist call",
  "Site visits",
  "Deepdiving",
  "Negotiation and Closure",
];

test.describe("25-day journey", () => {
  test("every step is visible without inner scrolling", async ({ page }) => {
    await gotoHome(page);
    for (const title of stepTitles) {
      const heading = page.getByRole("heading", { level: 4, name: title });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
    const scrollers = await page
      .locator("#how-it-works *")
      .evaluateAll(
        (elements) =>
          elements.filter((element) => {
            const style = getComputedStyle(element);
            return /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight;
          }).length,
      );
    expect(scrollers).toBe(0);
  });

  test("keyboard focus only lands on links and buttons", async ({ page }) => {
    await gotoHome(page);
    const seen: string[] = [];
    for (let i = 0; i < 90; i += 1) {
      await page.keyboard.press("Tab");
      const tag = await page.evaluate(() => document.activeElement?.tagName ?? "NONE");
      if (tag === "BODY") break;
      seen.push(tag);
    }
    expect(seen.length).toBeGreaterThan(10);
    expect(seen.filter((tag) => tag !== "A" && tag !== "BUTTON")).toEqual([]);
  });

  test("stage markers set the current step", async ({ page }) => {
    await gotoHome(page);
    const week2 = page.getByRole("button", { name: "Week 2" });
    await week2.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await week2.click();
    await expect(week2).toHaveAttribute("aria-current", "step");
    // Still current once any smooth scrolling has settled.
    await page.waitForTimeout(1200);
    await expect(week2).toHaveAttribute("aria-current", "step");
  });

  test("lays stages out horizontally on desktop and stacked below", async ({ page }) => {
    await gotoHome(page);
    const width = page.viewportSize()!.width;
    const tops = await page
      .locator(".timeline > .stage")
      .evaluateAll((stages) => stages.map((stage) => stage.getBoundingClientRect().top));
    expect(tops).toHaveLength(5);

    if (width >= 1024) {
      expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(2);
    } else {
      for (let i = 1; i < tops.length; i += 1) expect(tops[i]).toBeGreaterThan(tops[i - 1]);
    }
  });

  test("progress fills as the timeline scrolls into view", async ({ page }) => {
    await gotoHome(page);
    const stages = page.locator(".timeline > .stage");
    await expect(stages.first()).toHaveAttribute("data-state", "current");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect(stages.last()).toHaveAttribute("data-state", "current");
    await expect(stages.first()).toHaveAttribute("data-state", "done");
  });
});
