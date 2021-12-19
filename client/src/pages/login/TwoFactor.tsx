import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { FormElementType } from '../../types/form';
import validator from 'validator';
import { AuthContext } from '../../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../assets/styles/two-factor.scss';
import Form from '../../components/form/Form';

function TwoFactor() {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const loggedIn = authContext?.loggedIn;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const login = authContext?.login;

  const [token, setToken] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  const formElements: FormElementType[] = [
    {
      labelValue: "Code",
      type: "text",
      id: "code",
      placeholder: "Enter code",
      state: token,
      setState: setToken,
      handleBlur: (e, setError) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!validator.isNumeric(e.target.value)) {
          setError('Invalid code');
        } else setError('');
      }
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (login) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
      await login({ email: state.email, password: state.password }, { twoFactorToken: token, twoFactorSecret: state.secret.secret });
    }
  };


  return (
    <div>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment  */}
      <img className='qr-img' src={state.secret.qr} alt='QR' />
      <Form
        containerClass="two-factor-container"
        id="two-factor-form"
        title="two-factor"
        formElements={formElements}
        submitValue="Verify"
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default TwoFactor;