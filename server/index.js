import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import colors from "colors";
const port = process.env.PORT || 3000;
import routes from "./src/routes/index.js";

// Connect Mongoose
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Mongo DB Connected!!: ${connect.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.yellow.underline);
    process.exit(1);
  }
};

connectDB();
// END Mongoose

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`.yellow.underline);
});
