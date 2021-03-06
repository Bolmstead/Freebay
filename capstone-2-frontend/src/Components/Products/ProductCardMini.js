import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleProductCardMini.js';
import Grid from '@material-ui/core/Grid';


// Card of product image and some information regarding the product.
// Will be rendered within the ProductList components.

function ProductCardMini({product}) {
  const classes = useStyles();
  console.log("product in ProductCardMini", product)

  let {id, name, startingBid, imageUrl, rating, numOfRatings, auctionEndDt, bidderUsername, bidPrice, bidCount} = product
  let bidDisplay;

  function truncate(str, n){
    if (str !== undefined) {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;}
  };

  if (bidPrice){
    bidDisplay = parseFloat(bidPrice).toFixed(2);
  } else {
    bidDisplay = parseFloat(startingBid).toFixed(2);
  }
  const shortName = truncate(name, 50)

  const auctionEndObj = new Date(auctionEndDt)

  function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor( (total/1000) % 60 );
    const minutes = Math.floor( (total/1000/60) % 60 );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const days = Math.floor( total/(1000*60*60*24) );
  
    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  const countdown = getTimeRemaining(auctionEndObj)

  const countdownDisplay = `${countdown.days}d ${countdown.hours}h`

  return (
    <Grid item xs={12} md={4} lg={3} margin ={3}>
    <Link href={"/product/" + id} color="inherit">
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.imageContainer}>
          <img
            className={classes.media}
            src={imageUrl}
            title={shortName}
          />
        </div>
        <CardContent style={{ minHeight: "120px"}}>
          <div>

      </div>

      <div>
        <Typography variant="h6" color="body2" component="p" display="inline"  className={classes.price}>
          ${bidDisplay}{'  '}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p" display="inline" >
        {bidCount} bids
        </Typography>
      </div>

          
          <Typography variant="body2" color="textSecondary" component="p">Current bid by {bidderUsername}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{bidderUsername}</Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
  </Grid>
  );
}

export default ProductCardMini;
