import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { getRecentBids } from "../../Api";
import ProductCardMini from "../Products/ProductCardMini.jsx";
import useStyles from "./Stylings/styleRecentBidsFeed.js";

/* Renders a list of <ProductCardMini/> components showing products with
   most recent bids. To be displayed on the Home page */

function RecentBiddersFeed(haveBidsBeenChecked) {
  const [recentlyBiddedProducts, setRecentlyBiddedProducts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    // Number of products to be displayed in feed
    const numOfBids = 4;

    const handleGetRecentBidders = async () => {
      const result = await getRecentBids(numOfBids);

      setRecentlyBiddedProducts(result);
    };
    handleGetRecentBidders();
  }, [haveBidsBeenChecked]);

  return (
    <Container className={classes.feedContainer}>
      {!recentlyBiddedProducts || recentlyBiddedProducts.length < 1 ? (
        <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">
          <ProductCardMini product={null} loading={true} />
          <ProductCardMini product={null} loading={true} />
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <ProductCardMini product={null} loading={true} />
          </Box>
          <Box sx={{ display: { md: "none", xs: "block" } }}>
            <ProductCardMini product={null} loading={true} />
          </Box>
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
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <ProductCardMini product={recentlyBiddedProducts[2]} />
            </Box>
          ) : (
            <div></div>
          )}
          {recentlyBiddedProducts[3] ? (
            <Box sx={{ display: { md: "none", xs: "block" } }}>
              <ProductCardMini product={recentlyBiddedProducts[3]} />
            </Box>
          ) : (
            <div></div>
          )}
        </Grid>
      )}
    </Container>
  );
}

export default RecentBiddersFeed;
