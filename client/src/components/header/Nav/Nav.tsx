import React from 'react';
import List from './List';

function Nav({ isMobileNavOpen }: { isMobileNavOpen: boolean }) {
  return (
    <nav className={`nav ${isMobileNavOpen ? 'nav--visible' : ''}`}>
      <List />
    </nav>
  );
}

export default Nav;