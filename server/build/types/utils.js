"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseString = exports.toLoggedUser = void 0;
const toLoggedUser = ({ email, password }) => {
    const loggedUser = {
        email: parseString(email),
        password: parseString(password),
    };
    return loggedUser;
};
exports.toLoggedUser = toLoggedUser;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (str) => {
    if (!str || !isString(str)) {
        throw new Error('Incorrect or missing string');
    }
    return str;
};
exports.parseString = parseString;
