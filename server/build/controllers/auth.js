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
exports.logout = exports.signUp = exports.token = exports.login = void 0;
const auth_1 = __importDefault(require("../services/auth"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const tokens = yield auth_1.default.login(email, password);
        res.json(tokens);
    }
    catch (err) {
        next(err);
    }
});
exports.login = login;
const token = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.token;
        const dataObj = yield auth_1.default.token(token);
        res.json(dataObj);
    }
    catch (err) {
        next(err);
    }
});
exports.token = token;
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const isSignedUp = yield auth_1.default.signUp(firstName, lastName, email, password);
        res.send({ isSignedUp });
    }
    catch (err) {
        next(err);
    }
});
exports.signUp = signUp;
const logout = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = res.locals.user;
        const isLoggedOut = yield auth_1.default.logout(userId);
        res.json({ isLoggedOut });
    }
    catch (err) {
        next(err);
    }
});
exports.logout = logout;
