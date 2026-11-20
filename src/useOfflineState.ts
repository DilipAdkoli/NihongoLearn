export type OfflineState = "local" | "loading" | "ready" | "unavailable";

export function useOfflineState(): OfflineState {
  return "local";
}
