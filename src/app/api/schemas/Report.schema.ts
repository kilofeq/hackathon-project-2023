import { Schema, model, models } from 'mongoose';

const reportSchema = new Schema({
  name: String,
  photos: {
    type: Array<String>,
    default: [],
  },
  latitude: {
    type: Number,
    require: true
  },
  longtitude: {
    type: Number,
    require: true
  },
  user_ids: {
    type: Array<Schema.Types.ObjectId>,
    ref: 'User',
  },
  danger: {
    type: Boolean
  }
  /**
   To add:
   Description (could be optional),
   timeOfReport,
   Danger??
  */
});

export default models.Report || model('Report', reportSchema);
