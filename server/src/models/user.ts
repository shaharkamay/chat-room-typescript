import mongoose, { Schema } from 'mongoose';
import { User } from '../types/user';

const UserSchema: Schema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
});

UserSchema.set("toJSON", {
	transform: (_, returnedObject) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		returnedObject.id = <string>(returnedObject._id.toString());
		delete returnedObject._id;
	},
});

const User = mongoose.model<User>('User', UserSchema);
export default User ;