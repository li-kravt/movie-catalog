import { Pagination } from "./Pagination"

export const MainPage = () => {

  return (
    <>
    <h2> All films</h2>
    <div>
      <button className="button">genre</button>
      <button className="button">SORT BY IMDB</button>
      <p>Movie Cards</p>
      <Pagination />
    </div>
    </>
  )
}