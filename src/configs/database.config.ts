import mongoose from "mongoose";
mongoose.set("strictQuery", true);
import logger from "../middlewares/logger.middleware";

export default function connectToMongo() {
  mongoose.connect(process.env.DB_URI!)
    .then(() => {
      logger.info("Connection to database has been established successfully.");
    })
    .catch((err) => {
      logger.error("Unable to connect to database.");
    }
    );
}