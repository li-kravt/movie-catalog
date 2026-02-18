import { useEffect } from "react";
interface PaginationProps {
  totalPages: number;
}

export const Pagination = ({ totalPages }: PaginationProps) => {
  const limit: number = 20;
  const pagesCount: number = Math.ceil(totalPages / limit);
  console.log("pagesCount", pagesCount);

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
      <p>1</p>
    </>
  );
};
