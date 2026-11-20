import { ChoiceCourse } from "../src/ChoiceCourse";
import { conversation } from "../src/conversation";

export default function Conversation() {
  return (
    <ChoiceCourse
      title="Everyday dialogue"
      course="conversation"
      groups={conversation}
    />
  );
}
