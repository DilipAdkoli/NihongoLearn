export function matchesTypedAnswer(
  input: string,
  accepted: readonly string[],
  normalize: (text: string) => string = (text) => text.normalize("NFKC").trim(),
) {
  const normalized = normalize(input);
  return (
    normalized.length > 0 &&
    accepted.some((answer) => normalize(answer) === normalized)
  );
}
