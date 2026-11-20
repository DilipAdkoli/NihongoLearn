import { ChoiceCourse } from "../src/ChoiceCourse";
import { prices } from "../src/prices";

export default function Prices() {
  return (
    <ChoiceCourse
      title="Read prices in yen"
      description="百 is 100, 千 is 1,000, 万 is 10,000, and 円 (えん) means yen. Watch for changes in readings such as 三百 (さんびゃく), 六百 (ろっぴゃく), 八百 (はっぴゃく), 三千 (さんぜん), and 八千 (はっせん)."
      course="prices"
      groups={prices}
      browseTopics
    />
  );
}
