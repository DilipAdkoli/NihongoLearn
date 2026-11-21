import { lessons, type Script } from "./learning.ts";
import {
  completeSteps,
  type LearningStep,
  type PathStudy,
} from "./learningPath.ts";

// Reuse the same lesson rows as the main Kana notebook. Adding a new row in
// learning.ts automatically makes it available in the guided script path.
function scriptSteps(script: Script): readonly LearningStep[] {
  return lessons
    .filter((lesson) => lesson.script === script)
    .map((lesson, index) => ({
      id: `${script}-${lesson.ids[0]}`,
      title: `Lesson ${index + 1}: ${lesson.title}`,
      detail: lesson.detail,
      seen: lesson.ids,
    }));
}

const hiraganaSteps = scriptSteps("hiragana");
const katakanaSteps = scriptSteps("katakana");

export function hiraganaPath(data: PathStudy) {
  return completeSteps(hiraganaSteps, data);
}

export function katakanaPath(data: PathStudy) {
  return completeSteps(katakanaSteps, data);
}
