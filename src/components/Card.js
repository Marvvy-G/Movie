import React from 'react'
import { useSelector } from 'react-redux'

const Card = ({data}) => {
    const imageURL = useSelector(state => state.movieData.imageURL)
  return (
    <div className='w-full max-w-[230px] h-80 overflow-hidden rounded'>
        <img
        src={imageURL+data?.poster_path}
        />
        
    </div>
  )
}

export default Card
