import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logooo.svg';
import { IoSearchOutline } from 'react-icons/io5';
import { navigation } from '../constants/navigation';

const titleRegex = /^[a-zA-Z0-9\s,'-]{1,100}$/;

const Header = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [searchInput, setSearchInput] = useState(removeSpace || '');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleRegex.test(searchInput)) {
      navigate(`/search?q=${searchInput}`);
      setError('');
    } else {
      setError('Invalid search input. Please use alphanumeric characters only.');
    }
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    if (titleRegex.test(e.target.value)) {
      setError('');
    } else {
      setError('Invalid search input. Please use alphanumeric characters only.');
    }
  };

  return (
    <header className='fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-40'>
      <div className='container mx-auto px-2 flex items-center h-full'>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            width={120}
          />
        </Link>
        <nav className='flex items-center ml-4'>
          {navigation.map((nav, index) => (
            <div key={index}>
              <NavLink to={nav.href} className={({ isActive }) =>
                `px-2 hover:text-neutral-100 ${isActive ? 'text-neutral-100' : ''}`
              }>
                {nav.label}
              </NavLink>
            </div>
          ))}
        </nav>

        <div className='ml-auto flex items-center gap-5'>
          <form className='flex items-center gap-2' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Search a Movie Title...'
              className='bg-transparent px-4 py-1 outline-none border-none hidden lg:block'
              onChange={handleChange}
              value={searchInput}
            />
            <button className='text-2xl text-white' type='submit'>
              <IoSearchOutline />
            </button>
          </form>
          {error && <p className='text-red-500'>{error}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;
