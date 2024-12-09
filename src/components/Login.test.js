import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import reducer from "../reducers";
import middleware from "../middleware";
import { createStore } from "redux";
import "@testing-library/jest-dom";
import { forTestings } from "./Login";

const store = createStore(reducer, middleware);

describe("Login", () => {
  it("snapshot Login", () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it("error message should show if User or Password isn't filled", async () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const button = component.getByTestId("login-submit");
    fireEvent.click(button);
    const errorMessage = await component
      .findByTestId("login-error-message")
      .catch((val) => val);
    expect(errorMessage).toBeInTheDocument();
  });

  it("getErrorMessage has data", () => {
    const testValue = forTestings.getErrorMessage("test", "test");
    expect(testValue).toEqual("Incorrect User or Password, please try again.");
  });

  it("getErrorMessage doesn't have data", () => {
    const testValue = forTestings.getErrorMessage();
    expect(testValue).toEqual("Please fill in User and Password.");
  });
});
