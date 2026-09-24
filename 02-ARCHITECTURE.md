# Architecture

## 1. Architecture Overview

SheRise AI is a client-rendered React single-page application. `src/main.jsx` mounts `App` in React Strict Mode and loads the global stylesheet. `App.jsx` defines the browser routes and shared navigation layout. Route pages use local React state and small utility modules for recommendation and progress logic. Learning content is a JavaScript data object. The assistant is a local contextual response service.

## 2. Technology Stack

Verified in `package.json`:

| Technology | Use |
| --- | --- |
| React 19 / React DOM | UI and rendering |
| Vite 8 | Development server and production build |
| React Router 7 | Client-side routing |
| Tailwind CSS 4 with `@tailwindcss/vite` | Utility styling |
| Custom CSS | Shared visual tokens, surfaces, motion, and responsive rules |
| Lucide React | Interface icons |
| ESLint 10 | JavaScript/JSX linting |

Manrope is loaded from Google Fonts by a CSS `@import`, with system font fallbacks.

## 3. Application Structure

```text
project-root/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # Shared navigation, home sections, lesson assistant
│   ├── data/             # Learning module and lesson content
│   ├── pages/            # Route-level screens
│   ├── services/         # Local assistant response logic
│   ├── utils/            # Assessment and progress logic/persistence
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── .gitignore
├── README.md
├── 01-PRD.md
├── 02-ARCHITECTURE.md
├── 03-DESIGN.md
├── 04-RULES.md
├── 05-TASK.md
└── 06-MEMORY.md
```

Folder-specific guides are kept with their corresponding source folders: `src/components/COMPONENTS.md`, `src/pages/PAGES.md`, `src/services/SERVICES.md`, and `src/data/DATA.md`.

## 4. Routing Architecture

`src/App.jsx` uses `BrowserRouter`, `Routes`, and `Route`. All routes render inside a shared `AppLayout` containing `Navbar` and `Outlet`.

| Route | Page |
| --- | --- |
| `/` | `Home` |
| `/assessment` | `Assessment` |
| `/results` | `Results` |
| `/learning` | `Learning` |
| `/dashboard` | `Dashboard` |
| `/learning/module` | `Module` |
| `/learning/lesson` | `Lesson` |
| `*` | `NotFound` |

Some transitions pass answers, module names, lesson indexes, or lesson data through React Router navigation state. Pages also use persisted browser data where a direct visit or refresh requires a fallback.

## 5. Component Architecture

- `Navbar` is shared by all routes and owns its mobile menu open/closed state.
- `Features` and `HowItWorks` render static landing-page content.
- `AiLearningAssistant` is embedded in `Lesson` and owns its conversation, prompt, loading, and error state.
- Route pages compose shared card/button styles from `src/index.css` and Tailwind utilities.

See [`src/components/COMPONENTS.md`](src/components/COMPONENTS.md) and [`src/pages/PAGES.md`](src/pages/PAGES.md).

## 6. State Management

There is no global state library. State is local to the relevant page/component or passed during navigation:

- `Assessment` stores answers and current question in React state.
- `AiLearningAssistant` stores its message history, input, loading flag, and error in React state.
- `Dashboard` derives its view model from the modules, assessment helpers, and progress helpers; it refreshes on `storage`, `focus`, and `pageshow` events.
- `Learning`, `Module`, and `Lesson` read and update active module or lesson progress through utility functions.

## 7. Data Flow

Typical assessment flow: answer selection updates `Assessment` state → the recommendation helper maps answer values to weighted skill scores → completed answers are saved → React Router sends answers to `/results` → the results UI renders the top three recommendations.

Typical lesson flow: a page reads module/lesson data → learner marks a lesson complete → `learningProgress.js` stores the lesson index → progress helpers calculate module/overall percentages → route pages render updated progress. The dashboard refreshes on browser storage, focus, and page-show events.

## 8. AI Architecture

`src/services/aiService.js` exports `askAI`. It validates the question and lesson context, waits 350 ms, then returns a locally generated response. Internal logic selects lesson sections using keyword overlap and handles explanation, example, quiz, quiz-answer evaluation, next-step, and general-question prompts. It makes no network request and does not call an AI provider.

## 9. Persistence

Both persistence helpers use `window.localStorage` and catch parse/write errors:

| Key | Stored values |
| --- | --- |
| `sherise-assessment-answers-v1` | Completed array of five assessment answer strings |
| `sherise-learning-progress-v1` | `activeModule` string or null and a `completedLessons` object mapping module names to lesson indexes |

Router navigation state can carry answers and lesson details between screens, but it is not durable storage. Assistant conversation state is component state and is not persisted.

## 10. Build & Deployment Architecture

Vite is configured with the React and Tailwind CSS plugins in `vite.config.js`. Available scripts are `npm run dev`, `npm run build`, `npm run preview`, and `npm run lint`. The production build is emitted to `dist/`. No deployment platform, server, API, or hosting configuration is present in the project files.
