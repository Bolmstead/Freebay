"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");

/** Related functions for companies. */

class Product {
  /** Create a product (from data), update db, return new product data.
   *
   * data should be { handle, name, description, numEmployees, logoUrl }
   *
   * Returns { handle, name, description, numEmployees, logoUrl }
   *
   * Throws BadRequestError if product already in database.
   * */

  // static async create({ handle, name, description, numEmployees, logoUrl }) {
  //   const duplicateCheck = await db.query(
  //         `SELECT handle
  //          FROM companies
  //          WHERE handle = $1`,
  //       [handle]);

  //   if (duplicateCheck.rows[0])
  //     throw new BadRequestError(`Duplicate product: ${handle}`);

  //   const result = await db.query(
  //         `INSERT INTO companies
  //          (handle, name, description, num_employees, logo_url)
  //          VALUES ($1, $2, $3, $4, $5)
  //          RETURNING handle, name, description, num_employees AS "numEmployees", logo_url AS "logoUrl"`,
  //       [
  //         handle,
  //         name,
  //         description,
  //         numEmployees,
  //         logoUrl,
  //       ],
  //   );
  //   const product = result.rows[0];

  //   return product;
  // }

  /** Find all companies (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - minEmployees
   * - maxEmployees
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ handle, name, description, numEmployees, logoUrl }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT id,
                        name,
                        categories,
                        description,
                        condition,
                        rating,
                        num_of_ratings AS numOfRatings,
                        image_url AS imageUrl,
                        market_price AS marketPrice,
                        highest_bid_price AS highestBidPrice,
                        highest_bidder AS "highestBidder",
                        auction_end_dt AS "auctionEndDt",
                        is_sold AS "isSold"
                 FROM products`;
    let whereExpressions = [];
    let queryValues = [];

    const { name, categories, description, condition, rating, numOfRatings, auctionEndDt, minBid, maxBid } = searchFilters;

    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL

    if (name) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    if (description) {
      queryValues.push(`%${description}%`);
      whereExpressions.push(`description ILIKE $${queryValues.length}`);
    }

    if (categories) {
      queryValues.push(`%${categories}%`);
      whereExpressions.push(`categories ILIKE $${queryValues.length}`);
    }

    if (condition !== undefined) {
      queryValues.push(condition);
      whereExpressions.push(`condition = $${queryValues.length}`);
    }

    if (description !== undefined) {
      queryValues.push(description);
      whereExpressions.push(`description ILIKE $${queryValues.length}`);
    }

    if (rating !== undefined) {
      queryValues.push(rating);
      whereExpressions.push(`rating >= $${queryValues.length}`);
    }

    if (numOfRatings !== undefined) {
      queryValues.push(numOfRatings);
      whereExpressions.push(`numOfRatings >= $${queryValues.length}`);
    }

    if (highestBidPrice !== undefined) {
      queryValues.push(highestBidPrice);
      whereExpressions.push(`highestBidPrice BETWEEN $${queryValues.length} AND $${queryValues.length+1}`);
    }

    whereExpressions.push(`isSold = false`);

    query += " WHERE " + whereExpressions.join(" AND ");


    // Finalize query and return results

    query += " ORDER BY name";
    const findAllRes = await db.query(query, queryValues);
    return findAllRes.rows;
  }

  /** Given a product handle, return data about product.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const productRes = await db.query(
      `SELECT id,
              name,
              categories,
              description,
              condition,
              rating,
              num_of_ratings AS numOfRatings,
              image_url AS imageUrl,
              market_price AS marketPrice,
              highest_bid_price AS highestBidPrice,
              highest_bidder AS "highestBidder",
              auction_end_dt AS "auctionEndDt",
              is_sold AS "isSold"
      FROM products
           WHERE id = $1`,
        [id]);

    const product = productRes.rows[0];

    if (!product) throw new NotFoundError(`No product: ${id}`);

    return product;
  }

    /** Add all products
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async seedProductsToDatabase() {
    const querySql = `
      INSERT INTO products (name, category, sub_category, description, condition, 
                          rating, num_of_ratings, image_url, market_price, auction_end_dt)
      VALUES `;
    const result = await db.query(querySql);
    const added = result.rows[0];

    if (!added) throw new NotFoundError(`Bid not added to count: ${productId}`);

    return added;

    /** Update product as sold.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async addToBidCount(productId) {
    const querySql = `UPDATE products 
                      SET bid_count = bid_count + 1,
                      WHERE id = ${productId}`;
    const result = await db.query(querySql);
    const added = result.rows[0];

    if (!added) throw new NotFoundError(`Bid not added to count: ${productId}`);

    return added;
  }


    /** Update product as sold.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, description, numEmployees, logoUrl}
   *
   * Returns {handle, name, description, numEmployees, logoUrl}
   *
   * Throws NotFoundError if not found.
   */

  static async updateProductSold(productId) {
    const querySql = `UPDATE products 
                      SET is_sold = false,
                      WHERE id = ${productId}`;
    const result = await db.query(querySql);
    const product = result.rows[0];

    if (!product) throw new NotFoundError(`No product: ${productId}`);

    return product;
  }

  /** Delete given product from database; returns undefined.
   *
   * Throws NotFoundError if product not found.
   **/

  // static async remove(handle) {
  //   const result = await db.query(
  //         `DELETE
  //          FROM companies
  //          WHERE handle = $1
  //          RETURNING handle`,
  //       [handle]);
  //   const product = result.rows[0];

  //   if (!product) throw new NotFoundError(`No product: ${handle}`);
  // }
}


module.exports = Product;
