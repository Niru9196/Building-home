import { CountUp } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";

const companies = [
  "Amazon",
  "Google",
  "Microsoft",
  "Jupiter",
  "Deloitte",
  "Flipkart",
  "Atlassian",
  "PhonePe",
  "Navi",
] as const;

const metrics = [
  { value: 8500, suffix: "+", label: "Hours of research" },
  { value: 290, suffix: "+", label: "Builder partners" },
  { value: 2500, suffix: "+", label: "Intelligent homebuyers" },
  { value: 700, suffix: "+", label: "Projects across Bangalore" },
] as const;

function CompanyList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className="marquee-list"
      aria-hidden={hidden || undefined}
      aria-label={hidden ? undefined : "Companies our homebuyers work at"}
    >
      {companies.map((company) => (
        <li key={company} className={`wordmark wordmark-${company.toLowerCase()}`}>
          {company}
        </li>
      ))}
    </ul>
  );
}

export function TrustStrip() {
  return (
    <section className="trust" aria-labelledby="trust-title">
      <div className="container">
        <Reveal className="trust-head">
          <h2 id="trust-title" className="trust-title">
            Trusted by homebuyers from India&apos;s best teams
          </h2>
        </Reveal>
      </div>

      <div className="marquee" data-testid="trust-marquee">
        <div className="marquee-track">
          <CompanyList />
          <CompanyList hidden />
        </div>
      </div>

      <div className="container">
        <ul className="metrics" aria-label="Propsoch in numbers">
          {metrics.map((metric, index) => (
            <Reveal as="li" key={metric.label} className="metric glass" delay={index * 90}>
              <CountUp value={metric.value} suffix={metric.suffix} className="metric-value" />
              <span className="metric-label">{metric.label}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
