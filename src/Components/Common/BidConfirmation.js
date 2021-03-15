import React, { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom';
import Context from "./Context";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useStyles from './Stylings/styleBidConfirmation'
import FreebayAPI from '../../Api.js'
import ProductCard from '../Products/ProductCard.js'
import {
  Grid,
  Typography
} from '@material-ui/core/'

// Renders a confirmation page showing a user's bid was successfully submitted

export default function BidConfirmation() {
    const classes = useStyles();
    const { currentUser } = useContext(Context);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    useEffect(() => {
        async function getProduct(id) {

          // Grab information for product bidded on
          // from API using the product ID in URL
          const result = await FreebayAPI.getProduct(id)

          // Convert current bid (if bid placed) or starting bid (if no bid placed) 
          // to float and display bid the proper price format. Then add to result object.
          if (result.bidPrice){
            let bidDisplay = parseFloat(result.bidPrice).toFixed(2);
            result.bidDisplay = bidDisplay;
          } else {
            let bidDisplay = parseFloat(result.startingBid).toFixed(2);
            result.bidDisplay = bidDisplay;
          }
          
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