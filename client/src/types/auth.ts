export interface AuthContextInterface {
  loggedIn: boolean;
  email: string | null;
  accessToken: string | null;
  login: ({ email, password }: { email: string; password: string; }) => Promise<void>;
  signUp: ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string; }) => Promise<unknown>;
  logout: () => Promise<void>;
}