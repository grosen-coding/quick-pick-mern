import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import http from "http";
// import colors from "colors";
// import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
// import connectDB from "./config/db.js";
const port = process.env.PORT || 3000;

import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

// mongoose.set("strictQuery", false);

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`Mongo DB Connected!`);
//     server.listen(port, () => {
//       console.log(`Server is listening on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log({ err });
//     process.exit(1);
//   });

const app = express();
// const server = http.createServer(app);

// console.log(process.env);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

// Server

// Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }

app.listen(port, () => console.log(`Server started on port ${port}`));
