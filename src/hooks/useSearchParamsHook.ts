import { useSearchParams } from "react-router-dom";

type SearchParams = {
  "step-no"?: string;
};

export const useSearchParamsHook = (value?: SearchParams) => {
  const [searchParams, setSearchParams] = useSearchParams(value);
  const updateSearchQuery = (value: SearchParams) => {
    const query = Object.fromEntries(new URLSearchParams(searchParams));
    setSearchParams({
      ...query,
      ...value,
    });
  };
  const query: SearchParams = Object.fromEntries(searchParams);

  return { query, updateSearchQuery };
};

export default useSearchParams;
