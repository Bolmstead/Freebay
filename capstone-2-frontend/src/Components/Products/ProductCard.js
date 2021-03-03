import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleProductCard.js'

// Card of product image and some information regarding the product.
// Will be rendered within the ProductList components.

function ProductCard({product}) {
  const classes = useStyles();
  console.log("product in productCard", product)

  let {id, name, startingBid, imageUrl, rating, numOfRatings, auctionEndDt, bidderUsername, bidPrice} = product
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
          <Typography gutterBottom variant="body2" component="p">
            {shortName}
          </Typography>
          <Rating name="read-only" value={product["rating"]} size="small" readOnly display="inline"/>   

      </div>
          { bidderUsername
          ?
            <div>
              <Typography variant="h6" color="body2" component="p" display="inline"  className={classes.price}>
                ${bidDisplay}{'  '}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" display="inline" >
                bid by {bidderUsername}
              </Typography>
            </div>
          :
            <div>
              <Typography variant="h6" color="body2" component="p" display="inline" fontWeight="fontWeightBold" className={classes.price}>
                ${bidDisplay}{'  '}
              </Typography>
              <Typography variant="body2" color="textSecondary" display="inline" component="p">
                Starting bid
              </Typography>
            </div>

          }
          <Typography variant="body2" color="textSecondary" component="p">{countdownDisplay}</Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
  );
}

export default ProductCard;
