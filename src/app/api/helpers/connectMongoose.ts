import mongoose from 'mongoose';

const connectMongoose = () => {
  if (!process.env.MONGOOSE_CONNECTION_URI) {
    throw new Error('Missing MONGOOSE_CONNECTION_URI');
  }
  return mongoose.connect(process.env.MONGOOSE_CONNECTION_URI);
};

export default connectMongoose;
