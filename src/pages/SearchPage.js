import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(location?.search?.slice(3).replace('%20', ' ') || '');
  const [error, setError] = useState('');

  const query = searchInput;

  // Regex for validating movie title (alphanumeric, spaces, and some special characters)
  const isValidTitle = (title) => /^[a-zA-Z0-9\s]+$/.test(title);

  const fetchData = async () => {
    try {
      if (isValidTitle(query)) {
        const response = await axios.get(`search/multi`, {
          params: {
            query: query,
            page: page,
          },
        });
        setData((prev) => [...prev, ...response.data.results]);
        setError(''); // Clear any previous error
      } else {
        setError('Invalid input. Please enter a valid movie title.');
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [location?.search]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (isValidTitle(value)) {
      setError('');
    } else {
      setError('Invalid input. Please enter a valid movie title.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidTitle(searchInput)) {
      navigate(`/search?q=${searchInput}`);
    } else {
      setError('Invalid input. Please enter a valid movie title.');
    }
  };

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={handleChange}
          value={searchInput}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
        {error && <div className='text-red-500 mt-2'>{error}</div>}
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {data.map((searchData) => (
            <Card data={searchData} key={searchData.id + "search"} media_type={searchData.media_type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
