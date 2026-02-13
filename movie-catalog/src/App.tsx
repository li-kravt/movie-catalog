import { useEffect, useState } from 'react'
import './App.css'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { MainPage } from './components/MainPage'


export interface Genre {
  id: number,
  name: string,
}

const TOKEN = import.meta.env.VITE_API_TOKEN

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
};

function App() {
  const [genres, setGenres] = useState<Genre[]>([])

  useEffect(()=> {
    fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
  .then(res => res.json())
  .then(res => setGenres(res.genres))
  .catch(err => console.error(err));
  }, [])

  console.log(genres)


  return (
    <>
     <Header className='header'/>
     <MainPage genres={genres} />
     <Footer />
    </>
  )
}

export default App
