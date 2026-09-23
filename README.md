# Propsoch Landing Page — Website Analysis & Improvement Assignment

**Part 1 — Analysis**

| | |
|---|---|
| **Website** | [Propsoch](https://www.propsoch.com/) |
| **Assignment** | Analyze the existing landing page and identify opportunities for an improved version |
| **Scope** | Desktop + Mobile |
| **Date** | 22 September 2026 |

> This document focuses on the analysis required before building the improved landing page.

---

## 1. Task Understanding

The objective is to review the current Propsoch landing page, identify the main UX/UI and technical issues, and translate those observations into practical improvements that can guide the design and development of an improved version.

The analysis covers the two required parts of the brief:

- Current Lighthouse scores: Performance, Accessibility, Best Practices and SEO.
- Five UX/UI issues covering visual design, spacing, mobile experience, performance and accessibility.
- A practical, developer-actionable fix for each issue.

---

## 2. Current Lighthouse Results

Taken from the supplied desktop and mobile reports. The mobile report exposes performance metrics but not the four category scores, so those are left blank rather than estimated.

| Lighthouse Category | Desktop | Mobile | Comment |
|---|---|---|---|
| Performance | 77 | N/A | Mobile metrics show a significant performance opportunity |
| Accessibility | 80 | N/A | Manual keyboard testing also identified focus-order issues |
| Best Practices | 100 | N/A | Desktop report records 100 |
| SEO | 83 | N/A | Desktop report identifies metadata and image-alt issues |

### 2.1 Lighthouse Performance Metrics

| Metric | Mobile | Desktop |
|---|---|---|
| First Contentful Paint | 1.5s | 0.4s |
| Largest Contentful Paint | 6.1s | 1.4s |
| Total Blocking Time | 1,320ms | 380ms |
| Cumulative Layout Shift | 0.001 | 0 |
| Speed Index | 5.0s | 1.7s |

Additional findings:
- Mobile: ~230ms saving opportunity from render-blocking requests.
- Desktop: ~350 KiB cache-lifetime savings, ~117 KiB image-delivery savings, ~48.3 KiB render-blocking first-party CSS, ~60 KiB legacy-JavaScript savings.

---

## 3. UX/UI Issues Observed

Five issues, each with the observation, why it matters, and a practical fix.

### 1. Mobile performance and loading experience
- **Observation:** Mobile is substantially slower than desktop (6.1s LCP, 1,320ms TBT, 5.0s Speed Index). The intro/animation makes the wait more noticeable.
- **Why it matters:** Users may wait too long before the page feels ready and interactive, especially on slower connections.
- **Fix:**
  - Optimise the hero and above-the-fold content first.
  - Defer non-critical JavaScript and third-party scripts.
  - Reduce render-blocking CSS.
  - Serve correctly sized mobile images in modern formats.
  - Don't make the intro animation a dependency for accessing main content.
- **Dev note:** Validate with the same mobile Lighthouse conditions; compare LCP/TBT before and after.

### 2. Intro animation transitions abruptly into the landing page
- **Observation:** The "Brok Mat Kar" intro is visually distinctive, but its transition into the main page feels abrupt rather than a continuous hero experience.
- **Why it matters:** First impression can feel disconnected; the transition increases perceived waiting time.
- **Fix:**
  - Build a short, controlled transition from intro into hero.
  - Prepare hero content underneath the transition where practical.
  - Keep the animation short; don't delay access to primary content.
  - Add a skip option if the animation remains long.
- **Dev note:** Landing-page content should remain accessible even if animation is reduced or disabled.

### 3. Header actions and CTA labels are not always self-explanatory
- **Observation:** The Heart icon doesn't clearly communicate its purpose. Share combines Copy and WhatsApp. "Get Started" suggests onboarding, but leads to a WhatsApp community.
- **Why it matters:** Users have to interpret controls and may have incorrect expectations about where a CTA leads.
- **Fix:**
  - Give icon-only controls accessible names and visible tooltips.
  - Separate "Copy link" and "Share on WhatsApp" as explicit actions.
  - Rename the primary CTA to describe its destination (e.g. "Join WhatsApp Community").
  - Keep a clear visual distinction between primary and secondary header actions.
- **Dev note:** Labels should describe the action/destination, not the implementation.

### 4. The 25-day process is not immediately discoverable
- **Observation:** The "find a home in 25 days" section places key info in horizontally contained content; users may not realize there's more to scroll.
- **Why it matters:** Users can miss part of the service explanation, reducing understanding of how Propsoch works.
- **Fix:**
  - Use a visible timeline or card sequence on desktop.
  - Prefer a vertical step-by-step layout on mobile.
  - Number stages with short, clear headings.
  - If horizontal scroll is kept, add clear arrows/pagination affordances.
- **Dev note:** The interaction should communicate that more steps exist without trial-and-error.

### 5. Keyboard focus and accessibility need refinement
- **Observation:** Tab testing showed focus reaching non-actionable content (comparison table, 25-days section, FAQ container); Heart icon focus is inconsistent. Accessibility score is 80; a testimonial/avatar image is missing alt text.
- **Why it matters:** Keyboard users hit unnecessary focus stops; icon-only controls and images may lack enough context for assistive tech.
- **Fix:**
  - Remove non-interactive containers from the tab order.
  - Keep focus order aligned with visual/logical reading order.
  - Add clear `:focus-visible` states.
  - Give icon-only buttons meaningful accessible names.
  - Add alt text to informative images; keep decorative images decorative.
  - Run a keyboard-only and screen-reader pass after implementation.
- **Dev note:** Tab should stop only on actionable controls; every focused control needs a visible focus state and accessible name.

---

## 4. Mobile vs Desktop Considerations

| Area | Mobile | Desktop |
|---|---|---|
| Performance | Prioritise LCP, TBT, image weight, third-party scripts | Focus on asset delivery, caching, render-blocking CSS, third-party code |
| Navigation | Keep primary actions easy to reach with limited screen space | Use clear hierarchy without overcrowding the header |
| 25-day process | Use vertical steps or obvious horizontal affordances | Timeline or multi-card layout can expose all steps |
| Accessibility | Ensure touch targets, focus behaviour, labels work consistently | Keyboard navigation and visible focus states are especially important |
| Hero | Avoid making animation/loading the gate to content | Use animation as enhancement without disrupting entry |

---

## 5. Supporting Findings

Not counted as primary issues (the brief asks for five), but relevant to the build:

- Desktop SEO score is 83.
- Missing meta description (desktop report).
- Missing alt attribute on a testimonial/avatar image (desktop report).
- Structured data listed as a manual validation item.
- Best Practices at 100 (desktop).
- ~230ms potential savings from render-blocking requests (mobile).
- ~350 KiB cache-lifetime savings and ~117 KiB image-delivery savings (desktop).

---

## 6. Direction for the Improved Landing Page

The improved version should retain Propsoch's visual personality while simplifying the user's main journey: **understand the value proposition → understand how the service works → build trust → take a clear next action.**

- Keep the hero visually strong, but reduce time before main content is available.
- Make primary CTAs explicit about what happens after clicking.
- Present the 25-day journey as an immediately understandable sequence.
- Make testimonial/video content easier to discover.
- Use consistent interaction patterns for dropdowns, icons, arrows, buttons.
- Design mobile as a first-class layout, not a compressed desktop layout.
- Treat accessibility and performance as implementation requirements, not post-launch polish.

---

## 7. Evidence / Screenshots

Recommended screenshots for the final submission:

- Desktop and mobile hero/intro transition.
- Mobile Lighthouse result showing LCP and TBT.
- Header showing Heart, Share, and Get Started actions.
- 25-day process section showing the horizontal-content interaction.
- Keyboard focus sequence showing non-actionable focus stops.

---

## 8. Summary

The current Propsoch landing page has a clear visual identity and strong storytelling, but the analysis shows opportunities to make the experience faster on mobile, clearer in its navigation and CTAs, easier to scan, and more accessible.

The five issues above form the basis for the improved version of the landing page — each recommendation is written as an implementation direction so design and development work can be traced back to a specific user problem.

---

*End of Part 1 — Analysis*