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
  const { currentUser, setUpdateAppBar } = useContext(Context);


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
      getTimeLeft(result.auctionEndDt)
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
    if (!currentUser){
      setFormErrors("Please login to place bid")
      return
    } 

    const balance = parseFloat(currentUser.balance)
    const bid = parseFloat(bidAmount)
    const currentBid = parseFloat(product.currentBid)
    const startingBid = parseFloat(product.startingBid)

    console.log("bid", typeof(bid), bid)
    console.log("balance:", typeof(balance), balance)
    console.log("currentBid", typeof(product.currentBid), product.currentBid)

    if (isNaN(bid)){
      setFormErrors("Please submit a real bid")
    } else if (bid > balance){
      setFormErrors("You do not have sufficient funds to place this bid")
    } else if (bid < currentBid){
      setFormErrors("Please submit bid higher than the current bid")
    } else if (bid < startingBid){
      setFormErrors("Please submit bid higher than the starting bid")
    } else{
      await FreebayAPI.addBid(id, bid)

      setUpdateAppBar(true)
      history.push('/bidPlaced/' + product.id)
    }
  }

  function handleChange(evt) {
    setBidAmount(evt.target.value);
    console.log("bidAmount", bidAmount)
  }

  if (!infoLoaded) return <LoadingSpinner />;
  console.log("countdown",countdown)

  console.log("product in ProductDetails.js", product)
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
                <Rating name="read-only" value={product.rating} size="medium" readOnly display="inline"/>      
                <Typography variant="caption" display="inline" className="ratingNumber" color="textSecondary">
                  {product.numOfRatings} ratings
                </Typography>
                </div>
                <br/>

                <hr className={classes.hr}/><br/>
              { product.auctionEnded
              ? 
                <div></div>
              : 
                product.currentBid 
                ?
                  <div>
                    <Typography variant="h4" className={classes.price} color="textPrimary" display="inline" >
                      ${product.bidDisplay}{' '}                 
                      <Typography variant="subtitle1" color="textSecondary" display="inline">
                        is the current bid by {' '} 
                        <Link href={"/Profile/" + product.bidderUsername}>
                          {product.bidderUsername}
                        </Link>
                      </Typography>
                    </Typography>
                    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">
                      <TextField id="outlined-basic" label="Bid" variant="outlined" size="small" onChange={handleChange}/>
                      <span>{"  "}</span>       
                      <Button size="medium" type="submit" variant="contained" color="Primary" className={classes.margin}>
                        Place Bid
                      </Button>
                    </form>
                  </div>
                : 
                  <div>
                    <Typography variant="h4" className={classes.price} color="textPrimary"  display="inline">
                      ${product.bidDisplay}{' '}
                      <Typography variant="subtitle1" color="textSecondary" display="inline">
                        is the starting bid
                      </Typography>
                    </Typography>
                
                    <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Bid" variant="outlined" size="small" onChange={handleChange}/>
                    <span>{"  "}</span>       
                    <Button size="medium" type="submit" variant="contained" color="Primary" className={classes.margin}>
                      Place Bid
                    </Button>
                    </form>
                </div>
              }
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
                          <Typography  variant="subtitle1" color="textSecondary" component="p" fontWeight="fontWeightBold" display="inline">
                            Auction ended!
                          </Typography>
                        </div>
                      :
                        <div><br/>
                          <Countdown date={Date.now() + countdown} renderer={props => 
                          <Typography  variant="subtitle1" color="textSecondary" component="p">
                            {'  '}{"Time left: " + props.days + "d " + props.hours + "h " + props.minutes + "m " + props.seconds + "s"}
                          </Typography>} 
                        />

                        <Typography  variant="subtitle1" color="textSecondary" component="p" fontWeight="fontWeightBold">
                        {product.bidCount}
                          { 
                          (product.bidCount == 1)
                          ? " bid" : " bids"
                          }
                        </Typography>
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

