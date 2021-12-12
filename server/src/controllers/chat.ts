import MessageModel from '../models/message';
import { EventEmitter } from 'events';
import { NextFunction, Request, Response } from 'express';
import { NewMessage, Message } from '../types/message';

const emitter = new EventEmitter();
let online: string[] = [];

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const message: NewMessage = {
      email: <string>res.locals.user.email,
      content: <string>req.body.content,
      timestamp: Date.now(),
    };
    const { email, content, timestamp } = message;
    await MessageModel.create({ email, content, timestamp });
    res.status(200).send("Message Sent");
    emitter.emit('message', { email, content, timestamp });
  } catch (err) {
    next(err);
  }
};

const getAllMessages = async (req: Request, res: Response, next: NextFunction) => {
  const sendOnlineUsers = () => {
    res.write(`data: ${JSON.stringify({ online })} \n\n`);
  };

  try {
    if (!online.includes(<string>res.locals.user.email)) {
      online.push(<string>res.locals.user.email);
    }

    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      Connection: "Keep-Alive",
    });

    emitter.addListener('online', sendOnlineUsers);
    emitter.emit('online');

    const messages: Message[] = await MessageModel.find({});

    res.write(`data: ${JSON.stringify({ messages })} \n\n`);

    emitter.on('message', (newMessage: Message) => {
      res.write(`data: ${JSON.stringify({ newMessage })} \n\n`);
    });

    req.on('close', () => {
      online = online.filter(email => email !== <string>res.locals.user.email);
      emitter.emit('online');
    });

  } catch (err) {

    next(err);
  }
};

export { sendMessage, getAllMessages };