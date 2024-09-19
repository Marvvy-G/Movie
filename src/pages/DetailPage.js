import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDetails from '../components/hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import Divider from '../components/Divider';

const DetailsPage = () => {
  const { id } = useParams(); 
  const imageURL = useSelector((state) => state.movieData.imageURL);

  // Fetch movie details and cast data
  const { data } = useFetchDetails(`/movie/${id}`);
  const { data: castData } = useFetchDetails(`/movie/${id}/credits`);

  console.log('data', data);
  console.log('star cast', castData);

  // Get the writer from the crew
  const writer = castData?.crew
    ?.filter((el) => el?.job === 'Writer')
    ?.map((el) => el?.name)
    ?.join(', ');

  // Director name (fallback to empty string if crew is undefined)
  const director = castData?.crew?.find((el) => el?.job === 'Director')?.name || 'Unknown';

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="w-full h-full">
          <img src={imageURL + data?.backdrop_path} className="h-full w-full object-cover" alt="Backdrop" />
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>

      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data?.poster_path}
            className="h-80 w-60 object-cover rounded"
            alt="Movie Poster"
          />
        </div>

        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white ">{data?.title || data?.name}</h2>
          <p className="text-neutral-400">{data?.tagline}</p>

          <Divider />

          <div className="flex items-center gap-3">
            <p>
              Rating: {Number(data?.vote_average).toFixed(1)}+
            </p>
            <span>|</span>
            <p>
              Views: {Number(data?.vote_count)}
            </p>
          </div>

          <Divider />

          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>

            <Divider />

            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>Revenue: ${Number(data?.revenue).toLocaleString()}</p> {/* Formatted revenue */}
            </div>

            <Divider />
          </div>

          <div>
            <p><span className="text-white">Director</span>: {director}</p>

            <Divider />

            <p>
              <span className="text-white">Writer</span>: {writer || 'Unknown'}
            </p>
          </div>

          <Divider />

          <h2 className="font-bold text-lg">Cast:</h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 my-4">
            {castData?.cast?.filter((el) => el?.profile_path)?.map((starCast, index) => (
              <div key={starCast.id || index}> {/* To Ensure unique key */}
                <div>
                  <img
                    src={imageURL + starCast?.profile_path}
                    className="w-24 h-24 object-cover rounded-full"
                    alt={starCast?.name}
                  />
                </div>
                <p className="font-bold text-center text-sm text-neutral-400">{starCast?.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
