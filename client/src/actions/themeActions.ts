export const CHANGE_THEME = 'CHANGE_THEME';

export const changeTheme = (theme: string) => {
  return {
    type: CHANGE_THEME,
    payload: theme,
  };
};