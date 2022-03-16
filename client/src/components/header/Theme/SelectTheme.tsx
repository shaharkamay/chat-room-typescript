import React from "react";
import { connect } from 'react-redux';
import { changeTheme } from "../../../actions/themeActions";

function SelectTheme({ theme, changeTheme }: { theme: string, changeTheme: (theme: string) => void }) {
  return (
    <select
      value={theme ? theme.split('-')[1] : 'auto'}
      className="select-theme"
      id="select-theme"
      onChange={(e) => {
        localStorage.setItem("theme", `theme-${e.target.value}`);
        changeTheme(`theme-${e.target.value}`);
      }}
    >
      <option value="auto">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}

const mapStateToProps = (state: { theme: string }) => {
  return {
    theme: state.theme,
  };
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const mapDispatchToProps = (dispatch) => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    changeTheme: (theme: string) => { dispatch(changeTheme(theme)); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTheme);