# Project Rules

These rules describe the existing React/Vite project and guide future changes.

## Code Rules

- Use React functional components and keep each component focused on its UI or responsibility.
- Reuse shared components and helpers where that reduces real duplication.
- Keep naming aligned with the existing PascalCase component and camelCase function/file conventions.
- Remove unused imports and avoid unnecessary abstractions or dependencies.
- Do not introduce a backend, API, or product behavior without updating the relevant documentation.

## React Rules

- Use hooks for component-local state and lifecycle needs.
- Keep state near the component that owns it; pass route data explicitly where appropriate.
- Do not mutate React state directly.
- Avoid effects when derived values or event handlers are sufficient; clean up event listeners.

## Styling Rules

- Follow the existing SheRise palette, shared CSS classes, and Tailwind utility patterns.
- Prefer existing CSS variables and utility tokens over arbitrary new colors or duplicate styles.
- Preserve responsive layouts, keyboard focus visibility, and reduced-motion support.
- Use inline styles only for genuinely dynamic values such as progress-ring gradients and percentages.
- Keep global rules in `src/index.css`; avoid conflicting one-off breakpoint overrides.

## File Rules

- Route screens belong in `src/pages/` and route registration belongs in `src/App.jsx`.
- Shared UI belongs in `src/components/`.
- Static learning content belongs in `src/data/`.
- Assistant response behavior belongs in `src/services/`.
- Assessment scoring and browser progress persistence belong in `src/utils/`.
- Static public assets belong in `public/`.

## Git Rules

Use clear conventional-style commit subjects, for example `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, and `chore:`. Review generated files before including them in a change.

## Documentation Rules

- Update README when the project setup, core user flow, or top-level feature summary changes.
- Update the specific architecture, design, service, page, or data guide when its implementation changes materially.
- Keep `05-TASK.md` aligned with verified implementation and validation status.
- Do not document planned work as shipped functionality.

## Safety and Repository Hygiene

- Never commit `.env` files, credentials, API keys, tokens, or passwords.
- Do not commit `node_modules/` or generated `dist/` output unless the project explicitly adopts that workflow.
- Do not put secrets in browser code. A future AI provider integration must keep credentials server-side.
- The root `.gitignore` excludes `node_modules/`, `dist/`, and `*.local`, but does not explicitly ignore every `.env` file. Review/add environment-file patterns before introducing secrets.
