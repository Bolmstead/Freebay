"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} = require("../expressError");
const User = require("./UserModel");
const Product = require("./ProductModel");
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
    const productName = product.name.substring(0, 50) + "..."


    // console.log("bidderEmail from updateBid method", bidderEmail)
    // console.log("currentBid from updateBid method", currentBid)
    // console.log("currentBidderUsername from updateBid method", currentBidderUsername)
    console.log("currentBid", currentBid)
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
        console.log("bidderEmail in addBid method", bidderEmail)
        console.log("user.email in addBid method", user.email)

        if( bidderEmail !== user.email) {
          Notification.addNotification(bidderEmail, `Oh no! You have been outbid by ${user.username} for the ${productName}`, "outbid", product.id )
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

    HighestBids.addToBidCount(product.id);
    User.decreaseBalance(newBid, user.email);
    Notification.addNotification(user.email, `You have placed a bid on ${productName}`, "bid", product.id)
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

  static async addToBidCount(productId) {
      const result = await db.query(`UPDATE products 
                        SET bid_count = (bid_count + 1)
                        WHERE id = $1`,[productId]);
      if (!result) throw new BadRequestError(
            `Bid not added to count: ${productId}`);
      // console.log("result from addtobidcount", result)
      return result;
    }

  static async getBidsFeed() {
    const bidsFeedRes = await db.query(
      `SELECT products.id,
              products.name,
              products.category,
              products.sub_category AS "subCategory",
              products.description,
              products.condition,
              products.rating,
              products.image_url AS "imageUrl",
              products.auction_end_dt AS "auctionEndDt",
              products.bid_count AS "bidCount",
              products.auction_ended AS "auctionEnded",
              highest_bids.bid_price AS "bidPrice",
              highest_bids.datetime,
              users.username,
              users.email
        FROM highest_bids
        FULL OUTER JOIN products ON highest_bids.product_id = products.id
        FULL OUTER JOIN users ON highest_bids.user_email = users.email
        WHERE products.auction_ended = false AND bid_price > 1
        ORDER BY highest_bids.datetime DESC`);

    if (!bidsFeedRes) throw new BadRequestError(`Undable to getHighestBids in userModel.js`);

    // console.log("getHighestBids in userModel.js", bidsFeedRes)

    return bidsFeedRes.rows
  }
}



module.exports = HighestBids;
