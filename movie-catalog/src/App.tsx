import { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MainPage } from "./components/MainPage";

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
      {/* TODO: Переделать все жанры на объект в других файлах */}
      <MainPage genres={genres} />
      {/* <MainPage genres={genres} /> */}
      <Footer />
    </>
  );
}

export default App;
