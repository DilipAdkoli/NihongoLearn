import { ChoiceCourse } from "../src/ChoiceCourse";
import { loanwordPractice } from "../src/loanwords";

export default function LoanwordPractice() {
  return (
    <ChoiceCourse
      title="Practice katakana loanwords"
      course="loanwords"
      backHref="/loanwords"
      backLabel="‹ Back to loanword sounds"
      groups={[{ lessons: loanwordPractice }]}
    />
  );
}
