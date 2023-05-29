import { configureStore } from '@reduxjs/toolkit';
import reposSearchReducer from './slices/reposSearchSlice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    reposSearch: reposSearchReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;