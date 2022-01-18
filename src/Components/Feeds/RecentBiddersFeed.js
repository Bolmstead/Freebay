import React, { useState, useEffect } from "react";
import FreebayAPI from "../../Api";
import ProductCardMini from "../Products/ProductCardMini.js";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import useStyles from "./Stylings/styleRecentBidsFeed.js";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";

/* Renders a list of <ProductCardMini/> components showing products with
   most recent bids. To be displayed on the Home page */

function RecentBiddersFeed(haveBidsBeenChecked) {
  const [recentlyBiddedProducts, setRecentlyBiddedProducts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    // Number of products to be displayed in feed
    let numOfBids = 4;

    const handleGetRecentBidders = async () => {
      const result = await FreebayAPI.getRecentBids(numOfBids);
      setRecentlyBiddedProducts(result);
    };
    handleGetRecentBidders();
  }, [haveBidsBeenChecked]);

  return (
    <Container className={classes.feedContainer}>
      {!recentlyBiddedProducts || recentlyBiddedProducts.length < 1 ? (
        <Grid
          container
          spacing={4}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <ProductCardMini product={null} loading={true} />
          <ProductCardMini product={null} loading={true} />
          <Hidden only={["md"]}>
            <ProductCardMini product={null} loading={true} />
          </Hidden>
          <Hidden only={["md"]}>
            <ProductCardMini product={null} loading={true} />
          </Hidden>
        </Grid>
      ) : (
        <Grid
          container
          spacing={4}
          direction="row"
        >
          {recentlyBiddedProducts[0] ? (
            <ProductCardMini product={recentlyBiddedProducts[0]} />
          ) : (
            <div></div>
          )}
          {recentlyBiddedProducts[1] ? (
            <ProductCardMini product={recentlyBiddedProducts[1]} />
          ) : (
            <div></div>
          )}
          {recentlyBiddedProducts[2] ? (
            <Hidden only={["md"]}>
              <ProductCardMini product={recentlyBiddedProducts[2]} />
            </Hidden>
          ) : (
            <div></div>
          )}
          {recentlyBiddedProducts[3] ? (
            <Hidden only={["md"]}>
              <ProductCardMini product={recentlyBiddedProducts[3]} />
            </Hidden>
          ) : (
            <div></div>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default withWidth()(RecentBiddersFeed);
