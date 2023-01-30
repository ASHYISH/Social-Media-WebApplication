const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");
const app = express();
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;

//configuration

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middlewares

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json({ limit: "10mb" }));

app.use(morgan("common"));
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.status(200).send("ok server");
});

const PORT = process.env.PORT || 4000;
dbConnect();
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
