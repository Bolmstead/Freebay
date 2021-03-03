import React, { useState, useEffect } from "react";
import ProductCard from './ProductCard.js'
import {
    Grid
  } from '@material-ui/core/'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FreebayAPI from '../../Api.js'
import { useLocation } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './Stylings/styleProductList.js'
import {Typography} from '@material-ui/core/'


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [nextPageQuery, setNextPageQuery] = useState(null);
  const [prevPageQuery, setPrevPageQuery] = useState(null);


  // grab the number of the page
  let query = useQuery()
  // let subCategory = query.get("subCategory")
  // let page = query.get("page")
  // if (!page) {
  //   page = "1"
  // }

  let searchObject = Object.fromEntries(new URLSearchParams(query));
  let { page, subCategory} = searchObject

 //grab products
  useEffect(() => {
    async function getProductsInCategory() {
      let res = await FreebayAPI.getProducts(searchObject);
      console.log("res from ProductList", res.products)
      let products = res.products
      let numOfProducts = res.count
      setProducts(products);
      
      /////// PAGINATION /////////
      // Grab page number from the search query. If no page in query, set page to 1
      if (!page) {
        page = "1"
      }
      page = parseInt(page)

      // Create the url query string for the link to next page
      if ((numOfProducts - (page*24) > 0)) {
        const nextPage = (page + 1).toString()
        query.set("page", nextPage)
        setNextPageQuery(query.toString())
      } else {
        setNextPageQuery(null)
      }

      // If not on first page, create url query string for the link to previous page
      if (page > 1) {
        let prevPage = (page - 1).toString()
        query.set("page", prevPage)
        setPrevPageQuery(query.toString())
      } else {
        setPrevPageQuery(null)
      }

    }
    getProductsInCategory()
  }, []);


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
      <Typography className={classes.listTitle} variant="h4" spacing={5}>
        {categoryTitle}
      </Typography>
      <br/>
      <Grid container spacing={3} justify="center">
        {products.map((product) =>{
          return <Grid item s={4} m={3} spacing={3}>
                    <ProductCard product={product}/>
                  </Grid>
        })}
      </Grid>
      <Grid container justify="center">
        {(prevPageQuery)
        ? <Button size="medium" className={classes.button} href={"/products?" + prevPageQuery}>
            {"< Previous page"}
          </Button>
        : <Button size="medium" className={classes.button} disabled>
            {"< Previous page"}
          </Button>
        }
        {(nextPageQuery)
        ? <Button size="medium" className={classes.button} href={"/products?" + nextPageQuery}>
            {"Next page >"}
          </Button>
        : <Button size="medium" className={classes.button} disabled>
            {"Next page >"}
          </Button>
        }

      </Grid>
      </Container>
      )
};

export default ProductList;