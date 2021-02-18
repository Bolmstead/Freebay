"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");
const User = require("./userModel");
const Product = require("./productModel");



const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class Notification {

  
  static async viewNotifications(userEmail) {
    console.log("view Notification method", userEmail)
    await db.query(
      `UPDATE notifications
      SET was_viewed = true
      WHERE user_email = $1
      `, [userEmail]);
  }


  static async addNotification(userEmail, text, relatedProductId ) {
    console.log("addNotification method", userEmail, text, relatedProductId)
  await db.query(
    `INSERT INTO notifications (user_email, text, related_product_id)
    VALUES ($1, $2, $3)
    `, [userEmail, text, relatedProductId]);
  }


}

// Notifications.wonProduct(6,"username", 45)
// Notifications.wonProduct(16,"username", 69609)



module.exports = Notification;
