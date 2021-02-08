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

  static async wonProduct(productId, email, bidPrice) {
    const product = await Product.get(productId)

    if (!product) {
      throw new BadRequestError(`Product doesn't exist: ${productId}`);
    }

    if (product["isSold"]) {
      throw new BadRequestError(`Product has already been sold: ${productId}`);
    }
    
    const productSoldResult = Product.productSold(productId)

    console.log("productSoldResult ",productSoldResult)

    const result = db.query(`INSERT INTO products_won 
                                        (product_id,
                                         user_email, bid_price)
                             VALUES($1, $2, $3)
                             RETURNING product_id AS "productId",
                                       user_email AS "userEmail",
                                       bid_price AS "bidPrice"`,
                    [productId, email, bidPrice],);
    const productWon = result.rows[0];
    console.log("productWon",productWon)
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

  static async updateBid(productId, userEmail, bidPrice) {
    // Grab new highest bidder user information and product information
    const highest_bidder = await User.get(userEmail)
    console.log("highest_bidder",highest_bidder)

    
    const product = await Product.get(productId)
    console.log("product",product)


    // Grab previous bid information and return error if not found
    const prevBidResult = await db.query(
      `SELECT product_id AS "productId",
              user_email AS "userEmail",
              bid_price AS "bidPrice"
       FROM highest_bids
       WHERE productId = $1, $2`,
                    [productId, userEmail]);

    const previousBid = prevBidResult.rows;
    console.log("previousbid",previousBid)


    if (previousBid !== "undefined") {
      // If there is a previous bid, delete the previous bid and return error if not found

      // CREATE CODE HERE THAT REJECTS A BID IF LOWER THAN THE PREVIOUS

      console.log("previous bid is defined")

      await db.query(
        `DELETE FROM highest_bids
        WHERE productId = $1`,
        [productId]);
    }
    // Add the highest bidder and price to highest_bids table and return error if not found
    const addHighestBidder = await db.query(
       `INSERT INTO highest_bids (product_id, user_email,bid_price)
        VALUES (${productId}, ${userEmail}, ${bidPrice})
        RETURNING product_id AS "productId", user_email AS "userEmail", bid_price AS "bidPrice"`);
    const theHighestBid = addHighestBidder.rows;

    if (!theHighestBid) throw new BadRequestError(`Unable to update the bid: ${productId}, ${userEmail}, ${bidPrice}`);

    // Add notification of outbid to previous highest bidder
    const notification = `You have been outbid by ${highest_bidder.username} for the item ${product.name}. The current bid is ${bidPrice}. If you would like, please bid again.`

    const addNotificationResult = await db.query(
      `INSERT INTO users (notifications)
       VALUES($1)`, [notification],);

    if (!addNotificationResult) throw new BadRequestError(`Unable to update add previous bidder's notification: ${notification}`);
  }
}


// BridgedTables.wonProduct(6,"asdfasdf@test.com", 45)
// BridgedTables.updateBid(12,"asdfasdf@test.com", 900)


module.exports = BridgedTables;
