const express = require("express");
const router = express.Router();
const order = require("../model/order");

router.post("/add_order", async (req, res) => {
  const orderID = req.body.orderID;
  const Ord = await order.findOne({ orderID });
  if (Ord) {
    res.json({ success: false, message: "Your Order is already existed" });
  } else {
    try {
      const newOrder = new order(req.body);
      await newOrder.save();
      res.json({
        success: true,
        message: "Create order successfully",
        data: newOrder,
      });
    } catch (err) {
      console.log(err);
    }
  }
});

router.get("/:orderid", async (req, res) => {
  const orderid = req.params.orderid;
  try {
    const result = await order.findOne({ orderID: orderid });
    if (result) {
      res.send(result);
    } else {
      res.json({
        success: false,
        message: "Does not exist order ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/find_order_cus/:customerid", async (req, res) => {
  const cusID = req.params.customerid;
  try {
    const result = await order.find({ customerID: cusID });
    if (result) {
      res.send(result)
      // console.log(result[0].toObject().date)
      // console.log(result.length)
    } else {
      res.status(400).json.send();
      res.json({
        success: false,
        message: "Does not exist order ",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
