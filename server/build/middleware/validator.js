"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateSignUp = void 0;
const validator_1 = __importDefault(require("validator"));
const validateSignUp = (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        res.locals.validated =
            validator_1.default.isAlpha(firstName)
                && validator_1.default.isAlpha(lastName)
                && validator_1.default.isEmail(email)
                && validator_1.default.isStrongPassword(password, { minSymbols: 0 });
        if (res.locals.validated)
            next();
        else
            next({ status: 400, message: 'Invalid inputs' });
    }
    catch (error) {
        next(error);
    }
};
exports.validateSignUp = validateSignUp;
const validateLogin = (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        res.locals.validated = validator_1.default.isEmail(email) && validator_1.default.isStrongPassword(password, { minSymbols: 0 });
        if (res.locals.validated)
            next();
        else
            next({ status: 400, message: 'Invalid email or password' });
    }
    catch (error) {
        next(error);
    }
};
exports.validateLogin = validateLogin;
