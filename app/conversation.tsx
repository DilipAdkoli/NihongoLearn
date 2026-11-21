import { createThemedStyles } from "../src/theme";
import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { dialogueGroups } from "../src/dialogueAudio";

export default function Conversation() {
  const s = useStyles();
  const initialTopic = useChoiceTopic();
  return (
    <ChoiceCourse
      key={initialTopic}
      title="Everyday dialogue"
      course="conversation"
      groups={dialogueGroups}
      browseTopics
      initialTopic={initialTopic}
    >
      <Link href="/repeat-phrases" style={s.link}>
        Listen and repeat the model phrases ›
      </Link>
    </ChoiceCourse>
  );
}
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

const useStyles = createThemedStyles({
  link: {
    color: "#215848",
    fontFamily: "DMSansBold",
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
});
