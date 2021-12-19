import { AxiosRequestHeaders } from "axios";

export interface AuthContextInterface {
  loggedIn: boolean;
  email: string | null;
  accessToken: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: ({ email, password }: { email: string; password: string; }, headers?: AxiosRequestHeaders | undefined) => Promise<any>;
  signUp: ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string; }) => Promise<unknown>;
  logout: () => Promise<void>;
}