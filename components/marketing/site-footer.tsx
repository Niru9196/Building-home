import { BrandLogo } from "@/components/marketing/brand-logo";

const base = "https://www.propsoch.com";

const footerColumns = [
  {
    title: "Top Developers in Bengaluru",
    links: [
      ["Prestige Developers", `${base}/buy/property-for-sale-in-bengaluru?developers=2`],
      ["Godrej Properties", `${base}/buy/property-for-sale-in-bengaluru?developers=3`],
      ["Brigade Developers", `${base}/buy/property-for-sale-in-bengaluru?developers=10`],
      ["Sobha Developers", `${base}/buy/property-for-sale-in-bengaluru?developers=6`],
      ["Assetz Developers", `${base}/buy/property-for-sale-in-bengaluru?developers=15`],
    ],
  },
  {
    title: "Top Areas in Bengaluru",
    links: [
      ["Whitefield", `${base}/buy/property-for-sale-in-whitefield-bengaluru`],
      ["Sarjapur Road", `${base}/buy/property-for-sale-in-sarjapur-road-bengaluru`],
      ["Bellandur", `${base}/buy/property-for-sale-in-bellandur-bengaluru`],
      ["Yelahanka", `${base}/buy/property-for-sale-in-yelahanka-bengaluru`],
      ["HSR Layout", `${base}/buy/property-for-sale-in-hsr-layout-bengaluru`],
    ],
  },
  {
    title: "Top Filters",
    links: [
      ["Luxury Homes", `${base}/buy/property-for-sale-in-bengaluru?minBudget=30000000`],
      ["Properties <3Cr", `${base}/buy/property-for-sale-in-bengaluru?maxBudget=30000000`],
      ["Properties <2Cr", `${base}/buy/property-for-sale-in-bengaluru?maxBudget=20000000`],
      ["Ready To Move In", `${base}/buy/property-for-sale-in-bengaluru?possession=readyToMoveIn`],
      ["Townships", `${base}/buy/property-for-sale-in-bengaluru?projectArea=large`],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <section className="footer-company" aria-labelledby="footer-company-title">
            <div className="footer-logo"><BrandLogo /></div>
            <h2 id="footer-company-title">Thinkr Proptech Private Limited</h2>
            <p>Propsoch is the most advanced real estate research platform for homebuyers in India.</p>
            <dl>
              <div>
                <dt>Karnataka RERA Reg. No.</dt>
                <dd>
                  <a href="https://rera.karnataka.gov.in/home?language=en" target="_blank" rel="noreferrer noopener">
                    PRM/KA/RERA/1251/446/AG/220927/003103
                  </a>
                </dd>
              </div>
              <div>
                <dt>Maharashtra RERA Reg. No.</dt>
                <dd>
                  <a href="https://maharera.maharashtra.gov.in/" target="_blank" rel="noreferrer noopener">
                    A041182600110
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map(([label, href]) => (
                  <li key={label}><a href={href}>{label}</a></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© Copyright Thinkr Proptech Pvt. Ltd. 2026</p>
          <nav aria-label="Legal links">
            <a href={`${base}/meta/privacy`}>Privacy Policy</a>
            <a href={`${base}/meta/terms`}>Terms &amp; Conditions</a>
          </nav>
          <nav className="footer-socials" aria-label="Social links">
            <a href="https://www.linkedin.com/company/propsoch/" target="_blank" rel="noreferrer noopener" aria-label="Propsoch on LinkedIn">in</a>
            <a href="https://www.youtube.com/@club.propsoch" target="_blank" rel="noreferrer noopener" aria-label="Propsoch on YouTube">▶</a>
            <a href="mailto:hello@propsoch.com" aria-label="Email Propsoch">✉</a>
          </nav>
        </div>

        <p className="footer-wordmark" aria-hidden="true">Propsoch</p>
      </div>
    </footer>
  );
}
