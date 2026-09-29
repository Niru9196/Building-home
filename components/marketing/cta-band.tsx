import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

const perks = ["Trained architects as advisors", "80+ data-point reports", "Lowest-price negotiation"];

export function CtaBand() {
  return (
    <section className="cta-section" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta-band">
          <div className="cta-pattern" aria-hidden="true" />
          <div className="cta-copy">
            <p className="cta-kicker">Your biggest purchase, made intelligently</p>
            <h2 id="cta-title" className="cta-title">
              Save ~₹4.78L &amp; 3 months of your life.
            </h2>
            <ul className="cta-perks">
              {perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
          <div className="cta-actions">
            <a
              href={siteConfig.links.getStarted}
              className="btn btn-lg cta-btn-light"
              data-analytics-event="cta_book_call"
            >
              Book a free call
              <ArrowRightIcon size={20} />
            </a>
            <a
              href={siteConfig.links.community}
              className="btn btn-lg cta-btn-outline"
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="cta_whatsapp"
            >
              <WhatsAppIcon size={20} />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
