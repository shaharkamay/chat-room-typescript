import axios, { AxiosRequestHeaders } from "axios";
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
  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(false);

  const askForNewToken = useCallback(async (refreshToken: string | null) => {
    return await axios.post(`${BASE_URL}/api/auth/token`, {
      token: refreshToken,
    });
  }, []);

  const check2FA = useCallback(async () => {
    return await axios.get(`${BASE_URL}/api/auth/2FA`, {
      headers: {
        auth: accessToken || '',
      }
    });
  }, [loggedIn]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      if (refreshToken && refreshToken !== "undefined" && !loggedIn) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const { data } = await askForNewToken(refreshToken);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setAccessToken(data.accessToken);
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          localStorage.setItem("access", data.accessToken || '');
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          setEmail(data.email);
          setLoggedIn(true);
        } catch (error) {
          console.log(error);
          setRefreshToken(null);
        }
      }
    })();
  }, [refreshToken, askForNewToken, loggedIn]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await check2FA();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setIs2FAEnabled(data.is2FAEnabled);
      } catch (error) {
        console.log(error);
        setIs2FAEnabled(false);
      }
    })();
  }, [loggedIn, email, is2FAEnabled]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = useCallback(async ({ email, password }: { email: string, password: string }, headers: AxiosRequestHeaders | undefined = undefined): Promise<any> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      }, { headers });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      if (data.secret) return data.secret;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setRefreshToken(data.refreshToken);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setAccessToken(data.accessToken);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      localStorage.setItem("refresh", data.refreshToken);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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



  const enable2FA = useCallback(async (): Promise<boolean | undefined> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.post(`${BASE_URL}/api/auth/2FA`, {}, {
        headers: {
          auth: accessToken || '',
        }
      });
      if (data.is2FAEnabled) {
        setIs2FAEnabled(true);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data.is2FAEnabled;
      }
      else return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.isAxiosError) console.log(error.response.data.error);
      else console.log(error);
    }
  }, [loggedIn]);

  const disable2FA = useCallback(async (): Promise<boolean | undefined> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { data } = await axios.delete(`${BASE_URL}/api/auth/2FA`, {
        headers: {
          auth: accessToken || '',
        }
      });
      if (data.is2FADisabled) {
        setIs2FAEnabled(false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return data.is2FADisabled;
      }
      else return false;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.isAxiosError) console.log(error.response.data.error);
      else console.log(error);
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, email, accessToken, login, logout, signUp, is2FAEnabled, enable2FA, disable2FA }}>
      {children}
    </AuthContext.Provider>
  );
};