import { router, useLocalSearchParams } from "expo-router";
import Session from "../src/Session";
import { lessons } from "../src/learning";
import { useStudy } from "../src/study";

export default function SessionRoute() {
  const params = useLocalSearchParams<{ ids?: string; review?: string }>();
  const ids =
    typeof params.ids === "string" ? params.ids.split(",") : lessons[0].ids;
  const { data, see, answer } = useStudy();
  return (
    <Session
      key={ids.join(",") + params.review}
      ids={ids}
      review={params.review === "1"}
      sound={data.sound}
      onSeen={see}
      onAttempt={answer}
      onClose={() => (router.canGoBack() ? router.back() : router.replace("/"))}
      onFinish={() => router.replace("/progress")}
    />
  );
}
