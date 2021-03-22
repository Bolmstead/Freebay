import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FreebayAPI from '../../Api';
import ProductCardMini from '../Products/ProductCardMini.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleWhatsTrendingFeed.js';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';


/* Renders a list of <ProductCardMini/> components of products with
   the highest amount of bids. To be displayed on the Home page */

function WhatsTrendingFeed() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const handleGetWhatsTrending = async () => {
      const result = await FreebayAPI.getWhatsTrending()
      setTrendingProducts(result);
    }
    handleGetWhatsTrending();
  }, []);


  return (
    <Container>
    { trendingProducts.length > 0
      ?
      <Grid  container spacing={4} direction="row" justify="center" mt="10" >

          <ProductCardMini product={trendingProducts[0]} />
          <ProductCardMini product={trendingProducts[1]} />
          <Hidden smDown>
            <ProductCardMini product={trendingProducts[2]} />
          </Hidden>
          <Hidden mdDown>
            <ProductCardMini product={trendingProducts[3]} />
          </Hidden>
      </Grid>
      :
      <Grid  container spacing={8} direction="row" justify="flex-start" mt="10" >
        <ListItem alignItems="flex-start">
            <ListItemText secondary="Loading..."/>
        </ListItem>
      </Grid>

      }
    </Container>
  )
}

WhatsTrendingFeed.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(WhatsTrendingFeed)


