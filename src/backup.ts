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
