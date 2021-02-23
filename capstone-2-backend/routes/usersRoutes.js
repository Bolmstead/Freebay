"use strict";

/** Routes for users. */

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/userModel");
const Notification = require("../models/NotificationModel");
const { createToken } = require("../helpers/tokens");


const router = express.Router();



router.get("/:username", async function (req, res, next) {
  console.log("/users/:username")
  try {
    console.log("made it to the usersRoutes /:username route")
    // console.log("req.params.username",req.params.username)

    const user = await User.get(req.params.username);
    // console.log("user in /:username route", user )

    return res.json(user);
  } catch (err) {
    return next(err);
  }
});


router.post("/view_notifications/:email", async function (req, res, next) {
  try {
    console.log("made it to the usersRoutes /view_notifications/:username route")

    console.log("req.params", req.params)
    await Notification.viewNotifications(req.params.email);

    return res.json("success");
  } catch (err) {
    return next(err);
  }
});



module.exports = router;
