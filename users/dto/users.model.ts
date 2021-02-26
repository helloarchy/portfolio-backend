import mongoose, { Document, Schema } from "mongoose";

export interface UserDto extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  permissionLevel?: number;
}

const UserSchema = new Schema({
  email: {
    required: [true, "Email required!"],
    type: String,
  },
  password: {
    required: [true, "Password required!"],
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  permissionLevel: {
    type: Number,
  },
});

export default mongoose.model<UserDto>("User", UserSchema);
