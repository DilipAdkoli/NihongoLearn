import { router, useLocalSearchParams } from "expo-router";
import Session from "../src/Session";
import { lessons } from "../src/learning";
import { useStudy } from "../src/study";

export default function SessionRoute() {
  const params = useLocalSearchParams<{
    ids?: string;
    mode?: string;
    review?: string;
    listening?: string;
  }>();
  const ids =
    typeof params.ids === "string" ? params.ids.split(",") : lessons[0].ids;
  const mode =
    params.mode === "contrast" || params.mode === "placement"
      ? params.mode
      : params.mode === "listening" || params.listening === "1"
        ? "listening"
        : params.mode === "review" || params.review === "1"
          ? "review"
          : "study";
  const { data, see, answer } = useStudy();
  return (
    <Session
      key={JSON.stringify([ids, mode])}
      ids={ids}
      mode={mode}
      sound={data.sound}
      romaji={data.romaji}
      onSeen={see}
      onAttempt={answer}
      onClose={() => (router.canGoBack() ? router.back() : router.replace("/"))}
      onRecommendedLesson={(suggested) =>
        router.replace({
          pathname: "/session",
          params: { ids: suggested.join(","), mode: "study" },
        })
      }
      onFinish={() => router.replace("/progress")}
    />
  );
}
