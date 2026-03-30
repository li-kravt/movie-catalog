import { TOKEN } from "../components/Header";

export const addToWatchList = (filmId: number, accountId: number | null) => {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: filmId,
      watchlist: true,
    }),
  };

  fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist`, options)
    .then((res) => res.json())
    .then((res) => console.log("added to watch list", res))
    .catch((err) => console.error(err));
};
