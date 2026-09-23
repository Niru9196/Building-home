"use client";

import { useEffect, useState } from "react";

import type { NavigationCategory } from "@/config/site";

interface MegaNavigationProps {
  categories: readonly NavigationCategory[];
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="m4 6 4 4 4-4" className={open ? "chevron-open" : undefined} />
    </svg>
  );
}

export function MegaNavigation({ categories }: MegaNavigationProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav className="mega-navigation" aria-label="Primary navigation">
      {categories.map((category) => {
        const open = activeMenu === category.label;
        const panelId = `mega-menu-${category.label.toLowerCase()}`;

        return (
          <div
            className="mega-navigation-item"
            key={category.label}
            onMouseEnter={() => setActiveMenu(category.label)}
            onMouseLeave={() => setActiveMenu(null)}
            onFocusCapture={() => setActiveMenu(category.label)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setActiveMenu(null);
              }
            }}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setActiveMenu(open ? null : category.label)}
            >
              {category.label}
              <Chevron open={open} />
            </button>

            <div
              id={panelId}
              className={`mega-menu-panel${category.columns.length > 1 ? " mega-menu-wide" : ""}`}
              role="region"
              aria-label={`${category.label} menu`}
              hidden={!open}
            >
              {category.columns.map((column) => (
                <div className="mega-menu-column" key={column.heading || category.label}>
                  {column.heading ? <p>{column.heading}</p> : null}
                  <div className="mega-menu-links">
                    {column.links.map((link) => (
                      <a
                        href={link.href}
                        key={link.label}
                        data-analytics-event={`nav_${category.label.toLowerCase()}_${link.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
                      >
                        {/* <span className="mega-link-icon" aria-hidden="true">
                          {link.label.charAt(0)}
                        </span> */}
                        <span>
                          <strong>
                            {link.label}
                            {link.badge ? <em>{link.badge}</em> : null}
                          </strong>
                          {link.description ? <small>{link.description}</small> : null}
                        </span>
                        <span className="mega-link-arrow" aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
