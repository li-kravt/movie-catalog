import { useEffect } from "react";
// interface PaginationProps {
//   totalPages: number;
// }

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

  const SELECTED_PAGE = 1;

  return (
    <div className="div-pagination">
      {Array.from({ length: 10 })
        .slice(0 + SELECTED_PAGE, 10 + SELECTED_PAGE)
        .map((_, index) => {
          return <button className="button-pagination">{index + 1}</button>;
        })}
    </div>
  );
};
