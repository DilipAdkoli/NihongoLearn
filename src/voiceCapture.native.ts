import {
  AudioModule,
  RecordingPresets,
  requestRecordingPermissionsAsync,
} from "expo-audio";
import { File } from "expo-file-system";
import { Platform } from "react-native";
import type { VoiceCapture, VoiceClip } from "./voiceCapture.types";

export async function startVoiceCapture(
  signal: AbortSignal,
): Promise<VoiceCapture> {
  if (Platform.OS !== "android")
    throw new Error("Recording is available on Android and web.");
  const permission = await requestRecordingPermissionsAsync();
  if (!permission.granted) throw new Error("Microphone access is off.");
  if (signal.aborted) throw new Error("Recording was cancelled.");

  const preset = RecordingPresets.HIGH_QUALITY;
  const recorder = new AudioModule.AudioRecorder({
    extension: preset.extension,
    sampleRate: preset.sampleRate,
    numberOfChannels: 1,
    bitRate: 64000,
    ...preset.android,
  });
  let file: File | undefined;
  const discardFile = () => {
    try {
      if (file?.exists) file.delete();
    } catch {
      // A cache file can be unavailable after the system clears the cache.
    }
  };
  try {
    await recorder.prepareToRecordAsync();
    const uri = recorder.uri;
    if (!uri) throw new Error("Recording file unavailable.");
    file = new File(uri);
    if (signal.aborted) throw new Error("Recording was cancelled.");
    recorder.record();
    return {
      discard() {
        try {
          recorder.release();
        } finally {
          discardFile();
        }
      },
      async stop(): Promise<VoiceClip> {
        try {
          await recorder.stop();
          if (!file?.size) throw new Error("No audio was captured.");
          return { uri, discard: discardFile };
        } catch (error) {
          discardFile();
          throw error;
        } finally {
          recorder.release();
        }
      },
    };
  } catch (error) {
    recorder.release();
    discardFile();
    throw error;
  }
}
