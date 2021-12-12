import UserModel from '../models/user';
import Token from '../models/token';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from '../types/user.js';
import config from '../config/config';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = <Record<string, string>>req.body;

    const user: User | null = (await UserModel.findOne({ email }));

    if (!user) throw { status: 400, message: "No such email" };
    if (!(password === user.password))
      throw { status: 400, message: "Bad password" };

    const userId = user.id;

    const accessToken = jwt.sign({ email, userId }, config.jwt.secret, {
      expiresIn: config.jwt.accessTime,
    });

    const refreshToken = jwt.sign({ userId, email }, config.jwt.secret, {
      expiresIn: config.jwt.refreshTime,
    });

    await Token.findOneAndUpdate(
      { userId },
      { jwt: refreshToken, userId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.send({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

const token = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = <string>req.body.token;

    if (!token) throw { status: 400, message: "Must provide a token" };

    const { email, userId } = <Record<string, unknown>>jwt.verify(token, config.jwt.secret);

    const exists = await Token.findOne({ jwt: token });
    if (!exists) throw { status: 400, message: "Log in again" };

    const accessToken = jwt.sign({ email, userId }, config.jwt.secret, {
      expiresIn: config.jwt.accessTime,
    });

    res.send({ accessToken, email, userId });
  } catch (err) {
    next(err);
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { firstName, lastName, email, password } = <Record<string, string>>req.body;

    const exists = await UserModel.find({ email });

    if (exists.length > 0) throw { status: 400, message: "email already exists" };

    await UserModel.create({
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });

    res.send({ isSignedUp: true });
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = <Record<string, string>>res.locals.user;
    await Token.deleteOne({ userId });
    res.send(200);
  } catch (err) {
    next(err);
  }
};

export { login, token, signUp, logout };