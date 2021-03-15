import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Link from '@material-ui/core/Link';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './Stylings/styleBidsFeed.js';
import FeedItem from './FeedItem.js'

// Feed of a user's most recent highest bids showing product name and price.
// To be displayed on a user's profile

export default function BidsFeed(userProfile) {
  const classes = useStyles();
  const { highest_bids } = userProfile.userProfile

  // If user has any highest bids, shorten name of 
  // each product in user's highest bids, if user has any highest bids
  if (highest_bids) {
    highest_bids.forEach( product=> product.name.substring(0, 50))
  }

  console.log("highest_bids", highest_bids)

  return (
    <div className={classes.root}>
      <Paper className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <List className={classes.root}>
            { highest_bids.length > 0 
            ? 
            highest_bids.map( p => (  
                <FeedItem p={p}/>
            ))
            :
            <Typography variant="h6" component="h2" align="center" color="textSecondary">
                <br></br>None yet!
              </Typography>
            }
        </List>
      </CardContent>
    </Paper>
    </div>

  )}


  