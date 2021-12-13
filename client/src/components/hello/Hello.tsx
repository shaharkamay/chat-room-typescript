import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import '../../assets/styles/hello.scss';

function Hello() {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const loggedIn = authContext?.loggedIn;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const email = authContext?.email;

  return (
    <div className="hello">
      <div className="hello-container">
        Hello,
        {loggedIn
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          ? ` ${email || 'guest'}`
          : ` guest`
        }
      </div>
    </div>
  );
}

export default Hello;
