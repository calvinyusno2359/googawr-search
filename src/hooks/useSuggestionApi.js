import { useState, useEffect } from "react";

const useSuggestionApi = ({ searchTerm }) => {
  const mockEndpoint =
    "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json";
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const getSuggestions = async () => {
      fetch(mockEndpoint)
        .then((suggestionsStream) => suggestionsStream.json())
        .then((suggestionsJson) => {
          setSuggestions(suggestionsJson.suggestions);
        });
    };

    getSuggestions();
  }, [searchTerm]);
  return { suggestions };
};

export default useSuggestionApi;
