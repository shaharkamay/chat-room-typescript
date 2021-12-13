import React, { useContext } from 'react';
import Item from './Item';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router';

function List() {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const loggedIn = authContext?.loggedIn;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const logout = authContext?.logout;

  const navigate = useNavigate();
  return (
    <ul className="nav__list row">
      <Item linkName="Home" link="/" />
      {loggedIn
        ? [
          <Item linkName="Chat Room" link="/chat" key="chat" />,
          <button
            className="default--button"
            onClick={async () => {
              if (logout) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                await logout();
                navigate('/');
              }
            }}
            style={{ backgroundColor: 'red', padding: '.1em .5em', }}
            key="logout"
          >Logout</button>,
        ]
        : [
          <Item linkName="Login" link="/login" key="login" />,
          <Item linkName="Sign Up" link="/sign-up" key="sign-up" />
        ]

      }
    </ul>
  );
}

export default List;