import React, { useState, useEffect } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FreebayAPI from '../../Api';
import ProductCardMini from '../Products/ProductCardMini.js';
import Grid from '@material-ui/core/Grid';


/* Renders a list of <ProductCardMini/> components of products with
   the highest amount of bids. To be displayed on the Home page */

export default function WhatsTrendingFeed() {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const handleGetWhatsTrending = async () => {
      const result = await FreebayAPI.getWhatsTrending()
      setTrendingProducts(result);
    }
    handleGetWhatsTrending();
  }, []);


  return (
    <Grid  container spacing={3} direction="row" justify="flex-start" align="left">
    { trendingProducts.length > 0
      ?trendingProducts.map( product => (
        <ProductCardMini product={product} />))
      :<ListItem alignItems="flex-start">
          <ListItemText secondary="Loading..."/>
        </ListItem>
      }
    </Grid>
  )
}



