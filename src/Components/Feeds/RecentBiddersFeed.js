import React, { useState, useEffect } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FreebayAPI from '../../Api';
import ProductCardMini from '../Products/ProductCardMini.js';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleRecentBidsFeed.js';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';


/* Renders a list of <ProductCardMini/> components showing products with
   most recent bids. To be displayed on the Home page */

function RecentBiddersFeed(haveBidsBeenChecked) {
  const [recentlyBiddedProducts, setRecentlyBiddedProducts] = useState([]);
  const classes = useStyles();

  // Number of products to be displayed in feed
  let numOfBids = 4

  useEffect(() => {
    const handleGetRecentBidders = async () => {
      const result = await FreebayAPI.getRecentBids(numOfBids)
      setRecentlyBiddedProducts(result);
    }
    handleGetRecentBidders();
  }, [haveBidsBeenChecked]);


  return (
    <Container className={classes.feedContainer}>
    { recentlyBiddedProducts
      ?
        recentlyBiddedProducts.length < 1
        ?
        <Grid
        container
        direction="column"
        alignItems="flex-start"
        justify="center"
        >
            <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    None yet!
                </Typography>  
            </Grid>   
        </Grid>
        :
        <Grid  container spacing={4} direction="row" justify="center" alignItems="center"
        >
          { recentlyBiddedProducts[0] 
          ?
            <ProductCardMini product={recentlyBiddedProducts[0]} />
          : <div></div>
          }
          { recentlyBiddedProducts[1] 
          ?
            <Hidden only={['sm' ]}>
              <ProductCardMini product={recentlyBiddedProducts[1]} />
            </Hidden>
          : <div></div>
          }
          { recentlyBiddedProducts[2] 
          ?
            <Hidden only={['sm', 'md']}>
              <ProductCardMini product={recentlyBiddedProducts[2]} />
            </Hidden>
          : <div></div>
          }
          { recentlyBiddedProducts[3] 
          ?
            <Hidden only={['sm', 'md']}>
              <ProductCardMini product={recentlyBiddedProducts[3]} />
            </Hidden>
          : <div></div>
          }
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

export default withWidth()(RecentBiddersFeed)


