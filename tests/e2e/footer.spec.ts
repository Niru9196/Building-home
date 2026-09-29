import { expect, test } from "@playwright/test";

import { gotoHome, horizontalOverflow, scrollThrough } from "./utils";

test.describe("CTA band and footer", () => {
  test("CTA band offers a call and a WhatsApp chat", async ({ page }) => {
    await gotoHome(page);
    const band = page.locator(".cta-band");
    await band.scrollIntoViewIfNeeded();

    const call = band.getByRole("link", { name: "Book a free call" });
    const chat = band.getByRole("link", { name: "Chat on WhatsApp" });
    await expect(call).toBeVisible();
    await expect(chat).toBeVisible();
    await expect(call).toHaveAttribute("href", /\/get-started/);
    await expect(chat).toHaveAttribute("href", /nas\.io|whatsapp/);
    await expect(chat).toHaveAttribute("target", "_blank");
  });

  test("social links have accessible names", async ({ page }) => {
    await gotoHome(page);
    const socials = page.getByRole("navigation", { name: "Social links" }).getByRole("link");
    await expect(socials).toHaveCount(3);
    for (const name of ["Propsoch on LinkedIn", "Propsoch on YouTube", "Email Propsoch"]) {
      await expect(page.getByRole("link", { name })).toBeAttached();
    }
  });

  test("footer fits the viewport", async ({ page }) => {
    await gotoHome(page);
    await scrollThrough(page);
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    const width = page.viewportSize()!.width;
    const box = await page.locator(".site-footer").boundingBox();
    expect(box!.width).toBeLessThanOrEqual(width);
  });
});
