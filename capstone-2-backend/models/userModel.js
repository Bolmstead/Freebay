"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const Notification = require("./NotificationModel");


const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email,  }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(email, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT email,
              username,
              password,
              first_name AS "firstName",
              last_name AS "lastName",
              balance,
              last_login AS "lastLogin"
       FROM users
       WHERE email = $1`,
    [email],
    );
    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        User.dailyReward(user)
        return user;
      }
    }

    throw new UnauthorizedError("Invalid email/password");
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email,  }
   *
   * Throws BadRequestError on duplicates.
   **/
  static async register({ email, username, password, firstName, lastName }) {
    const duplicateCheck = await db.query(
          `SELECT email
           FROM users
           WHERE email = $1`,
        [email],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    // Let user start off with $100
    let balance = 100

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
          `INSERT INTO users
           (email, username, password, first_name, last_name, balance)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING email, username, password, first_name AS firstName, last_name AS lastName, balance`,
        [
          email,
          username,
          hashedPassword,
          firstName,
          lastName,
          balance
        ],
    );

    if (!result) {
      throw new BadRequestError(`Unable to insert into users`);
    }
    const user = result.rows[0];

    Notification.addNotification(user["email"], `Welcome to Freebay! As a welcome gift, we have deposited $100 Freebay bucks into your account! If you have any questions please see our FAQ page.` )
    return user;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, first_name, last_name, , jobs }
   *   where jobs is { id, title, company_handle, company_name, state }
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
          `SELECT email,
                  username,
                  first_name AS "firstName",
                  last_name AS "lastName",
                  balance
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  
    // Grab Products won
    const productsWonRes = await db.query(
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
          WHERE products_won.user_email = $1
          ORDER BY products_won.datetime DESC`, [user["email"]]);

    user.products_won = productsWonRes.rows;

    // console.log("productsWonRes from get() in User model", productsWonRes)

    // Grab Highest Bids
    const highestBidsRes = await db.query(
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
              highest_bids.bid_price AS "bidPrice",
              highest_bids.datetime
          FROM highest_bids
          FULL OUTER JOIN products ON highest_bids.product_id = products.id
          WHERE highest_bids.user_email = $1
          ORDER BY highest_bids.datetime DESC`, [user["email"]]);

    user.highest_bids = highestBidsRes.rows;


    // console.log("ALMOST final user object", user)

    // Grab Notifications
    const notificationsRes = await db.query(
      `SELECT notifications.id,
              notifications.text,
              notifications.related_product_id AS "relatedProductId",
              notifications.was_viewed AS "wasViewed",
              notifications.datetime
        FROM notifications
        WHERE notifications.user_email = $1
        ORDER BY notifications.datetime DESC`, [user.email]);

    user.notifications = notificationsRes.rows;
    console.log("notifications", user.notifications)

    // console.log("notificationsRes from get() in User model", notificationsRes.rows)

    return user;
  }

  static async decreaseBalance(amount, email) {
    const result = await db.query(`UPDATE users 
                      SET balance = balance - $1
                      WHERE email = $2`,[amount, email]);
    if (!result) throw new BadRequestError(`Balance not lowered by ${amount} for user:  ${email}`);
  }


  static async increaseBalance(amount, email) {
    const result = await db.query(`UPDATE users 
                      SET balance = balance + $1
                      WHERE email = $2`,[amount, email]);
    if (!result) throw new BadRequestError(`Balance not increased by ${amount} for user:  ${email}`);

    return result;
  }

  static async updateLastLogin(email) {
    const result = await db.query(`UPDATE users 
                      SET last_login = CURRENT_TIMESTAMP
                      WHERE email = $1
                      RETURNING last_login AS "lastLogin"`,[email]);
    if (!result) throw new BadRequestError(`Unable to update the last login for user: ${email}`);

    return result;
  }

  static async dailyReward(user) {
    let previousLogin = user.lastLogin
    let updateLastLoginResult = await User.updateLastLogin(user.email)
    let currentLogin = updateLastLoginResult.rows[0].lastLogin

    let daysPassed;

    // if (currentLogin.getFullYear() === previousLogin.getFullYear()){
    //   if (currentLogin.getMonth() === previousLogin.getMonth()) {
    //     if (currentLogin.getDay() === previousLogin.getDay()) {
    //       dayspassed = 0
    //     } else {
    //       dayspassed = currentLogin.getDay() - previousLogin.getDay()
    //     }

    //   }
    // }

  }


  static async getHighestBids() {
    const usersHighestBidsRes = await db.query(
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
              highest_bids.bid_price AS "bidPrice"
          FROM highest_bids
          FULL OUTER JOIN products ON highest_bids.product_id = products.id
          ORDER BY highest_bids.datetime DESC`);

    if (!usersHighestBidsRes) throw new BadRequestError(`Undable to getHighestBids in userModel.js`);

    // console.log("getHighestBids in userModel.js", usersHighestBidsRes)

    return usersHighestBidsRes
  }
  


}


module.exports = User;
