import { Pagination } from "./Pagination"
const TOKEN = import.meta.env.VITE_API_TOKEN


export const MainPage = () => {
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
};

fetch('https://api.themoviedb.org/3/movie/popular', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));

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