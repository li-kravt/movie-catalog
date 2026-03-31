import { useEffect } from "react";
import { optionsGet } from "../options/options";
interface PaginationProps {
  setPage: (page: number) => void;
  page: number;
  totalPages: number;
}

export const Pagination = ({ setPage, page }: PaginationProps) => {
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US",
      optionsGet,
    )
      .then((res) => res.json())
      .then((res) => console.log("pages", res.total_pages))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

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
