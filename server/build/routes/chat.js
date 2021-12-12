"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_1 = require("../controllers/chat");
const chatRouter = express_1.default.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
chatRouter.post("/message", chat_1.sendMessage);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
chatRouter.get("/message", chat_1.getAllMessages);
exports.default = chatRouter;
