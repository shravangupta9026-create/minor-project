const STORAGE_KEY = "sherise-learning-progress-v1";

function readData() {
  if (typeof window === "undefined") {
    return { activeModule: null, completedLessons: {} };
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      activeModule: typeof stored.activeModule === "string" ? stored.activeModule : null,
      completedLessons: stored.completedLessons && typeof stored.completedLessons === "object"
        ? stored.completedLessons
        : {},
    };
  } catch {
    return { activeModule: null, completedLessons: {} };
  }
}

function writeData(data) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Keep learning usable when browser storage is unavailable or full.
  }
}

export function getActiveModule() {
  return readData().activeModule;
}

export function setActiveModule(moduleName) {
  const data = readData();
  data.activeModule = moduleName;
  writeData(data);
}

export function getCompletedLessons(moduleName) {
  const lessons = readData().completedLessons[moduleName];
  return Array.isArray(lessons)
    ? [...new Set(lessons.filter((index) => Number.isInteger(index) && index >= 0))]
    : [];
}

export function markLessonComplete(moduleName, lessonIndex) {
  if (!Number.isInteger(lessonIndex) || lessonIndex < 0) return getCompletedLessons(moduleName);
  const data = readData();
  const existing = Array.isArray(data.completedLessons[moduleName])
    ? data.completedLessons[moduleName]
    : [];
  data.completedLessons[moduleName] = [...new Set([...existing, lessonIndex])];
  writeData(data);
  return data.completedLessons[moduleName];
}

export function getModuleProgress(moduleName, lessonCount) {
  if (!lessonCount) return 0;
  const completedCount = getCompletedLessons(moduleName)
    .filter((index) => index < lessonCount).length;
  return Math.round((completedCount / lessonCount) * 100);
}

export function getOverallProgress(modules) {
  const lessonCount = Object.values(modules).reduce((total, module) => total + module.lessons.length, 0);
  if (!lessonCount) return 0;
  const completedCount = Object.entries(modules).reduce((total, [moduleName, module]) => (
    total + getCompletedLessons(moduleName).filter((index) => index < module.lessons.length).length
  ), 0);
  return Math.round((completedCount / lessonCount) * 100);
}
