# SheRise AI

SheRise AI is an AI-powered skill development and personalized learning platform designed to help women entrepreneurs build practical business skills. A short business assessment shapes skill recommendations and a learning path; lesson progress is saved locally, and a lesson-aware assistant offers contextual help.

## Features

- Landing page with an overview of the platform and its learning flow.
- Five-question entrepreneurship assessment with answer selection and question navigation.
- Personalized results with three skill recommendations generated from assessment answers.
- Learning journey with Digital Marketing, Business Strategy, and Financial Skills modules.
- Lesson pages with learning content, practical examples, and action tasks.
- Lesson completion and module progress tracking saved in browser `localStorage`.
- Learner dashboard showing overall progress, active module, and completed lessons.
- Lesson-aware AI Learning Assistant with quick prompts to explain simply, give an example, quiz the learner, or suggest a next step. Learners can also submit their own questions.
- Responsive React interface with shared navigation and a not-found page for unknown routes.

## Learning Flow

1. Visit the landing page and start the assessment.
2. Answer five questions about business stage, confidence, skills, and goals.
3. Review three personalized skill recommendations.
4. Open the learning journey and choose a module.
5. Open a lesson and use the AI Learning Assistant for lesson-specific help.
6. Mark lessons complete to update saved module and overall progress.

## Tech Stack

- **React 19** for the user interface.
- **Vite 8** for development and production builds.
- **React Router 7** for client-side routes and navigation state.
- **Tailwind CSS 4** and custom CSS in `src/index.css` for layout and styling.
- **Lucide React** for interface icons.
- **Browser `localStorage`** for assessment answers and learning progress.

The AI assistant currently uses contextual mock responses from a frontend service. It does not connect to an AI provider or backend API.

## Project Structure

```text
project-root/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── AiLearningAssistant.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   └── Navbar.jsx
│   ├── data/
│   │   └── learningModules.js
│   ├── pages/
│   │   ├── Assessment.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Learning.jsx
│   │   ├── Lesson.jsx
│   │   ├── Module.jsx
│   │   ├── NotFound.jsx
│   │   └── Results.jsx
│   ├── services/
│   │   └── aiService.js
│   ├── utils/
│   │   ├── assessmentData.js
│   │   └── learningProgress.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
