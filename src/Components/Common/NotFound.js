import React from "react";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import useStyles from './Stylings/styleWelcomePage'

// Renders a 404 catch all if can't find route

export default function Welcome() {
    const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" align="center"><br/><br/><br/>
        <Grid xs={12} item><br/><br/><br/>
        <SentimentVeryDissatisfiedIcon className={classes.smiley}
         color="disabled" 
         />
            <Typography component="h1" variant="h3">
                404
            </Typography>
        </Grid>
        <Grid item xs={10} md={6}>
            <Typography component="h1" variant="body1" 
            className={classes.bodyText}
            >
                The resource requested could not be found on this server
            </Typography><br/>
        </Grid>
    
    </Grid>
  );
}