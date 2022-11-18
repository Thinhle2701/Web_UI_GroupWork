const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();
const card = require("./model/card");

const mongoose = require("mongoose");
const { stringify } = require("querystring");
const { Router } = require("express");

app.use(express.json());

mongoose.connect(
  "mongodb+srv://thinh:123@cluster0.ydjcp.mongodb.net/TinderApp",
  (err) => {
    if (!err) console.log("db connected");
    else console.log("db error");
  }
);

var cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello World");
});

const cardRouter = require(__dirname + "/controller/user");
app.use("/api/card", cardRouter);
const videoRouter = require(__dirname + "/controller/video");
app.use("/api/video", videoRouter);

// const cartRouter = require(__dirname + "/controller/cart");
// app.use("/api/cart", cartRouter);

// const orderRouter = require(__dirname + "/controller/order");
// app.use("/api/order", orderRouter);

app.listen(8000, () => console.log("Listening Port 8000..."));
