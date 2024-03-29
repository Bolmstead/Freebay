import React, { useState, useContext, useEffect } from "react";
import ProductCard from "./ProductCard.js";
import { Grid, Card, CardContent, CardActionArea } from "@material-ui/core/";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import FreebayAPI from "../../Api.js";
import { useLocation } from "react-router-dom";
import useStyles from "./Stylings/styleProductList.js";
import { Typography } from "@material-ui/core/";
import Context from "../../Context";
import ReactLoading from "react-loading";

// Shows a list of <ProductCards/> that are available for auction
// Title of page changes based on whether the user searched for a term
// or clicked on a category from the categories bar
//
// - nextPageQuery & prevPageQuery: queries added to the url of the
//   next/previous page of products.

const ProductsList = () => {
  const classes = useStyles();
  const [nextPageQuery, setNextPageQuery] = useState(null);
  const [prevPageQuery, setPrevPageQuery] = useState(null);
  const [pageTitle, setPageTitle] = useState(null);
  const { products, setProducts, updateProductsList, setUpdateProductsList } =
    useContext(Context);
  const numOfLoadingCards = [1, 2, 3, 4, 5, 6, 7, 8];

  let query = new URLSearchParams(useLocation().search);
  let searchQueryObject = Object.fromEntries(new URLSearchParams(query));


  // call API to grab products based on search results
  useEffect(() => {
    async function getProductsInCategory() {
      let nextPageSearchQueryObject = searchQueryObject;
      let prevPageSearchQueryObject = searchQueryObject;
      let res = await FreebayAPI.getProducts(searchQueryObject);
      let productsResult = res.products;
      let numOfProductsInAuction = res.numOfProductsInAuction;

      setProducts(productsResult);

      // Grab page number from the search query. If no page in query, set page to 1
      let { page } = searchQueryObject;
      if (!page) {
        page = "1";
      }
      page = parseInt(page);

      // Create the url query string for the link to next page
      if (numOfProductsInAuction - page * 24 > 0) {
        const nextPage = (page + 1).toString();
        nextPageSearchQueryObject["page"] = nextPage;

        let nextSearchQueryString = new URLSearchParams(
          nextPageSearchQueryObject
        ).toString();
        setNextPageQuery(nextSearchQueryString);
      } else {
        setNextPageQuery(null);
      }

      // If not on first page, create url query string for the link to previous page
      if (page > 1) {
        let prevPage = (page - 1).toString();
        prevPageSearchQueryObject["page"] = prevPage;
        let prevSearchQueryString = new URLSearchParams(
          prevPageSearchQueryObject
        ).toString();
        setPrevPageQuery(prevSearchQueryString);
      } else {
        setPrevPageQuery(null);
      }
    }

    // if subCategory was included in the queryString, set the page title to that subcategory
    // if the subCategory was within the Fashion category, add Fasion to end of title
    let subCategory;
    if (Object.keys(searchQueryObject)[0] === "subCategory") {
      subCategory = searchQueryObject.subCategory;
      let fashionSubCategories = ["Mens", "Womens", "Girls", "Boys", "Baby"];
      if (fashionSubCategories.indexOf(subCategory) !== -1) {
        setPageTitle(subCategory + " Fashion");
      } else {
        setPageTitle(subCategory);
      }
    }
    getProductsInCategory();
    setUpdateProductsList(false);
  }, [updateProductsList]);


  if (products.length < 1) {
    return (
      <Container>
        <br />
        {searchQueryObject.subCategory ? (
          <Typography variant="h4" spacing={5} className={classes.listTitle}>
            Products in {pageTitle}
          </Typography>
        ) : (
          <Typography variant="h4" spacing={5} className={classes.listTitle}>
            Search Results for "{searchQueryObject.name}"
          </Typography>
        )}
        <br />
        <Grid container spacing={3} justify="center">
          {numOfLoadingCards.map((index) => {
            return (
              <Grid item s={4} m={3} key={index} spacing={3}>
                <Card style={{ width: 250, height: 400 }} variant="outlined">
                  <CardActionArea>
                    <CardContent
                      style={{
                        minHeight: "120px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ReactLoading
                        type={"spinningBubbles"}
                        color={"#BDBDBD"}
                        height={100}
                        style={{marginTop: "40px"}}
                      />
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <br />
      {searchQueryObject.subCategory ? (
        <Typography variant="h4" spacing={5} className={classes.listTitle}>
          Products in {pageTitle}
        </Typography>
      ) : (
        <Typography variant="h4" spacing={5} className={classes.listTitle}>
          Search Results for "{searchQueryObject.name}"
        </Typography>
      )}
      <br />
      <Grid container spacing={3} justify="center">
        {products.map((product) => {
          return (
            <Grid item s={4} m={3} spacing={3}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
      </Grid>
      <Grid container justify="center">
        {prevPageQuery ? (
          <Button
            size="medium"
            className={classes.button}
            href={"/products?" + prevPageQuery}
          >
            {"< Previous page"}
          </Button>
        ) : (
          <Button size="medium" className={classes.button} disabled>
            {"< Previous page"}
          </Button>
        )}
        {nextPageQuery ? (
          <Button
            size="medium"
            className={classes.button}
            href={"/products?" + nextPageQuery}
          >
            {"Next page >"}
          </Button>
        ) : (
          <Button size="medium" className={classes.button} disabled>
            {"Next page >"}
          </Button>
        )}
      </Grid>
    </Container>
  );
};

export default ProductsList;
