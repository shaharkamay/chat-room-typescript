import React from "react";
import '../../assets/styles/home.scss';
// import { AuthContext } from "../../contexts/AuthContext";
//039724400

function Home() {
  // const { enable2FA, disable2FA } = useContext(AuthContext);
  return (
    <div className="two-factor">
      <label htmlFor='two-factor' >2FA</label>
      <input id='two-factor' type={'checkbox'} onChange={(e) => e.target.checked} />
    </div>
  );
}

export default Home;
