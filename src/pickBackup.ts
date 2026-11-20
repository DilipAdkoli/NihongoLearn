import { getDocumentAsync } from "expo-document-picker";
import { File } from "expo-file-system";

export async function pickBackup(): Promise<string | null> {
  const result = await getDocumentAsync({
    type: ["application/json", "text/plain"],
    copyToCacheDirectory: true,
  });
  if (result.canceled) return null;
  const [asset] = result.assets;
  if (!asset.file) return new File(asset.uri).text();
  try {
    return await asset.file.text();
  } finally {
    URL.revokeObjectURL(asset.uri);
  }
}
