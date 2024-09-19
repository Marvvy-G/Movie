import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  results: [],
  error: '', 
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.query = action.payload;
    },
    setSearchResults(state, action) {
      state.results = [...state.results, ...action.payload];
    },
    resetSearchResults(state) {
      state.results = [];
    },
    setError(state, action) { 
      state.error = action.payload;
    },
  },
});

export const { setSearchQuery, setSearchResults, resetSearchResults, setError } = searchSlice.actions;

export default searchSlice.reducer;
