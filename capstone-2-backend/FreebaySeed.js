"use strict";

const products1 = require("./products_1");
const products2 = require("./products_2");
const products3 = require("./products_3");

const db = require("./db");


/** Related functions for companies. */

class Product {


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
}


// Product.addRating(785, 5)
// Product.get(785)

Product.seedProducts()



