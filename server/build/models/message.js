"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Number,
        required: true,
    },
});
MessageSchema.set("toJSON", {
    transform: (_, returnedObject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        returnedObject.id = (returnedObject._id.toString());
        delete returnedObject._id;
    },
});
const Message = mongoose_1.default.model("Message", MessageSchema);
exports.default = Message;
