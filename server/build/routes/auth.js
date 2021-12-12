"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_1 = require("../controllers/auth");
const validator_1 = require("../middleware/validator");
const auth_2 = __importDefault(require("../middleware/auth"));
const authRouter = express_1.default.Router();
authRouter.post("/login", validator_1.validateLogin, auth_1.login);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
authRouter.post("/token", auth_1.token);
authRouter.post("/sign-up", validator_1.validateSignUp, auth_1.signUp);
authRouter.post("/logout", auth_2.default, auth_1.logout);
exports.default = authRouter;
