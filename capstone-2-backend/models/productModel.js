"use strict";

const products1 = require("../products_1");
const products2 = require("../products_2");
const products3 = require("../products_3");

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

  static async getProducts(q) {
    let query = `SELECT products.id,
                        products.name,
                        products.category,
                        products.sub_category AS "subCategory",
                        products.description,
                        products.condition,
                        products.rating,
                        products.num_of_ratings AS "numOfRatings",
                        products.image_url AS "imageUrl",
                        products.market_price AS "marketPrice",
                        products.auction_end_dt AS "auctionEndDt",
                        products.bid_count AS "bidCount",
                        products.is_sold AS "isSold",
                        users.email AS "bidderEmail",
                        users.first_name AS "bidderFirstName",
                        users.last_name AS "bidderLastName",
                        users.username AS "bidderUsername",
                        highest_bids.bid_price AS "bidPrice"
                FROM products
                FULL OUTER JOIN highest_bids ON products.id = highest_bids.product_id
                FULL OUTER JOIN users ON highest_bids.user_email = users.email`;
    let whereExpressions = [];
    let queryValues = []; 
    let paginationQuery = " limit 24 OFFSET ";

    let { page, name, category, subCategory, description, condition, rating, numOfRatings, auctionEndDt} = q;

    // Pagination
    let limit = 24
    let offset
    console.log("page from getProducts product model",page, "typeofpage", typeof(page))

    if (!page) {
      console.log("PAGE IS UNDEFINED")
      offset = 0
    }
    else {
      let pageNum = parseInt(page)
      offset = (pageNum - 1) * limit
    }

    paginationQuery += offset


    console.log("search categories to be used in SQL command","page", page,"name", name, 'category', category, 'subCategory', subCategory, 'description', description, 'condition', condition,'rating', rating, 'numOfRatings', numOfRatings, 'auctionEndDt', auctionEndDt)


    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL

    if (name !== undefined) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    if (category !== undefined) {
      queryValues.push(`%${category}%`);
      whereExpressions.push(`category ILIKE $${queryValues.length}`);
    }

    if (subCategory !== undefined) {
      queryValues.push(`%${subCategory}%`);
      whereExpressions.push(`sub_category ILIKE $${queryValues.length}`);
    }

    if (description !== undefined) {
      queryValues.push(description);
      whereExpressions.push(`description ILIKE $${queryValues.length}`);
    }

    if (condition !== undefined) {
      queryValues.push(condition);
      whereExpressions.push(`condition = $${queryValues.length}`);
    }

    if (rating !== undefined) {
      queryValues.push(rating);
      whereExpressions.push(`rating >= $${queryValues.length}`);
    }

    if (numOfRatings !== undefined) {
      queryValues.push(numOfRatings);
      whereExpressions.push(`num_of_ratings >= $${queryValues.length}`);
    }

    if (auctionEndDt !== undefined) {
      queryValues.push(auctionEndDt);
      whereExpressions.push(`auction_end_dt >= $${queryValues.length}`);
    }


    whereExpressions.push(`is_sold = false`);

    query += " WHERE " + whereExpressions.join(" AND ");

    console.log("query", query)

    query += paginationQuery

    console.log("query", query)
    console.log("queryValues", queryValues)


    // Finalize query and return results

    const findAllRes = await db.query(query, queryValues);
    console.log("result from get products request", findAllRes.rows)
    return findAllRes.rows;
  }

  /** Given a product handle, return data about product.
   *
   * Returns { handle, name, description, numEmployees, logoUrl, jobs }
   *   where jobs is [{ id, title, salary, equity }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async getProductAndBid(id) {
    const productRes = await db.query( 
    `SELECT products.id,
            products.name,
            products.category,
            products.sub_category AS "subCategory",
            products.description,
            products.condition,
            products.rating,
            products.num_of_ratings AS "numOfRatings",
            products.image_url AS "imageUrl",
            products.market_price AS "marketPrice",
            products.auction_end_dt AS "auctionEndDt",
            products.bid_count AS "bidCount",
            products.is_sold AS "isSold",
            highest_bids.user_email AS "bidderEmail",
            highest_bids.bid_price AS "currentBid",
            users.username AS "currentBidderUsername"
    FROM products
    FULL OUTER JOIN highest_bids ON products.id = highest_bids.product_id
    FULL OUTER JOIN users ON highest_bids.user_email = users.email
    WHERE id = $1`,
        [id]);

    console.log("productRes from get() method", productRes.rows[0])
    if (!productRes) throw new NotFoundError(`No product found: ${id}`);

    // const product = productRes.rows[0];
    return productRes.rows[0];
  }


        /** Add all products to database
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

  static async seedProducts() {
    for (let i = 0; i < products1.length; i++) {
      console.log(i)
      const valuesArray =
        [products1[i]["item"], products1[i]["category"], products1[i]["sub_category"], products1[i]["description"], products1[i]["condition"], products1[i]["rating"], products1[i]["num_of_ratings"], products1[i]["image_1"], products1[i]["market_price"], products1[i]["auction_end_dt"]]

      await db.query(`INSERT INTO products (name, category, sub_category, description, condition, rating, num_of_ratings, image_url, market_price, auction_end_dt) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, valuesArray)
      }
    
    for (let i = 0; i < products2.length; i++) {
      console.log(i)
      const valuesArray =
        [products2[i]["item"], products2[i]["category"], products2[i]["sub_category"], products2[i]["description"], products2[i]["condition"], products2[i]["rating"], products2[i]["num_of_ratings"], products2[i]["image_1"], products2[i]["market_price"], products2[i]["auction_end_dt"]]

      await db.query(`INSERT INTO products (name, category, sub_category, description, condition, rating, num_of_ratings, image_url, market_price, auction_end_dt) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, valuesArray)
      }

    for (let i = 0; i < products3.length; i++) {
      console.log(i)
      const valuesArray =
        [products3[i]["item"], products3[i]["category"], products3[i]["sub_category"], products3[i]["description"], products3[i]["condition"], products3[i]["rating"], products3[i]["num_of_ratings"], products3[i]["image_1"], products3[i]["market_price"], products3[i]["auction_end_dt"]]

      await db.query(`INSERT INTO products (name, category, sub_category, description, condition, rating, num_of_ratings, image_url, market_price, auction_end_dt) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, valuesArray)
      }
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

  static async addToBidCount(productId) {
    const result = await db.query(`UPDATE products 
                      SET bid_count = bid_count + 1
                      WHERE id = $1`,[productId]);
    if (!result) throw new NotFoundError(
          `Bid not added to count: ${productId}`);
    console.log("result from addtobidcount", result)
    return result;
  }

  static async addAuctionTime(productId, newDateTime) {
    const result = await db.query(`UPDATE products 
                      SET auction_end_dt = $1
                      WHERE id = $2`,[newDateTime, productId]);
    if (!result) throw new NotFoundError(
          `30 seconds not added to auction time: ${productId}`);
    console.log("result from addAuctionTime", result)
    return result;
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

  static async productSold(productId) {
    const result = await db.query(`UPDATE products 
                      SET is_sold = true
                      WHERE id = $1`,[productId]);
    if (!result) throw new NotFoundError(`No product: ${productId}`);
    console.log("productSold result", result)
    return result;
  }

// Update rating of product

  static async addRating(productId, newRating) {
    // Grab product's rating and number of ratings from database
    const product = await Product.get(productId)
    const rating = parseFloat(product["rating"])
    const numOfRatings = product["numOfRatings"]
    // Calculate the new total rating with the provided user's rating
    const newTotalRating = ((newRating + (rating * numOfRatings))/(numOfRatings+1));

    // Make SQL query to update rating
    const result = await db.query(
      `UPDATE products 
       SET num_of_ratings = num_of_ratings + 1, rating = ${newTotalRating}
       WHERE id = $1`,[productId]);
    if (!result) throw new NotFoundError(`No product: ${productId}`);
    console.log("New Product Rating", result)
    return result;
  }
}

// Product.addRating(785, 5)
// Product.get(785)

Product.addAuctionTime(24)



module.exports = Product;
