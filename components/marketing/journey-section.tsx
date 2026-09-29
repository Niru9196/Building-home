"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { ArrowRightIcon, PhoneIcon, SparkleIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";

interface JourneyStep {
  title: string;
  description: string;
  note?: string;
}

interface JourneyStage {
  id: string;
  label: string;
  title: string;
  steps: readonly JourneyStep[];
  celebration?: string;
}

const stages: readonly JourneyStage[] = [
  {
    id: "today",
    label: "Today",
    title: "Kick-off",
    steps: [
      {
        title: "A quick free call",
        description:
          "We walk you through our services, answer any immediate questions and set the stage for what's next.",
      },
    ],
  },
  {
    id: "week-1",
    label: "Week 1",
    title: "Discovery",
    steps: [
      {
        title: "Discovery form",
        description:
          "Tell us what you are looking for so your advisor can start building a shortlist of verified projects.",
      },
      {
        title: "Longlist call",
        description:
          "The team curates 10-12 properties tailored to your preferences and walks you through them in detail.",
      },
    ],
  },
  {
    id: "week-2",
    label: "Week 2",
    title: "On the ground",
    steps: [
      {
        title: "Site visits",
        description:
          "Once we've narrowed down the final 4-5 properties, it's time to see and analyse them in person!",
      },
    ],
  },
  {
    id: "week-3",
    label: "Week 3",
    title: "Due diligence",
    steps: [
      {
        title: "Deepdiving",
        description:
          "Found the one? Get your 'Peace of Mind' report within a day — everything about the property, in one place.",
        note: "Along with loan assistance",
      },
    ],
  },
  {
    id: "last-week",
    label: "Last week",
    title: "Closure",
    steps: [
      {
        title: "Negotiation and Closure",
        description:
          "Take your time. Once you're ready, we handle the negotiation and seal the best deal for you.",
      },
    ],
    celebration: "Congratulations! You found your home sweet home.",
  },
];

const DESKTOP_QUERY = "(min-width: 1024px)";

export function JourneySection() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const stageRefs = useRef<(HTMLLIElement | null)[]>([]);

  /**
   * Scroll-linked progress.
   * - Horizontal (≥1024px): the fill advances as the timeline travels
   *   from the lower part of the viewport towards the middle.
   * - Vertical: a stage becomes active once its marker crosses 45% of
   *   the viewport height.
   */
  const update = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const viewport = window.innerHeight;

    if (window.matchMedia(DESKTOP_QUERY).matches) {
      const top = list.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, (viewport * 0.85 - top) / (viewport * 0.45)));
      setActive(Math.round(progress * (stages.length - 1)));
      return;
    }

    let next = 0;
    stageRefs.current.forEach((stage, index) => {
      if (stage && stage.getBoundingClientRect().top <= viewport * 0.45) next = index;
    });
    setActive(next);
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  const goToStage = (index: number) => {
    setActive(index);
    // Horizontal layout already shows every stage; only scroll when stacked.
    if (window.matchMedia(DESKTOP_QUERY).matches) return;
    const stage = stageRefs.current[index];
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = stage.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section className="section journey" id="how-it-works" aria-labelledby="journey-title">
      <div className="container">
        <div className="journey-intro">
          <Reveal className="section-head">
            <p className="kicker">Buying a property should not take forever</p>
            <h2 id="journey-title" className="section-title">
              Here&apos;s how you&apos;ll find a home with us in{" "}
              <em className="journey-days">25&nbsp;days</em>
            </h2>
            <p className="section-lead">
              A clear, guided sequence — from the first call to the keys. No guesswork, no
              endless site visits.
            </p>
            <div className="journey-actions">
              <a
                href={siteConfig.links.getStarted}
                className="btn btn-primary"
                data-analytics-event="journey_book_call"
              >
                <PhoneIcon size={18} />
                Book a free call
              </a>
            </div>
          </Reveal>

          <Reveal as="figure" className="journey-quote glass" delay={120}>
            <span className="journey-quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              <p>
                Their scientific and <strong>research-based approach</strong> to homebuying gave
                us a lot of comfort and solved our biggest pain point.
              </p>
            </blockquote>
            <figcaption>
              <span className="journey-avatar" aria-hidden="true">
                RS
              </span>
              <span>
                <strong>Roshik Shenoy</strong>
                <span>Partner, Human Capital @ Deloitte</span>
              </span>
            </figcaption>
          </Reveal>
        </div>

        <ol
          ref={listRef}
          className="timeline"
          aria-label="25-day homebuying timeline"
          data-testid="journey-timeline"
        >
          {stages.map((stage, index) => {
            const state = index < active ? "done" : index === active ? "current" : "upcoming";
            return (
              <li
                key={stage.id}
                ref={(element) => {
                  stageRefs.current[index] = element;
                }}
                className="stage"
                data-state={state}
                style={{ "--i": index } as CSSProperties}
                aria-labelledby={`${stage.id}-title`}
              >
                <button
                  type="button"
                  className="stage-marker"
                  aria-current={index === active ? "step" : undefined}
                  onClick={() => goToStage(index)}
                >
                  <span className="stage-dot" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="stage-label">{stage.label}</span>
                </button>

                <h3 id={`${stage.id}-title`} className="stage-title">
                  {stage.title}
                </h3>

                <div className="stage-cards">
                  {stage.steps.map((step) => (
                    <article className="step-card" key={step.title}>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                      {step.note ? <span className="step-chip">+ {step.note}</span> : null}
                    </article>
                  ))}
                  {stage.celebration ? (
                    <p className="step-celebration">
                      <SparkleIcon size={18} />
                      {stage.celebration}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>

        <Reveal className="journey-footer">
          <p>
            <strong>9 in 10</strong> Propsoch homebuyers close within 25 days.
          </p>
          <a href={siteConfig.links.exploreServices} className="journey-link">
            Explore Guided Home Buying
            <ArrowRightIcon size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
