"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username, first_name, last_name, email,  }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

   // ISSUE WITH INVALID PASSWORD/USERNAME. I BELEIVE IT IS FROM ASYNC/AWAIT ISSUES. BOTH RESULT AND USER ARE UNDEFINED, BUT COULD BE DEFINED IF WAIT FOR RESULT
  static async authenticate(email, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT email,
              username,
              first_name AS "firstName",
              last_name AS "lastName",
              balance,
              notifications
       FROM users
       WHERE password = $1`,
    [password],
    );
    console.log("result from User.authenticate", result)

    const user = result.rows[0];
    console.log("user from User.authenticate", user)

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
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

  static async register(
      { email, username, password, firstName, lastName }) {
    console.log("User model register method")
    const duplicateCheck = await db.query(
          `SELECT email
           FROM users
           WHERE email = $1`,
        [email],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate email: ${username}`);
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

    const user = result.rows[0];
    console.log("user from register method", user)
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
                  balance,
                  notifications
           FROM users
           WHERE username = $1`,
        [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
      console.log("get method from user class", user)
    return user;
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

  // static async update(username, data) {
  //   if (data.password) {
  //     data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
  //   }

  //   const { setCols, values } = sqlForPartialUpdate(
  //       data,
  //       {
  //         firstName: "first_name",
  //         lastName: "last_name",
  //         : "",
  //       });
  //   const usernameVarIdx = "$" + (values.length + 1);

  //   const querySql = `UPDATE users 
  //                     SET ${setCols} 
  //                     WHERE username = ${usernameVarIdx} 
  //                     RETURNING username,
  //                               first_name AS "firstName",
  //                               last_name AS "lastName",
  //                               email,
  //                                AS ""`;
  //   const result = await db.query(querySql, [...values, username]);
  //   const user = result.rows[0];

  //   if (!user) throw new NotFoundError(`No user: ${username}`);

  //   delete user.password;
  //   return user;
  // }

  /** Delete given user from database; returns undefined. */

  // static async remove(username) {
  //   let result = await db.query(
  //         `DELETE
  //          FROM users
  //          WHERE username = $1
  //          RETURNING username`,
  //       [username],
  //   );
  //   const user = result.rows[0];

  //   if (!user) throw new NotFoundError(`No user: ${username}`);
  // }

}

const user = {
  email: "asdfasdf@test.com",
  username: "useddr123",
  password: "blah",
  firstName: "John2",
  lastName: "Johnson2"
}
// User.get("asdfasdf@test.com")
// User.register(user)

module.exports = User;
