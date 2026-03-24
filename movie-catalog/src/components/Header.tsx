import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { optionsGet } from "../options/options";
import { useSearchParams } from "react-router";
import { Navigate } from "react-router";

const TOKEN = import.meta.env.VITE_API_TOKEN;

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
        `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:5177`,
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const approved = searchParams.get("approved");

    if (approved === "true") {
      const userToken = searchParams.get("request_token");

      const optionsPost = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({
          request_token: userToken,
        }),
      };

      fetch(
        "https://api.themoviedb.org/3/authentication/session/new",
        optionsPost,
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUserSession(res.session_id);
          navigate("/", { replace: true });
        })
        .catch((err) => console.error(err));
    }
  }, []);

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
