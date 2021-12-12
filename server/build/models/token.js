"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TokenSchema = new mongoose_1.default.Schema({
    jwt: String,
    userId: mongoose_1.default.Types.ObjectId,
});
TokenSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        returnedObject.id = (returnedObject._id.toString());
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
const Token = mongoose_1.default.model('Token', TokenSchema);
exports.default = Token;
