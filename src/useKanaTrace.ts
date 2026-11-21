import { useMemo, useRef, useState } from "react";
import { PanResponder, type GestureResponderEvent } from "react-native";

export const kanaDiagramSize = 216;
const viewBoxSize = 109;

function point({ nativeEvent }: GestureResponderEvent) {
  const scale = viewBoxSize / kanaDiagramSize;
  return {
    x: Math.min(viewBoxSize, Math.max(0, nativeEvent.locationX * scale)),
    y: Math.min(viewBoxSize, Math.max(0, nativeEvent.locationY * scale)),
  };
}

export function useKanaTrace() {
  const [strokes, setStrokes] = useState<string[]>([]);
  const [draft, setDraft] = useState("");
  const active = useRef<{ x: number; y: number; path: string } | null>(null);

  const { panHandlers } = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (event) =>
          event.nativeEvent.touches.length === 1,
        onPanResponderGrant(event) {
          const { x, y } = point(event);
          const path = `M${x.toFixed(1)},${y.toFixed(1)}l0.1,0`;
          active.current = { x, y, path };
          setDraft(path);
        },
        onPanResponderMove(event) {
          const previous = active.current;
          if (!previous) return;
          if (event.nativeEvent.touches.length !== 1) {
            active.current = null;
            setDraft("");
            return;
          }
          const { x, y } = point(event);
          if (Math.hypot(x - previous.x, y - previous.y) < 0.7) return;
          const path = `${previous.path}L${x.toFixed(1)},${y.toFixed(1)}`;
          active.current = { x, y, path };
          setDraft(path);
        },
        onPanResponderRelease() {
          const finished = active.current?.path;
          active.current = null;
          setDraft("");
          if (finished) setStrokes((past) => [...past, finished]);
        },
        onPanResponderTerminate() {
          active.current = null;
          setDraft("");
        },
        onPanResponderTerminationRequest: () => false,
      }),
    [],
  );

  function clear() {
    active.current = null;
    setDraft("");
    setStrokes([]);
  }

  function undo() {
    setStrokes((past) => past.slice(0, -1));
  }

  return { panHandlers, strokes, draft, clear, undo };
}
