import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {useParams, Redirect} from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LoadingSpinner from '../Common/LoadingSpinner.js'

import {
  Grid,
  Card,
  CardContent,
  Typography
} from '@material-ui/core/'



// Component that displays all information of a product.
// Renders a countdown to the end of the auction along with an input
// to allow the user to bid on the product.


const useStyles = makeStyles({
  media: {
    height: 300,
    width: 300,
    borderRadius: 2,
    border: 1,
  },

  cover: {
    width: 151,
  },
});




function ProductDetails() {
  const classes = useStyles();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const [countdown, setCountdown] = useState([]);
  const [bidAmount, setBidAmount] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    async function getProduct(id) {
      const result = await FreebayAPI.getProduct(id)
      setProduct(result);
      console.log("productfrom ProductDetails component", product)
      // console.log(`product["auctionEndDt"]`,product["auctionEndDt"])
      // getTimeLeft(product["auctionEndDt"])
      // console.log("countdown", countdown)
      setInfoLoaded(true)
    }
    setInfoLoaded(false)
    getProduct(id)
  }, []);

  // Create countdown timer
 
  function getTimeLeft(){
    const auctionEndObj = new Date(product["auctionEndDt"])
    const totalTimeLeft = Date.parse(auctionEndObj) - Date.parse(new Date());
    setCountdown(totalTimeLeft);
    }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let addBidRes = await FreebayAPI.addBid(id, bidAmount)
    return <Redirect to="/" />


  }

  function handleChange(evt) {
    setBidAmount(evt.target.value);
    console.log("bidAmount", bidAmount)
  }

  if (!infoLoaded) return <LoadingSpinner />;


  return (
    <Container>

      <h1>Product Details</h1>
      <Grid container spacing={2}>
        <Grid item  xs={12} sm={6}>
          <Box color="text.secondary">
            <img
              className={classes.media}
              src={product["imageUrl"]}
            />
            </Box>
        </Grid>
        <Grid item  xs={12} sm={6}>
          <Card className={classes.root}>
              <CardContent className={classes.content}>
                <Typography component="h7" variant="h7">
                  {product["name"]}
                </Typography><br/>
                <Rating name="read-only" value={product["rating"]} size="medium" readOnly display="inline"/>      
                <Typography variant="caption" display="inline" className="ratingNumber" color="textSecondary">
                  {product["numOfRatings"]}
                </Typography>

                { 
                product["bidPrice"] 
                ? <Typography variant="subtitle1" color="textSecondary">
                  Current bid: ${product["bidPrice"]} by ${product["bidderUsername"]}
                  </Typography>
                : <Typography variant="subtitle1" color="textSecondary">
                  Starting bid: ${product["bidPrice"]} by ${product["bidderUsername"]}
                  </Typography>
                }

                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">

                  <TextField id="outlined-basic" label="Bid" variant="outlined" size="small" onChange={handleChange}/>        
                  <Button size="medium" type="submit" variant="contained" color="Primary" className={classes.margin}>
                    Place Bid
                  </Button>
                </form>

                {/* <Countdown date={Date.now() + countdown} renderer={props => <Typography variant="body2" color="textPrimary" component="p" fontWeight="fontWeightBold">{"Time left: " + props.days + "d " + props.hours + "h " + props.minutes + "m " + props.seconds + "s"}</Typography>} /> */}

              </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      </Container>
  );
}

export default ProductDetails;

