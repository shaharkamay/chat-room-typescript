import { NextFunction, Request, Response } from 'express';
import validator from 'validator';

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = <Record<string, string>>req.body;
    res.locals.validated =
      validator.isAlpha(firstName)
      && validator.isAlpha(lastName)
      && validator.isEmail(email)
      && validator.isStrongPassword(password, { minSymbols: 0 });

    if (res.locals.validated) next();
    else next({ status: 400, message: 'Invalid inputs' });
  } catch (error) {
    next(error);
  }
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = <string>req.body.email;
    const password = <string>req.body.password;
    res.locals.validated = validator.isEmail(email) && validator.isStrongPassword(password, { minSymbols: 0 });
    if (res.locals.validated) next();
    else next({ status: 400, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

export { validateSignUp, validateLogin };