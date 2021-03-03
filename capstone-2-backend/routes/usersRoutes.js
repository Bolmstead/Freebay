"use strict";

/** Routes for users. */
const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/UserModel");
const Notification = require("../models/NotificationModel");
const HighestBid = require("../models/HighestBidModel");
const ProductWon = require("../models/ProductWonModel");

const { createToken } = require("../helpers/tokens");


const router = express.Router();


router.get("/:username", async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json(user);
  } catch (err) {
    return next(err);
  }
});


router.post("/view_notifications/:username", async function (req, res, next) {
  try {

    await Notification.wasViewed(req.params.username);

    return res.json("success");
  } catch (err) {
    return next(err);
  }
});



module.exports = router;
