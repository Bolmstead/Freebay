"use strict";

const products1 = require("./products_1");
const products2 = require("./products_2");
const products3 = require("./products_3");

const db = require("./db");


/** Related functions for companies. */

class SeedProducts{

  static randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  static randomRating() {
    return (Math.floor(Math.random() * 50)) / 10
  }

  static randomNumberOfRatings() {
    return (Math.floor(Math.random() * 1111))
  }


  static async seedProducts() {
    for (let i = 0; i < products1.length; i++) {
      console.log(i)
      const {item, category, sub_category, description, condition, image_1, market_price} = products1[i]

      // Create Random DateTime object
      let auction_end_dt = SeedProducts.randomDate(new Date(2021, 3, 5), new Date())
      console.log("auction_end_dt", auction_end_dt)

      // Create starting price as half of the product's actual price
      let starting_price = market_price * .5

      // Grab random rating and number of ratings
      const num_of_ratings = SeedProducts.randomNumberOfRatings()
      const rating = SeedProducts.randomRating()

      const valuesArray =
        [item, category, sub_category, description, condition, rating, num_of_ratings, image_1, starting_price, auction_end_dt]

      await db.query(`INSERT INTO products (name, category, sub_category, description, condition, rating, num_of_ratings, image_url, market_price, auction_end_dt) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, valuesArray)
      }
    
    for (let i = 0; i < products2.length; i++) {
      console.log(i)
      const {item, category, sub_category, description, condition, image_1, market_price} = products2[i]

      // Create Random DateTime object
      let auction_end_dt = SeedProducts.randomDate(new Date(2021, 3, 5), new Date())
      console.log("auction_end_dt", auction_end_dt)

      // Create starting price as half of the product's actual price
      let starting_price = market_price * .5

      // Grab random rating and number of ratings
      const num_of_ratings = SeedProducts.randomNumberOfRatings()
      const rating = SeedProducts.randomRating()

      const valuesArray =
        [item, category, sub_category, description, condition, rating, num_of_ratings, image_1, starting_price, auction_end_dt]

      await db.query(`INSERT INTO products (name, category, sub_category, description, condition, rating, num_of_ratings, image_url, market_price, auction_end_dt) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, valuesArray)
      }

    for (let i = 0; i < products3.length; i++) {
      console.log(i)
      const {item, category, sub_category, description, condition, image_1, market_price} = products3[i]

      // Create Random DateTime object
      let auction_end_dt = SeedProducts.randomDate(new Date(2021, 3, 5), new Date())
      console.log("auction_end_dt", auction_end_dt) 

      // Create starting price as half of the product's actual price
      let starting_price = market_price * .5

      // Grab random rating and number of ratings
      const num_of_ratings = SeedProducts.randomNumberOfRatings()
      const rating = SeedProducts.randomRating()

      console.log(valuesArray)
      const valuesArray =
        [item, category, sub_category, description, condition, rating, num_of_ratings, image_1, starting_price, auction_end_dt]

      await db.query(`INSERT INTO products (name, category, sub_category, description, condition, rating, num_of_ratings, image_url, market_price, auction_end_dt) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, valuesArray)
      }
    }
}


// Product.addRating(785, 5)
// Product.get(785)

SeedProducts.seedProducts()



