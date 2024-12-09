import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";

describe("_DATA", () => {
  it("_saveQuestion succeed", async () => {
    const epxtedValues = {
      optionOneText: "test optionOneText",
      optionTwoText: "test optionTwoText",
      author: "sarahedo",
    };
    const testValue = await _saveQuestion(epxtedValues);

    expect(testValue.optionOne.text).toEqual(epxtedValues.optionOneText);
    expect(testValue.optionTwo.text).toEqual(epxtedValues.optionTwoText);
    expect(testValue.author).toEqual(epxtedValues.author);
  }, 2000);

  it("_saveQuestion return error", async () => {
    const testValue = await _saveQuestion().catch((val) => val);
    expect(testValue).toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  }, 2000);

  it("_saveQuestionAnswer success", async () => {
    const epxtedValues = {
      authedUser: "sarahedo",
      qid: "vthrdm985a262al8qx3do",
      answer: "optionOne",
    };
    const testValue = await _saveQuestionAnswer(epxtedValues);
    expect(testValue).toEqual(true);
  }, 2000);

  it("_saveQuestionAnswer return error", async () => {
    const testValue = await _saveQuestionAnswer().catch((val) => val);
    expect(testValue).toEqual("Please provide authedUser, qid, and answer");
  });
});
