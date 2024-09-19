import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import { setBannerData, setImageURL } from './store/movieSlice';

function App() {

  const dispatch = useDispatch()

  const fetchTrendingData = async()=> {
    try {
      const response = await axios.get("/trending/all/week?language=en-US");

      dispatch(setBannerData(response.data.results))
    } catch (error) {
      console.log("error", error.response || error.message);
    }
  }
  const fetchConfiguration = async() => {
    try{
      const response = await axios.get("/configuration") 
      dispatch(setImageURL(response.data.images.secure_base_url+"original")) 
    }catch(error) {
      console.log("error", error.response || error.message);
    } 
  }
  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);
  
  return (
    <main className='pb-14 lg:pb-0'> 
      <Header/>
        <div className=''>
          <Outlet/>
        </div>
      <Footer/>
      <MobileNav/>
    </main>
  );
}

export default App;
