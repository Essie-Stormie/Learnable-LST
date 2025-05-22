import "dotenv/config";
import express from "express";
import { indexRouter } from "./routes/index.route";
import { connectToDb } from "./utils/db.util";
import { errorMiddleware } from "./middlewares/error.middleware";
import { indexMiddleware } from "./middlewares/index.middleware";

const app = express();

app.use(indexMiddleware);

app.use("/api/v1", indexRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 5000;
startApp();

function startApp() {
  try {
    connectToDb();
    app.listen(PORT, () => console.log("App listening on", PORT));
  } catch (error) {
    console.log("Error connecting to Express: ", error);
  }
}
