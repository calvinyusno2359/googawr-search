import React from "react";
import JsxParser from "react-jsx-parser";

// taken from https://stackoverflow.com/questions/29652862/highlight-text-using-reactjs/43235785
const highlightByMatch = (text, subtext) => {
  const parts = text.split(new RegExp(`(${subtext})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === subtext.toLowerCase()
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

const highlightByOffset = (text, highlights) => {
  let rawJsxString = highlights
    .reduce((rawJsxString, { BeginOffset, EndOffset }) => {
      rawJsxString[
        BeginOffset
      ] = `<span class="ResultsPage__highlightedText">${rawJsxString[BeginOffset]}`;
      rawJsxString[EndOffset] = `${rawJsxString[EndOffset]}</span>`;
      console.log(rawJsxString);
      return rawJsxString;
    }, text.split(""))
    .join("");

  return <JsxParser jsx={rawJsxString} />;
};

export { highlightByMatch, highlightByOffset };
