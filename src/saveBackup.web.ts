import type { BackupFile } from "./backup";

export async function saveBackup(backup: BackupFile) {
  const url = URL.createObjectURL(
    new Blob([backup.content], { type: backup.mimeType }),
  );
  const download = document.createElement("a");
  download.href = url;
  download.download = backup.filename;
  document.body.appendChild(download);
  try {
    download.click();
  } finally {
    download.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1_000);
  }
}
