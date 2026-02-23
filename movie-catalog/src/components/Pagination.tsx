import { useEffect } from "react";
interface PaginationProps {
  setPage: (page: number) => void;
  page: number;
  totalPages: number;
}

export const Pagination = ({ setPage, page }: PaginationProps) => {
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
    <div className="div-pagination">
      {Array.from({ length: 10 }).map((_, index) => {
        const pageIndex: number = index + 1;
        const isActive = pageIndex === page;
        return (
          <button
            key={index}
            onClick={() => setPage(pageIndex)}
            className="button-pagination"
            disabled={isActive}
          >
            {pageIndex}
          </button>
        );
      })}
    </div>
  );
};
