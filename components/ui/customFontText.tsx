import { Caveat } from "next/font/google";
import { clsx } from "clsx";

export const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface CustomFontTextProps {
  children: React.ReactNode;
  className?:string;
}

export const CustomFontText: React.FC<CustomFontTextProps> = ({className, children }) => {
  return <div className={clsx(caveat.className,className)}>{children}</div>;
};
