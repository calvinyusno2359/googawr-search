import { useState, useEffect } from "react";

const useSearchApi = ({ searchTerm }) => {
  const mockEndpoint =
    "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json";
  const [queryResult, setQueryResult] = useState(null);

  useEffect(() => {
    const getQueryResult = async () => {
      fetch(mockEndpoint)
        .then((queryResultStream) => queryResultStream.json())
        .then((queryResultJson) => setQueryResult(queryResultJson));
    };

    getQueryResult();
  }, [searchTerm]);
  return { queryResult };
};

export default useSearchApi;
