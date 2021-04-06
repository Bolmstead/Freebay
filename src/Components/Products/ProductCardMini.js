import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleProductCardMini.js';
import Grid from '@material-ui/core/Grid';


// Card that displays its image, bids, rating, and current bid price. 
// Rendered within the RecentBidders component and a template to be used for 
// other types of feeds. less details and smaller version of the 
// ProductCard component.

function ProductCardMini({product}) {
  const classes = useStyles();
  console.log("product in ProductCardMini", product)

  let {id, name, startingBid, imageUrl, rating,
      username, bidPrice} = product
  let bidDisplay;

  // If the product has a bidPrice, display it on card, otherwise 
  // show starting bid. If either bidPrice or startingBid, set as a float type 
  // and show 2 decimal places to be displayed as price on a card. 
  if (bidPrice){
    bidDisplay = parseFloat(bidPrice).toFixed(2);
  } else {
    bidDisplay = parseFloat(startingBid).toFixed(2);
  }

  return (
    <Grid item xs={6} sm={6} md={4} lg={3}>
      <Link href={"/product/" + id} 
            color="inherit" 
            style={{ textDecoration: 'none' }}
      >
        <Card className={classes.root} variant="outlined">
          <CardActionArea>
            <div className={classes.imageContainer}>
              <img className={classes.media} src={imageUrl} title={name} />
            </div>
            <CardContent className={ classes.cardContent }>
              <Rating name="read-only" value={rating} size="small" 
              readOnly display="inline"
              />  
              <div>
                <Typography variant="h6" color="body2" 
                component="p" display="inline"  
                className={classes.price}
                >
                  ${bidDisplay}{'  '}
                </Typography>
                <Typography variant="body2" 
                color="textSecondary" component="p" 
                display="inline" 
                >
                </Typography>
              </div>
              <Typography variant="body2" color="textSecondary" component="p">
                Current bid by 
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {username}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </Grid>
  );
}

export default ProductCardMini;
