import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleProductCard.js'


// Card that displays its name, image, auction time left,
// rating, and current bid price. Rendered within the ProductList component.
// More detailed and bigger version of the ProductCardMini component.

function ProductCard({product}) {
  const classes = useStyles();
  
  let {id, name, startingBid, imageUrl, rating, auctionEndDt, 
      bidderUsername, bidPrice } = product
  let bidDisplay;

  // If the product has a bidPrice, display it on card, 
  // otherwise show starting bid.
  // If either bidPrice or startingBid, set as a float 
  // type and show 2 decimal places
  // to be displayed as price on a card. 
  if (bidPrice){
    bidDisplay = parseFloat(bidPrice).toFixed(2);
  } else {
    bidDisplay = parseFloat(startingBid).toFixed(2);
  }

  // Set a shortened product name ending with "..." to a 
  // variable to be displayed on card
  if (name.length > 52){
    name = name.substring(0,50) + "..."
  }
  // Function that subtracts current datetime object from the 
  // ending auction datetime parameter
  // and returns an object with the days and hours remaining in the auction. 
  function getTimeRemaining(endtime){
    const total = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor( total/(1000*60*60*24) );
    const hours = Math.floor( (total/(1000*60*60)) % 24 );
    const minutes = Math.floor( (total/1000/60) % 60 );

    return { days, hours, minutes };
  }

  // Execute getTimeRemaining with the product's ending 
  // datetime object as a parameter
  const auctionEndObj = new Date(auctionEndDt)
  const countdown = getTimeRemaining(auctionEndObj)
  console.log("countdown", countdown)

  // Save the remaining days and hours of the auction 
  // into a string to be displayed on the card.
  let countdownDisplay;
  let onlyMinutesLeft;
  
  if (countdown.days < 1) {
    if (countdown.hours < 1) {
      countdownDisplay = `Only ${countdown.minutes} minutes left!`;
      onlyMinutesLeft = true;
    } else {
      countdownDisplay = `${countdown.hours}h ${countdown.minutes}m`
    }
  } else {
    countdownDisplay = `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m`
  } 

  return (
    <Link href={"/product/" + id} color="inherit" 
    style={{ textDecoration: 'none' }}>
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <div className={classes.imageContainer}>
          <img className={classes.media} src={imageUrl} title={name} />
        </div>
        <CardContent style={{ minHeight: "120px"}}>
          <div>
            <Typography gutterBottom variant="body2" component="p">
              {name}
            </Typography>
            <Rating name="read-only" value={rating} 
            size="small" readOnly display="inline"/>   
          </div>
          { bidderUsername
          ?
            <div>
              <Typography variant="h6" color="body2" component="p"
               display="inline"  className={classes.price}>
                ${bidDisplay}{'  '}
              </Typography>
              <Typography variant="body2" color="textSecondary" 
              component="p" display="inline" >
                bid by {bidderUsername}
              </Typography>
            </div>
          :
            <div>
              <Typography variant="h6" color="body2" component="p"
               display="inline" fontWeight="fontWeightBold" 
               className={classes.price}>
                ${bidDisplay}{'  '}
              </Typography>
              <Typography variant="body2" color="textSecondary" 
              display="inline" component="p">
                Starting bid
              </Typography>
            </div>
          }
          { (onlyMinutesLeft)
          ?
            <Typography variant="body2" className = {classes.redText}component="p">
              {countdownDisplay}
            </Typography>
          :
            <Typography variant="body2" color="textSecondary" component="p">
              {countdownDisplay}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
  );
}

export default ProductCard;
