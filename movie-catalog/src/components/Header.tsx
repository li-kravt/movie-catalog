import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { optionsGet } from "../options/options";
import { useSearchParams } from "react-router";
import { Navigate } from "react-router";

export const TOKEN = import.meta.env.VITE_API_TOKEN;

type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
  setUserSession: Function;
  setUserToken: Function;
};

// get token account
const handleClick = (setUserToken: Function) => {
  fetch("https://api.themoviedb.org/3/authentication/token/new", optionsGet)
    .then((res) => res.json())
    .then((res) => {
      console.log("token", res.request_token);
      window.open(
        `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:5173/check_auth`,
      );
    })
    .catch((err) => console.error(err));
};

//https://www.themoviedb.org/authenticate/{REQUEST_TOKEN}?redirect_to=http://www.yourapp.com/approved
export const Header = ({
  className,
  setUserSession,
  setUserToken,
}: HeaderProps) => {
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
          onClick={() => handleClick(setUserToken)}
          className="button button--accent"
          children="LOGIN"
        ></button>
      </div>
    </div>
  );
};
