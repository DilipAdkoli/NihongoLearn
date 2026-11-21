export type OfflineState =
  "local" | "loading" | "ready" | "update" | "unavailable";

export function useOfflineState(): OfflineState {
  return "local";
}

export function applyOfflineUpdate() {}
