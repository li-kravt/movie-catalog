import { useEffect, useState } from "react";
import "../index.css";

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
    console.log("useEffect");
    setGenre(movieGenre);
  }, [genres]);

  console.log("useEffect");

  return (
    <div className="movie-card">
      {/* //TODO Добавить постер api */}
      <img
        style={{
          display: "flex",
          width: "200px",
          height: "300px",
          minWidth: "200px",
          objectFit: "cover",
        }}
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt="poster"
      />
      <div className="info">
        <h3>{title}</h3>
        <div className="genres-div">
          {genre.map((item: string) => (
            <div className="genre" key={item}>
              {item}
            </div>
          ))}
        </div>
        <div className="rating">
          <img src="/img/IMDB_Logo_2016.svg" alt="IMDb"></img>
          <div className="text-description">
            <p>{vote_average}</p>
            <img src="/img/star-icon.svg" alt="star"></img>
          </div>
        </div>
        <p className="text-description">{overview}</p>
        <div className="buttons">
          <button className="button--border-full">View details</button>
          <button className="button--border-unfull">Add to watchlist</button>
        </div>
      </div>
    </div>
  );
};
