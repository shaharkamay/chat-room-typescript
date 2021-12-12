import mongoose, { Schema } from 'mongoose';
import { Message } from '../types/message';

const MessageSchema: Schema = new mongoose.Schema({
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
    returnedObject.id = <string>(returnedObject._id.toString());
    delete returnedObject._id;
  },
});

const Message = mongoose.model<Message>("Message", MessageSchema);
export default Message;