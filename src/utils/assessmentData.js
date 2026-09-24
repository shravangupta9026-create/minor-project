const STORAGE_KEY = "sherise-assessment-answers-v1";

const skills = {
  "Business Strategy": {
    description: "Turn your idea into a clear plan, set practical goals, and choose your next steps with confidence.",
  },
  "Digital Marketing": {
    description: "Find the right customers and build a consistent approach to promoting your business online.",
  },
  "Financial Skills": {
    description: "Get more confident with pricing, budgeting, cash flow, and everyday financial decisions.",
  },
  "Leadership & Communication": {
    description: "Strengthen how you share your vision, build relationships, and lead your business forward.",
  },
};

export function saveAssessmentAnswers(answers) {
  if (typeof window === "undefined" || !isCompleteAssessment(answers)) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // Assessment results remain available for the current navigation if storage is unavailable.
  }
}

export function isCompleteAssessment(answers) {
  return Array.isArray(answers)
    && answers.length === 5
    && answers.every((answer) => typeof answer === "string" && answer.trim().length > 0);
}

export function getAssessmentAnswers() {
  if (typeof window === "undefined") return [];
  try {
    const answers = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return isCompleteAssessment(answers) ? answers : [];
  } catch {
    return [];
  }
}

export function getAssessmentRecommendations(answers) {
  if (!Array.isArray(answers)) answers = [];
  const scores = Object.fromEntries(Object.keys(skills).map((skill) => [skill, 0]));
  const add = (skill, points = 1) => { scores[skill] += points; };

  if (answers[0] === "I have a business idea") add("Business Strategy", 2);
  if (answers[0] === "I am just starting my business") add("Business Strategy");
  if (answers[0] === "I already have customers") add("Digital Marketing");
  if (answers[0] === "I am growing an existing business") add("Financial Skills");
  if (answers[1] === "Beginner") add("Business Strategy", 2);
  if (answers[1] === "Somewhat confident") add("Business Strategy");
  if (answers[1] === "Confident") add("Leadership & Communication");
  if (answers[1] === "Very confident") add("Financial Skills");
  if (skills[answers[2]]) add(answers[2], 3);
  if (answers[3] === "Not comfortable yet") add("Digital Marketing", 2);
  if (answers[3] === "I know the basics") add("Digital Marketing");
  if (answers[3] === "Comfortable") add("Business Strategy");
  if (answers[3] === "Very comfortable") add("Financial Skills");
  if (answers[4] === "Start my business") add("Business Strategy", 2);
  if (answers[4] === "Get more customers") add("Digital Marketing", 2);
  if (answers[4] === "Grow my revenue") add("Financial Skills", 2);
  if (answers[4] === "Build my confidence") add("Leadership & Communication", 2);

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, score], index) => ({
      name,
      ...skills[name],
      priority: ["High priority", "Next focus", "Keep building"][index],
      progress: Math.max(42, 90 - index * 20 + Math.min(score, 3) * 3),
    }));
}
