import React from 'react';
import SelectTheme from './SelectTheme';

function Theme() {
  return (
    <div className="theme">
      <label id="theme-icon" className="theme-icon"></label>
      <SelectTheme />
    </div>
  );
}

export default Theme;
