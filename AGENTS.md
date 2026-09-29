# Assistant Guardrails

This repository is the source of truth for reusable ShorterLoop UI components, skins, and design-system behavior. Treat these instructions as mandatory when changing or adding UI.

## Component Ownership

- Build reusable visual primitives, app-shell pieces, assistant UI, dialogs, form controls, status indicators, cards, layout chrome, and shared interaction patterns here first.
- Export reusable Angular components/modules through `projects/ui/src/public-api.ts` so the frontend can import them from the `shorterloop` package.
- Keep product-specific orchestration, routing, data loading, permissions, and API calls in the consuming frontend app. UI components should receive data and callbacks through inputs/outputs or narrowly scoped services.
- Do not duplicate a component that already exists in the frontend. Promote or adapt the shared version in this repo, then replace the frontend declaration with a package import.
- If a component must remain app-local, document the exception in the PR description and explain why it is feature-specific.

## Design-System Discipline

- Use existing ShorterLoop tokens, CSS variables, spacing, typography, shadows, and interaction states before adding new visual values.
- Do not introduce raw hex/rgb/hsl colors, one-off font stacks, arbitrary radii, or emoji/icon substitutes in component styling.
- Prefer named inputs, stable component APIs, and Storybook stories for new reusable components.
- Keep selectors under the `shorterloop-` prefix for exported UI components.
- Avoid coupling library components to app route structure, global app stores, or product-specific copy.

## Verification

- Run `npm run build` before opening a UI package PR when dependencies are installed.
- For visual components, add or update Storybook coverage and verify the component in light/dark states when supported.
- When a companion frontend PR consumes the component, link both PRs so reviewers can see the promotion and adoption together.
