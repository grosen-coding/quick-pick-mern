// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import http from "http";
// import mongoose from "mongoose";
// import "dotenv/config";
// // import routes from "./src/routes/index.js";

// // Connect to Mongo Database
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// const port = process.env.PORT || 8000;

// const server = http.createServer(app);

// mongoose.set("strictQuery", false);

// mongoose
//   .connect(
//     "mongodb+srv://gsrcoding:nmtEjltkjRSXJzgl@cluster0.vo6u92v.mongodb.net/quick-pick-flicker-mern",
//     {
//       useNewUrlParser: true,
//     }
//   )
//   .then(() => {
//     console.log("Mongodb connected");
//     server.listen(port, () => {
//       console.log(`Server is listening on port ${port}`);
//     });
//   })
//   .catch((err) => {
//     console.log({ err });
//     process.exit(1);
//   });

//test
