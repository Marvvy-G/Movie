import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSearchResults } from '../store/searchSlice';
import Card from '../components/Card';

// Debounce function to limit the rate of API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { query, results } = useSelector((state) => state.search);
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');

  // Regex for validating movie title
  const isValidTitle = (title) => /^[a-zA-Z0-9\s]+$/.test(title);

  // Fetch data based on query and page
  const fetchData = useCallback(async () => {
    if (!query || !isValidTitle(query)) return;

    try {
      console.log(`Fetching data with query: ${query} and page: ${page}`);
      const response = await axios.get('/search/multi', {
        params: { query, page },
      });
      dispatch(setSearchResults(response.data.results));
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch results. Please try again.');
    }
  }, [query, page, dispatch]);

  // Debounced fetchData
  const debouncedFetchData = useCallback(debounce(fetchData, 300), [fetchData]);

  // Update search based on URL query
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryFromURL = searchParams.get('q');

    if (queryFromURL && isValidTitle(queryFromURL)) {
      setPage(1);  // Reset page on new search query
      dispatch(setSearchQuery(queryFromURL));  // Update Redux state
      dispatch(setSearchResults([]));  // Clear previous results
      debouncedFetchData();  // Fetch new results
    }
  }, [location.search, dispatch, debouncedFetchData]);

  // Handle infinite scroll for pagination
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch more results when the page changes
  useEffect(() => {
    if (query) {
      debouncedFetchData();  // Fetch results for the new page
    }
  }, [page, query, debouncedFetchData]);

  // Handle search input change
  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));  // Update Redux state
    if (isValidTitle(value)) {
      setError('');
    } else {
      setError('Invalid input. Please enter a valid movie title.');
    }
  };

  // Handle form submit for search
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidTitle(query)) {
      navigate(`/search?q=${query}`);
      setError('');
    } else {
      setError('Invalid search input. Please use alphanumeric characters only.');
    }
  };

  return (
    <div className="py-16">
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search movie title..."
          onChange={handleChange}
          value={query}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
      <div className="container mx-auto px-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold my-3">Search Results</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.isArray(results) && results.length > 0 ? (
            results.map((searchData) => (
              <Card data={searchData} key={searchData.id} media_type={searchData.media_type} />
            ))
          ) : (
            <div className="col-span-full text-center">No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
