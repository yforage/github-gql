import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IRepository {
  id: string;
  name: string;
  owner: string;
  stars: number;
  lastCommitDate: string;
  link: string;
}

interface IReposSearchState {
  searchValue: string;
  page: number;
  repos: IRepository[];
  pagesCount: number;
}

const initialState: IReposSearchState = {
  searchValue: '',
  page: 1,
  repos: [],
  pagesCount: 1,
}

const reposSearchSlice = createSlice({
  name: 'reposSearch',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    incrementPage(state) {
      state.page += 1;
    },
    decrementPage (state) {
      state.page -= 1;
    },
    setRepos (state, action: PayloadAction<IRepository[]>) {
      state.repos = action.payload;
    },
    setPagesCount (state, action: PayloadAction<number>) {
      state.pagesCount = action.payload;
    }
  }
})

export const { setSearchValue, setPage, incrementPage, decrementPage, setRepos, setPagesCount } = reposSearchSlice.actions;
export default reposSearchSlice.reducer;