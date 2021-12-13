import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import BASE_URL from "../index";
import { AuthContextInterface } from "../types/auth";

export const AuthContext = React.createContext<AuthContextInterface | null>(null);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = ({ children }: any) => {
  const [email, setEmail] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refresh") || ''
  );
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("access") || ''
  );

  const askForNewToken = useCallback(async (refreshToken: string | null) => {
    return await axios.post(`${BASE_URL}/api/auth/token`, {
      token: refreshToken,
    });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (refreshToken && refreshToken !== "undefined" && !loggedIn) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { data } = await askForNewToken(refreshToken);
          setAccessToken(data.accessToken);
          localStorage.setItem("access", data.accessToken || '');
          setEmail(data.email);
          setLoggedIn(true);
        } catch (error) {
          console.log(error);
          setRefreshToken(null);
        }
      }
    })();
  }, [refreshToken, askForNewToken, loggedIn]);

  const login = useCallback(async ({ email, password }: { email: string, password: string }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      setRefreshToken(data.refreshToken);
      setAccessToken(data.accessToken);
      localStorage.setItem("refresh", data.refreshToken);
      localStorage.setItem("access", data.accessToken);
      setEmail(email);
      setLoggedIn(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.isAxiosError) console.log(error.response.data.error);
      else console.log(error);
    }
  }, []);

  const signUp = useCallback(async ({ firstName, lastName, email, password }: { firstName: string, lastName: string, email: string, password: string }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/sign-up`, {
        firstName,
        lastName,
        email,
        password,
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.isAxiosError) throw error.response.data.error;
      else {
        console.log(error);
        throw Error("Something went bad");
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await axios.post(
      `${BASE_URL}/api/auth/logout`,
      {},
      {
        headers: {
          Auth: accessToken || '',
        },
      }
    );
    setEmail(null);
    setLoggedIn(false);
    localStorage.removeItem("refresh");
    localStorage.removeItem("access");
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ loggedIn, email, accessToken, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const Auth = ({ children }) => (
//   <AuthContext.Consumer>{{ children }}</AuthContext.Consumer>
// );

// export const useAuth = () => {
//   const { loggedIn } = useContext(AuthContext);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!loggedIn) navigate("/login");
//   }, [loggedIn, navigate]);
//   return loggedIn;
// };