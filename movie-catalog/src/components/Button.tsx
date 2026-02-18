// PropsWithChildren
type ButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export const Button = ({ className = "button" }: ButtonProps) => {
  return <button className={className}></button>;
};