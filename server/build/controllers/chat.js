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
exports.getAllMessages = exports.sendMessage = void 0;
const events_1 = require("events");
const chat_1 = __importDefault(require("../services/chat"));
const emitter = new events_1.EventEmitter();
let online = [];
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = {
            email: res.locals.user.email,
            content: req.body.content,
            timestamp: Date.now(),
        };
        const sentMessage = yield chat_1.default.sendMessage(message);
        res.json({ sentMessage });
        emitter.emit('message', sentMessage);
    }
    catch (err) {
        next(err);
    }
});
exports.sendMessage = sendMessage;
const getAllMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const sendOnlineUsers = () => {
        res.write(`data: ${JSON.stringify({ online })} \n\n`);
    };
    try {
        if (!online.includes(res.locals.user.email)) {
            online.push(res.locals.user.email);
        }
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            Connection: "Keep-Alive",
        });
        emitter.addListener('online', sendOnlineUsers);
        emitter.emit('online');
        const messages = yield chat_1.default.getAllMessages();
        res.write(`data: ${JSON.stringify({ messages })} \n\n`);
        emitter.on('message', (newMessage) => {
            res.write(`data: ${JSON.stringify({ newMessage })} \n\n`);
        });
        req.on('close', () => {
            online = online.filter(email => email !== res.locals.user.email);
            emitter.emit('online');
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getAllMessages = getAllMessages;
