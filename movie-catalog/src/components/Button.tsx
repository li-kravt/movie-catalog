type ButtonProps = {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({className, children}: ButtonProps) => {

  return (
    <button className={className}>
      <span>{children}</span>
    </button>
  )
}