import { Link } from "expo-router";
import { useState } from "react";
import { createThemedStyles } from "../src/theme";
import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { dialogueGroups } from "../src/dialogueAudio";

export default function Conversation() {
  const initialTopic = useChoiceTopic();
  return <DialogueCourse key={initialTopic} initialTopic={initialTopic} />;
}

function DialogueCourse({ initialTopic }: { initialTopic?: string }) {
  const s = useStyles();
  const [activeTopic, setActiveTopic] = useState(
    () =>
      dialogueGroups.find((group) => group.id === initialTopic)?.id ??
      dialogueGroups[0].id,
  );
  return (
    <ChoiceCourse
      title="Everyday dialogue"
      course="conversation"
      groups={dialogueGroups}
      browseTopics
      initialTopic={initialTopic}
      onTopicChange={(id) => {
        const topic = dialogueGroups.find((group) => group.id === id);
        if (topic) setActiveTopic(topic.id);
      }}
    >
      <Link
        href={{ pathname: "/repeat-phrases", params: { topic: activeTopic } }}
        style={s.link}
      >
        Listen and repeat the model phrases ›
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
