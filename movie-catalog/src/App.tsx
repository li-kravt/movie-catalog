import {
  useCallback,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";
import { Route, Routes } from "react-router";
import { WatchList } from "./pages/WatchList";
import { AllFilms } from "./pages/AllFilms";
import { FilmDetails } from "./components/FilmDetails";
import { optionsGet } from "./options/options";

export interface Genre {
  id: number;
  name: string;
}

function App() {
  const [genres, setGenres] = useState({});

  //check session id
  const hasSessionId = () => {
    for (const oneCookie of document.cookie.split("; ")) {
      oneCookie.split("=")[1] === "guest_session_id" ? true : false;
    }
  };

  //get session id
  !hasSessionId &&
    useEffect(() => {
      fetch(
        "https://api.themoviedb.org/3/authentication/guest_session/new",
        optionsGet,
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          document.cookie = `guest_session_id = ${res.guest_session_id}; max-age=3600"`;
          console.log("Cookie:", document.cookie);
        })
        .catch((err) => console.error(err));
    }, []);

  //get the genre list
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      optionsGet,
    )
      // ?as - Type Assertion
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
