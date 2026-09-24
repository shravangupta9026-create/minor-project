# Pages

Route registration is in `src/App.jsx`. All pages share the `Navbar` through `AppLayout`.

| Page | Route | Purpose and important behavior | Main dependencies |
| --- | --- | --- | --- |
| `Home` | `/` | Product landing page, progress preview, feature and process sections, assessment/learning links. | `Features`, `HowItWorks`, `learningModules`, `learningProgress` |
| `Assessment` | `/assessment` | Five-question flow; saves completed answers and navigates to results. | `assessmentData` |
| `Results` | `/results` | Shows up to three answer-based skill recommendations; supports missing/direct navigation state using saved answers. | `assessmentData` |
| `Learning` | `/learning` | Shows overall progress, recommendations, and three module cards; starts the first lesson. | `learningModules`, `assessmentData`, `learningProgress` |
| `Dashboard` | `/dashboard` | Shows progress, next lesson/action, recommendations, modules, and activity; refreshes from browser events. | `learningModules`, `assessmentData`, `learningProgress` |
| `Module` | `/learning/module` | Shows selected/fallback module, progress, and lesson list; opens lesson routes. | `learningModules`, `learningProgress` |
| `Lesson` | `/learning/lesson` | Displays lesson content and metadata, marks completion, navigates onward, and renders the assistant. | `AiLearningAssistant`, `learningModules`, `learningProgress` |
| `NotFound` | `*` | Fallback for unmatched routes with links home and to the dashboard. | React Router `Link` |

Navigation state may carry assessment answers and lesson/module details. Module and lesson pages choose a valid fallback when that state is missing.
