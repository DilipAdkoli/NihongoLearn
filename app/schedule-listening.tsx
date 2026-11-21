import { ChoiceCourse, useChoiceTopic } from "../src/ChoiceCourse";
import { scheduleListening } from "../src/scheduleListening";

export default function ScheduleListening() {
  const topic = useChoiceTopic();
  return (
    <ChoiceCourse
      key={topic}
      title="Listen for dates and times"
      course="schedule-listening"
      groups={scheduleListening}
      browseTopics
      initialTopic={topic}
    />
  );
}
