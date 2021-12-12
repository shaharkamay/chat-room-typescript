import { LoggedUser, NewUserFields } from "./user";

const toLoggedUser = ({ email, password }: NewUserFields): LoggedUser => {
  const loggedUser: LoggedUser = {
    email: parseString(email),
    password: parseString(password),
  };
  return loggedUser;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error('Incorrect or missing string');
  }

  return str;
};

export {
  toLoggedUser,
  parseString,
};