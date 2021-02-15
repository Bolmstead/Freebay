"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/userModel");
const { createToken } = require("../helpers/tokens");
// const userNewSchema = require("../schemas/userNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** GET /[email] => { user }
 *
 * Returns { email, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: admin or same user-as-:email
 **/

 // WORKS!!!!
router.get("/:username", async function (req, res, next) {
  console.log("/users/:username")
  try {
    console.log("made it to the usersRoutes /:username route")
    console.log("req.params.username",req.params.username)

    const user = await User.getUserAndNotifications(req.params.username);
    console.log("user from /:username in usersRoutes.js",user)

    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


// /** PATCH /[username] { user } => { user }
//  *
//  * Data can include:
//  *   { firstName, lastName, password, email }
//  *
//  * Returns { username, firstName, lastName, email, isAdmin }
//  *
//  * Authorization required: admin or same-user-as-:username
//  **/

// router.patch("/:username", ensureCorrectUserOrAdmin, async function (req, res, next) {
//   try {
//     const validator = jsonschema.validate(req.body, userUpdateSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const user = await User.update(req.params.username, req.body);
//     return res.json({ user });
//   } catch (err) {
//     return next(err);
//   }
// });



module.exports = router;
