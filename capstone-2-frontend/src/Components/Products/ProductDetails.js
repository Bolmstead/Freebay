import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {useParams, Redirect, useHistory, withRouter, ReactDOM } from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LoadingSpinner from '../Common/LoadingSpinner.js'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Countdown from 'react-countdown';
import useStyles from './Stylings/styleProductDetails.js'
import Context from "../Common/Context";
import Alert from '@material-ui/lab/Alert';


import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core/'



// Component that displays all information of a product.
// Renders a countdown to the end of the auction along with an input
// to allow the user to bid on the product.

function ProductDetails() {
  const classes = useStyles();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const [countdown, setCountdown] = useState([]);
  const [bidAmount, setBidAmount] = useState(null);
  const [formErrors, setFormErrors] = useState(null);


  const history = useHistory()
  const {id} = useParams();
  const { currentUser} = useContext(Context);


  useEffect(() => {
    async function getProduct(id) {
      const result = await FreebayAPI.getProduct(id)
      if (result.currentBid){
        let bidDisplay = parseFloat(result.currentBid).toFixed(2);
        result.bidDisplay = bidDisplay;
      } else {
        let bidDisplay = parseFloat(result.startingBid).toFixed(2);
        result.bidDisplay = bidDisplay;
      }
      console.log("result", typeof(result.bidCount))
      setProduct(result);
      getTimeLeft(result["auctionEndDt"])
      setInfoLoaded(true)

    }
    setInfoLoaded(false)
    getProduct(id)
  }, []);

  // Create countdown timer
  function getTimeLeft(dateTime){
    const auctionEndObj = new Date(dateTime)
    const totalTimeLeft = Date.parse(auctionEndObj) - Date.parse(new Date());
    setCountdown(totalTimeLeft);
    }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const balance = parseFloat(currentUser.balance)
    const bid = parseFloat(bidAmount)
    const currentBid = parseFloat(product.currentBid)

    console.log("bid", typeof(bid), bid)
    console.log("balance:", typeof(balance), balance)
    console.log("currentBid", typeof(product.currentBid), product.currentBid)
    if (!currentUser){
      setFormErrors("Please login to place bid")
    } else if (bid > balance){
      setFormErrors("You do not have sufficient funds to place this bid")
    } else if (bid < currentBid){
      setFormErrors("Please submit bid higher than the current bid")
    } else{
      await FreebayAPI.addBid(id, bid)
      history.push('/')
    }
  }

  function handleChange(evt) {
    setBidAmount(evt.target.value);
    console.log("bidAmount", bidAmount)
  }

  if (!infoLoaded) return <LoadingSpinner />;
  console.log("countdown",countdown)

  return (
    <Container>
<br/>


      <Grid container spacing={2} justifyContent="center" alignItems="center" >
        <Grid item  xs={12} md={6}>
          <Card className={classes.imageContainer} variant="outlined">
          <img
              className={classes.media}
              src={product["imageUrl"]}
            />
            </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.root}>
              <CardContent className={classes.content} justify="center">
                <Typography variant="h5">
                  {product["name"]}
                </Typography><br/>
                <div className={classes.ratingContainer}>
                <Rating name="read-only" value={product["rating"]} size="medium" readOnly display="inline"/>      
                <Typography variant="caption" display="inline" className="ratingNumber" color="textSecondary">
                  {product["numOfRatings"]} ratings
                </Typography>
                </div>
                <br/>

                <hr className={classes.hr}/><br/>
                { 
                product["currentBid"] 
                ? <div>
                    <Typography variant="h4" className={classes.price} color="textPrimary" display="inline" >
                      ${product.bidDisplay}{' '}                 
                      <Typography variant="subtitle1" color="textSecondary" display="inline">
                        is the current bid by {' '} 
                        <Link href={"/Profile/" + product.currentBidderUsername}>
                          {product.currentBidderUsername}
                        </Link>
                      </Typography>
                    </Typography>
                  </div>
                : <div>
                <Typography variant="h4" className={classes.price} color="textPrimary"  display="inline">
                  ${product.bidDisplay}{' '}
                  <Typography variant="subtitle1" color="textSecondary" display="inline">
                     is the starting bid
                  </Typography>
                </Typography>

                  </div>
                }

                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">

                  <TextField id="outlined-basic" label="Bid" variant="outlined" size="small" onChange={handleChange}/>
                  <span>{"  "}</span>       
                  <Button size="medium" type="submit" variant="contained" color="Primary" className={classes.margin}>
                    Place Bid
                  </Button>
                </form>
                <br/>

                {formErrors
                    ? 
                      <div>
                        <Alert severity="error" variant="filled">{formErrors}</Alert>
                      </div>
                    : 
                      <div>
                        <Typography display="inline" variant="subtitle1" color="textSecondary" component="p" fontWeight="fontWeightBold">
                        {product.bidCount}
                          { 
                          (product.bidCount == 1)
                          ? " bid" : " bids"
                          }
                        </Typography>
                        </div>
                    }
                        <Countdown date={Date.now() + countdown} renderer={props => 
                          <Typography display="inline" variant="subtitle1" color="textSecondary" component="p">
                            {'  '}{"Time left: " + props.days + "d " + props.hours + "h " + props.minutes + "m " + props.seconds + "s"}
                          </Typography>} 
                        />

              </CardContent>
          </Card>
        </Grid>

        <Grid item  xs={12}>
          <Card>
              <CardContent className={classes.content}>
                <Typography variant="h5">
                  Description
                </Typography><br/>

                <hr className={classes.hr}/>
                <br/>
                  <Typography variant="subtitle1" color="textSecondary">
                  {product["description"]} 
                  </Typography>

              </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      </Container>
  );
}

export default withRouter(ProductDetails);

