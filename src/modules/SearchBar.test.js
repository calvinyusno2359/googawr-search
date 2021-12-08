import React, { useReducer } from "react";

import "@testing-library/jest-dom";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchBar from "./SearchBar.js";
import {
  SearchTermProvider,
  initialSearchTerm,
  reducer,
} from "./SearchTermProvider";

afterEach(cleanup);

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("<SearchBar />", () => {
  beforeEach(() =>
    render(
      <SearchTermProvider searchTerm={initialSearchTerm} reducer={reducer}>
        <SearchBar />
      </SearchTermProvider>
    )
  );

  describe("when first initialized", () => {
    it("renders SearchBar", () => {
      expect(screen.getByTestId("SearchBar"));
    });

    it("search term in SearchBar is empty string", () => {
      const emptyString = "";
      expect(screen.getByTestId("SearchBar__input")).toHaveValue(emptyString);
    });
  });

  describe("when user types into SearchBar", () => {
    it("renders input typed by user", () => {
      const inputTyped = "child";

      const backwardsInput = "dlihc"; // known issue with jest / react test library:
      // see: https://stackoverflow.com/questions/68164052/why-is-react-testing-library-jest-receiving-dom-input-backwards

      userEvent.type(screen.getByTestId("SearchBar__input"), inputTyped);
      expect(screen.getByTestId("SearchBar__input")).toHaveValue(
        backwardsInput
      );
    });

    describe("when X button is shown", () => {
      it("input length >= 1", () => {
        const oneCharacter = "c";
        userEvent.type(screen.getByTestId("SearchBar__input"), oneCharacter);
        expect(screen.getByTestId("SearchBar__clearIcon"));
      });

      it("clears input when clicked", () => {
        const oneCharacter = "c";
        const emptyString = "";
        userEvent.type(screen.getByTestId("SearchBar__input"), oneCharacter);
        userEvent.click(screen.getByTestId("SearchBar__clearIcon"));
        expect(screen.getByTestId("SearchBar__input")).toHaveValue(emptyString);
      });
    });

    describe("when MenuList is shown", () => {
      it("its input length >= 2 and it has matching text (e.g. child)", () => {
        const backwardsInput = "ihc"; // see above, it's actually "child" because that's what the mock api has for matching text
        userEvent.type(screen.getByTestId("SearchBar__input"), backwardsInput);
        expect(screen.getByTestId("SearchBar__suggestionMenu"));

        const oneCharacter = "c";
        userEvent.type(screen.getByTestId("SearchBar__input"), oneCharacter);
        expect(screen.getByTestId("SearchBar__clearIcon")).not;
      });
    });
  });
});
