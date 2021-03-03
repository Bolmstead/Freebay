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

  console.log("userProfile in WonOrBids Feed", userProfile )

  const { highest_bids } = userProfile["userProfile"]

  console.log("highest_bids in WonOrBids Feed", highest_bids )

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" align="center">
            Current Bids
      </Typography>
      <Card >
      <CardContent style={{maxHeight: 150, overflow: 'auto'}}>
    <List className={classes.root}>
      <h1>{userProfile.username}</h1>
        { highest_bids.length > 0 
        
        ? 
          
        highest_bids.map( p => (  
          <Link href={"/Product/" + p.id} className={classes.product}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Product Image" src={p.imageUrl}
                className={classes.large} />
              </ListItemAvatar>
            <ListItemText
              primary={p.name}
              className={classes.product}
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
        
          <ListItem alignItems="flex-start">
            <ListItemText secondary="None yet!"/>
          </ListItem>
        }
    </List>
    </CardContent>
    </Card>
    </div>

  )}


  