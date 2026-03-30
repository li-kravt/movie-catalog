import { useEffect, useState } from "react";
import { TOKEN } from "../components/Header";
import { useSearchParams, useNavigate } from "react-router";
import { optionsGet } from "../options/options";

type CheckAuth = {
  setUserSession: Function;
  setAccountId: Function;
};

export const CheckAuth = ({ setUserSession, setAccountId }: CheckAuth) => {
  const [searchParams] = useSearchParams();
  const [isloading, setIsLoading] = useState<Boolean>(true);
  const [fetchResult, setFetchResult] = useState<String>("");

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
      //сделала fetch session Id след шаг - исп session id для post фильмов и др post
      fetch(
        "https://api.themoviedb.org/3/authentication/session/new",
        optionsPost,
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setUserSession(res.session_id);
          setFetchResult("Success");
        })
        .catch((err) => {
          console.error(err);
          setFetchResult("Try again");
        });

      fetch("https://api.themoviedb.org/3/account", optionsGet).then((res) =>
        res.json().then((res) => {
          console.log("account info", res);
          setAccountId(res.id);
        }),
      );
    }
    setIsLoading(false);
    setFetchResult("denied");
  }, []);

  return <>{isloading ? <div>Loading...</div> : <div>{fetchResult}</div>}</>;
};
