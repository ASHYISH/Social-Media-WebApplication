const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");
const app = express();
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const postsRouter = require("./routers/postsRouter");

const morgan = require("morgan");

//middlewares

app.use(express.json());
app.use(morgan("common"));
app.use("/auth", authRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.status(200).send("ok server");
});

const PORT = process.env.PORT || 4000;
dbConnect();
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
