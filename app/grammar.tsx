import { ChoiceCourse } from "../src/ChoiceCourse";
import { existence } from "../src/existence";
import {
  adjectives,
  demonstratives,
  grammar,
  particles,
  teForm,
  verbs,
} from "../src/grammar";

export default function Grammar() {
  return (
    <ChoiceCourse
      title="First Japanese sentences"
      course="grammar"
      groups={[
        { title: "Statements and questions", lessons: grammar },
        { title: "Pointing to things and places", lessons: demonstratives },
        { title: "Say what’s present and where", lessons: existence },
        { title: "Objects, places, and destinations", lessons: particles },
        { title: "Polite verb forms", lessons: verbs },
        { title: "Describing things", lessons: adjectives },
        { title: "Requests with the て-form", lessons: teForm },
      ]}
    />
  );
}
