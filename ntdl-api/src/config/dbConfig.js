import mongoose from "mongoose";

const mongo_url = "mongodb://127.0.0.1:27017/ntdl_fullStack";
export const connectMongo = () => {
  try {
    const conn = mongoose.connect(mongo_url);

    conn && console.log("mongo is connected ");
  } catch (error) {
    console.log(error);
  }
};
