import mongoose from "mongoose";

export const connectMongo = () => {
  try {
    console.log(process.env.MONGO_URL);
    const conn = mongoose.connect(process.env.MONGO_URL);

    conn && console.log("mongo is connected ");
  } catch (error) {
    console.log(error);
  }
};
