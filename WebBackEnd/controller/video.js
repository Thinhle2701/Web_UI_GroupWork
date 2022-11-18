const express = require("express");
const router = express.Router();
const card = require("../model/card");
const req = require("express/lib/request");
const video = require("../model/video");

router.post("/add_user", async (req, res) => {
  const { username, password, email, url } = req.body;
  const User = await user.findOne({ username });
  if (User) {
    return res
      .status(400)
      .json({ success: false, message: "Username is already exists" });
  } else {
    let countUser = await user.countDocuments();
    const hashPwd = await argon2.hash(password);
    if (!countUser) {
      newId = "User_01";
    }
    if (countUser < 9) {
      countUser++;
      newId = "User_0" + countUser;
    } else {
      countAdmin++;
      newId = "User_" + countUser;
    }
    try {
      const userNew = new user({
        userID: newId,
        username: username,
        password: hashPwd,
        email: email,
        login_type: "normal",
        url: url,
      });
      await userNew.save();
      res.json({ success: true, message: "Create user successfully" });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/add_user_external", async (req, res) => {
  const { username, email, login_type, url, cartID } = req.body;
  const User = await user.findOne({ username });
  if (User) {
    return res
      .status(400)
      .json({ success: false, message: "Username is already exists" });
  } else {
    let countUser = await user.countDocuments();
    if (!countUser) {
      newId = "User_01";
    }
    if (countUser < 9) {
      countUser++;
      newId = "User_0" + countUser;
    } else {
      countAdmin++;
      newId = "User_" + countUser;
    }
    try {
      const userNew = new user({
        userID: newId,
        username: username,
        password: " ",
        email: email,
        login_type: login_type,
        url: url,
        cartID: cartID,
      });
      await userNew.save();
      res.json({
        success: true,
        message: "Create user external successfully",
        data: userNew,
      });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Missing user name or password" });
  }
  try {
    const User = await user.findOne({ username });
    if (!User) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user name or password" });
    }
    const passwordValid = await argon2.verify(User.password, password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect user name or password" });
    }

    res.send(User);

    console.log(User);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await video.find();
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

router.post("/find_google_account", async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Missing username or email" });
  }
  try {
    const User = await user.findOne({
      username: username,
      email: email,
      login_type: "google",
    });
    res.send(User);

    console.log(User);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put("/update_cart/:id", (req, res) => {
  var id = req.params.id;
  const cartID = req.body.cartID;
  user.findOne({ userID: id }, function (err, foundObject) {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundObject) {
        res.status(404).send();
      } else {
        if (req.body.cartID) {
          // foundObject.line = req.body.line_items;
          foundObject.cartID = req.body.cartID;
        }
        foundObject.save(function (err, updatedObject) {
          if (err) {
            console.log(err);
            res.status(500).send();
          } else {
            res.send(updatedObject);
            console.log(updatedObject);
          }
        });
      }
    }
  });
});
module.exports = router;
