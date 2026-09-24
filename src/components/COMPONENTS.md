# Components

Shared and reusable UI components currently live in this folder.

| Component | Responsibility and props | Usage / reuse |
| --- | --- | --- |
| `Navbar` | Shared route navigation. No props; manages its mobile menu state internally. | Rendered by the shared layout in `src/App.jsx`; reuse as the app-wide navigation. |
| `Features` | Static landing-page feature cards. No props. | Used by `Home`; reuse only where the same feature section is needed. |
| `HowItWorks` | Static three-step learning-flow section. No props. | Used by `Home`; reuse only where the same flow section is needed. |
| `AiLearningAssistant` | Lesson-context chat UI. Receives `lessonContext` with module/title, lesson text/sections, examples/tasks, recommendation and progress details. | Used by `Lesson`; keep context aligned with the response service in `src/services/aiService.js`. |

There is no shared generic card or button component; shared surface and button styles are CSS classes in `src/index.css` combined with Tailwind utilities.
