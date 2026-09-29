import type { Page } from "@playwright/test";

/** Scrolls the full page in steps so scroll-triggered content renders. */
export async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
}

/** Horizontal overflow in CSS px (0 means no sideways scrolling). */
export async function horizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
}

export async function gotoHome(page: Page) {
  await page.goto("/", { waitUntil: "load" });
  // The header flags itself once React has hydrated and handlers are attached.
  await page.locator('.site-header[data-hydrated="true"]').waitFor({ timeout: 30_000 });
}

/**
 * Visible elements whose right edge passes the viewport. `body` uses
 * `overflow-x: clip`, so scrollWidth alone would not reveal clipped content.
 */
export async function elementsPastViewport(page: Page, selector: string) {
  return page.locator(selector).evaluateAll((elements) => {
    const width = document.documentElement.clientWidth;
    return elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 1 && style.visibility !== "hidden" && rect.right > width + 0.5;
      })
      .map((element) => `${element.tagName.toLowerCase()}.${element.getAttribute("class") ?? ""}`);
  });
}
