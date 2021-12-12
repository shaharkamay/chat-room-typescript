"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const auth = (req, res, next) => {
    try {
        const token = req.headers.auth;
        if (!token)
            throw { status: 403, message: "Auth error" };
        const authPayload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
        res.locals.user = authPayload;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
