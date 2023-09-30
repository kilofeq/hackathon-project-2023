import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
});

export default models.User || model('User', userSchema);
