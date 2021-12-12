import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import config from '../config/config';

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.headers.auth;
    if (!token) throw { status: 403, message: "Auth error" };

    const authPayload = <Record<string, unknown>>jwt.verify(token, config.jwt.secret);

    res.locals.user = authPayload;
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;