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
import Context from "./Context";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';import useStyles from './Stylings/styleWelcomePage'

// Renders 404 page

export default function Welcome() {
    const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" align="center"><br/><br/><br/>
        <Grid xs={12} item><br/><br/><br/>
        <SentimentVeryDissatisfiedIcon className={classes.smiley} color="disabled" />
            <Typography component="h1" variant="h3">
                404
            </Typography>
        </Grid>
        <Grid item xs={10} md={6}>
            <Typography component="h1" variant="body1" className={classes.bodyText}>
            The resource requested could not be found on this server
            </Typography><br/>
        </Grid>
    
    </Grid>
  );
}