import { useEffect, useMemo, useState } from "react";
import { kana } from "./learning";
import { reviewQueue } from "./review";
import type { StudyData } from "./storage.types";

const kanaIds = kana.map((item) => item.id);
export const REVIEW_BATCH_SIZE = 10;

export function useReviewQueue(data: StudyData) {
  const [clock, setClock] = useState(Date.now);
  useEffect(() => {
    const timer = setInterval(() => setClock(Date.now()), 30_000);
    return () => clearInterval(timer);
  }, []);
  return useMemo(() => {
    const now = Math.max(clock, Date.now());
    const queue = reviewQueue(data, kanaIds, now);
    return { queue, due: queue.filter((card) => card.dueAt <= now), now };
  }, [data, clock]);
}
