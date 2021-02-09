import React, { useState, useEffect } from "react";
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

const useStyles = makeStyles(theme => ({
  
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}))



const ProductList = (queryObject) => {
  console.log('queryObject', queryObject)

  // const {currentUser} = useContext(UserContext)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      let res = await FreebayAPI.getProductsInCategory(queryObject);
      setProducts(res);
    }
    getProducts();
    console.log("products", products)
  }, []);

  async function search(searchTerm) {
    let result = await FreebayAPI.getProducts(searchTerm);
    setProducts(result);
  }
  

  return (
    <Container>
      <h1>{queryObject["subCategory"]}</h1>
      <Grid container spacing={3}>
        {products.map((product) =>{
          console.log("imageURL", product["imageURL"])
          return <Grid item s={4} m={3} spacing={3}>
                    <ProductCard imageUrl = {product["imageUrl"]} name ={product["name"]} bidPrice = {product["marketPrice"]} rating = {product["rating"]} numOfRatings = {product["numOfRatings"]} auctionEndDt = {product["auctionEndDt"]}/>
                  </Grid>
        })}
      </Grid>
      </Container>
      )
};

export default ProductList;