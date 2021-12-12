import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { login, logout, signUp, token } from '../controllers/auth';
import { validateLogin, validateSignUp } from '../middleware/validator';
import auth from '../middleware/auth';

const authRouter = express.Router();

authRouter.post("/login", validateLogin, login);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authRouter.post("/token", token);
authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/logout", auth, logout);

export default authRouter;