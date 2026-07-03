# Design Reference — Expo.dev Homepage

Reference: https://expo.dev/home
Goal: bring Human AI Studio up to the level of polish, structure, and product-led storytelling that Expo's homepage nails.

---

## 1. Why Expo's homepage works

Expo's page is a masterclass in **product-led credibility**. It doesn't sell with adjectives — it shows the product, the scale, and the community, in that order. Key moves:

- **Confident, plain-spoken hero.** "Everything you need to build apps." No jargon, one clear promise, one primary CTA ("Get started") plus a soft secondary ("Talk to our team").
- **Immediate proof.** A "Trusted in production by" logo wall of ~38 real app icons sits directly under the hero. Social proof before features.
- **Interactive feature storytelling.** The core value ("The ultimate app development experience") is shown through a **tabbed / segmented flow** — Build → Submit → Update — so one section carries three stories without three sections.
- **Services as a card grid.** "Cloud services" broken into scannable cards (Build & Hosting, Update, CI/CD Workflows, Launch, Observe), each with a title, one-line value prop, and "Learn more."
- **Big-number stats.** 7M+ weekly downloads, 100K+ active devs, 500K+ projects, 100K+ daily builds. Concrete, punchy, high-contrast.
- **Community as a testimonial wall.** A dense grid of real tweets ("80% of React Native developers choose Expo"). Volume itself is the message.
- **Trust badges.** Recommended by Meta, React Foundation Member, SOC 2 Type II, GDPR, CCPA, SSO.
- **Deep, organized footer.** Product / Resources / Solutions / Company / Legal columns + newsletter capture.

**The underlying formula:** promise → proof → how it works → what you get → scale → community → trust → convert.

---

## 2. Design language to borrow

- **Restraint + contrast.** Mostly calm surfaces, then a few high-contrast focal moments (hero headline, stat numbers, CTA).
- **Motion with purpose.** Subtle product animation and tab transitions, not decoration for its own sake. (You already have the shader + dot-matrix — that's a strength; keep it disciplined.)
- **One primary action, repeated.** Expo repeats "Get started" at top, mid, and bottom. You should repeat "Book discovery call" the same way (you already do this well).
- **Scannability.** Every section = eyebrow + short headline + 1 sentence. No walls of text.
- **Realistic specifics over vague claims.** Numbers, logos, names — not "we build great products."

---

## 3. Mapping Expo → Human AI Studio

Your current site (`src/main.jsx`) already has strong bones: hero, offerings, approach/stack, bio, testimonials, final CTA, footer. Here's how each Expo pattern maps onto what you have.

| Expo section | Your current equivalent | Recommended upgrade |
|---|---|---|
| Hero + dual CTA | `hero` + single CTA | Keep the single CTA (good for a studio). Tighten the headline into one clear promise. |
| "Trusted in production by" logo wall | Tool stack (Linear, Cursor, etc.) | Add a **client / worked-with logo wall** — this is the biggest missing proof element. Tools ≠ clients. |
| Build/Submit/Update tabs | Offerings grid (4 cards) | Consider a **tabbed "how it works"** so you can show depth per offering without more scrolling. |
| Cloud services cards | Offerings grid | Already close. Add a one-line outcome per card + a subtle "Learn more." |
| Big-number stats | Hero impact stats ($53M+, 100K+, 25+) | Strong already. Give them their **own full-width band** with more breathing room, like Expo. |
| Tweet/testimonial wall | Testimonial marquee | Move from placeholder quotes to **real named testimonials**; a dense grid reads as more credible than a marquee. |
| Trust badges | (none) | Optional: add credibility markers (notable clients, press, "ex-[company]", frameworks). |
| Deep footer | Footer (4 columns) | Already good. Consider a newsletter/Substack capture inline. |

---

## 4. Recommended section order for the studio site

1. **Hero** — one-line promise + one CTA + the work slider (keep the video cards, they're a differentiator).
2. **Proof band** — client/worked-with logos ("Trusted by teams building…").
3. **Stats band** — $53M+ funding / 100K+ users / 25+ shipped, full-width, high contrast.
4. **Offerings** — 4 cards, each with a concrete outcome line.
5. **How it works** — tabbed or stepped process (Strategy → Build → Integrate → Support).
6. **Stack** — the tools section you have (this is your "how", keep it).
7. **Testimonials** — real, named, dense grid.
8. **Bio** — work 1:1 with John.
9. **Final CTA** — book a call.
10. **Footer.**

---

## 5. My honest take

**What Expo does that you should steal:**
1. **Client proof.** This is the #1 gap. You show *tools* you use, but not *who you've worked with or what you shipped*. Expo leads with proof for a reason — for a studio, trust is the whole sale. Even 4–6 client logos or named project cards would transform credibility.
2. **Let the stats breathe.** Your $53M / 100K / 25+ numbers are buried in the hero. On Expo, scale gets a dedicated, high-contrast moment. Pull these into their own band.
3. **Tabbed depth.** Expo's Build/Submit/Update tab pattern lets them go deep without a longer page. Your "how it works" process is perfect for this.

**Where you should NOT copy Expo:**
- **Don't go dual-CTA / enterprise-y.** Expo is a platform selling self-serve + enterprise. You're a studio selling *John*. Keep the single, personal "Book discovery call" and the profile-avatar button — that human touch is your edge and Expo can't do it.
- **Don't over-populate with logos/badges.** Expo's 38-icon wall works because they have thousands of apps. For you, a *curated* handful reads as more premium than a crowded grid.
- **Keep your motion signature.** The Three.js shader + dot-matrix is more distinctive than anything on Expo's page. It's an asset — just keep it subtle so it never competes with the copy.

**One-line summary:** Expo wins on *proof and scannability*. You already have the craft and the motion; the highest-leverage move is adding **real client proof** and giving your **stats + testimonials** the space and credibility Expo gives theirs. Match their structure, keep your soul (the personal, John-led, hand-crafted feel).

---

## 6. Open questions before building

- Do we have client names/logos we're allowed to show? (Biggest unlock.)
- Are the $53M / 100K / 25+ stats final and attributable?
- Do we have 2–3 real testimonials with names + roles?
- Should "how it works" be tabbed (interactive) or stepped (scroll)? Tabbed = more Expo-like.
