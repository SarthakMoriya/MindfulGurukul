import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import userRouter from "./routes/user.js";
import recordRouter from "./routes/record.js";
import { userData } from "./assignmentData.js";
import Record from "./models/record.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // Increase limit as needed

// app.use("/records", recordRouter);
app.use("/auth", userRouter);
app.use("/record", recordRouter);

mongoose
  .connect(
    // process.env.MONGODB_URL.replace("<password>", process.env.MONGODB_PASSWORD)
    process.env.MONGODB_URL
  )
  .then(() => {
    console.log("DB connection established");
  });

app.listen(process.env.PORT, async () => {
  console.log("Server listening on PORT: 8000");
});
