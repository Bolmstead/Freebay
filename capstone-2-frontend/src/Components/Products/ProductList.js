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
import ProductsContext from "../Common/Context";
import { v4 as uuid } from 'uuid';
import {useParams, useLocation} from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';




function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const useStyles = makeStyles(theme => ({
  
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    button: {
      margin: theme.spacing(1),
      textTransform: 'none'

    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}))

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  // grab the number of the page
  let query = useQuery()
  // let subCategory = query.get("subCategory")
  // let page = query.get("page")
  // if (!page) {
  //   page = "1"
  // }

  let searchObject = Object.fromEntries(new URLSearchParams(query));


  let { page, subCategory} = searchObject

  if (!page) {
    page = "1"
  }

 //grab products
  useEffect(() => {
    async function getProductsInCategory() {
      let res = await FreebayAPI.getProducts(searchObject);
      setProducts(res);
      // console.log("products", products)
    }
    getProductsInCategory()
  }, []);


  // grab the next page number
  const nextPage = (parseInt(page) + 1).toString()
  // console.log("nextPage", nextPage)

  query.set("page", nextPage)
  
  const nextPageQuery = query.toString()
  // console.log("nextPageQuery", nextPageQuery)

  // grab the previous page number
  let prevPage;
  console.log("declared prevPage Boolean Value", Boolean(prevPage))
  if (parseInt(page) > 1) {
    prevPage = (parseInt(page) - 1).toString()

    console.log("prevPage", prevPage)

    query.set("page", prevPage)
    
    const prevPageQuery = query.toString()
    // console.log("prevPageQuery", prevPageQuery)
  }



  // Add "Clothing & Accessories to title if in fashion category"
  let categoryTitle;

  if (subCategory === "Women" || subCategory === "Men" || subCategory === "Boys" || subCategory === "Girls" || subCategory === "Baby"){
    categoryTitle = subCategory + " Clothing & Accessories"
  } else {
    categoryTitle = subCategory
  }

  if (!products) return <CircularProgress />;

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
      <Grid container justify="center">
        {(!prevPage)
        ? <Button size="medium" className={classes.button} disabled>
            {"< Previous page"}
          </Button>
        : <Button size="medium" className={classes.button}>
            {"< Previous page"}
          </Button>}
      <Button size="medium" className={classes.button} href={"/products?" + nextPageQuery}>
          {"Next page >"}
      </Button>
      </Grid>
      </Container>
      )
};

export default ProductList;