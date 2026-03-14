import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import { Route, Routes } from "react-router";
import { WatchList } from "./pages/WatchList";
import { AllFilms } from "./pages/AllFilms";
import { FilmDetails } from "./components/FilmDetails";

export interface Genre {
  id: number;
  name: string;
}

const TOKEN = import.meta.env.VITE_API_TOKEN;
//useContext
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

function App() {
  const [genres, setGenres] = useState({});

  const hasSessionId = () => {
    for (const oneCookie of document.cookie.split("; ")) {
      oneCookie.split("=")[1] === "guest_session_id" ? true : false;
    }
  };

  !hasSessionId &&
    useEffect(() => {
      fetch(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        options,
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          document.cookie = `guest_session_id = ${res.guest_session_id}; max-age=3600"`;
          console.log("Cookie:", document.cookie);
        })
        .catch((err) => console.error(err));
    }, []);

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
      // as - Type Assertion
      .then((res) => res.json() as Promise<{ genres: Genre[] }>)
      .then((res) => {
        const newGenres = res.genres;

        const genresObject = newGenres.reduce(
          (acc, obj) => {
            acc[obj.id] = obj.name;
            return acc;
          },
          {} as Record<string, string>,
        );

        setGenres(genresObject);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log("Component App, genres", genres);

  return (
    <>
      <Header className="header" />
      <Routes>
        <Route index element={<MainPage genres={genres} />} />
        <Route path=":id" element={<FilmDetails />} />
        <Route path="watchlist" element={<WatchList />} />
        <Route path="allfilms" element={<AllFilms />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
