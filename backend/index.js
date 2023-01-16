import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import colors from "colors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongo DB Connected!`.cyan.underline);
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`.green.italic);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });

const app = express();

// console.log(process.env);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

// Server
const server = http.createServer(app);

// Serve frontend
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(
//       path.resolve(__dirname, "../", "frontend", "build", "index.html")
//     )
//   );
// } else {
//   app.get("/", (req, res) => res.send("Please set to production"));
// }
