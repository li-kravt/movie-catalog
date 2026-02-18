import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { MovieCard } from "./MovieCard";

interface MainPageProps {
  genres: Record<string, string>;
}

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  // Add other properties you need from the API response
}

const TOKEN = import.meta.env.VITE_API_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const MainPage = ({ genres }: MainPageProps) => {
  const [popularFilms, setPopularFilms] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<Number>(5);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
      options,
    )
      .then((res) => res.json())
      .then((res) => {
        setPopularFilms(res.results);
        setTotalPages(res.total_pages);
        console.log(res);
        console.log("totalPages", res.total_pages);
      })
      .catch((err) => console.error(err));
  }, []);
  console.log("totPages", totalPages);

  console.log(popularFilms);

  return (
    <div className="main-page">
      <h2> All films</h2>
      <div className="buttons">
        <button className="button--border-unfull">GENRE</button>
        <button className="button--border-unfull">SORT BY IMDB</button>
      </div>
      <div className="movie-list">
        {popularFilms.map((film) => (
          <MovieCard
            key={film.id}
            poster_path={film.poster_path}
            title={film.title}
            genre_ids={film.genre_ids}
            vote_average={film.vote_average}
            overview={film.overview}
            genres={genres}
          />
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
};
