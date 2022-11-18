const express = require("express");
const router = express.Router();
const card = require("../model/card");
const req = require("express/lib/request");

router.get("/", async (req, res) => {
  try {
    const result = await card.find();
    res.send(result);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await user.findOne({ userID: id });
    if (result) {
      res.send(result);
    } else {
      throw new Error("not exist user id");
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  }
});

module.exports = router;
