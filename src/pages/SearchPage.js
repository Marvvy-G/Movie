import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const titleRegex = /^[a-zA-Z0-9\s,'-]{1,100}$/;

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState(location?.search?.slice(3) || '');
  const [error, setError] = useState('');

  const query = location?.search?.slice(3) || inputValue;

  const fetchData = async () => {
    try {
      const response = await axios.get(`search/multi`, {
        params: {
          query: query,
          page: page
        }
      });
      setData(prev => [...prev, ...response.data.results]);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (titleRegex.test(value) || value === '') {
      setInputValue(value);
      setError('');
      navigate(`/search?q=${value}`);
    } else {
      setError('Invalid search query. Please use alphanumeric characters only.');
    }
  };

  useEffect(() => {
    if (query) {
      setPage(1);
      setData([]);
      fetchData();
    }
  }, [query]);

  useEffect(() => {
    if (query) {
      fetchData();
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className='py-16'>
      <div className='lg:hidden my-2 mx-1 sticky top-[70px] z-30'>
        <input
          type='text'
          placeholder='Search here...'
          onChange={handleInputChange}
          value={inputValue}
          className='px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900'
        />
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </div>
      <div className='container mx-auto'>
        <h3 className='capitalize text-lg lg:text-xl font-semibold my-3'>Search Results</h3>
        <div className='grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start'>
          {
            data.map((searchData) => (
              <Card data={searchData} key={searchData.id + "search"} media_type={searchData.media_type} />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
