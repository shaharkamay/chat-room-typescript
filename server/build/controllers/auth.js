"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signUp = exports.token = exports.login = void 0;
const user_1 = __importDefault(require("../models/user"));
const token_1 = __importDefault(require("../models/token"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = (await user_1.default.findOne({ email }));
        if (!user)
            throw { status: 400, message: "No such email" };
        if (!(password === user.password))
            throw { status: 400, message: "Bad password" };
        const userId = user.id;
        const accessToken = jsonwebtoken_1.default.sign({ email, userId }, config_1.default.jwt.secret, {
            expiresIn: config_1.default.jwt.accessTime,
        });
        const refreshToken = jsonwebtoken_1.default.sign({ userId, email }, config_1.default.jwt.secret, {
            expiresIn: config_1.default.jwt.refreshTime,
        });
        await token_1.default.findOneAndUpdate({ userId }, { jwt: refreshToken, userId }, { upsert: true, new: true, setDefaultsOnInsert: true });
        res.send({ accessToken, refreshToken });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
const token = async (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token)
            throw { status: 400, message: "Must provide a token" };
        const { email, userId } = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        const exists = await token_1.default.findOne({ jwt: token });
        if (!exists)
            throw { status: 400, message: "Log in again" };
        const accessToken = jsonwebtoken_1.default.sign({ email, userId }, config_1.default.jwt.secret, {
            expiresIn: config_1.default.jwt.accessTime,
        });
        res.send({ accessToken, email, userId });
    }
    catch (err) {
        next(err);
    }
};
exports.token = token;
const signUp = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const exists = await user_1.default.find({ email });
        if (exists.length > 0)
            throw { status: 400, message: "email already exists" };
        await user_1.default.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
        });
        res.send({ isSignedUp: true });
    }
    catch (err) {
        next(err);
    }
};
exports.signUp = signUp;
const logout = async (req, res, next) => {
    try {
        const { userId } = res.locals.user;
        await token_1.default.deleteOne({ userId });
        res.send(200);
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
