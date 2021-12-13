import { Dispatch, SetStateAction } from "react";

export interface ThemeContextInterface {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}