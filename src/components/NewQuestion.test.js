import { forTestings } from "./NewQuestion";

describe("NewQuestion", () => {
  it("getErrorMessage has data", () => {
    const testValue = forTestings.getErrorMessage("test", "test");
    expect(testValue).toEqual("");
  });

  it("getErrorMessage doesn't have data", () => {
    const testValue = forTestings.getErrorMessage();
    expect(testValue).toEqual("Please fill in First Option and Second Option.");
  });
});
