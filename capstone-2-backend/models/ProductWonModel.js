"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const User = require("./userModel");
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

}

module.exports = ProductsWon;
