# SheRise AI — Product Requirements Document

## 1. Product Overview

SheRise AI is a React learning application for women entrepreneurs. It offers a short business assessment, recommends skill areas, and provides structured lessons in Digital Marketing, Business Strategy, and Financial Skills. Learners can track lesson completion locally and ask a lesson-aware assistant for help.

## 2. Problem Statement

Entrepreneurs may need practical guidance across business skills, but may not know which topic to focus on or what to do next. SheRise AI provides a simple assessment-to-learning flow with concise lessons, examples, action tasks, and visible progress. This is the product intent reflected in the application; no user research or impact data is included in the repository.

## 3. Target Users

Women entrepreneurs, including people developing a business idea, starting a business, serving customers, or growing an existing business. The lessons are written for beginner-friendly self-paced learning.

## 4. Product Goals

- Help learners identify useful business skill areas from their goals and current stage.
- Offer a clear path from recommendations to modules and lessons.
- Encourage practical application through lesson examples and action tasks.
- Preserve assessment answers, active module, and lesson completion in the browser.
- Provide contextual, lesson-aware assistance in the lesson experience.

## 5. Core User Journey

Landing Page → Assessment → Assessment Results → Learning Journey → Module → Lesson → AI Learning Assistant → Lesson Completion → Progress Tracking

## 6. Core Features

- Landing page describing the product and learning flow.
- Five-question assessment with answer selection, previous/next controls, and progress display.
- Results page with three skill recommendations calculated from assessment answers.
- Learning journey with three modules, recommendations, and per-module progress.
- Four structured lessons per module, with examples, action tasks, and lesson completion.
- Dashboard for overall progress, active module, recommendations, and completed lesson activity.
- Contextual AI assistant UI with quick actions, quiz-style interaction, and custom questions. Responses currently come from local mock logic, not an external AI service.
- Local browser persistence for completed assessment answers, active module, and completed lesson indexes.
- Responsive layouts and a mobile navigation menu in the source implementation.

## 7. User Stories

- As a learner, I want to answer questions about my business so that I can see suggested skill areas.
- As a learner, I want to browse modules and lessons so that I can choose a useful next topic.
- As a learner, I want to mark a lesson complete so that my progress is reflected in the app.
- As a learner, I want to ask for an explanation or example tied to the current lesson so that I can apply its ideas.
- As a returning learner, I want my progress saved in this browser so that I can continue on the same device.

## 8. Functional Requirements

- The assessment must require five non-empty answers before showing the results route.
- Recommendations must be calculated from assessment answers and limited to three skill areas.
- Learners must be able to open modules and lessons from the learning journey and dashboard.
- Lesson completion must update module and overall progress.
- The assistant must receive context for the displayed lesson and support its quick actions and custom prompt input.
- Assessment answers and learning progress must be read and written using browser `localStorage`, with graceful handling if storage is unavailable.
- Unknown paths must show a not-found page.

## 9. Non-Functional Requirements

- **Responsiveness:** layouts use Tailwind responsive utilities and CSS media queries; real-device and cross-browser coverage is not configured in the repository.
- **Usability:** provide clear progression, readable lesson content, and touch-sized primary interactions.
- **Maintainability:** keep route pages, shared UI, lesson data, assistant logic, and persistence helpers in their existing folders.
- **Accessibility:** preserve semantic landmarks, labels, focus indicators, progress semantics, and reduced-motion handling.
- **Performance:** use the Vite production build and avoid unnecessary application-wide state infrastructure for this small client-side app.

## 10. Future Scope

These capabilities are not implemented in the current repository:

- Secure server-side integration with a real AI provider.
- User accounts and cross-device synchronization backed by a server/database.
- Advanced learning analytics, pitch evaluation, multilingual content, or certificates.
- Automated browser and end-to-end test coverage.
