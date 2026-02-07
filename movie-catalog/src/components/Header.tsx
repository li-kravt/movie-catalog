type HeaderProps = {
  className?: string;
  children?: React.ReactNode;
}

export const Header = ({className}: HeaderProps) => {

  return (
    <div className={className}>
    <div>
      <img src="../img/logo.svg" alt="logo" />
      <span>MOVIESPACE</span>
    </div>
    <div className="buttons-header">
    <button className="button" children="ALL FILMS"></button>
    <button className="button" children="MY WATCHLISTS"></button>
    <button className="button button--accent" children="LOGIN"></button>
    </div>
    </div>
  )
}