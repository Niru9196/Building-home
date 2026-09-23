import { ComparisonSection } from "@/components/marketing/comparison-section";
import { Hero } from "@/components/marketing/hero";
import { JourneySection } from "@/components/marketing/journey-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { siteConfig } from "@/config/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      name: siteConfig.name,
      url: `${siteConfig.siteUrl}/`,
      logo: `${siteConfig.siteUrl}/brand/propsoch-logo.svg`,
      description: siteConfig.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      name: siteConfig.name,
      url: `${siteConfig.siteUrl}/`,
      publisher: { "@id": `${siteConfig.siteUrl}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <div className="landing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <Hero />
      <ComparisonSection />
      <SiteFooter />
    </div>
  );
}
