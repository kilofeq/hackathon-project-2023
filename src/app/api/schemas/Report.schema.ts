import { Schema, model, models } from 'mongoose';
import { Animal, animalValues } from '../enums/animalEnum';

const reportSchema = new Schema({
  description:{
    type: String
  },
  photos: {
    type: Array<String>,
    default: [],
  },
  latitude: {
    type: Number,
    require: true
  },
  longitude: {
    type: Number,
    require: true
  },
  user_ids: {
    type: Array<Schema.Types.ObjectId>,
    ref: 'User',
  },
  danger: {
    type: Boolean
  },
  animal: {
    type: String,
    enum: animalValues
  },
  timeOfReport: {
    type: Date
  }
});

export default models.Report || model('Report', reportSchema);
