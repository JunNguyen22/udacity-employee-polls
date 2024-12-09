import { render } from "@testing-library/react";
import QuestionList from "./QuestionList";
import "@testing-library/jest-dom";

describe("QuestionList", () => {
  it("snapshot QuestionList", () => {
    const component = render(<QuestionList title="test" questions={[]} />);
    expect(component).toMatchSnapshot();
  });
});
