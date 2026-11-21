import type { VoiceCapture, VoiceClip } from "./voiceCapture.types";

export async function startVoiceCapture(
  signal: AbortSignal,
): Promise<VoiceCapture> {
  if (
    !navigator.mediaDevices?.getUserMedia ||
    typeof MediaRecorder === "undefined"
  ) {
    throw new Error("Recording requires a supported browser on a secure page.");
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const release = () => {
    for (const track of stream.getTracks()) track.stop();
  };
  try {
    if (signal.aborted) throw new Error("Recording was cancelled.");
    const recorder = new MediaRecorder(stream);
    recorder.start();
    return {
      discard() {
        release();
      },
      async stop(): Promise<VoiceClip> {
        try {
          const audio = await new Promise<Blob>((resolve, reject) => {
            recorder.addEventListener(
              "dataavailable",
              (event) => resolve(event.data),
              { once: true },
            );
            recorder.addEventListener("error", reject, { once: true });
            recorder.stop();
          });
          if (!audio.size) throw new Error("No audio was captured.");
          const uri = URL.createObjectURL(audio);
          return { uri, discard: () => URL.revokeObjectURL(uri) };
        } finally {
          release();
        }
      },
    };
  } catch (error) {
    release();
    throw error;
  }
}
