import { ChoiceCourse } from "../src/ChoiceCourse";
import { conversation } from "../src/conversation";

type ResponseId = (typeof conversation)[number]["lessons"][number]["id"];

const responseAudio: Record<ResponseId, number> = {
  greeting: require("../assets/audio/dialogue-greeting.mp3"),
  "introduce-yourself": require("../assets/audio/dialogue-introduce-yourself.mp3"),
  "order-tea": require("../assets/audio/dialogue-order-tea.mp3"),
  "thank-server": require("../assets/audio/dialogue-thank-server.mp3"),
  "find-station": require("../assets/audio/dialogue-find-station.mp3"),
  "ask-train-destination": require("../assets/audio/dialogue-train-destination.mp3"),
  "buy-one-ticket": require("../assets/audio/dialogue-one-ticket.mp3"),
};

const dialogueGroups = conversation.map((group) => ({
  ...group,
  lessons: group.lessons.map((lesson) => ({
    ...lesson,
    answerAudio: responseAudio[lesson.id],
  })),
}));

export default function Conversation() {
  return (
    <ChoiceCourse
      title="Everyday dialogue"
      course="conversation"
      groups={dialogueGroups}
    />
  );
}
