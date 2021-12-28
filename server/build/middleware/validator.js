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
exports.validate2FA = exports.validateLogin = exports.validateSignUp = void 0;
const validator_1 = __importDefault(require("validator"));
const user_1 = __importDefault(require("../models/user"));
const auth_1 = __importDefault(require("../services/auth"));
const validateSignUp = (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = (req.body);
        res.locals.validated =
            validator_1.default.isAlpha(firstName) &&
                validator_1.default.isAlpha(lastName) &&
                validator_1.default.isEmail(email) &&
                validator_1.default.isStrongPassword(password, { minSymbols: 0 });
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
        res.locals.validated =
            validator_1.default.isEmail(email) &&
                validator_1.default.isStrongPassword(password, { minSymbols: 0 });
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
const validate2FA = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = (yield user_1.default.findOne({ email }));
        if (user && user.secret2FA === '')
            return next();
        else if (!('twofactortoken' in req.headers))
            return res.json({ is2FAEnabled: true });
        const twoFactorSecret = user.secret2FA;
        const twoFactorToken = req.headers.twofactortoken;
        if (twoFactorSecret && twoFactorToken) {
            const isValid = auth_1.default.twoFactor.verifyToken(twoFactorSecret, twoFactorToken);
            if (isValid && isValid.delta === 0) {
                next();
            }
            else {
                next({ status: 401, message: '2FA did not succeeded' });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.validate2FA = validate2FA;
