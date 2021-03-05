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
const HighestBid = require("../models/HighestBidModel");
// const productNewSchema = require("../schemas/productNew.json");
// const productUpdateSchema = require("../schemas/productUpdate.json");
// const productSearchSchema = require("../schemas/productSearch.json");

const router = new express.Router();


router.get("/", async function (req, res, next) {
  try {
    const q = req.query;
    const result = await Product.getProducts(q);
    return res.json( result );
  } catch (err){
    return next(err)
  }

});

router.get("/recentWinners", async function (req, res, next) {
  try {
    const winners = await ProductWon.getWinsFeed();
    return res.json( winners );
  } catch (err) {
    return next(err);
  }

});

router.get("/auctionsEndingSoon", async function (req, res, next) {
  try {
    const products = await Product.getAuctionsEndingSoon();
    return res.json( products );
  } catch (err) {
    return next(err);
  }

});

router.get("/getWhatsTrending", async function (req, res, next) {
  try {
    const products = await Product.getWhatsTrending();
    return res.json( products );
  } catch (err) {
    return next(err);
  }

});


router.get("/:id", async function (req, res, next) {
  try {
    const product = await Product.getProductAndBid(req.params.id);
    return res.json({ product });
  } catch (err) {
    return next(err);
  }

});



router.post("/:productId/bid/:amount", async function (req, res, next) {
  try {
    const localsUser = res.locals.user;
    const user = await User.get(localsUser["username"])

    const productId = req.params.productId;
    const newBid = req.params.amount;
    const product = await Product.getProductAndBid(productId);


    if (product.highestBid > newBid) {
      throw new BadRequestError(errs);
    }

    await HighestBid.updateBid(product, user, newBid)

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
