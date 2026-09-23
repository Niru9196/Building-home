"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

type StageId = "today" | "week-1" | "week-2" | "week-3" | "last-week";

interface JourneyStep {
  title: string;
  description: string;
  note?: string;
}

interface JourneyStage {
  id: StageId;
  label: string;
  title?: string;
  steps: readonly JourneyStep[];
  celebration?: string;
}

const stages: readonly JourneyStage[] = [
  {
    id: "today",
    label: "Today",
    title: "Start Guided Home Buying today",
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
    steps: [
      {
        title: "Discovery form",
        description:
          "Tell us what you are looking for so that your advisor can start building a shortlist of verified projects.",
      },
      {
        title: "Longlist call",
        description:
          "The team curates a list of 10-12 properties tailored to your preferences and walks you through in detail.",
      },
    ],
  },
  {
    id: "week-2",
    label: "Week 2",
    steps: [
      {
        title: "Site visits",
        description:
          "Once we've narrowed down the final 4-5 properties, it's time for seeing and analysing them in person!",
      },
    ],
  },
  {
    id: "week-3",
    label: "Week 3",
    steps: [
      {
        title: "Deepdiving",
        description:
          "Found the one? Get your 'Peace of Mind' report within a day. Everything you need to know about the property, in one place.",
        note: "Along with loan assistance.",
      },
    ],
  },
  {
    id: "last-week",
    label: "Last week",
    steps: [
      {
        title: "Negotiation and Closure",
        description:
          "Take your time and once you're ready, we'll handle the negotiation and seal the best deal for you.",
      },
    ],
    celebration: "Congratulations! you found your home sweet home!",
  },
];

function StepIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7zM14 3v5h5M10 13h5M10 17h5" />
    </svg>
  );
}

export function JourneySection() {
  const [activeStage, setActiveStage] = useState<StageId>("today");
  const layoutRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<Partial<Record<StageId, HTMLElement>>>({});

  const updateActiveStage = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    if (scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 8) {
      setActiveStage("last-week");
      return;
    }

    const marker = scroller.scrollTop + scroller.clientHeight * 0.32;
    let nextStage: StageId = "today";
    for (const stage of stages) {
      const element = stageRefs.current[stage.id];
      if (element && element.offsetTop <= marker) nextStage = stage.id;
    }
    setActiveStage(nextStage);
  }, []);

  const goToStage = (id: StageId) => {
    const scroller = scrollerRef.current;
    const stage = stageRefs.current[id];
    if (!scroller || !stage) return;
    setActiveStage(id);
    scroller.scrollTo({
      top: stage.offsetTop,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const handoffWheelToTimeline = useCallback(
    (event: WheelEvent) => {
      const scroller = scrollerRef.current;
      if (!scroller || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      const maxScrollTop = scroller.scrollHeight - scroller.clientHeight;
      const movingForward = event.deltaY > 0;
      const canMoveForward = scroller.scrollTop < maxScrollTop - 1;
      const canMoveBackward = scroller.scrollTop > 1;

      if ((movingForward && !canMoveForward) || (!movingForward && !canMoveBackward)) {
        return;
      }

      event.preventDefault();
      const multiplier =
        event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scroller.clientHeight : 1;
      scroller.scrollTop = Math.min(
        maxScrollTop,
        Math.max(0, scroller.scrollTop + event.deltaY * multiplier),
      );
      updateActiveStage();
    },
    [updateActiveStage],
  );

  useEffect(() => {
    const layout = layoutRef.current;
    if (!layout) return;
    layout.addEventListener("wheel", handoffWheelToTimeline, { passive: false });
    return () => layout.removeEventListener("wheel", handoffWheelToTimeline);
  }, [handoffWheelToTimeline]);

  const activeStageIndex = stages.findIndex((stage) => stage.id === activeStage);

  return (
    <section className="journey-section" id="how-it-works" aria-labelledby="journey-title">
      <div ref={layoutRef} className="section-container journey-layout">
        <div className="journey-intro">
          <p className="section-kicker">Buying a property should not take you forever</p>
          <h2 id="journey-title">
            Here&apos;s how you will find a home with us in <strong>25 days</strong>
          </h2>
          <a href={siteConfig.links.getStarted} className="journey-cta" data-analytics-event="journey_book_appointment">
            Book An Appointment
          </a>
          <blockquote>
            <p>
              “Their scientific and <em>research-based approach</em> to homebuying gave us a lot of comfort and solved our biggest pain point.”
            </p>
            <footer><strong>Roshik Shenoy</strong><span>Partner, Human Capital @ Deloitte</span></footer>
          </blockquote>
        </div>

        <div className="journey-steps" role="region" aria-label="25-day homebuying steps">
          <div className="journey-scroll-status">
            <span className="journey-scroll-hint">
              <span aria-hidden="true">↕</span> Scroll to explore the full journey
            </span>
            <div
              className="journey-progress"
              role="progressbar"
              aria-label="Journey progress"
              aria-valuemin={1}
              aria-valuemax={stages.length}
              aria-valuenow={activeStageIndex + 1}
              aria-valuetext={`${stages[activeStageIndex].label}, step ${activeStageIndex + 1} of ${stages.length}`}
            >
              <span
                aria-hidden="true"
                style={{ transform: `scaleX(${(activeStageIndex + 1) / stages.length})` }}
              />
            </div>
          </div>
          <nav className="journey-stage-nav" aria-label="Journey stages">
            {stages.map((stage) => (
              <button
                type="button"
                key={stage.id}
                aria-label={`Go to ${stage.label}`}
                aria-current={activeStage === stage.id ? "step" : undefined}
                onClick={() => goToStage(stage.id)}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </nav>

          <div
            ref={scrollerRef}
            className="journey-scroll"
            data-testid="journey-scroll"
            data-active-stage={activeStage}
            onScroll={updateActiveStage}
            tabIndex={0}
          >
            <div className="journey-line" aria-hidden="true" />
            {stages.map((stage) => (
              <section
                className={`journey-stage${activeStage === stage.id ? " active" : ""}`}
                key={stage.id}
                ref={(element) => {
                  if (element) stageRefs.current[stage.id] = element;
                }}
                aria-labelledby={`${stage.id}-title`}
              >
                <header>
                  <span aria-hidden="true">✦</span>
                  <div>
                    <p>{stage.label}</p>
                    <h3 id={`${stage.id}-title`}>{stage.title || stage.label}</h3>
                  </div>
                </header>
                <div className="journey-cards">
                  {stage.steps.map((step) => (
                    <article key={step.title}>
                      <div className="journey-step-title"><StepIcon /><h4>{step.title}</h4></div>
                      <p>{step.description}</p>
                      {step.note ? <small>{step.note}</small> : null}
                    </article>
                  ))}
                  {stage.celebration ? <p className="journey-celebration">{stage.celebration}</p> : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
