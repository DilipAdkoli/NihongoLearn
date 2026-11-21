import { useRef, useState } from "react";
import { glossaryKey, type GlossaryEntry } from "./glossary";
import { useStudy } from "./study";

export function useWordBookmarks() {
  const { data, saveWord } = useStudy();
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const savingRef = useRef(false);
  const saved = new Set(data.savedWords);

  async function toggleWord(entry: GlossaryEntry) {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaving(true);
    setSaveFailed(false);
    const key = glossaryKey(entry);
    try {
      await saveWord(key, !saved.has(key));
    } catch {
      setSaveFailed(true);
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }

  return { saved, saving, saveFailed, toggleWord };
}
