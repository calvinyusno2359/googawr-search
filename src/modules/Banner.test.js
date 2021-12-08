import React from "react";

import { render, cleanup, getByAltText } from "@testing-library/react";
import "@testing-library/jest-dom";
import Banner from "./Banner.js";
import logo from "../logo.png";

afterEach(cleanup);

it("renders Banner with text", () => {
  const testText = "test";
  const { getByTestId } = render(<Banner text={testText}></Banner>);

  expect(getByTestId("Banner__text")).toHaveTextContent(testText);
});
