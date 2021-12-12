import { NextFunction, Request, Response } from 'express';
import authService from '../services/auth';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = <Record<string, string>>req.body;

    const tokens = await authService.login(email, password);
    res.json(tokens);
  } catch (err) {
    next(err);
  }
};

const token = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.body.token;

    const dataObj = await authService.token(token);

    res.json(dataObj);
  } catch (err) {
    next(err);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = <Record<string, string>>req.body;

    const isSignedUp = await authService.signUp(firstName, lastName, email, password);
    res.send({ isSignedUp });
  } catch (err) {
    next(err);
  }
};

const logout = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = <Record<string, string>>res.locals.user;

    const isLoggedOut = await authService.logout(userId);
    res.json({ isLoggedOut });
  } catch (err) {
    next(err);
  }
};

export { login, token, signUp, logout };