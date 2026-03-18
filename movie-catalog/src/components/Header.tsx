import { Link } from "react-router";

type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
};

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
        <button className="button button--accent" children="LOGIN"></button>
      </div>
    </div>
  );
};
