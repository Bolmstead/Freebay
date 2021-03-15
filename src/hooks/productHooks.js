import { useState, useEffect } from "react";

async function getProducts(query) {
    let res = await FreebayAPI.getProducts(query);
    setProducts(res);
  }

  async function getProduct(id) {
    let res = await FreebayAPI.getProduct(id);
    setProducts(res);
  }

  export default {getProducts, getProducts}
