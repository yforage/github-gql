import { decrementPage, incrementPage, setPage } from "@/store/slices/reposSearchSlice";
import { RootState, useAppDispatch } from "@/store/store";
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const Pagination: React.FC = () => {
  const [, setSearchParams] = useSearchParams();

  const { page, pagesCount } = useSelector((state: RootState) => state.reposSearch);

  const dispatch = useAppDispatch();

  const pages = useMemo(() => [...Array(Math.max(pagesCount - 2, 0)).fill(null).map((_, index) => index + 2)], [pagesCount]);

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

  const handleFastInc = () => {
    dispatch(setPage(page + 3));
    setSearchParams((params) => {
      const current = params.get('page');
      if (!current) return params;
      params.set('page', `${page + 3}`);
      return params;
    })
  }

  const handleFastDec = () => {
    dispatch(setPage(page - 3));
    setSearchParams((params) => {
      const current = params.get('page');
      if (!current) return params;
      params.set('page', `${page - 3}`);
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
      <button
          key={0}
          type="button"
          className={`w-8 h-8 rounded-lg transition-colors ${1 === page ? 'text-stone-400 border border-stone-400' : 'hover:bg-stone-100'}`}
          onClick={selectPage}
          value={1}
        >
          1
      </button>
      {pagesCount > 5 && page > 3 && (
        <button
          type="button"
          className={`w-8 h-8 rounded-lg hover:bg-stone-100 disabled:bg-transparent disabled:text-stone-400 flex justify-center items-center transition-colors`}
          onClick={handleFastDec}
        >
          <EllipsisHorizontalIcon className={`h-4`} />
        </button>
      )}
      {pages.slice(...(pagesCount > 5 ? page < 4 && [0, 4] || page > 7 && [4, 8] || [page - 3, page] : [])).map((num) => (
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
      {pagesCount > 5 && page < 8 && (
        <button
          type="button"
          className={`w-8 h-8 rounded-lg hover:bg-stone-100 disabled:bg-transparent disabled:text-stone-400 flex justify-center items-center transition-colors`}
          onClick={handleFastInc}
        >
          <EllipsisHorizontalIcon className={`h-4`} />
        </button>
      )}
      {pagesCount !== 1 && (
        <button
          key={pagesCount}
          type="button"
          className={`w-8 h-8 rounded-lg transition-colors ${pagesCount === page ? 'text-stone-400 border border-stone-400' : 'hover:bg-stone-100'}`}
          onClick={selectPage}
          value={pagesCount}
        >
          {pagesCount}
        </button>
      )}
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