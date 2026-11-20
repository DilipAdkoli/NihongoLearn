import { File, Paths } from "expo-file-system";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import type { BackupFile } from "./backup";

export async function saveBackup(backup: BackupFile) {
  if (!(await isAvailableAsync())) throw new Error("Sharing is unavailable.");
  const file = new File(Paths.cache, backup.filename);
  file.create({ overwrite: true });
  file.write(backup.content);
  await shareAsync(file.uri, {
    mimeType: backup.mimeType,
    dialogTitle: "Save NihongoLearn backup",
  });
}
