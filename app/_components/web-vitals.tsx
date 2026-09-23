"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";

import { sendAnalytics } from "@/lib/analytics-client";

export function WebVitals() {
  useReportWebVitals((metric) => {
    sendAnalytics({
      type: "web-vital",
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
    });
  });

  useEffect(() => {
    const reportInteraction = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;

      const control = event.target.closest<HTMLElement>("[data-analytics-event]");
      const name = control?.dataset.analyticsEvent;
      if (!name) return;

      sendAnalytics({
        type: "interaction",
        name,
        label: control.textContent?.trim() || undefined,
      });
    };

    document.documentElement.dataset.analyticsReady = "true";
    document.addEventListener("click", reportInteraction);
    return () => {
      delete document.documentElement.dataset.analyticsReady;
      document.removeEventListener("click", reportInteraction);
    };
  }, []);

  return null;
}
