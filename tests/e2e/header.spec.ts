import { expect, test } from "@playwright/test";

import { elementsPastViewport, gotoHome } from "./utils";

const isDesktop = (width: number) => width >= 1024;

test.describe("site header", () => {
  test("shows desktop nav or the menu toggle depending on width", async ({ page }) => {
    await gotoHome(page);
    const width = page.viewportSize()!.width;
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    const toggle = page.getByRole("button", { name: "Open navigation menu" });

    if (isDesktop(width)) {
      await expect(nav).toBeVisible();
      await expect(toggle).toBeHidden();
    } else {
      await expect(nav).toBeHidden();
      await expect(toggle).toBeVisible();
    }
  });

  test("switches to the scrolled state", async ({ page }) => {
    await gotoHome(page);
    const header = page.locator(".site-header");
    await expect(header).toHaveAttribute("data-scrolled", "false");
    await page.evaluate(() => window.scrollTo(0, 500));
    await expect(header).toHaveAttribute("data-scrolled", "true");
  });

  test("primary CTA names its WhatsApp destination", async ({ page }) => {
    await gotoHome(page);
    const cta = page.getByRole("banner").getByRole("link", { name: /Chat on WhatsApp/ });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("target", "_blank");
    await expect(cta).toHaveAttribute("rel", /noopener/);
  });

  test("mobile drawer traps focus and closes with Escape", async ({ page }) => {
    await gotoHome(page);
    test.skip(isDesktop(page.viewportSize()!.width), "drawer is only used below 1024px");

    const toggle = page.getByRole("button", { name: "Open navigation menu" });
    const drawer = page.getByRole("dialog", { name: "Site menu" });

    await expect(drawer).toBeHidden();
    await toggle.click();
    await expect(drawer).toBeVisible();
    await expect(page.locator("body")).toHaveClass(/scroll-locked/);

    for (let i = 0; i < 20; i += 1) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(
        () => !!document.activeElement?.closest('[role="dialog"]'),
      );
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(toggle).toBeFocused();
    await expect(page.locator("body")).not.toHaveClass(/scroll-locked/);
  });

  test("mobile drawer closes when the backdrop is clicked", async ({ page }) => {
    await gotoHome(page);
    test.skip(isDesktop(page.viewportSize()!.width), "drawer is only used below 1024px");

    await page.getByRole("button", { name: "Open navigation menu" }).click();
    const drawer = page.getByRole("dialog", { name: "Site menu" });
    await expect(drawer).toBeVisible();
    await page.mouse.click(8, 400);
    await expect(drawer).toBeHidden();
  });

  test("mega menus open inside the viewport and close with Escape", async ({ page }) => {
    await gotoHome(page);
    const width = page.viewportSize()!.width;
    test.skip(!isDesktop(width), "mega menus are desktop-only");

    for (const name of ["Properties", "Services", "Resources", "Company"]) {
      const button = page.getByRole("button", { name, exact: true });
      await button.click();
      await expect(button).toHaveAttribute("aria-expanded", "true");
      const panel = page.locator(".mega-panel:not([hidden])");
      await expect(panel).toBeVisible();
      const box = (await panel.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
      await page.keyboard.press("Escape");
      await expect(button).toHaveAttribute("aria-expanded", "false");
    }
  });

  test("section links jump to the journey", async ({ page }) => {
    await gotoHome(page);
    const width = page.viewportSize()!.width;
    if (!isDesktop(width)) {
      await page.getByRole("button", { name: "Open navigation menu" }).click();
    }
    await page.getByRole("link", { name: "How it works" }).first().click();
    await expect(page).toHaveURL(/#how-it-works$/);
    await expect(page.locator("#journey-title")).toBeInViewport();
  });

  test("header content fits every in-between width", async ({ page }) => {
    test.skip(test.info().project.name !== "desktop", "width sweep runs once");
    for (const width of [320, 414, 600, 900, 1023, 1024, 1180, 1279, 1280, 1366, 1600, 1920]) {
      await page.setViewportSize({ width, height: 800 });
      await gotoHome(page);
      const offenders = await elementsPastViewport(page, ".site-header .header-inner *");
      expect(offenders, `header overflow at ${width}px`).toEqual([]);
      const inner = (await page.locator(".header-inner").boundingBox())!;
      const cta = (await page.locator(".header-cta").boundingBox())!;
      expect(cta.x + cta.width, `CTA outside container at ${width}px`).toBeLessThanOrEqual(
        inner.x + inner.width + 1,
      );
    }
  });
});
