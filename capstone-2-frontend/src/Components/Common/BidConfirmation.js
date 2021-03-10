import React, { useState, useEffect, useContext } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useParams, Redirect, useHistory, withRouter, ReactDOM } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Context from "./Context";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useStyles from './Stylings/styleBidConfirmation'
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FreebayAPI from '../../Api.js'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Countdown from 'react-countdown';
import ProductCard from '../Products/ProductCard.js'


import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography
} from '@material-ui/core/'
// Renders a welcome page to explain what the website is about

export default function Welcome() {
    const classes = useStyles();
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [infoLoaded, setInfoLoaded] = useState(false);

    const { currentUser } = useContext(Context);


    useEffect(() => {
        async function getProduct(id) {
            console.log("id from bidConfirmation", id)
          const result = await FreebayAPI.getProduct(id)
          console.log("result from bidConfirmation", result)
          if (result.currentBid){
            let bidDisplay = parseFloat(result.currentBid).toFixed(2);
            result.bidDisplay = bidDisplay;
          } else {
            let bidDisplay = parseFloat(result.startingBid).toFixed(2);
            result.bidDisplay = bidDisplay;
          }
          console.log("result", typeof(result.bidCount))
          setProduct(result);
          setInfoLoaded(true)
    
        }
        setInfoLoaded(false)
        getProduct(id)
      }, []);


    if (!infoLoaded) return(                 
        <Typography component="h1" variant="h3">
            Loading...
        </Typography>
    )

    console.log("product",product)


    return (
        <Grid container spacing={2} justify="center" align="center"><br/><br/><br/>
            <Grid xs={12} item><br/>
            <EmojiEmotionsIcon className={classes.smiley} color="disabled" />

                <Typography component="h3" variant="h5">
                    Congrats {currentUser.firstName}, you're now the high bidder!
                </Typography> <br/>
            </Grid>
            <ProductCard product={product}/>
        
        </Grid>
    );
}