# Project Rules & Design Constraints (EasyWindmill)

This document specifies mandatory design, architectural, and content rules for EasyWindmill. All current and future development must strictly adhere to these instructions.

## 1. Visual & UI Constraints (Strict Anti "Vibe-Coding")
- **NEVER use purple gradients**: Do not use purple, violet, magenta, or lavender gradients or accent fills. Stick to technical mountain slate, deep navy, industrial steel, and clean cyan/sky accents.
- **NO pill-shaped buttons**: Never use `border-radius: 999px` or oval pill buttons. Use crisp, professional industrial radii (`4px` to `8px`) with rectangular geometry standard in engineering and CAD interfaces.
- **NO excessive scroll animations**: Avoid distracting parallax, bounce effects, or continuous keyframe motion on scroll. Transitions must be fast, subtle, and functional.
- **NO emoji icons**: Never use emojis (e.g. ✨, 💡, 🔍, 🌱, ⚡, ★) in UI buttons, headings, badges, or labels. Use clean inline SVGs or concise text labels.
- **NO em dashes (`—`) or en dashes (`–`)**: Do not use em dashes or en dashes in titles, copy, specs, or metadata. Use standard hyphens `-`, colons, commas, or parentheses instead.

## 2. Content & Trust Integrity
- **NO fake reviews or fake metrics**: Never display fake star ratings (★★★★★), fake review counts, fake customer counters, or artificial social proof.
- **NO vague hero text**: Avoid generic buzzwords or hollow marketing slogans. Headlines and text must be precise, grounded, and technically accurate regarding wind energy conversion and turbine mechanics.
- **NO AI slop photos**: Do not use AI-generated stock photos with hallucinated artifacts, warped blades, or nonsensical manufacturer logos. Use authentic CAD renders, real photographic footage, or clean vector blueprint schematics.
- **Remove all "Made with AI" tags**: The platform must not include any "Made with AI", "AI Generated", or similar tags anywhere on the user-facing interface.

## 3. Compliance & Legal Requirements
- **Privacy Policy and Terms & Conditions**: The application must include complete, accessible Privacy Policy and Terms & Conditions pages accessible from navigation and footer.

## 4. Engineering Standards
- **Zero mistakes**: Ensure all components compile without warnings, responsive layouts work flawlessly across mobile and desktop, and all data reflects authentic mechanical engineering.
