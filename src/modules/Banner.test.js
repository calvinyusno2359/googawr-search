import React from "react";
import ReactDOM from "react-dom";

import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";

import Banner from "./Banner.js";

afterEach(cleanup);

it("renders Banner", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Banner />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders Banner with text", () => {
  const testText = "test";
  const { getByTestId } = render(<Banner text={testText}></Banner>);

  expect(getByTestId("Banner__text")).toHaveTextContent(testText);
});
