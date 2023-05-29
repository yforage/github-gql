import { decrementPage, incrementPage, setPage } from "@/store/slices/reposSearchSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Pagination: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  const { page, pagesCount } = useSelector((state: RootState) => state.reposSearch);

  const dispatch = useAppDispatch();

  const pages = useMemo(() => [...Array(pagesCount).fill(null).map((_, index) => index + 1)], [pagesCount]);

  const selectPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setPage(Number(e.currentTarget.value)));
    setSearchParams((params) => {
      params.set('page', e.currentTarget.value);
      return params;
    })
  }

  const handleIncrement = () => {
    dispatch(incrementPage());
    setSearchParams((params) => {
      const current = params.get('page');
      if (!current) return params;
      params.set('page', `${Number(current) + 1}`);
      return params;
    })
  }

  const handleDecrement = () => {
    dispatch(decrementPage());
    setSearchParams((params) => {
      const current = params.get('page');
      if (!current) return params;
      params.set('page', `${Number(current) - 1}`);
      return params;
    })
  }

  return (
    <div className={`flex justify-center text-lg space-x-2`}>
      <button
        type="button"
        className={`w-8 h-8 rounded-lg hover:bg-stone-100 disabled:bg-transparent disabled:text-stone-400 flex justify-center items-center transition-colors`}
        disabled={page === 1}
        onClick={handleDecrement}
      >
        <ChevronLeftIcon className={`h-4`} />
      </button>
      {pages.map((num) => (
        <button
          key={num}
          type="button"
          className={`w-8 h-8 rounded-lg transition-colors ${num === page ? 'text-stone-400 border border-stone-400' : 'hover:bg-stone-100'}`}
          onClick={selectPage}
          value={num}
        >
          {num}
        </button>
      ))}
      <button
        type="button"
        className={`w-8 h-8 rounded-lg hover:bg-stone-100 disabled:bg-transparent disabled:text-stone-400 flex justify-center items-center transition-colors`}
        disabled={page === pagesCount}
        onClick={handleIncrement}
      >
        <ChevronRightIcon className={`h-4`} />
      </button>
    </div>
  )
}

export default Pagination;