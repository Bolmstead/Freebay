"use strict";

/** Routes for products. */

// const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
// const { ensureAdmin } = require("../middleware/auth");
const Product = require("../models/productModel");
const BridgedTables = require("../models/productModel");
const User = require("../models/userModel");



// const productNewSchema = require("../schemas/productNew.json");
// const productUpdateSchema = require("../schemas/productUpdate.json");
// const productSearchSchema = require("../schemas/productSearch.json");

const router = new express.Router();

/** GET /  =>
 *   { products: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

 // WORKS!!!! (MINIMUM DOES)
router.get("/", async function (req, res, next) {
  const q = req.query;
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

    const products = await Product.getProducts();
    return res.json({ products });

})
//   } catch (err) {
//     return next(err);
//   }
// });

/** GET /[handle]  =>  { product }
 *
 *  product is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

//  FIX!!!!!
router.get("/:id", async function (req, res, next) {
  try {
    const product = await Product.get(req.params.id);
    return res.json({ product });
  } catch (err) {
    return next(err);
  }

});

/** GET /[handle]  =>  { product }
 *
 *  product is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.post("/:productId/bid/:amount", async function (req, res, next) {
  try {
    const productId = req.params.productId;
    const bidAmount = req.params.amount;
    const product = await Product.get(productId);

    if (product.bidPrice > bidAmount) {
      throw new BadRequestError(errs);
    }

    const user = res.locals.user;

    const highestBid = await BridgedTables.highestBid(productId, user.email, amount)
    const addToBidCount = await Product.addToBidCount(productId)

    return res.json({ highestBid, addToBidCount });
  } catch (err) {
    return next(err);
  }

});

/** GET /[handle]  =>  { product }
 *
 *  product is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.delete("/:productId/bid", async function (req, res, next) {
  try {
    const product = await BridgedTables.removeLowerBid(req.params.productId);
    return res.json({ product });
  } catch (err) {
    return next(err);
  }
})
/** GET /[handle]  =>  { product }
 *
 *  product is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

 // FIX!!! USER IS UNDEFINED
router.post("/:productId/winner", async function (req, res, next) {
  try {
    user = res.local.user
    const product = await BridgedTables.wonProduct(req.params.productId, user.email);
    return res.json({ product });
  } catch (err) {
    return next(err);
  }

});

/** POST / { product } =>  { product }
 *
 * product should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: admin
 */

// router.post("/", ensureAdmin, async function (req, res, next) {
//   try {
//     const validator = jsonschema.validate(req.body, productNewSchema);
//     if (!validator.valid) {
//       const errs = validator.errors.map(e => e.stack);
//       throw new BadRequestError(errs);
//     }

//     const product = await Product.create(req.body);
//     return res.status(201).json({ product });
//   } catch (err) {
//     return next(err);
//   }
// });




module.exports = router;
