import Image from "next/image";

import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import heroImage from "@/public/images/hero-homebuyers.webp";

function GuidanceIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="12" r="5" />
      <path d="M10 32v-4c0-5 3.5-8 10-8s10 3 10 8v4M7 29v5h26v-5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 4c4 3 8 4 13 5v9c0 8-5.2 14-13 18C12.2 32 7 26 7 18V9c5-1 9-2 13-5Z" />
      <path d="m14 20 4 4 8-9" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="m5 18 15-13 15 13M9 16v19h22V16M16 35V23h8v12" />
    </svg>
  );
}

const benefits = [
  { label: "Expert Guidance", icon: <GuidanceIcon /> },
  { label: "Verified Properties", icon: <ShieldIcon /> },
  { label: "End-to-End Support", icon: <HomeIcon /> },
] as const;

function BotanicalAccent() {
  return (
    <svg className="hero-botanical" viewBox="0 0 180 180" aria-hidden="true">
      <path className="stem" d="M-10 166c35-48 57-88 68-146" />
      <path d="M28 126C4 117-7 96 2 77c24 6 38 25 26 49ZM48 94C29 77 27 54 41 40c20 14 25 37 7 54ZM61 60C49 39 56 17 74 8c14 19 8 42-13 52ZM15 151c-22 1-38-13-38-31 22-5 42 6 38 31Z" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-backdrop" aria-hidden="true">
        <span className="hero-blob hero-blob-a" />
        <span className="hero-blob hero-blob-b" />
        <BotanicalAccent />
      </div>

      <div className="hero-grid">
        <div className="hero-content">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            India&apos;s First Guided Home-Buying Platform
          </p>
          <h1 id="hero-title" className="hero-title">
            Find a home you’ll love, <span>with the right guidance.</span>
          </h1>
          <p className="hero-description">
            Propsoch helps you make smarter decisions, avoid costly mistakes and find the
            perfect home — with expert guidance, end-to-end support and zero guesswork.
          </p>

          <div className="hero-actions">
            <a
              href={siteConfig.links.getStarted}
              className="btn btn-primary btn-lg"
              data-analytics-event="hero_get_started"
            >
              Start Guided Home Buying
              <ArrowRightIcon size={20} />
            </a>
            <a
              href={siteConfig.links.exploreServices}
              className="btn btn-secondary btn-lg"
              data-analytics-event="hero_explore_services"
            >
              Explore Our Services
            </a>
          </div>

          <ul className="hero-benefits" aria-label="Why homebuyers choose Propsoch">
            {benefits.map((benefit) => (
              <li key={benefit.label}>
                <span className="hero-benefit-icon">{benefit.icon}</span>
                <span>{benefit.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <span className="hero-ring" aria-hidden="true" />
          <div className="hero-photo-frame">
            <Image
              src={heroImage}
              alt="Indian couple relaxing together in their sunlit city apartment"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="hero-photo"
              placeholder="blur"
              preload
              fetchPriority="high"
            />
          </div>

          <p className="hero-note" aria-hidden="true">
            Better decisions.
            <br />
            Brighter tomorrows.
          </p>

          <a
            href="#how-it-works"
            className="hero-journey-card glass"
            data-analytics-event="hero_journey_card"
          >
            <span className="hero-journey-icon">
              <HomeIcon />
            </span>
            <span className="hero-journey-text">
              <strong>Your home in 25 days</strong>
              <span>Expert support from start to keys — see how it works</span>
            </span>
            <span className="hero-journey-arrow">
              <ArrowUpRightIcon size={18} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
