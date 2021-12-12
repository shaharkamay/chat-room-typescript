"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import morgan from 'morgan';
// import morganHandler from './middleware/morgan.js';
// import errorHandler from './error-handling/error-handler.js';
// import apiRouter from './routes/api.js';
// import { render } from './controllers/app-controller.js';
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(
//   morganHandler,
//   morgan(":method :url :status :res[content-length] - :response-time ms :body")
// );
app.get("/ping", (req, res) => {
    console.log('pong');
    res.send("pong");
});
// app.use(express.static("./build"));
// app.get("/", render);
// app.get("/login", render);
// app.get("/sign-up", render);
// app.get("/chat", render);
// app.use('/api', apiRouter);
// app.use(errorHandler);
exports.default = app;
