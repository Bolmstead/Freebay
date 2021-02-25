import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

// Card of product image and some information regarding the product.
// Will be rendered within the ProductList components.

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 200,
    minWidth: 250,
  },
  ratingNumber: {
    top: 200
  }
});


function ProductCard({product}) {
  const classes = useStyles();

  let {id, name, marketPrice, imageUrl, rating, numOfRatings, auctionEndDt, bidderUsername, bidPrice} = product

  function truncate(str, n){
    if (str !== undefined) {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;}
  };

  marketPrice = `$` + marketPrice
  const shortName = truncate(name, 100)

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

  const countdownDisplay = `${countdown["days"]}D ${countdown["hours"]}H`

  return (
    <Link href={"/product/" + id} color="inherit">
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={shortName}
        />
        <CardContent style={{ minHeight: "100px"}}>
          <div>
          <Typography gutterBottom variant="body2" component="p">
            {shortName}
          </Typography>
        <Rating name="read-only" value={rating} size="small" readOnly display="inline"/> 
      </div>
          <Typography variant="body1" color="body2" component="p">
            {marketPrice}
          </Typography>
          { bidderUsername
          ?
            <div>
              <Typography variant="body1" color="body2" component="p">
                {bidPrice}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {bidderUsername}
              </Typography>
            </div>
          :
          <div>
            <Typography variant="body1" color="body2" component="p">
              {marketPrice}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {bidPrice}
            </Typography>
          </div>

          }
          <Typography variant="body2" color="textSecondary" component="p">
            {marketPrice}
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
  );
}

export default ProductCard;
