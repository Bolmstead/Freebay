"use strict";

/** Routes for products. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const { authenticateJWT, 
  ensureLoggedIn, 
  ensureLoggedInAndCorrectUser 
} = require("../middleware/auth");
const User = require("../models/userModel");
const Product = require("../models/ProductModel");
const ProductWon = require("../models/ProductWonModel");
const Notification = require("../models/NotificationModel");
const HighestBid = require("../models/HighestBidModel");
// const productNewSchema = require("../schemas/productNew.json");
// const productUpdateSchema = require("../schemas/productUpdate.json");
// const productSearchSchema = require("../schemas/productSearch.json");

const router = new express.Router();


router.get("/", async function (req, res, next) {
  const q = req.query;
  console.log("user", res.locals.user)
  console.log(`req.query from "/" route`, req.query)
  // arrive as strings from querystring, but we want as ints
  // if (q.rating !== undefined) q.rating = +q.rating;
  // if (q.numOfRatings !== undefined) q.numOfRatings = +q.numOfRatings;
  // if (q.highestBidPrice !== undefined) q.highestBidPrice = +q.highestBidPrice;

//   try {
//     const validator = jsonschema.validate(q, productSearchSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

    const products = await Product.getProducts(q);
    return res.json({ products });

})
//   } catch (err) {
//     return next(err);
//   }
// });


router.get("/:id", async function (req, res, next) {
  try {
    console.log(req.params.id)
    const product = await Product.getProductAndBid(req.params.id);
    return res.json({ product });
  } catch (err) {
    return next(err);
  }

});



router.post("/:productId/bid/:amount", async function (req, res, next) {
  try {
    const localsUser = res.locals.user;
    console.log("localsUser from /:productId/bid/:amount", localsUser)
    const user = await User.get(localsUser["username"])
    console.log("user from /:productId/bid/:amount", user)

    const productId = req.params.productId;
    const newBid = req.params.amount;
    const product = await Product.getProductAndBid(productId);

    console.log("productresult from /:productId/bid/:amount",product)

    if (product.highestBid > newBid) {
      console.log("product.highestBid IS NOT > newBid")
      throw new BadRequestError(errs);
    }
    console.log("product from bid route", product)
    console.log("user from bid route", user)
    console.log("newBid from bid route", newBid)

    const updateBid = await HighestBid.updateBid(product, user, newBid)

    return res.json({result: "success"});
  } catch (err) {
    return next(err);
  }

});


 // FIX!!! USER IS UNDEFINED
router.post("/:productId/winner", async function (req, res, next) {
  try {
    user = res.local.user
    const product = await ProductWon.wonProduct(req.params.productId, user.email);
    return res.json({ product });
  } catch (err) {
    return next(err);
  }

});


module.exports = router;
