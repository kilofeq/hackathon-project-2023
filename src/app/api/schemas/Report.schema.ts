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
  firebaseUid: {
    type: String,
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
  createdAt: {
    type: Date,
  },
}, {
  timestamps: {
    createdAt: 'createdAt'
  }
});

export default models.Report || model("Report", reportSchema);
