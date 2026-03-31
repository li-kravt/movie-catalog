export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  // Add other properties you need from the API response
}
