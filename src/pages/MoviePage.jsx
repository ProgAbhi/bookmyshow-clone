import React, { useContext, useEffect, useState } from 'react'
import MovieLayout from '../layout/MovieLayout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MovieContext } from '../context/Movie.Context';
import Slider from 'react-slick';
import {FaCcVisa, FaCcApplePay} from 'react-icons/fa'
import PosterSlider from '../components/PosterSlider/PosterSlider.Component';
import MovieHero from '../components/MovieHero/MovieHero.Component';


const MoviePage = () => {
  const {id} = useParams();

  const {movie, setMovie} = useContext(MovieContext)

  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([])
  const [recommendedMovies, setRecommendedMovies ] = useState([]);

  useEffect(()=>{
    const requestCast = async () => {
        const getCast = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1d075ed64787b032e3128b4e18e31cd8`)
        setCast(getCast.data.cast)
    }
    requestCast()
}, [id])

useEffect(()=>{
  const requestSimilarMovies = async () => {
      const getSimilarovies = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=1d075ed64787b032e3128b4e18e31cd8`)
      setSimilarMovies(getSimilarovies.data.result)
  }
  requestSimilarMovies()
}, [id])

useEffect(()=>{
  const requestTopRatedMovies = async () => {
      const getTopRatedMovies = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=1d075ed64787b032e3128b4e18e31cd8`)
      setRecommendedMovies(getTopRatedMovies.data.results)
  }
  requestTopRatedMovies()
}, []);

useEffect(()=>{
  const requestMovie = async () =>{
      const getMovieData = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=315c3144bf8411adf2960ff883812713`)
      setMovie(getMovieData.data)
  }
  requestMovie()
},[id])

  const settingsCast = {};

  const settings = {};
  
  return <>
  <MovieHero/>
  <div className="my-12 container px-4 lg:ml-20">
    <div className="flex flex-col items-start gap-3">
      <h1 className="text-gray-800 font-bold text-2xl gap-3">About The Movie</h1>
      <p>{movie.overview}</p>
    </div>

    <div className="my-8">
      <hr/>
    </div>

    <div className="my-8">
      <h2 className="text-gray-800 font-bold text-2xl mb-3">Applicable Offers</h2>
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="flex items-start gap-2 bg-yellow-100 p-3 border-yellow-400 border-dashed border-2 rounded-md">
          <div className="w-8 h-8">
            <FaCcVisa className='w-full h-full'/>
          </div>
          <div className="flex flex-col items-start">
            <h3 className='text-gray-700 text-xl font-bold'>Visa Stream Offer</h3>
            <p className='text-gray-600'>Get 75% off up to INR 200 on all RuPay Card* on BookMyShow Stream</p>
          </div>
        </div>
        <div className="flex items-start gap-2 bg-yellow-100 p-3 border-yellow-400 border-dashed border-2 rounded-md">
          <div className="w-8 h-8">
            <FaCcApplePay className='w-full h-full'/>
          </div>
          <div className="flex flex-col items-start">
            <h3 className='text-gray-700 text-xl font-bold'>Film Pass</h3>
            <p className='text-gray-600'>Get 75% off up to INR 200 on all RuPay Card* on BookMyShow Stream</p>
          </div>
        </div>

      </div>
    </div>

    <div className="my-8">
      <hr/>
    </div>

    <div className="my-8">
      {/* Cast & Crew */}
    </div>

    <div className="my-8">
      <hr/>
    </div>

    <div className="my-8">
      {/* recommended movies */}
      <PosterSlider 
      title="Recommended Movies"
      subtitle="rec movies"
      posters={recommendedMovies}
      isDark={false}
      />
    </div>

    <div className="my-8">
      <hr/>
    </div>

    <div className="my-8">
      {/* exclusive movies */}
      <PosterSlider 
      title="Xclusive Movies"
      subtitle="xclusive movies"
      posters={recommendedMovies}
      isDark={false}
      />
    </div>
    
  </div>

  {/* <div>MoviePage</div> */}
  </>
}

export default MovieLayout(MoviePage)