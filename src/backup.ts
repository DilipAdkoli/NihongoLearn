import type { StudyData } from "./storage.types";

export function createBackup(data: StudyData, now: Date) {
  const exportedAt = now.toISOString();
  return {
    filename: `nihongolearn-${exportedAt.slice(0, 10)}.json`,
    content: JSON.stringify(
      { schemaVersion: 1, exportedAt, study: data },
      null,
      2,
    ),
    mimeType: "application/json",
  };
}

export type BackupFile = ReturnType<typeof createBackup>;

type Progress = Pick<StudyData, "seen" | "attempts">;

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validAttempt(value: unknown): value is StudyData["attempts"][number] {
  if (!object(value)) return false;
  return (
    typeof value.id === "string" &&
    value.id.length > 0 &&
    typeof value.kanaId === "string" &&
    value.kanaId.length > 0 &&
    typeof value.answer === "string" &&
    typeof value.correct === "boolean" &&
    (value.mode === "recognition" ||
      value.mode === "listening" ||
      value.mode === "recall") &&
    typeof value.at === "number" &&
    Number.isSafeInteger(value.at) &&
    value.at >= 0 &&
    value.at <= 8_640_000_000_000_000
  );
}

export function parseBackup(content: string): Progress {
  const value: unknown = JSON.parse(content);
  if (!object(value) || value.schemaVersion !== 1 || !object(value.study)) {
    throw new Error("Unsupported NihongoLearn backup.");
  }
  const { seen, attempts } = value.study;
  if (
    !Array.isArray(seen) ||
    seen.some((entry) => typeof entry !== "string" || !entry) ||
    !Array.isArray(attempts) ||
    !attempts.every(validAttempt)
  ) {
    throw new Error("Invalid NihongoLearn progress data.");
  }
  if (new Set(attempts.map((attempt) => attempt.id)).size !== attempts.length) {
    throw new Error("Duplicate answers in NihongoLearn backup.");
  }
  return { seen: [...new Set<string>(seen)], attempts };
}
