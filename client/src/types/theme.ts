import { Dispatch, SetStateAction } from "react";

export interface ThemeContextInterface {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

export interface ThemeAction {
  type: string,
  payload: string
}