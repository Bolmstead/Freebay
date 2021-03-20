import React from "react";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './Stylings/styleBidsFeed.js';
import FeedItem from './FeedItem.js'


/* Renders a list of <FeedItem/> components of products a user
   has bidded on. To be displayed on every profile page */

export default function BidsFeed(userProfile) {
  const classes = useStyles();
  const { highest_bids } = userProfile.userProfile

  // If a user has any bids, map the name of each bidded product 
  // into a smaller name to fit within the component container
  if (highest_bids) {
    highest_bids.forEach( product=> product.name.substring(0, 50))
  }

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


  