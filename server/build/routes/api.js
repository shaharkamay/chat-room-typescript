"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../middleware/auth"));
const chat_1 = __importDefault(require("./chat"));
const auth_2 = __importDefault(require("./auth"));
// import { eventsHandler } from '../controllers/eventsController';
const apiRoute = express_1.default.Router();
apiRoute.use("/auth", auth_2.default);
apiRoute.use("/chat", auth_1.default, chat_1.default);
// apiRoute.get("/events", auth, eventsHandler);
exports.default = apiRoute;
