import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import colors from "colors";
import routes from "./src/routes/index.js";

// Connect Mongoose
// mongoose.set("strictQuery", false);

// const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.MONGO_URI);
//     console.log(
//       `Mongo DB Connected!!: ${connect.connection.host}`.cyan.underline
//     );
//   } catch (error) {
//     console.log(`Error: ${error.message}`.red.underline);
//     process.exit(1);
//   }
// };

// connectDB();
// END Mongoose

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

// Server
const server = http.createServer(app);

const port = process.env.PORT || 8000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });

// END Server
