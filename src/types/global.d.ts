import mongoose from "mongoose";

declare global {
  type ObjectId = mongoose.Types.ObjectId;
  interface RecursiveRecord<T = string> {
    [key: string]: T | RecursiveRecord<T>;
  }
}
