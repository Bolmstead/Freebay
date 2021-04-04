import React from "react";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './Stylings/styleBidsOrWinsFeed';
import FeedItem from './FeedItem.js'


/* Renders a list of <FeedItem/> components of product information. 
   Will either show a user's highest bids or products won.
   To be displayed on every profile page */

export default function UserBidsOrWinsFeed({products}) {
  const classes = useStyles();


  return (
    <div className={classes.root}>
      <Paper className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <List className={classes.root}>
            { products.length > 0 
            ? 
              products.map( p => (  
                <FeedItem p={p}/>
              ))
            :
              <Typography variant="h6" component="h2" 
              align="center" color="textSecondary">
                <br></br>None yet!
              </Typography>
            }
        </List>
      </CardContent>
    </Paper>
    </div>

  )}


  