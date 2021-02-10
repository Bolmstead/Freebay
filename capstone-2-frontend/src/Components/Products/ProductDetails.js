import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import {useParams} from 'react-router-dom';
import FreebayAPI from '../../Api.js'
import ProductsContext from "../Common/ProductsContext";
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import TextField from '@material-ui/core/TextField';
import ReactDOM from "react-dom";
import Countdown from "react-countdown";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@material-ui/core/'






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
  const { products, getProduct } = useContext(ProductsContext);

  const auctionEndObj = new Date(products["auctionEndDt"])
  const totalTimeLeft = Date.parse(auctionEndObj) - Date.parse(new Date());


  const [countdown, setCountdown] = useState([totalTimeLeft]);

  const {id} = useParams();

  useState(() => {
    getProduct(id);
    console.log(products)
  }, []);


  // Create countdown timer

  useEffect(() => {
    async function getTimeLeft(auctionEndObj){
    const totalTimeLeft = Date.parse(auctionEndObj) - Date.parse(new Date());
    setCountdown(totalTimeLeft);
    }
    getTimeLeft(auctionEndObj)
    console.log("countdown",countdown)
  }, []);


  return (
    <Container>

      <h1>Product Details</h1>
      <Grid container spacing={2}>
        <Grid item  xs={12} sm={6}>
          <Box color="text.secondary">
            <img
              className={classes.media}
              src={products["imageUrl"]}
            />
            </Box>
        </Grid>
        <Grid item  xs={12} sm={6}>
          <Card className={classes.root}>
              <CardContent className={classes.content}>
                <Typography component="h7" variant="h7">
                  {products["name"]}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Mac Miller
                </Typography>
                <Rating name="read-only" value={products["rating"]} size="medium" readOnly display="inline"/>      
                <Typography variant="caption" display="inline" className="ratingNumber" color="textSecondary">
                  {products["numOfRatings"]}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {products["marketPrice"]}
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">

                  <TextField id="outlined-basic" label="Place Bid" variant="outlined" />
                </form>

                <Countdown date={Date.now() + countdown} renderer={props => <Typography variant="body2" color="textPrimary" component="p" fontWeight="fontWeightBold">{"Time left: " + props.days + "d " + props.hours + "h " + props.minutes + "m " + props.seconds + "s"}</Typography>} />

              </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      </Container>
  );
}

export default ProductDetails;

