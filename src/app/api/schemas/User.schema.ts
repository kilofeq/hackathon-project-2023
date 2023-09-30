import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String
})

const User = model("User", userSchema);

export default User;
