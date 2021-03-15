import React, { useState, useEffect, useContext } from "react";
import {useParams, Redirect, useHistory, withRouter, ReactDOM } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Context from "./Context";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useStyles from './Stylings/styleBidConfirmation'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FreebayAPI from '../../Api.js'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Countdown from 'react-countdown';
import ProductCard from '../Products/ProductCard.js'
import {
  Grid,
  Typography
} from '@material-ui/core/'

// Renders a confirmation page to show users bid was successfully submitted

export default function BidConfirmation() {
    const classes = useStyles();
    const { currentUser } = useContext(Context);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    useEffect(() => {
        async function getProduct(id) {

          // Grab product information for product user just bidded on
          // from API using the product ID in URL
          const result = await FreebayAPI.getProduct(id)

          // Convert current bid (if bid placed) or starting bid (if no bid placed) 
          // to float and display bid with 2 decimal places. Then add to result object.
          if (result.bidPrice){
            let bidDisplay = parseFloat(result.bidPrice).toFixed(2);
            result.bidDisplay = bidDisplay;
          } else {
            let bidDisplay = parseFloat(result.startingBid).toFixed(2);
            result.bidDisplay = bidDisplay;
          }
          
          // Save result to state
          setProduct(result);
          setInfoLoaded(true)
        }
        setInfoLoaded(false)
        getProduct(id)
      }, []);

    // Render loading text while page loads information from API
    if (!infoLoaded) return(                 
        <Typography component="h1" variant="h3">
            Loading...
        </Typography>
    )

    return (
        <Grid container spacing={2} justify="center" align="center"><br/>
        <br/>
        <br/>
            <Grid xs={12} item>
              <br/>
            <EmojiEmotionsIcon className={classes.smiley} color="disabled" />
                <Typography component="h3" variant="h5">
                    Congrats {currentUser.firstName}, you're now the high bidder!
                </Typography>
                 <br/>
            </Grid>
            <ProductCard product={product}/>
        </Grid>
    );
}