import { Schema, model, models } from 'mongoose';

const reportSchema = new Schema({
  name: String,
  photos: {
    type: Array<String>,
    default: [],
  },
  latitude: Number,
  longtitude: Number,
  user_ids: {
    type: Array<Schema.Types.ObjectId>,
    ref: 'User',
  },
});

export default models.Report || model('Report', reportSchema);
