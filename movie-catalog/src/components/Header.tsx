import { Link } from "react-router";
import { optionsGet } from "../options/options";

type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

// get token account
const handleClick = () => {
  fetch("https://api.themoviedb.org/3/authentication/token/new", optionsGet)
    .then((res) => res.json())
    .then((res) => {
      console.log("token", res.request_token);
      localStorage.setItem("userTokenId", res.request_token);
      window.open(
        `https://www.themoviedb.org/authenticate/${res.request_token}`,
      );
    })
    .catch((err) => console.error(err));
};

//https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
export const Header = ({ className }: HeaderProps) => {
  return (
    <div className={className}>
      <div>
        <img src="/img/logo.svg" alt="logo" />
        <span>MOVIESPACE</span>
      </div>
      <div className="buttons-header">
        <div></div>
        <button className="button" children="ALL FILMS"></button>
        <Link
          to="/watchlist"
          className="button"
          children="MY WATCHLISTS"
        ></Link>
        <button
          onClick={() => handleClick()}
          className="button button--accent"
          children="LOGIN"
        ></button>
      </div>
    </div>
  );
};
