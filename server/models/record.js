import mongoose from "mongoose";

const record = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: Number, required: true, unique: true },
  },
  { timestamps: true }
);

const studentRecord = mongoose.model("stuRecord", record);

export default studentRecord;
