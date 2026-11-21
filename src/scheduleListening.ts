import type { ChoiceLesson, CourseGroup } from "./ChoiceCourse";
import { datePractice } from "./calendar";
import { timePractice } from "./time";

const dateClips = new Map<string, number>([
  ["4-1", require("../assets/audio/schedule-date-4-1.mp3")],
  ["7-4", require("../assets/audio/schedule-date-7-4.mp3")],
  ["9-20", require("../assets/audio/schedule-date-9-20.mp3")],
  ["2-14", require("../assets/audio/schedule-date-2-14.mp3")],
  ["10-24", require("../assets/audio/schedule-date-10-24.mp3")],
]);

const timeClips = new Map<string, number>([
  ["4-0", require("../assets/audio/schedule-time-4-0.mp3")],
  ["7-15", require("../assets/audio/schedule-time-7-15.mp3")],
  ["9-6", require("../assets/audio/schedule-time-9-6.mp3")],
  ["10-8", require("../assets/audio/schedule-time-10-8.mp3")],
  ["12-30", require("../assets/audio/schedule-time-12-30.mp3")],
]);

function listeningQuestions(
  kind: "date" | "time",
  examples: readonly ChoiceLesson[],
  clips: ReadonlyMap<string, number>,
) {
  return examples
    .filter(({ id }) => clips.has(id))
    .map((lesson, index) => ({
      ...lesson,
      id: `${kind}-${lesson.id}`,
      title: `${kind === "date" ? "Date" : "Time"} ${index + 1}`,
      prompt: `Which ${kind} do you hear?`,
      promptAudio: clips.get(lesson.id),
    }));
}

export const scheduleListening: readonly CourseGroup[] = [
  {
    id: "dates",
    title: "Calendar dates",
    lessons: listeningQuestions("date", datePractice, dateClips),
  },
  {
    id: "times",
    title: "Clock times",
    lessons: listeningQuestions("time", timePractice, timeClips),
  },
];
