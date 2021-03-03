"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");



const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class Notification {

  static async wasViewed(username) {
    console.log("view Notification method", username)
    await db.query(
      `UPDATE notifications
      SET was_viewed = true
      WHERE user_email = $1
      `, [username]);
  }

  static async addNotification(userEmail, text, relatedProductId ) {
    console.log("addNotification method", userEmail, text, relatedProductId)
  await db.query(
    `INSERT INTO notifications (user_email, text, related_product_id)
    VALUES ($1, $2, $3)
    `, [userEmail, text, relatedProductId]);
  }
}



module.exports = Notification;
