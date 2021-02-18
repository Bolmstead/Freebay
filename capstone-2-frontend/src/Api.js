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
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a product by id. */

  static async getProduct(id) {
    let res = await this.request(`products/${id}`);
    // console.log("res",res)
    return res.product;
  }

  /** Get details on all products. */

  static async getProducts(searchObject) {
    console.log("searchObject from Api.js getProducts", searchObject)
    const queryString = Object.keys(searchObject).map(key => key + '=' + searchObject[key]).join('&');

    // console.log("queryString from Api.js getProducts", queryString)

    let url = `products/?` + queryString
    // console.log("url", url)
    let res = await this.request(url);
    // console.log("res from getProducts,", res)

    return res.products;
  }

  /** Login for site. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    // console.log("res from api.js login method", res)

    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    // console.log("res from api.js signup method", res)

    return res.token;
  }

  /** Get current user information. */
  
  static async getUser(username) {
    // console.log("madeit to getUser API method")
    let res = await this.request(`users/${username}`);
    console.log("madeit to getUser API method after this.request",res)

    return res;
  }

  /** Post new Bid */

  static async addBid(productId, bidAmount) {
    let data={}
    let res = await this.request(`products/${productId}/bid/${bidAmount}`, data, "post");
    // console.log("res from api.js addBid method", res)
    return res;
  }

  /** Post method for when a user views a notification */

  static async viewNotifications(email) {
    let data = {}
    console.log("made it to viewNotificatinos Api.js", data)
    let res = await this.request(`users/view_notifications/${email}`, data, "post");
    console.log("res from viewNotifications Api.js", res)

    // console.log("res from api.js addBid method", res)
    return res;
  }
 
}

export default FreebayAPI;