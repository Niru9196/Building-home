import { BrandLogo } from "@/components/marketing/brand-logo";
import { MegaNavigation } from "@/components/marketing/mega-navigation";
import { MobileNavigation } from "@/components/marketing/mobile-navigation";
import { megaNavigation, siteConfig } from "@/config/site";

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="7.5" r="3.25" />
      <path d="M5.5 20c.3-4.1 2.5-6.2 6.5-6.2s6.2 2.1 6.5 6.2" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href={siteConfig.links.home} className="logo-link" aria-label="Propsoch home">
          <BrandLogo priority />
        </a>

        <MegaNavigation categories={megaNavigation} />

        <div className="desktop-actions">
          <a
            href={siteConfig.links.login}
            className="login-link"
            data-analytics-event="header_login"
          >
            <UserIcon />
            <span>Log In / Sign Up</span>
          </a>
          <a
            href={siteConfig.links.getStarted}
            className="header-get-started"
            data-analytics-event="header_get_started"
          >
            Get Started
          </a>
        </div>

        <MobileNavigation
          categories={megaNavigation}
          loginHref={siteConfig.links.login}
          getStartedHref={siteConfig.links.getStarted}
          communityHref={siteConfig.links.community}
        />
      </div>
    </header>
  );
}
