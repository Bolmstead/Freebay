import React, { useState, useContext } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import Context from "../Common/Context";
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import useStyles from './Stylings/styleWelcomePage'
// Renders a welcome page to explain what the website is about

export default function Welcome() {
    const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" align="center"><br/><br/><br/>
        <Grid xs={12} item><br/><br/><br/>
        <EmojiEmotionsIcon className={classes.smiley} color="disabled" />

            <Typography component="h1" variant="h3">
                Welcome to freeBay
            </Typography>
        </Grid>
        <Grid item xs={10} md={6}>
            <Typography component="h1" variant="body1" className={classes.bodyText}>
            The website that lets you bid on fake products with fake money!
            </Typography><br/>

            <Typography component="h1" variant="body1" className={classes.bodyText}>
            To find products, click from the categories above or use the search bar. All products are up for auction, so the user with the highest bid at the end of the time limit "wins" the product! After creating an account, you can find your highest bids, products you've won, and your notifications by clicking on the Profile button from the top right icon.
            </Typography><br/>
            <Typography component="h1" variant="body1" className={classes.bodyText}>
            Enjoy!
            </Typography>
        </Grid>
    
    </Grid>
  );
}