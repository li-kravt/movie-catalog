import { useEffect, useState } from "react";

type MovieCardProps = {
  poster_path: string;
  title: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  genres: Record<string, string>;
};

export const MovieCard = ({
  poster_path,
  title,
  genre_ids,
  vote_average,
  overview,
  genres,
}: MovieCardProps) => {
  const [genre, setGenre] = useState<string[]>([]);

  useEffect(() => {
    const movieGenre: string[] = genre_ids.map(
      (genreID) => (genres ?? [])[genreID],
    );
    setGenre(movieGenre);
  }, [genres]);

  return (
    <div>
      <img src={poster_path} alt="poster" />
      <div>
        <h3>{title}</h3>
        <div>{genre}</div>
        <div>
          <img src="{}" alt="IMDb"></img>
          <p>{vote_average}</p>
          <img src="{}" alt="star"></img>
        </div>
        <p>{overview}</p>
        <div>
          <button>View details</button>
          <button>Add to watchlist</button>
        </div>
      </div>
    </div>
  );
};
