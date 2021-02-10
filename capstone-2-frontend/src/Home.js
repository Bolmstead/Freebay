import React from "react";
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import ProductSlider from './Components/Products/ProductSlider.js'
import ProductCard from './Components/Products/ProductCard.js'
import ProductList from './Components/Products/ProductList.js'
import FreebayAPI from './Api'





/* Home page that displays login and signup button links */

function Home() {
  // const product = await FreebayAPI.getProduct(3)
  // console.log(product)

  return (
    <div><br/>
        <h1>Home Page</h1>
    </div>
  );
}

export default Home;
