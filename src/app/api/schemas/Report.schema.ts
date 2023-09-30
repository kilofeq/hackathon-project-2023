import { Schema, model } from 'mongoose';

const reportSchema = new Schema({
  name: String,
  photo: {
    type: String,
    required: false,
    default: null,
  },
  latitude: String,
  longtitude: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Report = model('Report', reportSchema);

export default Report;
