import React, { useState, useEffect } from "react";
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import PrimarySearchAppBar from './Components/Navigation/PrimarySearchAppBar.js'
import CategoriesBar from './Components/Navigation/CategoriesBar/CategoriesBar.js'
import TestAppBar from './Components/Navigation/CategoriesBar/Category.js'
import Routes from './Routes.js'
import Container from '@material-ui/core/Container';
import ProductsContext from "./Components/Common/ProductsContext.js";
import FreebayAPI from './Api'






function App() {

  const [products, setProducts] = useState([]);

  async function getProductsInCategory(category) {
    let res = await FreebayAPI.getProductsInCategory(category);
    setProducts(res);
    console.log("products", products)
  }

  async function getProducts(query) {
    let res = await FreebayAPI.getProducts(query);
    setProducts(res);
    console.log("products", products)
  }

  async function getProduct(id) {
    let res = await FreebayAPI.getProduct(id);
    setProducts(res);
    console.log("products", products)
  }





  return (
    <div className="App">
      <header className="App-header">
      <ProductsContext.Provider value={{products, getProducts, getProductsInCategory, getProduct}}>

        <BrowserRouter>

        <Container>
        <PrimarySearchAppBar/>
        <CategoriesBar/>
        <Routes/>
        <Container>
        </Container>
        </Container>
        </BrowserRouter>

        </ProductsContext.Provider>

      </header>
    </div>
  );
}

export default App;
