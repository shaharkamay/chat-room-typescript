import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { login, logout, signUp, token, enable2FA, disable2FA } from '../controllers/auth';
import { validateLogin, validateSignUp, validate2FA } from '../middleware/validator';
import auth from '../middleware/auth';

const authRouter = express.Router();

authRouter.post("/login", validateLogin, validate2FA, login);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authRouter.post("/token", token);
authRouter.post("/sign-up", validateSignUp, signUp);
authRouter.post("/logout", auth, logout);
// authRouter.get('/2FA/generate-secret', generateSecret);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authRouter.post("/2FA", enable2FA);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authRouter.delete("/2FA", disable2FA);

export default authRouter;