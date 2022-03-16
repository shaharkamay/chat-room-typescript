import { ThemeAction } from "../types/theme";
import { CHANGE_THEME } from "../actions/themeActions";

const initialState = {
  theme: localStorage.getItem('theme') || "theme-auto",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTheme: () => {},
};

const themeReducer = (state = initialState, action: ThemeAction) => {
  switch(action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};

export default themeReducer;