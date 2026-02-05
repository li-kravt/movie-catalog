import { Pagination } from "./Pagination"

export const MainPage = () => {

  return (
    <>
    <h2> All films</h2>
    <div>
      <button children="genre"></button>
      <button children="SORT BY IMDB"></button>
      <p>Movie Cards</p>
      <Pagination />
    </div>
    </>
  )
}