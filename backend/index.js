import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
//import http from "http";
import colors from "colors";
import path from "path";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";
import url from "url";

const port = process.env.PORT || 3000;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Mongo DB Connected!`.cyan.underline);
    // server.listen(port, () => {
    //   console.log(`Server is listening on port ${port}`.green.italic);
    // });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });

const app = express();

// console.log(process.env);

// const corsOptions = {
//   origin: "https://quick-flick-picker.herokuapp.com",
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

// Server
// const server = http.createServer(app);
console.log("Dir name-=", __dirname);
// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

app.listen(port, () => console.log(`Server started on port ${port}`));
