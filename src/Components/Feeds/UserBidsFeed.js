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
import useStyles from './Stylings/styleBidsFeed.js'

// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function BidsFeed(userProfile) {
  const classes = useStyles();

  console.log("userProfile in UserBidsFeed", userProfile )

  const { highest_bids } = userProfile["userProfile"]

  console.log("highest_bids in UserBidsFeed", highest_bids )

  function truncate(str, n){
    if (str !== undefined) {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;}
  };

  if (highest_bids) {
    highest_bids.forEach( product=> product.name = truncate(product.name, 50))
    console.log("highest_bids", highest_bids)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.card} variant="outlined">
      <CardContent className={classes.cardContent}>
    <List className={classes.root}>
        { highest_bids.length > 0 
        ? 
        highest_bids.map( p => (  
          <Link href={"/Product/" + p.id} className={classes.product} style={{ textDecoration: 'none' }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Product Image" src={p.imageUrl}
                className={classes.large} />
              </ListItemAvatar>
            <ListItemText
              primary={p.name}
              className={classes.product}
              color="textPrimary"
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.inline}
                    color="textPrimary"
                    className={classes.product}
                  >
                    ${p.bidPrice}
                  </Typography>
                </React.Fragment>
                }
              />
            </ListItem>
          </Link>
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


  