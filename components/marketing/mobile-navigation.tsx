"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { BrandLogo } from "@/components/marketing/brand-logo";
import { ArrowRightIcon, ChevronDownIcon, UserIcon, WhatsAppIcon } from "@/components/ui/icons";
import type { NavigationCategory, NavigationLink } from "@/config/site";

interface MobileNavigationProps {
  categories: readonly NavigationCategory[];
  sectionLinks: readonly NavigationLink[];
  loginHref: string;
  getStartedHref: string;
  communityHref: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNavigation({
  categories,
  sectionLinks,
  loginHref,
  getStartedHref,
  communityHref,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const drawerId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    setOpenCategory(null);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    document.body.classList.add("scroll-locked");
    // Wait for the drawer to become visible before moving focus into it.
    const frame = requestAnimationFrame(() =>
      drawer?.querySelector<HTMLElement>(FOCUSABLE)?.focus(),
    );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !drawer) return;

      // Keep focus inside the drawer while it is open.
      const focusable = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null,
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !drawer.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !drawer.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close automatically if the viewport grows into the desktop layout.
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) close(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);
    return () => {
      cancelAnimationFrame(frame);
      document.body.classList.remove("scroll-locked");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open, close]);

  return (
    <div className="mobile-nav">
      <button
        ref={toggleRef}
        type="button"
        className="menu-toggle"
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls={drawerId}
        onClick={() => setOpen(true)}
      >
        <span className="menu-toggle-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <div
        className="drawer-backdrop"
        data-open={open ? "true" : "false"}
        aria-hidden="true"
        onClick={() => close()}
      />

      <div
        ref={drawerRef}
        id={drawerId}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-open={open ? "true" : "false"}
      >
        <div className="drawer-head">
          <BrandLogo />
          <button
            type="button"
            className="drawer-close"
            aria-label="Close navigation menu"
            onClick={() => close()}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="drawer-body" aria-label="Mobile navigation">
          <ul className="drawer-sections">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => close(false)}>
                  {link.label}
                  <ArrowRightIcon size={18} />
                </a>
              </li>
            ))}
          </ul>

          {categories.map((category) => {
            const categoryOpen = openCategory === category.label;
            const categoryId = `${drawerId}-${category.label.toLowerCase()}`;
            return (
              <div className="drawer-group" key={category.label}>
                <button
                  type="button"
                  aria-expanded={categoryOpen}
                  aria-controls={categoryId}
                  onClick={() => setOpenCategory(categoryOpen ? null : category.label)}
                >
                  {category.label}
                  <ChevronDownIcon size={16} />
                </button>
                <div id={categoryId} className="drawer-group-panel" hidden={!categoryOpen}>
                  {category.columns.map((column) => (
                    <div key={column.heading || category.label}>
                      {category.columns.length > 1 && column.heading ? (
                        <p className="drawer-group-heading">{column.heading}</p>
                      ) : null}
                      <ul>
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <a href={link.href} onClick={() => close(false)}>
                              <strong>
                                {link.label}
                                {link.badge ? <em>{link.badge}</em> : null}
                              </strong>
                              {link.description ? <small>{link.description}</small> : null}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="drawer-actions">
          <a
            href={communityHref}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="mobile_whatsapp"
          >
            <WhatsAppIcon size={20} />
            Chat on WhatsApp
          </a>
          <a href={getStartedHref} className="btn btn-secondary" data-analytics-event="mobile_get_started">
            Start Guided Home Buying
          </a>
          <a href={loginHref} className="drawer-login" data-analytics-event="mobile_login">
            <UserIcon size={18} />
            Log In / Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}
