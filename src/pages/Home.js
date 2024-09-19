import React from 'react'
import BannerHome from '../components/BannerHome'
import { useSelector } from 'react-redux'
import Card from '../components/Card'

const Home = () => {
  const trendingData = useSelector(state => state.movieData.bannerData)
  return (
    <div>
      <BannerHome/>
      <div className='container mx-auto px-3 my-10'>
        <h2 className='text-xl lg:text-2xl font-bold mb-2'>Trending Movies</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6'>
         {
            trendingData.map((data) => {
              return (
                <Card key={data.id} data={data} />
              )
            })
          }
       </div>
      </div>
    </div>
  )
}

export default Home