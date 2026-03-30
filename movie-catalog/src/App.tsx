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
import { CheckAuth } from "./pages/CheckAuth";
import { AccountIdContext } from "./context/userId";

export interface Genre {
  id: number;
  name: string;
}

function App() {
  const [genres, setGenres] = useState({});
  const [userSession, setUserSession] = useState<string>("");
  const [userToken, setUserToken] = useState<string>();
  const [accountId, setAccountId] = useState<number | null>(null);
  console.log("userId", accountId);
  console.log("userSession", userSession);

  //check Guest session id
  const hasSessionId = () => {
    for (const oneCookie of document.cookie.split("; ")) {
      oneCookie.split("=")[1] === "guest_session_id" ? true : false;
    }
  };

  //get Guest session id
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
      <AccountIdContext value={accountId}>
        <Header
          setUserSession={setUserSession}
          setUserToken={setUserToken}
          className="header"
        />
        <Routes>
          <Route
            index
            element={<MainPage userSession={userSession} genres={genres} />}
          />
          <Route
            path="check_auth"
            element={
              <CheckAuth
                setUserSession={setUserSession}
                setAccountId={setAccountId}
              />
            }
          />
          <Route
            path=":id"
            element={<FilmDetails userSession={userSession} />}
          />
          <Route path="watchlist" element={<WatchList />} />
          <Route path="allfilms" element={<AllFilms />} />
        </Routes>
        <Footer />
      </AccountIdContext>
    </>
  );
}

export default App;
