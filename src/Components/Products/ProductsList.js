import React, { useState, useContext, useEffect } from "react";
import ProductCard from './ProductCard.js'
import {
    Grid
  } from '@material-ui/core/'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FreebayAPI from '../../Api.js'
import { useLocation } from 'react-router-dom';
import useStyles from './Stylings/styleProductList.js'
import {Typography} from '@material-ui/core/'
import Context from "../Common/Context";
import LoadingText from "../Common/LoadingText";
import {Redirect, useHistory, Link} from 'react-router-dom';



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProductsList = ({location}) => {
  const classes = useStyles();
  const [nextPageQuery, setNextPageQuery] = useState(null);
  const [prevPageQuery, setPrevPageQuery] = useState(null);
  const [pageTitle, setPageTitle] = useState(null)
  const { products, setProducts } = useContext(Context);
  const history = useHistory()


  let query = useQuery()
  let searchQuery = Object.fromEntries(new URLSearchParams(query))

 // call API to grab products based on search results
  useEffect(() => {
    async function getProductsInCategory() {
      let res = await FreebayAPI.getProducts(searchQuery);
      
      let productsResult = res.products
      let totalAmountOfProducts = res.count

      setProducts(productsResult);

      
      // Grab page number from the search query. If no page in query, set page to 1
      let { page } = searchQuery
      if (!page) {
        page = "1"
      }
      page = parseInt(page)

      

      // Create the url query string for the link to next page
      if ((totalAmountOfProducts - (page*24) > 0)) {
        const nextPage = (page + 1).toString()
        searchQuery["page"] = nextPage
        setNextPageQuery(searchQuery.toString())
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
    // setPageTitle(products[0].subCategory)
  }, []);

  if (!products) return <LoadingText />;
  
  

  return (
    <Container><br/>
    {
      searchQuery.name
      ?
        <Typography variant="h4" spacing={5} className={classes.listTitle}>
          Search Results for "{searchQuery.name}"
        </Typography>
      :
        <Typography variant="h4" spacing={5} className={classes.listTitle}>
          {pageTitle}
        </Typography>
    }
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
        ? <Button size="medium" className={classes.button} 
          href={"/products?" + prevPageQuery}>
            {"< Previous page"}
          </Button>
        : <Button size="medium" className={classes.button} disabled>
            {"< Previous page"}
          </Button>
        }
        {(nextPageQuery)
        ? <Button size="medium" className={classes.button} 
          href={"/products?" + nextPageQuery}>
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

export default ProductsList;