import express from "express";
import { accountRouter } from "./account.route";

export const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
  res.json({ message: "Welcome to finnable" });
});

indexRouter.use("/accounts", accountRouter);
