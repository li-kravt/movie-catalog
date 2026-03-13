import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import type { Genre } from "../App";

interface FilmDetailsData {
  adult: boolean;
  backdrop_path: string;
  title: string;
  budget: number;
  genres: Genre[];
  homepage?: string;
  id: number;
  overview: string;
  origin_country: [];
  original_language: string;
  poster_path?: string;
  production_companies: { name: string }[];
  production_countries: { name: string }[];
  release_date: string;
  runtime: number;
  status?: string;
  video?: boolean;
  vote_average: number;
}

const TOKEN = import.meta.env.VITE_API_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export const FilmDetails = () => {
  const [filmDetailsData, setFilmDetailsData] =
    useState<FilmDetailsData | null>(null);
  const { id } = useParams();

  // да?
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        const filmDetails = {
          adult: res.adult,
          backdrop_path: res.backdrop_path,
          title: res.title,
          budget: res.budget,
          genres: res.genres,
          homepage: res.homepage,
          id: res.id,
          poster_path: res.poster_path,
          production_companies: res.production_companies,
          production_countries: res.production_countries,
          release_date: res.release_date,
          runtime: res.runtime,
          overview: res.overview,
          origin_country: res.origin_country,
          original_language: res.original_language,
          vote_average: res.vote_average,
        };
        setFilmDetailsData(filmDetails);
      })
      .catch((err) => console.error(err));
  }, [id]);
  console.log("filmDetailsData", filmDetailsData);

  return (
    <>
      {filmDetailsData ? (
        <div
          className="film-details"
          style={{
            backgroundSize: "cover",
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.9)), 
            url(https://image.tmdb.org/t/p/original/${filmDetailsData.backdrop_path})`,
            backgroundPosition: "center",
          }}
        >
          <div className="info">
            <h3>{filmDetailsData.title}</h3>
            <div>
              <div>
                {filmDetailsData.release_date && (
                  <div>Release: {filmDetailsData.release_date}</div>
                )}
                <p>{filmDetailsData.runtime} min</p>
              </div>
              <div className="genres-div">
                {filmDetailsData.genres.map((item, index: number) => (
                  <div className="genre" key={index}>
                    {item.name}
                  </div>
                ))}
                {filmDetailsData.adult && <p>18+</p>}
              </div>
            </div>
            <div className="rating">
              <img src="/img/IMDB_Logo_2016.svg" alt="IMDb"></img>
              <div className="text-description">
                <p>{filmDetailsData.vote_average}</p>
                <img src="/img/star-icon.svg" alt="star"></img>
              </div>
            </div>
            <p className="text-description">{filmDetailsData.overview}</p>
            <div>
              <h3>More details</h3>
              <div>
                <div>
                  <p>Origin country:</p>
                  {filmDetailsData.origin_country.join(", ")}
                </div>
                <div>
                  <p>Original language:</p>
                  {filmDetailsData.original_language}
                </div>
                <div>
                  <p>Production companies:</p>
                  {filmDetailsData?.production_companies.map((obj) => obj.name)}
                  {/* тут можно использовать map? */}
                </div>
                <div>
                  <p>Production country:</p>
                  {filmDetailsData?.production_countries.map((obj) => obj.name)}
                </div>
              </div>
            </div>
            <div className="buttons">
              <button className="button--border-unfull">
                Add to watchlist
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};
