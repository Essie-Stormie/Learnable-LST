import "dotenv/config";
import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI!);
    return connection;
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
};

// Make populations globally apply to POJO and JSONs
mongoose.set("toJSON", { getters: true, virtuals: true });
mongoose.set("toObject", { getters: true, virtuals: true });
