"use strict";

/** Routes for users. */
const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/userModel");
const Notification = require("../models/NotificationModel");
const { createToken } = require("../helpers/tokens");
const userAuthSchema = require("../schemas/userAuth.json");
const userRegisterSchema = require("../schemas/userRegister.json");

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


router.post("/view_notifications/:username", async function (req, res, next) {
  try {
    console.log("made it to the usersRoutes /view_notifications/:username route")

    console.log("req.params", req.params)
    await Notification.wasViewed(req.params.username);

    return res.json("success");
  } catch (err) {
    return next(err);
  }
});



module.exports = router;
