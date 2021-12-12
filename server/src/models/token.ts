import mongoose, { Schema } from 'mongoose';
import { Token } from '../types/token';

const TokenSchema: Schema = new mongoose.Schema({
  jwt: String,
  userId: mongoose.Types.ObjectId,
});

TokenSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    returnedObject.id = <string>(returnedObject._id.toString());
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Token = mongoose.model<Token>('Token', TokenSchema);
export default Token;