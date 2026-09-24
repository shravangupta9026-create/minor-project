# Learning Data

## `learningModules.js`

Exports the `learningModules` object keyed by module name. Each entry contains a module description and a `lessons` array. Every lesson currently has a title, short description, and estimated time.

| Module | Lesson count |
| --- | ---: |
| Digital Marketing | 4 |
| Business Strategy | 4 |
| Financial Skills | 4 |

The richer lesson introduction, sections, examples, and action tasks are currently authored in `src/pages/Lesson.jsx` for Digital Marketing, with shared module-specific templates for the other two modules.

Assessment question copy is declared in `src/pages/Assessment.jsx`; answer validation, scoring, recommendation descriptions, and saved-answer helpers are in `src/utils/assessmentData.js`. Leadership & Communication is a valid assessment recommendation category but is not currently a learning module in this dataset.
