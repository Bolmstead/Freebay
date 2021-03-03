"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const Product = require("./ProductModel");
const HighestBid = require("./HighestBidModel");
const Notification = require("./NotificationModel");

const { BCRYPT_WORK_FACTOR } = require("../config.js");


class ProductsWon {
  // When a user wins a product
  static async wonProduct(productId, productName, userEmail, bidPrice ){
    const productWonRes = await db.query(
    `INSERT INTO products_won (product_id, user_email, bid_price)
    VALUES ($1, $2, $3)
    RETURNING product_id AS "productId", user_email AS "userEmail", bid_price AS "bidPrice"`, [productId, userEmail, bidPrice]);

    if (!productWonRes) throw new NotFoundError(`Winning Product not added to Products Won table`);

    HighestBid.deleteBid(productId)
    Product.auctionEnded(productId)
    Notification.addNotification(userEmail, `Congrats! You won the auction for a ${productName}!`, productId)

    console.log("productWonRes from addProductWon()", productWonRes)

    return productWonRes;

  }

  static async getWinsFeed() {
    const winsFeedRes = await db.query(
      `SELECT products.id,
              products.name,
              products.category,
              products.sub_category AS "subCategory",
              products.description,
              products.condition,
              products.rating,
              products.num_of_ratings AS "numOfRatings",
              products.image_url AS "imageUrl",
              products.starting_bid AS "startingBid",
              products.auction_end_dt AS "auctionEndDt",
              products.bid_count AS "bidCount",
              products.auction_ended AS "auctionEnded",
              products_won.bid_price AS "bidPrice",
              products_won.datetime
        FROM products_won
        FULL OUTER JOIN products ON products_won.product_id = products.id
        ORDER BY products_won.datetime DESC
        LIMIT 5`);

    if (!winsFeedRes) throw new BadRequestError(`Unable to getHighestBids in userModel.js`);

    // console.log("getHighestBids in userModel.js", winsFeedRes)

    return winsFeedRes.rows
    }

}

module.exports = ProductsWon;
