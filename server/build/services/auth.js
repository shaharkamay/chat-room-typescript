"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const token_1 = __importDefault(require("../models/token"));
const user_1 = __importDefault(require("../models/user"));
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (yield user_1.default.findOne({ email }));
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
    yield token_1.default.findOneAndUpdate({ userId }, { jwt: refreshToken, userId }, { upsert: true, new: true, setDefaultsOnInsert: true });
    return { accessToken, refreshToken };
});
const token = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        throw { status: 400, message: "Must provide a token" };
    const { email, userId } = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    const exists = yield token_1.default.findOne({ jwt: token });
    if (!exists)
        throw { status: 400, message: "Log in again" };
    const accessToken = jsonwebtoken_1.default.sign({ email, userId }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.accessTime,
    });
    return { accessToken, email, userId };
});
const signUp = (firstName, lastName, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const exists = yield user_1.default.find({ email });
    if (exists.length > 0)
        throw { status: 400, message: "email already exists" };
    const user = yield user_1.default.create({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
    });
    return user ? true : false;
});
const logout = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { deletedCount } = yield token_1.default.deleteOne({ userId });
    return deletedCount > 0;
});
exports.default = {
    login,
    token,
    signUp,
    logout
};
