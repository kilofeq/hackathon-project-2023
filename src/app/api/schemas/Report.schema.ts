import { Schema, model, models } from 'mongoose';
import { Animal } from '../enums/animalEnum';

const reportSchema = new Schema({
  description: {
    type: String,
  },
  photos: {
    type: Array<String>,
    default: [],
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  danger: {
    type: Boolean,
    required: true,
  },
  animal: {
    type: String,
    enum: Animal,
    required: true,
  },
  timeOfReport: {
    type: Date,
    default: Date.now(),
    expires: 3600,
  },
});

export default models.Report || model('Report', reportSchema);
