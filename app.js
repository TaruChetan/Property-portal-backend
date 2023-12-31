import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import routes from "./routes/routes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api", routes);
app.listen(process.env.PORT, () => {
  console.log("Server started on port ", process.env.PORT);
});
