import * as helpers from "./helpers";

describe("helpers", () => {
  it("fotmatDate", () => {
    const expected = "2:16:AM | 5/1/2017";
    const testDate = new Date(2017, 4, 1, 2, 16).getTime();
    const testValue = helpers.formatDate(testDate);
    expect(testValue).toEqual(expected);
  });
});
