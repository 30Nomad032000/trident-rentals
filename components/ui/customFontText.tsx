import { Caveat } from "next/font/google";

export const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

interface CustomFontTextProps {
  children: React.ReactNode;
}

export const CustomFontText: React.FC<CustomFontTextProps> = ({ children }) => {
  return <div className={caveat.className}>{children}</div>;
};
