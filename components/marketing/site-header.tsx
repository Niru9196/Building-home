"use client";

import { useSyncExternalStore } from "react";

import { BrandLogo } from "@/components/marketing/brand-logo";
import { MegaNavigation } from "@/components/marketing/mega-navigation";
import { MobileNavigation } from "@/components/marketing/mobile-navigation";
import { UserIcon, WhatsAppIcon } from "@/components/ui/icons";
import { useHydrated } from "@/lib/use-in-view";
import { megaNavigation, sectionLinks, siteConfig } from "@/config/site";

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function useScrolled(offset = 12) {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > offset,
    () => false,
  );
}

export function SiteHeader() {
  const scrolled = useScrolled();
  const hydrated = useHydrated();

  return (
    <header className="site-header" data-scrolled={scrolled ? "true" : "false"}
      data-hydrated={hydrated ? "true" : "false"}
    >
      <div className="header-inner container">
        <a href={siteConfig.links.home} className="logo-link" aria-label="Propsoch home">
          <BrandLogo priority />
        </a>

        <MegaNavigation categories={megaNavigation} sectionLinks={sectionLinks} />

        <div className="header-actions">
          <a
            href={siteConfig.links.login}
            className="header-login"
            data-analytics-event="header_login"
          >
            <UserIcon size={18} />
            <span className="header-login-label">Log In / Sign Up</span>
          </a>
          <a
            href={siteConfig.links.community}
            className="header-cta"
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="header_whatsapp"
          >
            <WhatsAppIcon size={20} />
            <span className="header-cta-label">
              <span className="header-cta-prefix">Chat on </span>WhatsApp
            </span>
          </a>
          <MobileNavigation
            categories={megaNavigation}
            sectionLinks={sectionLinks}
            loginHref={siteConfig.links.login}
            getStartedHref={siteConfig.links.getStarted}
            communityHref={siteConfig.links.community}
          />
        </div>
      </div>
    </header>
  );
}
