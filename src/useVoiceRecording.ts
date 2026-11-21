import { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { startVoiceCapture } from "./voiceCapture";
import type { VoiceCapture, VoiceClip } from "./voiceCapture.types";

export const voiceRecordingLimit = 15;

type ActiveCapture = {
  controller: AbortController;
  capture?: VoiceCapture;
  timer?: ReturnType<typeof setTimeout>;
};

export function useVoiceRecording() {
  const [phase, setPhase] = useState<
    "idle" | "requesting" | "recording" | "stopping"
  >("idle");
  const [uri, setUri] = useState<string>();
  const [error, setError] = useState("");
  const active = useRef<ActiveCapture | null>(null);
  const clip = useRef<VoiceClip | null>(null);

  const clear = useCallback(() => {
    const operation = active.current;
    active.current = null;
    if (operation) {
      operation.controller.abort();
      clearTimeout(operation.timer);
      operation.capture?.discard();
    }
    clip.current?.discard();
    clip.current = null;
  }, []);

  const reset = useCallback(() => {
    clear();
    setUri(undefined);
    setPhase("idle");
    setError("");
  }, [clear]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "background" && active.current?.capture) reset();
    });
    return () => {
      subscription.remove();
      clear();
    };
  }, [clear, reset]);

  async function stop() {
    const operation = active.current;
    const capture = operation?.capture;
    if (!operation || !capture) return;
    operation.capture = undefined;
    clearTimeout(operation.timer);
    setPhase("stopping");
    try {
      const recording = await capture.stop();
      if (active.current !== operation) {
        recording.discard();
        return;
      }
      clip.current = recording;
      setUri(recording.uri);
    } catch {
      if (active.current === operation)
        setError("The recording couldn’t be saved. Try again.");
    } finally {
      if (active.current === operation) {
        active.current = null;
        setPhase("idle");
      }
    }
  }

  async function start() {
    if (active.current) return;
    reset();
    const operation: ActiveCapture = { controller: new AbortController() };
    active.current = operation;
    setPhase("requesting");
    try {
      const capture = await startVoiceCapture(operation.controller.signal);
      if (
        active.current !== operation ||
        AppState.currentState === "background"
      ) {
        capture.discard();
        if (active.current === operation) reset();
        return;
      }
      operation.capture = capture;
      operation.timer = setTimeout(stop, voiceRecordingLimit * 1000);
      setPhase("recording");
    } catch {
      if (active.current !== operation) return;
      active.current = null;
      setPhase("idle");
      setError(
        "Microphone unavailable. Check microphone access and try again. In a browser, use localhost or an HTTPS page.",
      );
    }
  }

  return { start, stop, reset, uri, phase, error };
}
