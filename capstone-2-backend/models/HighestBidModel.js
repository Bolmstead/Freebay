"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} = require("../expressError");
const User = require("./userModel");
const Product = require("./ProductModel");
const ProductWon = require("./ProductWonModel");
const Notification = require("./NotificationModel");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class HighestBids {
  // 
  // Method to update a products current bid
  static async updateBid(product, user, newBid ) {
    // Grab new highest bidder user information and product information
    // console.log("product from updateBid method in HighestBids", product)
    // console.log("user from updateBid method in HighestBids", user)
    // console.log("newBid from updateBid method in HighestBids", newBid)

    const {bidderEmail, currentBid, currentBidderUsername} = product

    // console.log("bidderEmail from updateBid method", bidderEmail)
    // console.log("currentBid from updateBid method", currentBid)
    // console.log("currentBidderUsername from updateBid method", currentBidderUsername)

    if (currentBid) {
      // If there is a previous bid, delete the previous bid and
      // increase the previous bidder's balance
      const currentBidInteger = parseInt(currentBid)
      const newBidInteger = parseInt(newBid)

      console.log("currentBidInteger", currentBidInteger)
      console.log("newBidInteger", newBidInteger)

      if (newBidInteger > user.balance) {
        console.log("Insufficient funds")
        throw new ForbiddenError(`Insufficient funds`);
      }

      if (newBidInteger > currentBidInteger) {
        console.log("bid price is higher than the previous")
        // remove the previous bid
        HighestBids.deleteBid(product.id)

          const auctionEndObj = new Date(product.auctionEndObj);
          const timeLeft = Date.parse(auctionEndObj) - Date.parse(new Date());
          console.log("timeLeft",timeLeft)

        // add notification to previous bidder
        if( bidderEmail !== user.email) {
          console.log("`You have been outbid by ${user.username}!`")
          Notification.addNotification(bidderEmail, `You have been outbid by ${user.username}!`, product.id )
        } 

          // if( timeLeft < 60000) {
          //   console.log("timeleft is less than one min")
          //   auctionEndObj.setSeconds(auctionEndObj.getSeconds()+ 30)
          //   console.log("auctionEndObj after 30 seconds",auctionEndObj)
          //   let auctionEndString = auctionEndObj.strftime('%Y-%m-%d %H:%M:%S')
          //   console.log("auctionEndString",auctionEndString)
          //   Product.addAuctionTime(auctionEndString)
          // }

        // increase balance of the previous bidder by the previous bid
        await User.increaseBalance(currentBidInteger, bidderEmail)

      } else {
        console.log("Bid price is NOT higher than the previous")
        throw new BadRequestError(`Your bid of ${newBid} is not higher than the previous bid of ${currentBid}`);
      }
    }

    // Add the highest bidder and price to highest_bids table and return error if not found
    HighestBids.addBid(product.id, user.email, newBid);
    console.log("newBid and user.email", newBid, user.email)
    console.log("product", product)

    User.decreaseBalance(newBid, user.email);
    Product.addToBidCount(product.id);
    Notification.addNotification(user.email, `You have placed a bid on ${product.name}!`, product.id )
  }

  static async deleteBid(id) {
    const result = await db.query(
      `DELETE FROM highest_bids
      WHERE product_id = $1`,
      [id]);
    if (!result) throw new BadRequestError(`product not deleted!`);
  }
  static async addBid(productId, userEmail, newBid) {
    const addHighestBidder = await db.query(
      `INSERT INTO highest_bids (product_id, user_email, bid_price)
      VALUES ($1, $2, $3)
      RETURNING product_id AS "productId", user_email AS "newBidderEmail", bid_price AS "bidPrice"`, [productId, userEmail, newBid]);
    if (!addHighestBidder) throw new BadRequestError(`product not deleted!`);

  }
}



module.exports = HighestBids;
