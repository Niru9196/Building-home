"use client";

import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@/components/ui/icons";
import type { NavigationCategory, NavigationLink } from "@/config/site";

interface MegaNavigationProps {
  categories: readonly NavigationCategory[];
  sectionLinks: readonly NavigationLink[];
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "_");

export function MegaNavigation({ categories, sectionLinks }: MegaNavigationProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // Set when a mouse hover opened the menu, so the click that usually
  // follows doesn't immediately close it again.
  const openedByHover = useRef(false);

  useEffect(() => {
    if (!activeMenu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMenu(null);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [activeMenu]);

  return (
    <nav className="primary-nav" aria-label="Primary navigation">
      <ul className="primary-nav-list">
        {sectionLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="primary-nav-link">
              {link.label}
            </a>
          </li>
        ))}

        {categories.map((category) => {
          const open = activeMenu === category.label;
          const panelId = `mega-menu-${slug(category.label)}`;

          return (
            <li
              className={`mega-item${category.columns.length > 1 ? " has-wide-panel" : ""}`}
              key={category.label}
              onPointerEnter={(event) => {
                if (event.pointerType !== "mouse") return;
                openedByHover.current = true;
                setActiveMenu(category.label);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType !== "mouse") return;
                openedByHover.current = false;
                setActiveMenu(null);
              }}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setActiveMenu(null);
              }}
            >
              <button
                type="button"
                className="primary-nav-link"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => {
                  if (open && openedByHover.current) {
                    openedByHover.current = false;
                    return;
                  }
                  openedByHover.current = false;
                  setActiveMenu(open ? null : category.label);
                }}
              >
                {category.label}
                <ChevronDownIcon />
              </button>

              <div
                id={panelId}
                className={`mega-panel${category.columns.length > 1 ? " is-wide" : ""}`}
                hidden={!open}
              >
                {category.columns.map((column) => (
                  <div className="mega-column" key={column.heading || category.label}>
                    {column.heading ? <p className="mega-heading">{column.heading}</p> : null}
                    <ul className="mega-links">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            data-analytics-event={`nav_${slug(category.label)}_${slug(link.label)}`}
                          >
                            <span>
                              <strong>
                                {link.label}
                                {link.badge ? <em>{link.badge}</em> : null}
                              </strong>
                              {link.description ? <small>{link.description}</small> : null}
                            </span>
                            <span className="mega-arrow" aria-hidden="true">
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
