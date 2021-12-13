import React, { useState, useContext, useEffect, FormEvent } from "react";
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import '../../assets/styles/login.scss';
import validator from 'validator';
import { FormElementType } from "../../types/form";

function Login() {
  const authContext = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const loggedIn = authContext?.loggedIn;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const login = authContext?.login;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) navigate('/');
  }, [loggedIn, navigate]);

  const formElements: FormElementType[] = [
    {
      labelValue: "Email",
      type: "email",
      id: "email",
      placeholder: "Enter Email",
      state: email,
      setState: setEmail,
      handleBlur: (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!validator.isEmail(e.target.value)) {
          // setError('Invalid email');
          console.log('Invalid email');
        } else console.log('');
      }
    },
    {
      labelValue: "Password",
      type: "password",
      id: "password",
      placeholder: "Enter Password",
      state: password,
      setState: setPassword,
      handleBlur: (e) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (!validator.isStrongPassword(e.target.value, { minSymbols: 0 })) {
          console.log('Password must contain at least one uppercase, one lowercase and one number');
        } else console.log('');
      }
    },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (login) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await login({ email, password });
    }
  };


  return (
    <Form
      containerClass="log-in-container"
      id="log-in-form"
      title="Log In"
      formElements={formElements}
      submitValue="Log In"
      handleSubmit={handleSubmit}
    />
  );
}

export default Login;
