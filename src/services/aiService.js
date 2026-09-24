const stopWords = new Set([
  "about", "after", "also", "because", "before", "being", "business", "could", "from", "have", "into",
  "lesson", "more", "only", "other", "should", "that", "their", "there", "these", "they", "this", "through",
  "what", "when", "where", "which", "while", "with", "would", "your", "them", "then", "will", "make",
]);

function getSections(context) {
  return Array.isArray(context.sections) ? context.sections : [];
}

function findRelevantSection(message, sections) {
  if (!sections.length) return null;
  const terms = message.toLowerCase().split(/[^a-z0-9]+/).filter((word) => word.length > 3 && !stopWords.has(word));
  const ranked = sections.map((section) => {
    const text = `${section.title} ${section.content}`.toLowerCase();
    return { section, score: terms.reduce((total, term) => total + (text.includes(term) ? 1 : 0), 0) };
  }).sort((a, b) => b.score - a.score);
  return ranked[0]?.section ?? sections[0];
}

function simplify(text, maxLength = 210) {
  if (!text) return "Use the lesson's main idea to make one practical decision for your business.";
  const firstSentence = text.split(/(?<=[.!?])\s/)[0];
  return firstSentence.length > maxLength ? `${firstSentence.slice(0, maxLength - 1).trimEnd()}...` : firstSentence;
}

function makeQuiz(context, section) {
  const focus = section || { title: context.title, content: context.description || context.introduction || "Apply the lesson to your business." };
  const keywords = [...new Set(focus.content.toLowerCase().split(/[^a-z0-9]+/)
    .filter((word) => word.length > 4 && !stopWords.has(word)))].slice(0, 10);
  return {
    text: `Quick quiz about "${context.title}": Based on "${focus.title}", what is one useful action you could take, and what would it help you learn or decide? Reply with your answer.`,
    expectsQuizAnswer: true,
    quiz: {
      sectionTitle: focus.title,
      expectedIdea: focus.content,
      keywords,
    },
  };
}

function evaluateQuizAnswer(message, quiz, context) {
  const answer = message.toLowerCase();
  const matched = quiz.keywords.filter((word) => answer.includes(word)).length;
  if (matched >= 3) {
    return {
      text: `Correct. You connected your answer to "${quiz.sectionTitle}" and included the key ideas. ${quiz.expectedIdea}`,
      quizFeedback: "Correct",
    };
  }
  if (matched >= 1) {
    return {
      text: `Mostly correct. You picked up part of the idea in "${quiz.sectionTitle}". To make your answer stronger, also consider this: ${quiz.expectedIdea}`,
      quizFeedback: "Mostly correct",
    };
  }
  return {
    text: `Needs improvement, and that is okay. For "${context.title}", the key idea in "${quiz.sectionTitle}" is: ${quiz.expectedIdea} Try answering again in your own words, using one detail from your business.`,
    quizFeedback: "Needs improvement",
  };
}

function getNextAction(context) {
  const completed = Number(context.completedLessons) || 0;
  const total = Number(context.totalLessons) || 0;
  const progress = Number(context.moduleProgress) || 0;
  if (context.isLessonComplete && context.nextLessonTitle) {
    return `You have completed "${context.title}" and ${completed} of ${total} lessons in ${context.moduleName} (${progress}%). Next, open "${context.nextLessonTitle}". Before you move on, note one idea from this lesson you want to try.`;
  }
  if (context.isLessonComplete && total > 0 && completed >= total) {
    return `You have completed all ${total} lessons in ${context.moduleName}. Next, review your notes and choose one change to test in your business this week.`;
  }
  return `Your next step for "${context.title}" is: ${context.task || `Choose one idea from this lesson and try it in your business.`} When you have tried it, mark this lesson complete. You have finished ${completed} of ${total || "the"} lessons in ${context.moduleName} so far (${progress}%).`;
}

function getMockResponse(message, context, conversation, isQuizAnswer) {
  const title = context.title || "this lesson";
  const moduleName = context.moduleName || "your learning module";
  const sections = getSections(context);
  const example = context.example || `For a small business, try applying "${title}" to one real customer situation and observe what happens.`;
  const normalized = message.toLowerCase().trim();
  const previousMessage = conversation.at(-1);

  if (isQuizAnswer && previousMessage?.role === "assistant" && previousMessage.expectsQuizAnswer && previousMessage.quiz) {
    return evaluateQuizAnswer(message, previousMessage.quiz, context);
  }

  if (normalized.includes("explain this lesson simply") || normalized.includes("explain") || normalized.includes("in simple terms")) {
    const keyPoint = findRelevantSection(message, sections);
    const moduleIdea = moduleName === "Digital Marketing"
      ? "understand the people you want to reach and help"
      : moduleName === "Financial Skills"
        ? "understand your business money so you can make clearer choices"
        : "choose a clear direction and practical steps for your business";
    return {
      text: `In simple terms, "${title}" is about ${moduleIdea}. The main idea is ${keyPoint?.title.toLowerCase() || "using this skill"}: ${simplify(keyPoint?.content || context.description || context.introduction)} Example: ${example}`,
    };
  }

  if (normalized.includes("give me an example") || normalized === "example" || normalized.includes("example")) {
    return { text: `For "${title}" in ${moduleName}, try this example: ${example}${context.recommendedSkill ? ` It also supports your assessment focus, ${context.recommendedSkill}.` : ""}` };
  }

  if (normalized.includes("quiz me") || normalized.startsWith("quiz")) {
    return makeQuiz(context, sections[0]);
  }

  if (normalized.includes("what should i do next") || normalized.includes("next step") || normalized.includes("action")) {
    return { text: getNextAction(context) };
  }

  const relevant = findRelevantSection(message, sections);
  const content = relevant?.content || context.description || context.introduction || `This lesson focuses on ${title} in ${moduleName}.`;
  return {
    text: `For your question about "${title}", the most relevant part is "${relevant?.title || title}": ${content} A practical way to apply it is: ${example}${context.recommendedSkill ? ` This connects with your recommended skill, ${context.recommendedSkill}.` : ""}`,
  };
}

export async function askAI({ message, lessonContext, conversation = [], isQuizAnswer = false }) {
  const cleanMessage = typeof message === "string" ? message.trim() : "";
  if (!cleanMessage) throw new Error("Enter a question or choose a quick action first.");
  if (!lessonContext || typeof lessonContext !== "object") {
    throw new Error("Lesson context is unavailable. Refresh the lesson and try again.");
  }

  // Mock implementation until a secure server-side AI integration is available.
  await new Promise((resolve) => setTimeout(resolve, 350));
  return getMockResponse(cleanMessage, lessonContext, conversation, isQuizAnswer);
}
