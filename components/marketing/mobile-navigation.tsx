"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { NavigationCategory } from "@/config/site";

interface MobileNavigationProps {
  categories: readonly NavigationCategory[];
  loginHref: string;
  getStartedHref: string;
  communityHref: string;
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
    </svg>
  );
}

export function MobileNavigation({
  categories,
  loginHref,
  getStartedHref,
  communityHref,
}: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      setOpenCategory(null);
      requestAnimationFrame(() => buttonRef.current?.focus());
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    setOpenCategory(null);
  };

  return (
    <div className="mobile-navigation">
      <button
        ref={buttonRef}
        type="button"
        className="menu-toggle"
        aria-label={`${open ? "Close" : "Open"} navigation menu`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((current) => !current)}
      >
        <MenuIcon open={open} />
      </button>

      <div id={menuId} className="mobile-menu" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {categories.map((category) => {
            const categoryOpen = openCategory === category.label;
            const categoryId = `${menuId}-${category.label.toLowerCase()}`;
            return (
              <div className="mobile-category" key={category.label}>
                <button
                  type="button"
                  aria-expanded={categoryOpen}
                  aria-controls={categoryId}
                  onClick={() => setOpenCategory(categoryOpen ? null : category.label)}
                >
                  {category.label}<span aria-hidden="true">⌄</span>
                </button>
                <div id={categoryId} hidden={!categoryOpen}>
                  {category.columns.map((column) => (
                    <div key={column.heading || category.label}>
                      {category.columns.length > 1 && column.heading ? <p>{column.heading}</p> : null}
                      {column.links.map((link) => (
                        <a href={link.href} key={link.label} onClick={closeMenu}>
                          <strong>{link.label}</strong>
                          {link.description ? <small>{link.description}</small> : null}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
        <div className="mobile-menu-actions">
          <a href={loginHref} data-analytics-event="mobile_login">Log In / Sign Up</a>
          <a href={getStartedHref} className="mobile-get-started" onClick={closeMenu}>Get Started</a>
          <a
            href={communityHref}
            target="_blank"
            rel="noreferrer noopener"
            data-analytics-event="mobile_join_community"
            onClick={closeMenu}
          >
            Join our Community
          </a>
        </div>
      </div>
    </div>
  );
}
