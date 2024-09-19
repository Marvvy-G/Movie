import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Card = ({data,media_type }) => {
    const imageURL = useSelector(state => state.movieData.imageURL)

    const mediaType = data.media_type ?? media_type
  return (
    <Link to={"/"+mediaType+"/"+data.id} className='w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all'>
        {/* display movie poster or display 'no image found if poster is unavailable */}
        {
            data?.poster_path ? (
                <img
                    src={imageURL+data?.poster_path}
                />
            ) : (
                <div className='bg-neutral-800 h-full w-full flex justify-center items-center'>
                    No image found
                </div>
            )

        }

        
        {/* display movie title and overview */}
     

        <div className='absolute bottom-0 h-24 backdrop-blur-3xl w-full  bg-black/60 p-2'>
            <h2 className='text-ellipsis line-clamp-1 text-lg font-semibold'>{data?.title || data?.name}</h2>
            <p className='text-ellipsis line-clamp-3 text-sm'>{data.overview}</p>
        </div>
    </Link>
  )
}

export default Card
