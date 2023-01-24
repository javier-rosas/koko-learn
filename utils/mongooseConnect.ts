import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

export const connectMongo = async () =>
  mongoose.connect(process.env.NEXT_APP_MONGO_URI!, options, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log("MongoDB connection successful");
  });
