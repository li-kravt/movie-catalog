import { useState, useEffect } from "react";
import { Pagination } from "./Pagination"
import { MovieCard } from "./MovieCard";

interface Movie {
  title: string;
  // Add other properties you need from the API response
}
// string[]
// Array<string>

const TOKEN = import.meta.env.VITE_API_TOKEN

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
};

export const MainPage = () => {  
  const [popularFilms, setPopularFilms] = useState<Movie[]>([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setPopularFilms(res.results))
      .catch(err => console.error(err));
  }, [])

  popularFilms.length > 0 ? console.log(popularFilms.map(i => i.title)) : console.log("f")

  return (
    <>

    <h2> All films</h2>
    <div>
      <button className="button">genre</button>
      <button className="button">SORT BY IMDB</button>
      < MovieCard />
      <Pagination />
    </div>
    </>
  )
}