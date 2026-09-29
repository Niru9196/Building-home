"use client";

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

import { CheckIcon, CrossIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

type ComparisonType = "brokers" | "portals";

interface ComparisonRow {
  concern: string;
  propsoch: string;
  alternative: string;
}

interface Comparison {
  label: string;
  heading: string;
  short: string;
  rows: readonly ComparisonRow[];
}

const comparisons: Record<ComparisonType, Comparison> = {
  brokers: {
    label: "Local brokers",
    heading: "Local brokers",
    short: "Broker",
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
    heading: "Online portals",
    short: "Portal",
    rows: [
      { concern: "Information Depth", propsoch: "80+ data points", alternative: "20-40 data points" },
      { concern: "Transparency", propsoch: "Detailed pros & cons", alternative: "Only pros highlighted" },
      { concern: "Data Accuracy", propsoch: "Verified by architects", alternative: "Loose verification" },
      { concern: "Service Validity", propsoch: "Till you find your home", alternative: "Based on no. of contacts" },
      { concern: "Data Sources", propsoch: "RERA, GMaps, CDP etc.", alternative: "Added by developer & broker" },
    ],
  },
};

const order = Object.keys(comparisons) as ComparisonType[];

export function ComparisonSection() {
  const [active, setActive] = useState<ComparisonType>("brokers");
  const idPrefix = useId();
  const tabRefs = useRef<Partial<Record<ComparisonType, HTMLButtonElement>>>({});
  const comparison = comparisons[active];
  const activeIndex = order.indexOf(active);

  const select = (key: ComparisonType, focus = false) => {
    setActive(key);
    if (focus) tabRefs.current[key]?.focus();
  };

  // ARIA tabs pattern: arrows move + activate, Home/End jump to the ends.
  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = order.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = activeIndex === last ? 0 : activeIndex + 1;
    if (event.key === "ArrowLeft") next = activeIndex === 0 ? last : activeIndex - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(order[next], true);
  };

  return (
    <section className="section comparison" id="why-us" aria-labelledby="comparison-title">
      <div className="comparison-glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="comparison-head">
          <div className="section-head">
            <p className="kicker">Independent guidance makes the difference</p>
            <h2 id="comparison-title" className="section-title">
              How are we <em>different?</em>
            </h2>
            <p className="section-lead">
              We sit on your side of the table — not the builder&apos;s. See how that changes
              every step of buying a home.
            </p>
          </div>

          <div className="comparison-switch">
            <p id={`${idPrefix}-switch-label`}>Compare Propsoch with</p>
            <div
              className="segmented"
              role="tablist"
              aria-labelledby={`${idPrefix}-switch-label`}
              onKeyDown={onTabKeyDown}
              style={{ "--active-index": activeIndex } as CSSProperties}
            >
              <span className="segmented-thumb" aria-hidden="true" />
              {order.map((key) => (
                <button
                  type="button"
                  role="tab"
                  key={key}
                  ref={(element) => {
                    if (element) tabRefs.current[key] = element;
                  }}
                  id={`${idPrefix}-${key}-tab`}
                  aria-controls={`${idPrefix}-panel`}
                  aria-selected={active === key}
                  tabIndex={active === key ? 0 : -1}
                  onClick={() => select(key)}
                >
                  {comparisons[key].label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal
          className="comparison-panel"
          delay={120}
        >
          <div
            id={`${idPrefix}-panel`}
            role="tabpanel"
            aria-labelledby={`${idPrefix}-${active}-tab`}
          >
            <div
              className="cmp"
              role="table"
              aria-label={`Propsoch compared with ${comparison.label.toLowerCase()}`}
              aria-rowcount={comparison.rows.length + 1}
              data-testid="comparison-table"
            >
              <div className="cmp-highlight" aria-hidden="true" />

              <div role="rowgroup" className="cmp-head">
                <div role="row" className="cmp-row">
                  <span role="columnheader" className="cmp-col-label">
                    What you care about
                  </span>
                  <span role="columnheader" className="cmp-col-label is-propsoch">
                    Propsoch
                    <span className="cmp-badge">Recommended</span>
                  </span>
                  <span role="columnheader" className="cmp-col-label">
                    {comparison.heading}
                  </span>
                </div>
              </div>

              <div role="rowgroup" className="cmp-body" key={active}>
                {comparison.rows.map((row, index) => (
                  <div
                    role="row"
                    className="cmp-row"
                    key={row.concern}
                    style={{ "--i": index } as CSSProperties}
                  >
                    <span role="rowheader" className="cmp-concern">
                      {row.concern}
                    </span>
                    <span role="cell" className="cmp-cell is-propsoch">
                      <span className="cmp-mark is-yes">
                        <CheckIcon />
                      </span>
                      <span>
                        <span className="cmp-cell-label" aria-hidden="true">
                          Propsoch
                        </span>
                        {row.propsoch}
                      </span>
                    </span>
                    <span role="cell" className="cmp-cell is-alt">
                      <span className="cmp-mark is-no">
                        <CrossIcon />
                      </span>
                      <span>
                        <span className="cmp-cell-label" aria-hidden="true">
                          {comparison.short}
                        </span>
                        {row.alternative}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
