import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API. *
 */

class FreebayAPI {
  // the token for with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FreebayAPI.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a product by id. */

  static async getProduct(id) {
    let res = await this.request(`products/${id}`);
    return res.productResult;
  }

  /** Get details on all products. */

  static async getProducts(searchObject) {
    const queryString = Object.keys(searchObject).map(key => key + '=' + searchObject[key]).join('&');

    let url = `products/?` + queryString
    let res = await this.request(url);

    return res;
  }

  /** Login for site. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");

    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");

    return res.token;
  }

  /** Get current user information. */
  
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res;
  }

  /** Check all bids if an auction has ended. If so, the
   *  product will be added to the products_won table */

  static async checkAllBids() {
    let res = await this.request(`bids/check-all-bids-for-ended-auctions`);
    return res;
  }

  /** Get recent bids */

  static async getRecentBids(numOfProducts) {
    let res = await this.request(`bids/recent/${numOfProducts}`);
    return res;
  }

  /** Post new Bid */

  static async addBid(productId, bidAmount) {
    let data={}
    let res = await this.request(`bids/${productId}/placeBid/${bidAmount}`, data, "post");
    return res;
  }

  /** Get recent bids */

  static async getRecentWins(numOfProducts) {
    let res = await this.request(`products-won/recent/${numOfProducts}`);
    return res;
  }

  /** Post method for when a user views a notification */

  static async viewNotifications(email) {
    let data = {}
    let res = await this.request(`notifications/view`, data, "post");
    return res;
  }
 
}

export default FreebayAPI;