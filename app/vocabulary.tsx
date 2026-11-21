import { Link } from "expo-router";
import { useState } from "react";
import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { createThemedStyles } from "../src/theme";
import { vocabulary } from "../src/vocabulary";

export default function Vocabulary() {
  const initialTopic = useChoiceTopic();
  return <VocabularyCourse key={initialTopic} initialTopic={initialTopic} />;
}

function VocabularyCourse({ initialTopic }: { initialTopic?: string }) {
  const s = useStyles();
  const [activeTopic, setActiveTopic] = useState(
    () =>
      vocabulary.find((group) => group.id === initialTopic)?.id ??
      vocabulary[0].id,
  );
  return (
    <ChoiceCourse
      title="Everyday vocabulary"
      course="vocabulary"
      groups={vocabulary}
      browseTopics
      initialTopic={initialTopic}
      onTopicChange={(id) => {
        if (id) setActiveTopic(id);
      }}
    >
      <Link
        href={{ pathname: "/word-listening", params: { topic: activeTopic } }}
        style={s.link}
      >
        Practice listening to these words ›
      </Link>
    </ChoiceCourse>
  );
}

const useStyles = createThemedStyles({
  link: {
    color: "#215848",
    fontFamily: "DMSansBold",
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
});
