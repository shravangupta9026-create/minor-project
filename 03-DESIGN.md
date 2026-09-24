# Design System

## 1. Design Philosophy

The interface uses a polished, warm, professional learning-product style: light surfaces, violet and pink accents, deep plum hero panels, rounded cards, subtle depth, and clear learning progress. The implementation uses CSS and Tailwind utilities rather than a separate design-token package.

## 2. Color System

Values are from `src/index.css` and existing component classes.

| Role | Value or pattern |
| --- | --- |
| Brand | `#6c4bf4` |
| Dark brand | `#5635dd` |
| Accent | `#ec4899` |
| Main text / ink | `#17151f` |
| Page background | `#faf8ff` |
| Muted text | Commonly `#6b6875` and `#777282` |
| Borders | `rgba(57, 47, 91, .10)` and `rgba(83, 62, 149, .18)` |
| Surfaces | White with transparency; accent surface blends white, violet, and pink tints |
| Success | Tailwind emerald classes, such as `emerald-500`, `emerald-50`, and `emerald-700` |
| Error | Tailwind rose classes, such as `rose-50` and `rose-700` in assistant errors |

Hero, primary-button, progress, and gradient-text colors use gradients built from the brand and accent palette. The project does not define a dedicated error token.

## 3. Typography

- **Font:** Manrope from Google Fonts, with Segoe UI and system sans-serif fallbacks.
- **Body:** `1rem` default; reduced to `.95rem` at widths up to 640px.
- **Labels:** shared `.eyebrow` uses `.72rem`, bold weight, uppercase, and expanded tracking.
- **Headings:** Tailwind size utilities establish hierarchy; the home display heading uses `clamp()` through `--font-display` and scales down on small screens.
- Headings use balanced text wrapping where supported.

## 4. Spacing

Spacing primarily follows Tailwind's utility scale (`p-4`, `p-6`, `gap-4`, etc.) with larger section spacing on wide layouts. Page containers commonly use 16–24px mobile gutters and wider padding at `sm` and above. There is no separately defined spacing scale.

## 5. Border Radius

- Shared card radius token: `1.5rem` (`--radius-card`).
- Shared pill token: `999px` (`--radius-pill`).
- Components also use Tailwind radius utilities from rounded-xl through rounded-[2.5rem] for nested surfaces and hero panels.

## 6. Shadows

- `--shadow-card`: soft, broad card shadow.
- `--shadow-raised`: stronger elevation for hover/focus cards.
- `--shadow-brand`: violet shadow for primary buttons.
- Hero, assistant, and progress surfaces may add component-specific shadows.

## 7. Buttons

- **Primary:** `.primary-button`, brand gradient, pill shape, brand shadow, hover/active states, and disabled treatment.
- **Secondary:** `.secondary-button`, translucent white surface, border, and subtle hover state.
- **Ghost/tertiary:** several links use transparent text or lightly tinted backgrounds; there is no shared `.ghost-button` class.
- **Focus:** global `:focus-visible` outline uses the brand color.
- Button sizes and widths are chosen per context; many mobile assessment controls use full width.

## 8. Cards

- `.surface-card` defines a translucent white panel, border, shared radius, shadow, and backdrop blur.
- `.surface-card-hover` adds lift and stronger depth on hover/focus.
- `.accent-surface` provides a pale white/violet/pink gradient surface.
- Lesson options use `.option-card`, including a distinct `aria-pressed="true"` selected state.

## 9. Navigation

The shared `Navbar` is sticky, translucent, and centered within a max-width container. Desktop navigation links and the header CTA display from the `lg` breakpoint (1024px); below that, a button opens an inline dropdown containing route links and the CTA. Choosing a link closes the menu.

## 10. Responsive Design

Tailwind's configured default responsive aliases are used throughout: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), and `2xl` (1536px). Global CSS adds a `max-width: 640px` rule and a 641–1023px tablet range. Main grids collapse or reduce columns at these breakpoints. Browser viewport QA has not been performed in this environment.

## 11. AI Assistant UI

- Dark violet-gradient header identifies the lesson context.
- Quick-prompt chips wrap with a flex-wrap layout.
- Conversation appears in a bounded, vertically scrollable log; user and assistant messages have distinct alignment and surfaces.
- An empty state introduces the assistant; a “Thinking” message shows the loading state.
- The composer uses a flexible input and an accessible send button, with a compact icon button on small screens.
- Error messages use a rose-tinted alert surface.

## 12. Accessibility

Implemented patterns include semantic landmarks and headings, labelled navigation and inputs, accessible names on icon-only menu/send buttons, `aria-expanded`, `aria-pressed`, progressbar values, a live conversation log, visible keyboard focus, and reduced-motion CSS. The repository does not include automated accessibility checks or documented screen-reader testing.
