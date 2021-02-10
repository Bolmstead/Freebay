import React, { useState, useEffect, useContext } from "react";
import ProductCard from './ProductCard.js'
import { makeStyles } from '@material-ui/core/styles'
import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardHeader
} from '@material-ui/core/'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FreebayAPI from '../../Api.js'
import ProductsContext from "../Common/ProductsContext";
import { v4 as uuid } from 'uuid';
import {useParams} from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))



const ProductList = () => {
  const { products, getProductsInCategory } = useContext(ProductsContext);

  const {subCategory} = useParams();

  console.log("subCategory from useParams", subCategory)

  useEffect(() => {
    getProductsInCategory(subCategory);
  }, []);

  let categoryTitle;

  if (subCategory === "Women" || subCategory === "Men" || subCategory === "Boys" || subCategory === "Girls" || subCategory === "Baby"){
    categoryTitle = subCategory + " Clothing & Accessories"
  } else {
    categoryTitle = subCategory
  }
//   useEffect(() => {
//   if( products[1]["category"] === "Fashion"){
//     categoryTitle = (subCategory + "Clothing & Accessories")
//   }
// }, []);



  return (
    <Container>
      <h1>{categoryTitle}</h1>
      <Grid container spacing={3}>
        {products.map((product) =>{
          return <Grid item s={4} m={3} spacing={3}>
                    <ProductCard id={product["id"]} imageUrl = {product["imageUrl"]} name ={product["name"]} bidPrice = {product["marketPrice"]} rating = {product["rating"]} numOfRatings = {product["numOfRatings"]} auctionEndDt = {product["auctionEndDt"]}/>
                  </Grid>
        })}
      </Grid>
      </Container>
      )
};

export default ProductList;