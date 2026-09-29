import { expect, test } from "@playwright/test";

import { gotoHome, horizontalOverflow, scrollThrough } from "./utils";

test.describe("comparison section", () => {
  test("tabs follow the ARIA keyboard pattern", async ({ page }) => {
    await gotoHome(page);
    const brokers = page.getByRole("tab", { name: "Local brokers" });
    const portals = page.getByRole("tab", { name: "Online portals" });

    await brokers.focus();
    await page.keyboard.press("ArrowRight");
    await expect(portals).toBeFocused();
    await expect(portals).toHaveAttribute("aria-selected", "true");
    await expect(brokers).toHaveAttribute("aria-selected", "false");
    await expect(brokers).toHaveAttribute("tabindex", "-1");

    await page.keyboard.press("Home");
    await expect(brokers).toBeFocused();
    await expect(brokers).toHaveAttribute("aria-selected", "true");

    await page.keyboard.press("End");
    await expect(portals).toHaveAttribute("aria-selected", "true");
  });

  test("switches the rows between brokers and portals", async ({ page }) => {
    await gotoHome(page);
    const rows = page.locator(".cmp-body [role='row']");
    await expect(rows).toHaveCount(9);
    await page.getByRole("tab", { name: "Online portals" }).click();
    await expect(rows).toHaveCount(5);
    await expect(page.getByRole("rowheader", { name: "Information Depth" })).toBeAttached();
  });

  test("exposes table semantics", async ({ page }) => {
    await gotoHome(page);
    const table = page.getByRole("table", { name: /Propsoch compared with/ });
    await expect(table.getByRole("columnheader")).toHaveCount(3);
    await expect(table.getByRole("rowheader")).toHaveCount(9);
  });

  test("fits the viewport without sideways scrolling", async ({ page }) => {
    await gotoHome(page);
    await scrollThrough(page);
    const width = page.viewportSize()!.width;
    const rowWidths = await page
      .locator(".cmp-body [role='row']")
      .evaluateAll((rows) => rows.map((row) => row.getBoundingClientRect().right));
    for (const right of rowWidths) expect(right).toBeLessThanOrEqual(width);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
  });

  test("shows column headers on wide screens, cards on phones", async ({ page }) => {
    await gotoHome(page);
    const width = page.viewportSize()!.width;
    await page.locator("#why-us").scrollIntoViewIfNeeded();
    const headers = page.locator(".cmp-col-label");
    const labels = page.locator(".cmp-cell-label").first();

    if (width >= 768) {
      for (const header of await headers.all()) await expect(header).toBeVisible();
      await expect(labels).toBeHidden();
    } else {
      await expect(labels).toBeVisible();
    }
  });
});
