---
title: "What makes a design system agent-ready"
description: "Most design systems were built for humans reading documentation. Agents read structure instead. Here's what changes."
date: "2026-08-05"
author: "John Rodrigues"
tags: ["Design systems", "AI"]
draft: false
---

Most design systems were built on an assumption that no longer holds: that the person consuming them is a human who will read the documentation.

Agents don't read documentation. They read structure. And when the structure is ambiguous, they guess. Confidently, and at scale.

## The gap between documented and encoded

Open almost any mature design system and you'll find a page explaining when to use a primary button versus a secondary one. It's well written. It has examples. A designer reads it once, absorbs the rule, and applies it correctly for years.

An agent generating a checkout flow has no equivalent path. It sees a component named `Button` with a `variant` prop accepting `primary`, `secondary`, and `ghost`. Nothing in that signature encodes that a page should have exactly one primary action, or that `ghost` is reserved for destructive confirmations.

The rule exists. It's just stored somewhere the agent can't reach.

## Three properties that close the gap

### 1. Constraints live in types, not prose

If a rule matters, it belongs in the type signature or the component API, somewhere that fails loudly when violated. A `spacing` prop typed as `number` invites arbitrary values. Typed as `1 | 2 | 3 | 4 | 6 | 8`, it teaches the scale without anyone reading a page about it.

The test: could someone violate this rule without anything breaking? If yes, it isn't encoded. It's just documented.

### 2. Names carry intent, not appearance

`--color-gray-700` describes what a token looks like. `--color-text-secondary` describes what it's for. Only the second survives a rebrand, and only the second lets an agent pick correctly without seeing the rendered output.

This matters more than it sounds. An agent asked to style a disabled state will reach for something plausibly named. If your names describe pixels, it has to reason about visual outcomes it cannot observe. If your names describe roles, the choice is obvious.

### 3. One canonical way to do each thing

Human design systems tolerate redundancy. Three ways to build a card is a minor annoyance a team learns to navigate through convention and code review.

For an agent, three valid paths mean roughly even odds of picking the one your team abandoned two years ago. Deprecated components that still export are worse than no components at all. They're a trap that looks like a solution.

## What this is not

This isn't an argument for generating your design system with AI, or for adding an MCP server to your component library. Both can be useful. Neither addresses the underlying problem.

The work is unglamorous: tightening types, renaming tokens to describe roles, deleting the deprecated exports you've been meaning to remove. It's the same work that makes a design system good for humans. The difference is that agents have no tolerance for the gaps humans quietly route around.

A design system that agents use correctly is one where the right thing is the only thing that compiles.
