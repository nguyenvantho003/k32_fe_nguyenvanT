import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getMovies, getMoviesFromStore } from '../../redux/movie/movieSlice'
import { ACCESS_TOKEN } from '../../constants'
import MovieListing from '../../components/MovieListing/MovieListing'

function HomePage() {
  const dispatch = useDispatch()
  const { movies }  = useSelector(getMoviesFromStore)
  console.log("movies form store", movies)

  const fetchMovies = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (accessToken) {
      dispatch(getMovies(accessToken))
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [localStorage.getItem(ACCESS_TOKEN)])


  return (
    <section>
      <h1 className='title'>Movies</h1>
      {
        movies?.length === 0?(<div 
          style={{
          width: '100vw',
          height:'100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >

        </div>) : (<MovieListing movies={movies} />)
      }
    </section>
  )
}

export default HomePage