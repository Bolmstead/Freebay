import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class FreebayAPI {
  // the token for interactive with the API will be stored here.
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
    console.log("res",res)
    return res.product;
  }

  /** Get details on all products. */

  static async getProducts(subCategory) {
        let url = `products/?subCategory=` + subCategory
        console.log("url", url)
        let res = await this.request(url);
        console.log("res from getProducts,", res)

    return res.products;
  }

    /** Get details on all products. */

  static async getProductsInCategory(subCategory) {
    // console.log('subCategory', subCategory)
    let url = `products/?subCategory=` + subCategory["subCategory"]
    console.log("url", url)
    let res = await this.request(url);
    console.log("res from getProducts,", res)
    return res.products;
  }

  /** Get details on a job by id. */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    console.log("res",res)

    return res.job;
  }

  /** Get details on all jobs. */

  static async getJobs(title) {
    let res = await this.request(`jobs`,{ title });
    console.log("res",res)

    return res.jobs;
  }

  /** Login for site. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    console.log("res",res)

    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    console.log("res",res)

    return res.token;
  }

  /** Edit user profile for site. */

  static async editProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    console.log("res",res)

    return res.user;
  }

  /** Get current user information. */
  
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    console.log("res",res)

    return res.user;
  }

  /** Apply the user to the job*/

  static async applyToJob(username, jobId) {
    await this.request(`users/${username}/jobs/${jobId}`, {}, "post");

  }
  
}

// for now, put token ("testuser" / "password" on class)
FreebayAPI.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lNCIsImlhdCI6MTYxMjc0NjQxOH0.roUF3Z3m5ZMbKexFP0rXC_y9BlZDo-31UOIxUpEYDpc";

export default FreebayAPI;