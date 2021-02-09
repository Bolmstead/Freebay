"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const User = require("../models/userModel");
const Product = require("../models/productModel");


const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class BridgedTables {
    /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email,  }
   *
   * Returns { username, firstName, lastName, email,  }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */
  // WORKS!!!!!!!!!!11
  static async wonProduct(productId, username, bidPrice) {
    const productWinner = await User.get(username)

    if (!productWinner) {
      throw new BadRequestError(`Product doesn't exist: ${productId}`);
    }

    console.log("productWinner", productWinner)
    const userEmail = productWinner["email"]


    const product = await Product.get(productId)

    if (!product) {
      throw new BadRequestError(`Product doesn't exist: ${productId}`);
    }

    if (product["isSold"]) {
      throw new BadRequestError(`Product has already been sold: ${productId}`);
    }

    console.log("productSoldResult ", productSoldResult)

    const result = db.query(
      `INSERT INTO products_won (product_id, user_email, bid_price)
      VALUES ($1, $2, $3)
      RETURNING product_id AS "productId", user_email AS "userEmail", bid_price AS "bidPrice"`, [productId, userEmail, bidPrice]);
    const productWon = result.rows[0];
    const productSoldResult = Product.productSold(productId)
    return productWon
  }

      /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { firstName, lastName, password, email,  }
   *
   * Returns { username, firstName, lastName, email,  }
   *
   * Throws NotFoundError if not found.
   *
   * WARNING: this function can set a new password or make a user an admin.
   * Callers of this function must be certain they have validated inputs to this
   * or a serious security risks are opened.
   */
   // WORKS!!!
  static async updateBid(productId, username, bidPrice) {
    // Grab new highest bidder user information and product information
    const highest_bidder = await User.get(username)
    console.log("highest_bidder",highest_bidder)
    const userEmail = highest_bidder["email"]

    const product = await Product.get(productId)
    console.log("product",product)


    // Grab previous bid information and return error if not found
    const prevBidResult = await db.query(
      `SELECT product_id AS "productId",
              user_email AS "userEmail",
              bid_price AS "bidPrice"
       FROM highest_bids
       WHERE product_id = $1 AND user_email = $2`,
                    [product['id'], userEmail]);

    const previousBid = prevBidResult.rows[0];



    if (prevBidResult.rows.length >= 1) {
      // If there is a previous bid, delete the previous bid and return error if not found
      const previousBidPrice = parseInt(previousBid["bidPrice"])

      if (previousBidPrice < bidPrice) {
        console.log("bid price is higher than the previous")
        await db.query(
          `DELETE FROM highest_bids
          WHERE product_id = $1`,
          [productId]);
          console.log("previous bid deleted")
      }
      else {
        console.log("bid price is NOT higher than the previous")
        throw new BadRequestError(`Your bid of ${bidPrice} is not higher than the previous bid of ${previousBidPrice}`);
      }

    }
    // Add the highest bidder and price to highest_bids table and return error if not found
    const addHighestBidder = await db.query(
       `INSERT INTO highest_bids (product_id, user_email, bid_price)
       VALUES ($1, $2, $3)
       RETURNING product_id AS "productId", user_email AS "userEmail", bid_price AS "bidPrice"`, [productId, userEmail, bidPrice]);
    const theHighestBid = addHighestBidder.rows;

    console.log("theHighestBid", theHighestBid)

    if (!theHighestBid) throw new BadRequestError(`Unable to update the bid: ${productId}, ${userEmail}, ${bidPrice}`);

    // Add notification of outbid to previous highest bidder
    // const notification = `You have been outbid by ${highest_bidder["username"]} for the item ${product["name"]}. The current bid is ${bidPrice}. If you would like, please bid again.`

    // const addNotificationResult = await db.query(
    //   `UPDATE users
    //   SET notifications = $1`, [notification],);

    // if (!addNotificationResult) throw new BadRequestError(`Unable to update add previous bidder's notification: ${notification}`);
  }
}


// BridgedTables.wonProduct(6,"username", 45)
// BridgedTables.wonProduct(16,"username", 69609)


module.exports = BridgedTables;
