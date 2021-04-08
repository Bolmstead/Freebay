import React, { useState, useEffect, useContext } from "react";
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import {useParams, useHistory, withRouter, ReactDOM } from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LoadingText from '../Common/LoadingText.js'
import Link from '@material-ui/core/Link';
import Countdown from 'react-countdown';
import useStyles from './Stylings/styleProductDetails.js'
import Context from "../../Context";
import Alert from '@material-ui/lab/Alert';
import { Grid, Card, CardContent, Typography} from '@material-ui/core/'


// Component that displays all information of a product.
// Renders a countdown to the end of the auction along with an input
// to allow the user to bid on the product.

/** Displays all information of a product along with a form to
 *  bid on product, if the auction time has not expired.
 * 
 *  - product: productResult of grabbing the desired product from API
 * 
 *  - countdown: holds the imported <Countdown/> component in state
 * 
 *  - bidAmount: state of entered bid into form. Updates while typing
 * **/

function ProductDetails() {
  const classes = useStyles();
  const history = useHistory()
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const [countdown, setCountdown] = useState([]);
  const [bidAmount, setBidAmount] = useState(null);
  const [formErrors, setFormErrors] = useState(null);
  const {id} = useParams();
  const { currentUser, setUpdateAppBar } = useContext(Context);

  useEffect(() => {
    async function getProduct(id) {
      try {
        const productResult = await FreebayAPI.getProduct(id)  

        // If the product has a bid, convert to float type and set with 
        // 2 decimal places (price format) and save to bidPrice variable. 
        // If no bid, do the same with startingBid.
        if (productResult.bidId){
          let bidDisplay = parseFloat(productResult.bidPrice).toFixed(2);
          productResult.bidDisplay = bidDisplay;
        } else {
          let bidDisplay = parseFloat(productResult.startingBid).toFixed(2);
          productResult.bidDisplay = bidDisplay;
        }
        setProduct(productResult);

        // Call the function that creates the auction countdown timer 
        getTimeLeft(productResult.auctionEndDt)
        setInfoLoaded(true)
      } catch(err){
        return console.log(err)
      }

    }
    setInfoLoaded(false)
    getProduct(id)
  }, []);

  // Function creates the countdown timer by subtracting the current time
  // from the product's auction end datetime object. Saves it to state.
  function getTimeLeft(dateTime){
    const auctionEndObj = new Date(dateTime)
    const totalTimeLeft = Date.parse(auctionEndObj) - Date.parse(new Date());
    setCountdown(totalTimeLeft);
    }

  // Handles the form submit of the bid and renders the appropriate
  // error, if any, by saving to state.
  async function handleSubmit(evt) {
      evt.preventDefault();
      try{
        if (!currentUser){
          setFormErrors("Please login to place bid")
          return
        } 

        const balance = parseFloat(currentUser.balance)
        const bid = parseFloat(bidAmount)
        const bidPrice = parseFloat(product.bidPrice)
        const startingBid = parseFloat(product.startingBid)

        if (isNaN(bid)){
          setFormErrors("Please submit a real bid")
        } else if (bid > balance){
          setFormErrors("You do not have sufficient funds to place this bid")
        } else if (bid < bidPrice){
          setFormErrors("Please submit bid higher than the current bid")
        } else if (bid < startingBid){
          setFormErrors("Please submit bid higher than the starting bid")
        } else{
          await FreebayAPI.addBid(id, bid)

          // Trigger a rerender of the CurrentUser by changing the
          // UpdateAppBar state. This will correctly show the user's
          // current balance amount and amount of notifications in the 
          // <PrimarySearchAppBar/> component.
          setUpdateAppBar(true)
          history.push('/bidPlaced')
        }
      } catch(err){
        return console.log(err)
      }
  }

  function handleChange(evt) {
    setBidAmount(evt.target.value);
  }

  if (!infoLoaded) return <LoadingText />;

  return (
    <Container>
      <br/>
      <Grid container spacing={4} justifyContent="center" alignItems="center" >
        <Grid item  xs={12} md={6}>
          <div className={classes.imageContainer}>
          <img
              className={classes.media}
              src={product.imageUrl}
            />
            </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.root} variant="outlined">
              <CardContent className={classes.content} justify="center">
                <Typography variant="h5">
                  {product.name}
                </Typography><br/>
                <div className={classes.ratingContainer}>
                <Rating name="read-only" value={product.rating} size="medium" 
                readOnly display="inline"/>      
                <Typography variant="caption" display="inline" 
                className="ratingNumber" color="textSecondary">
                  {product.numOfRatings} ratings
                </Typography>
                </div>
                <br/>

                <hr className={classes.hr}/><br/>
              {/* If the product's auction has ended, render nothing.
              Otherwise, render the currentBid and bidderUsername. If no bidder,
              render the starting price of the product.*/}
              { product.auctionEnded
              ? 
                <div></div>
              : 
                product.bidPrice 
                ?
                  <div>
                    <Typography variant="h4" className={classes.price} 
                    color="textPrimary" display="inline" >
                      ${product.bidDisplay}{' '}                 
                      <Typography variant="subtitle1" color="textSecondary" 
                      display="inline">
                        is the current bid by {' '} 
                        <Link href={"/Profile/" + product.bidderUsername}>
                          {product.bidderUsername}
                        </Link>
                      </Typography>
                    </Typography>
                    <form className={classes.root} onSubmit={handleSubmit} 
                    noValidate autoComplete="off">
                      <TextField id="outlined-basic" label="Bid" variant="outlined" 
                      size="small" onChange={handleChange}/>
                      <span>{"  "}</span>       
                      <Button size="medium" type="submit" variant="contained" 
                      color="Primary" className={classes.margin}>
                        Place Bid
                      </Button>
                    </form>
                  </div>
                : 
                  <div>
                    <Typography variant="h4" className={classes.price} 
                    color="textPrimary"  display="inline">
                      ${product.bidDisplay}{' '}
                      <Typography variant="subtitle1" color="textSecondary" 
                      display="inline">
                        is the starting bid
                      </Typography>
                    </Typography>
                
                    <form className={classes.root} onSubmit={handleSubmit} 
                    noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Bid" variant="outlined" 
                    size="small" onChange={handleChange}/>
                    <span>{"  "}</span>       
                    <Button size="medium" type="submit" variant="contained" 
                    color="Primary" className={classes.margin}>
                      Place Bid
                    </Button>
                    </form>
                </div>
              }
              {/* Render errors input in the bid form, if any. If not,
              render the countdown timer and number of bids. If auction has ended,
              render Auction ended instead. */}
                {formErrors
                    ? 
                      <div>
                        <br/>
                        <Alert severity="error" variant="filled">{formErrors}</Alert>
                      </div>
                    : 
                      product.auctionEnded
                      ? 
                        <div> 
                          <Typography  variant="subtitle1"  
                          component="p" fontWeight="fontWeightBold" display="inline" className={classes.redText}>
                            Auction ended!
                          </Typography>
                        </div>
                      :
                        <div><br/>
                          <Typography  variant="subtitle1" color="textSecondary" 
                          component="p" fontWeight="fontWeightBold">
                          {product.numOfBids}
                            { 
                            (product.numOfBids == 1)
                            ? " bid" : " bids"
                            }
                          </Typography>
                          <Countdown date={Date.now() + countdown} renderer={props => 
                          <Typography  variant="subtitle1" color="textSecondary" 
                          component="p">
                            {'  '}{"Time left: " + props.days + "d " + 
                            props.hours + "h " + props.minutes + "m " + 
                            props.seconds + "s"}
                          </Typography>} 
                        />


                        </div>
                    }

              </CardContent>
          </Card>
        </Grid>

        <Grid item  xs={12}>
          <Card variant="outlined">
              <CardContent className={classes.content}>
                <Typography variant="h5">
                  Description
                </Typography><br/>

                <hr className={classes.hr}/>
                <br/>
                  <Typography variant="subtitle1" color="textSecondary">
                  {product.description} 
                  </Typography>

              </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      </Container>
  );
}

export default withRouter(ProductDetails);

