import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import movieReducer from './movieSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    movieData: movieReducer,
  },
});

export default store;
