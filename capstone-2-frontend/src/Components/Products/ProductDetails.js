import React, { useState, useEffect } from "react";
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


const useStyles = makeStyles({

  imageContainer: {
    height: '400px',
    width: '400px',
    margin: 'auto'
  },
  media: {
    height: '400px',
    objectFit: 'contain',
  },

  cover: {
    width: 151,
  },

  hr: {
    height:'1px', 
    borderWidth:0, 
    color:'lightgrey', 
    backgroundColor: '#e6e6e6', 
    margin:0, 
    padding: 0
  },
  root: {

  }


  
});




function ProductDetails() {
  const classes = useStyles();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const [countdown, setCountdown] = useState([]);
  const [bidAmount, setBidAmount] = useState(null);

  const history = useHistory()
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
      console.log("product",product)
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
<br/>


      <Grid container spacing={2}  >
        <Grid item  xs={12} md={6}>
          <Card className={classes.imageContainer} variant="outlined">
          <CardMedia
              className={classes.media}
              image={product["imageUrl"]}
            />
            </Card>
        </Grid>
        <Grid item  xs={12} md={6}   justifyContent="center"
  alignItems="center">
          <Card className={classes.root}>
              <CardContent className={classes.content} justify="center">
                <Typography component="h7" variant="h7">
                  {product["name"]}
                </Typography><br/>
                <Rating name="read-only" value={product["rating"]} size="medium" readOnly display="inline"/>      
                <Typography variant="caption" display="inline" className="ratingNumber" color="textSecondary">
                  {product["numOfRatings"]} ratings
                </Typography>
                <br/><br/>

                <hr className={classes.hr}/>
                <br/>
                { 
                product["currentBid"] 
                ? <div>
                    <Typography variant="h4" color="textPrimary" display="inline" >
                    ${product["currentBid"]}
                    </Typography>
                  <Typography variant="subtitle1" color="textSecondary" display="inline">
                 is the current bid by {product["currentBidderUsername"]}
                  </Typography>
                  </div>
                : <div>
                <Typography variant="h4" color="textPrimary"  display="inline">
                  ${product["marketPrice"]}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary" display="inline">
                  is the starting bid
                  </Typography>
                  </div>
                }

                <form className={classes.root} onSubmit={handleSubmit} noValidate autoComplete="off">

                  <TextField id="outlined-basic" label="Bid" variant="outlined" size="small" onChange={handleChange}/>        
                  <Button size="medium" type="submit" variant="contained" color="Primary" className={classes.margin}>
                    Place Bid
                  </Button>
                </form>
                <br/>


                <Countdown date={Date.now() + countdown} renderer={props => <Typography variant="body2" color="textPrimary" component="p" fontWeight="fontWeightBold">{"Time left: " + props.days + "d " + props.hours + "h " + props.minutes + "m " + props.seconds + "s"}</Typography>} />

              </CardContent>
          </Card>
        </Grid>

        <Grid item  xs={12}>
          <Card className={classes.root}>
              <CardContent className={classes.content}>
                <Typography component="h7" variant="h7">
                  Description
                </Typography><br/><br/>

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

