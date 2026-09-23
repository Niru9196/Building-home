"use client";

import { useId, useState } from "react";

type ComparisonType = "brokers" | "portals";

interface ComparisonRow {
  concern: string;
  propsoch: string;
  alternative: string;
}

const comparisons: Record<ComparisonType, { label: string; heading: string; rows: ComparisonRow[] }> = {
  brokers: {
    label: "Local brokers",
    heading: "Local brokers",
    rows: [
      { concern: "Sales Practices", propsoch: "Consultative, no pressure", alternative: "High pressure sales tactics" },
      { concern: "Transparency", propsoch: "Detailed pros & cons", alternative: "Only pros highlighted" },
      { concern: "Project Curation", propsoch: "Based on 20+ factors", alternative: "Not curated" },
      { concern: "Spam", propsoch: "No spam", alternative: "High spamming until closure" },
      { concern: "Post sales support", propsoch: "End-to-end support", alternative: "None" },
      { concern: "Site Visits", propsoch: "Assisted by on-ground market experts", alternative: "No market expertise" },
      { concern: "Negotiation", propsoch: "High leverage via insights", alternative: "No insights to leverage" },
      { concern: "In-Depth Reports", propsoch: "2 complimentary Peace of Mind Reports", alternative: "None" },
      { concern: "Advisor", propsoch: "Trained architects", alternative: "Local sales people" },
    ],
  },
  portals: {
    label: "Online portals",
    heading: "Online portals (Housing/99Acres/Magicbricks)",
    rows: [
      { concern: "Information Depth", propsoch: "80+ data points", alternative: "20-40 data points" },
      { concern: "Transparency", propsoch: "Detailed pros & cons", alternative: "Only pros highlighted" },
      { concern: "Data Accuracy", propsoch: "Verified by architects", alternative: "Loose verification" },
      { concern: "Service Validity", propsoch: "Till you find your home", alternative: "Based on no. of contacts" },
      { concern: "Data Sources", propsoch: "RERA, GMaps, CDP etc.", alternative: "Added by developer & broker" },
    ],
  },
};

const metrics = [
  ["8500+", "Hours of Research"],
  ["290+", "Builder Partners"],
  ["2,500+", "Intelligent Homebuyers"],
  ["700+", "Projects Across Bangalore"],
] as const;

export function ComparisonSection() {
  const [activeComparison, setActiveComparison] = useState<ComparisonType>("brokers");
  const tabPrefix = useId();
  const comparison = comparisons[activeComparison];

  return (
    <section className="comparison-section" id="difference" aria-labelledby="comparison-title">
      <div className="section-container">
        <div className="comparison-heading-row">
          <div>
            <p className="section-kicker">Independent guidance makes the difference</p>
            <h2 id="comparison-title">How are we different?</h2>
          </div>
          <div className="comparison-tabs-wrap">
            <p>Compare our services with</p>
            <div className="comparison-tabs" role="tablist" aria-label="Comparison type">
              {(Object.keys(comparisons) as ComparisonType[]).map((key) => (
                <button
                  type="button"
                  role="tab"
                  id={`${tabPrefix}-${key}-tab`}
                  aria-controls={`${tabPrefix}-panel`}
                  aria-selected={activeComparison === key}
                  tabIndex={activeComparison === key ? 0 : -1}
                  key={key}
                  onClick={() => setActiveComparison(key)}
                >
                  {comparisons[key].label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          id={`${tabPrefix}-panel`}
          role="tabpanel"
          aria-labelledby={`${tabPrefix}-${activeComparison}-tab`}
          className="comparison-panel"
        >
          <div className="comparison-table-scroll">
            <table aria-label="Propsoch service comparison">
              <thead>
                <tr>
                  <th scope="col">What you care about</th>
                  <th scope="col" className="propsoch-column">Propsoch</th>
                  <th scope="col">{comparison.heading}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.concern}>
                    <th scope="row">{row.concern}</th>
                    <td className="propsoch-column"><span aria-hidden="true">✓</span>{row.propsoch}</td>
                    <td><span className="alternative-mark" aria-hidden="true">×</span>{row.alternative}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ul className="comparison-metrics" aria-label="Propsoch trust metrics">
          {metrics.map(([value, label]) => (
            <li key={label}><p><strong>{value}</strong> {label}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
