import { useContext, useEffect, useState } from "react";
import { optionsGet } from "../options/options";
import { AccountIdContext } from "../context/userId";
import type { Movie } from "../interface";
import { MovieCard } from "../components/MovieCard";
import { GenresContext } from "../context/genres";

export function WatchList() {
  const accountId = useContext<number | null>(AccountIdContext);
  const [watchlist, setWatchlist] = useState<null | Movie[]>(null);
  const genres = useContext(GenresContext);

  accountId &&
    useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies`,
        optionsGet,
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          const watchList: Movie[] = res.results.map((i: Movie) => {
            id: i.id;
            poster_path: i.poster_path;
            title: i.title;
            genre_ids: i.genre_ids;
            vote_average: i.vote_average;
            overview: i.overview;
          });
          setWatchlist(watchList);
        })
        .catch((err) => console.error(err));
    }, []);

  return (
    <div>
      {!accountId ? (
        <p>You are not logged in</p>
      ) : (
        <div className="movie-list">
          {watchlist?.map((film) => (
            <MovieCard
              id={film.id}
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
      )}
    </div>
  );
}
