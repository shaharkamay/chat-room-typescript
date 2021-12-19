import React, { ChangeEvent, useContext } from "react";
import '../../assets/styles/home.scss';
import { AuthContext } from "../../contexts/AuthContext";
//039724400

function Home() {
  const authContext = useContext(AuthContext);
  const enable2FA = authContext?.enable2FA;
  const disable2FA = authContext?.disable2FA;
  const email = authContext?.email;
  const is2FAEnabled = authContext?.is2FAEnabled || false;


  const handle2FACheck = async (e: ChangeEvent<HTMLInputElement>) => {
    if (typeof email === 'string') {
      if (e.target.checked) {
        if (enable2FA) {
          await enable2FA();
        }
      } else {
        if (disable2FA) {
          await disable2FA();
        }
      }
    }
  };

  return (
    <div>
      {email
        ? <div className="two-factor">
          <label htmlFor='two-factor' >2FA</label>
          <input id='two-factor' type={'checkbox'} onChange={handle2FACheck} checked={is2FAEnabled} />
        </div>
        : ''
      }
    </div>
  );
}

export default Home;
