"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

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

  static async wonProduct(productId, email) {
    const result = db.query(`INSERT INTO products_won 
                                        (product_id,
                                         user_email)
                             VALUES($1, $2)
                             RETURNING product_id AS "productId",
                                       user_email AS "userEmail"`,
                    [productId, email],);
    const productWon = result.rows[0];
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
    const product = await Product.get(productId)

    // Grab previous bid information and return error if not found
    const prevBidResult = db.query(
      `SELECT product_id AS "productId",
              user_email AS "userEmail",
              bid_price AS "bidPrice"
       FROM highest_bids
       WHERE productId = $1`,
                    [productId]);
    const previousBid = prevBidResult.rows[0];

    if (!previousBid) throw new NotFoundError(`No previous bid found: ${productId}`);

    // Delete previous bid information and return error if not found
    let deletePrevBid = await db.query(
      `DELETE
       FROM highest_bids
       WHERE productId = $1`,
       [productId]);
    const res = deletePrevBid.rows[0];

    if (!deletePrevBid) throw new NotFoundError(`No previous bid found: ${productId}`);

    // Add the highest bidder and price to highest_bids table and return error if not found
    const addHighestBidder = db.query(
       `INSERT INTO highest_bids 
                   (product_id,
                    user_email,
                    bid_price)
        VALUES($1, $2, $3)
        RETURNING product_id AS "productId",
                  user_email AS "userEmail",
                  bid_price AS "bidPrice"`,
            [productId, userEmail, bidPrice],);
    const theHighestBid = addHighestBidder.rows[0];

    if (!theHighestBid) throw new BadRequestError(`Unable to update the highest bid: ${productId}, ${userEmail}, ${bidPrice}`);

    // Add notification of outbid to previous highest bidder
    const notification = `You have been outbid by ${highest_bidder.username} for the item ${product.name}. The current bid is ${bidPrice}. If you would like, please bid again.`

    const addNotificationResult = db.query(
      `INSERT INTO users (notifications)
       VALUES($1)
       RETURNING product_id AS "productId",
                 user_email AS "userEmail",
                 bid_price AS "bidPrice"`,
                    [notification],);
    const addedNotification = addNotificationResult.rows[0];

    if (!addedNotification) throw new BadRequestError(`Unable to update add previous bidder's notification: ${notification}`);
  }
}




module.exports = BridgedTables;
