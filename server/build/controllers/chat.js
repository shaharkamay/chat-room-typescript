"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllMessages = exports.sendMessage = void 0;
const message_1 = __importDefault(require("../models/message"));
const events_1 = require("events");
const emitter = new events_1.EventEmitter();
let online = [];
const sendMessage = async (req, res, next) => {
    try {
        const message = {
            email: res.locals.user.email,
            content: req.body.content,
            timestamp: Date.now(),
        };
        const { email, content, timestamp } = message;
        await message_1.default.create({ email, content, timestamp });
        res.status(200).send("Message Sent");
        emitter.emit('message', { email, content, timestamp });
    }
    catch (err) {
        next(err);
    }
};
exports.sendMessage = sendMessage;
const getAllMessages = async (req, res, next) => {
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
        const messages = await message_1.default.find({});
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
};
exports.getAllMessages = getAllMessages;
