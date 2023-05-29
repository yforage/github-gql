import { setSearchValue } from "@/store/slices/reposSearchSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { debounce } from "lodash";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const { searchValue } = useSelector((state: RootState) => state.reposSearch);

  const [, setSearchParams] = useSearchParams();

  const debouncedSearchParams = useCallback(debounce(setSearchParams, 1000), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    dispatch(setSearchValue(value));

    debouncedSearchParams((params) => {
      params.set("repo", value);
      params.set("page", "1");
      return params;
    });
  };

  return (
    <input
      className={`w-full border-2 border-stone-400 rounded-lg px-3 h-10`}
      type="text"
      name="repo"
      value={searchValue}
      onChange={handleChange}
      placeholder="Search repositories"
    />
  )
}

export default Search;