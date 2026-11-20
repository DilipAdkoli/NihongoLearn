import { createAudioPlayer } from "expo-audio";

const clips = new Map<string, number>([
  ["a", require("../assets/audio/a.mp3")],
  ["i", require("../assets/audio/i.mp3")],
  ["u", require("../assets/audio/u.mp3")],
  ["e", require("../assets/audio/e.mp3")],
  ["o", require("../assets/audio/o.mp3")],
  ["ka", require("../assets/audio/ka.mp3")],
  ["ki", require("../assets/audio/ki.mp3")],
  ["ku", require("../assets/audio/ku.mp3")],
  ["ke", require("../assets/audio/ke.mp3")],
  ["ko", require("../assets/audio/ko.mp3")],
]);

let stopCurrent: (() => void) | undefined;

export async function playKana(id: string): Promise<void> {
  const clip = clips.get(id);
  if (clip === undefined) throw new Error("Pronunciation unavailable.");
  stopCurrent?.();

  const player = createAudioPlayer(clip, { updateInterval: 100 });
  await new Promise<void>((resolve, reject) => {
    const subscription = player.addListener(
      "playbackStatusUpdate",
      (status) => {
        if (status.error) finish(new Error(status.error));
        else if (status.didJustFinish) finish();
      },
    );
    const timeout = setTimeout(
      () => finish(new Error("Pronunciation playback timed out.")),
      8000,
    );

    function finish(error?: Error) {
      clearTimeout(timeout);
      subscription.remove();
      stopCurrent = undefined;
      player.remove();
      if (error) reject(error);
      else resolve();
    }

    stopCurrent = () => finish();
    try {
      player.play();
    } catch (error) {
      finish(
        error instanceof Error
          ? error
          : new Error("Pronunciation unavailable."),
      );
    }
  });
}
