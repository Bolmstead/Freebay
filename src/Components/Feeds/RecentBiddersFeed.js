import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import withWidth from "@material-ui/core/withWidth";
import React, { useEffect, useState } from "react";
import FreebayAPI from "../../Api";
import ProductCardMini from "../Products/ProductCardMini.js";
import useStyles from "./Stylings/styleRecentBidsFeed.js";

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
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {/* <Typography style={{ color: "#808080" }}>
              Due to recent Heroku and Node-Postgres updates, the Freebay site
              is currently down. <br /> Thank you for your patience, the site
              will be operating here soon within a few days :)
            </Typography> */}
            <Typography style={{ color: "#808080" }}>
              Due to Heroku constraints, products may take some time to load :)
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4} direction="row">
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
