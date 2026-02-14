import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3003";

const api = axios.create({
  baseURL: BASE_URL,
});

// Request interceptor — attach auth token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("freebay-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — normalize errors into user-friendly messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.error?.message || data?.message || "Something went wrong.";

      if (status === 401) {
        return Promise.reject(new Error("Please log in to continue."));
      }
      if (status === 404) {
        return Promise.reject(new Error("The requested resource was not found."));
      }
      return Promise.reject(new Error(message));
    }

    if (error.request) {
      return Promise.reject(new Error("Unable to reach the server. Please check your connection."));
    }

    return Promise.reject(error);
  },
);

/** Make a request to the API. */

async function request(endpoint, data = {}, method = "get") {
  const params = method === "get" ? data : {};

  const res = await api({ url: endpoint, method, data, params });
  return res.data;
}

/** Get details on a product by id. */

export async function getProduct(id) {
  const res = await request(`products/${id}`);
  return res.productResult;
}

/** Get details on all products. */

export async function getProducts(searchObject) {
  const queryString = Object.keys(searchObject)
    .map((key) => `${key}=${searchObject[key]}`)
    .join("&");

  const res = await request(`products/?${queryString}`);
  return res;
}

/** Login for site. */

export async function login(data) {
  const res = await request("auth/token", data, "post");
  return res.token;
}

/** Signup for site. */

export async function signup(data) {
  const res = await request("auth/register", data, "post");
  return res.token;
}

/** Get current user information. */

export async function getUser(username) {
  const res = await request(`users/${username}`);
  return res;
}

/** Check all bids if an auction has ended. */

export async function checkAllBids() {
  const res = await request("bids/check-all-bids-for-ended-auctions");
  return res;
}

/** Get recent bids. */

export async function getRecentBids(numOfProducts) {
  const res = await request(`bids/recent/${numOfProducts}`);
  return res;
}

/** Post new bid. */

export async function addBid(productId, bidAmount) {
  const res = await request(`bids/${productId}/placeBid/${bidAmount}`, {}, "post");
  return res;
}

/** Get recent wins. */

export async function getRecentWins(numOfProducts) {
  const res = await request(`products-won/recent/${numOfProducts}`);
  return res;
}

/** Post method for when a user views a notification. */

export async function viewNotifications() {
  const res = await request("notifications/view", {}, "post");
  return res;
}

/** Seed products. */

export async function seedProducts() {
  const res = await request("products/seed");
  return res;
}
