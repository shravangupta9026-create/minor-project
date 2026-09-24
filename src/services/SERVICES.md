# Services

## `aiService.js`

- **Export:** `askAI({ message, lessonContext, conversation = [], isQuizAnswer = false })`.
- **Purpose:** provide a lesson-aware response for the assistant UI.
- **Current implementation:** local keyword matching against lesson section text, plus dedicated explanation, example, quiz, quiz evaluation, next-step, and general response paths. It waits 350 ms to simulate a response delay.
- **External APIs:** none. The function does not perform a network request or call an AI provider.
- **Errors:** rejects empty prompts or missing context; the UI catches errors and displays a fallback response.

Internal helpers are not exported. Keep the `lessonContext` shape aligned with `Lesson.jsx` and `AiLearningAssistant.jsx` if this service changes.
