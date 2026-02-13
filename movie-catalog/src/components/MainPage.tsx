import { useState, useEffect } from "react";
import { Pagination } from "./Pagination"
import { MovieCard } from "./MovieCard";
import type { Genre } from "../App";

interface MainPageProps {
  genres: Genre[]
}

interface Movie {
  id: number,
  poster_path: string,
  title: string,
  genre_ids: number[],
  vote_average: number,
  overview: string,
  // Add other properties you need from the API response
}

const TOKEN = import.meta.env.VITE_API_TOKEN

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
};

export const MainPage = ({genres}: MainPageProps) => {  
  const [popularFilms, setPopularFilms] = useState<Movie[]>([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setPopularFilms(res.results))
      .catch(err => console.error(err));
  }, [])

  console.log(popularFilms)

  return (
    <>
    <h2> All films</h2>
    <div>
      <button className="button">genre</button>
      <button className="button">SORT BY IMDB</button>
      {popularFilms.map((film) => 
      <MovieCard
      key={film.id}
      poster_path={film.poster_path} 
      title={film.title}
      genre_ids={film.genre_ids}
      vote_average={film.vote_average}
      overview={film.overview}
      />)}
      
      <Pagination />
    </div>
    </>
  )
}