import express from 'express';
import cors from 'cors';
// import morgan from 'morgan';
// import morganHandler from './middleware/morgan.js';
import errorHandler from './error-handling/error-handler';
import apiRouter from './routes/api';
import { render } from './controllers/app';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
// app.use(
//   morganHandler,
//   morgan(":method :url :status :res[content-length] - :response-time ms :body")
// );

app.get("/ping", (req, res) => {
  console.log('pong');
  res.send("pong");
});

app.use(express.static("../client/build"));
app.get("/", render);

app.get("/login", render);
app.get("/sign-up", render);
app.get("/chat", render);

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;