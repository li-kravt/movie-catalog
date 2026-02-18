import { useEffect } from "react";

export const Pagination = () => {
  const TOKEN = import.meta.env.VITE_API_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US", options)
      .then((res) => res.json())
      .then((res) => console.log("pages", res.total_pages))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <p>Pagination</p>
    </>
  );
};
