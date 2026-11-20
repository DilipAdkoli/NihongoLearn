import { useEffect, useRef, useState } from "react";
import { playClip, type ClipOptions } from "./audio";

export function useClipPlayback() {
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const playback = useRef<AbortController | null>(null);
  useEffect(() => () => playback.current?.abort(), []);

  async function play(clip: number, options?: Omit<ClipOptions, "signal">) {
    playback.current?.abort();
    const controller = new AbortController();
    playback.current = controller;
    setAudioError(false);
    setPlaying(true);
    try {
      await playClip(clip, { ...options, signal: controller.signal });
    } catch {
      if (!controller.signal.aborted) setAudioError(true);
    } finally {
      if (playback.current === controller && !controller.signal.aborted) {
        playback.current = null;
        setPlaying(false);
      }
    }
  }

  function stop() {
    playback.current?.abort();
    playback.current = null;
    setPlaying(false);
    setAudioError(false);
  }

  return { play, stop, playing, audioError };
}
