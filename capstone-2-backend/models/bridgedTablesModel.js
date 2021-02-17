"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Notification = require("../models/NotificationModel");




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
  static async updateBid(product, user, newBid ) {
    // Grab new highest bidder user information and product information
    console.log("product from updateBid method in BridgedTables", product)
    console.log("user from updateBid method in BridgedTables", user)
    console.log("newBid from updateBid method in BridgedTables", newBid)

    const {bidderEmail, currentBid, currentBidderUsername} = product

    console.log("bidderEmail from updateBid method", bidderEmail)
    console.log("currentBid from updateBid method", currentBid)
    console.log("currentBidderUsername from updateBid method", currentBidderUsername)

  

    if (currentBid) {
      // If there is a previous bid, delete the previous bid and
      // increase the previous bidder's balance
      const currentBidInt = parseInt(currentBid)
      const newBidInt = parseInt(newBid)

      console.log("currentBidInt", currentBidInt)
      console.log("newBidInt", newBidInt)

      if (currentBidInt < newBidInt) {
        console.log("bid price is higher than the previous")
        // remove bid
        await db.query(
          `DELETE FROM highest_bids
          WHERE product_id = $1`,
          [product["id"]]);
          console.log("previous bid deleted")

          const auctionEndObj = new Date(product["auctionEndDt"]);
      
          const timeLeft = Date.parse(auctionEndObj) - Date.parse(new Date());
          console.log("timeLeft",timeLeft)

        // add notification to previous bidder
        Notification.addNotification(bidderEmail, `You have been outbid by ${user["username"]}!`, product["id"] )
      
          // if( timeLeft < 60000) {
          //   console.log("timeleft is less than one min")
          //   auctionEndObj.setSeconds(auctionEndObj.getSeconds()+ 30)
          //   console.log("auctionEndObj after 30 seconds",auctionEndObj)
          //   let auctionEndString = auctionEndObj.strftime('%Y-%m-%d %H:%M:%S')
          //   console.log("auctionEndString",auctionEndString)
          //   Product.addAuctionTime(auctionEndString)
          // }
        // increase balance
        await User.increaseUserBalance(currentBidInt, bidderEmail)
      }
      else {
        console.log("bid price is NOT higher than the previous")
        throw new BadRequestError(`Your bid of ${newBid} is not higher than the previous bid of ${currentBid}`);
      }

    }
    // Add the highest bidder and price to highest_bids table and return error if not found
    const addHighestBidder = await db.query(
       `INSERT INTO highest_bids (product_id, user_email, bid_price)
       VALUES ($1, $2, $3)
       RETURNING product_id AS "productId", user_email AS "newBidderEmail", bid_price AS "bidPrice"`, [product["id"], user["email"], newBid]);
    const theHighestBid = addHighestBidder.rows;

    console.log("theHighestBid", theHighestBid)

    console.log("product[id]", product["id"])



    if (!theHighestBid) throw new BadRequestError(`Unable to update the bid: ${productId}, ${newBidderEmail}, ${bidPrice}`);
    else{ Product.addToBidCount(product["id"]);
          User.lowerUserBalance(newBid, user["email"]);
        }

    // Add notification of outbid to previous highest bidder
    // const notification = `You have been outbid by ${newBidder["username"]} for the item ${product["name"]}. The current bid is ${bidPrice}. If you would like, please bid again.`

    // const addNotificationResult = await db.query(
    //   `UPDATE users
    //   SET notifications = $1`, [notification],);

    // if (!addNotificationResult) throw new BadRequestError(`Unable to update add previous bidder's notification: ${notification}`);
  }

}

// BridgedTables.wonProduct(6,"username", 45)
// BridgedTables.wonProduct(16,"username", 69609)



module.exports = BridgedTables;
