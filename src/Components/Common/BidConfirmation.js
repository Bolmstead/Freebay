import React, { useState, useEffect, useContext } from "react";
import {useParams} from 'react-router-dom';
import Context from "./Context";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useStyles from './Stylings/styleBidConfirmation'
import FreebayAPI from '../../Api.js'
import ProductCard from '../Products/ProductCard.js'
import {
  Grid,
  Typography
} from '@material-ui/core/'

// Displays page explaining a user's bid was successfully submitted

export default function BidConfirmation() {
    const classes = useStyles();
    const { currentUser } = useContext(Context);

    return (
        <Grid container spacing={2} justify="center" align="center"><br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <Grid xs={12} item>
              <br/>
              <br/>
              <br/>              <br/>
              <br/>
              <br/>
            <EmojiEmotionsIcon className={classes.smiley} color="disabled" />
                <Typography component="h3" variant="h5">
                    Congrats {currentUser.firstName}, you're now the high bidder!
                </Typography>
                 <br/>              <br/>
              <br/>
              <br/>              <br/>
              <br/>
              <br/>              <br/>
              <br/>
              <br/>              <br/>
              <br/>
              <br/>
            </Grid>
        </Grid>
    );
}