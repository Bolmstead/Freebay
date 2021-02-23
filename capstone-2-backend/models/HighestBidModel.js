"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const User = require("./userModel");
const Product = require("./ProductModel");
const ProductWon = require("./ProductWonModel");
const Notification = require("./NotificationModel");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class HighestBids {
  // 

  static async updateBid(product, user, newBid ) {
    // Grab new highest bidder user information and product information
    console.log("product from updateBid method in HighestBids", product)
    console.log("user from updateBid method in HighestBids", user)
    console.log("newBid from updateBid method in HighestBids", newBid)

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
        if( bidderEmail !== user.email) {
          console.log("`You have been outbid by ____!`")
          Notification.addNotification(bidderEmail, `You have been outbid by ${user["username"]}!`, product["id"] )
        }
          // if( timeLeft < 60000) {
          //   console.log("timeleft is less than one min")
          //   auctionEndObj.setSeconds(auctionEndObj.getSeconds()+ 30)
          //   console.log("auctionEndObj after 30 seconds",auctionEndObj)
          //   let auctionEndString = auctionEndObj.strftime('%Y-%m-%d %H:%M:%S')
          //   console.log("auctionEndString",auctionEndString)
          //   Product.addAuctionTime(auctionEndString)
          // }
        // increase balance
        await User.increaseBalance(currentBidInt, bidderEmail)
      }

      if (currentBidInt >= newBidInt) {
        console.log("Bid price is NOT higher than the previous")
        throw new BadRequestError(`Your bid of ${newBid} is not higher than the previous bid of ${currentBid}`);
      }

      if (newBidInt > user.balance) {
        console.log("Insufficient funds")
        throw new BadRequestError(`Insufficient funds`);
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
          User.decreaseBalance(newBid, user["email"]);
          Notification.addNotification(user["email"], `You have placed a bid on ${product["name"]}!`, product["id"] )
        }

  }
  static async deleteBid(id) {
    const result = await db.query(
      `DELETE FROM highest_bids
      WHERE product_id = $1`,
      [id]);
    
    if (!result) throw new NotFoundError(`product not deleted!`);

  }
}



module.exports = HighestBids;
