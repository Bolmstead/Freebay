import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import FreebayAPI from '../../Api.js'
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function BidsFeed(userProfile) {
  const classes = useStyles();

  console.log("userProfile in WonOrBids Feed", userProfile )

  const { highest_bids} = userProfile["userProfile"]

  console.log("highest_bids in WonOrBids Feed", highest_bids )

  const mappedList = (
    highest_bids.map( p => {  
      {<ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Product Image" src={p.imageUrl} />
        </ListItemAvatar>
      <ListItemText
        primary={p.name}
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              className={classes.inline}
              color="textPrimary"
            >
              {p.bidPrice}
            </Typography>
          </React.Fragment>
        }
      />
      </ListItem>}
    })
  )

  console.log("mappedList in WonOrBids Feed", mappedList )


  return (
    <List className={classes.root}>
        <div alignItems="center" justify="center">
            <span>Your current bids</span>
        </div>
        { highest_bids.length > 0 
        ? <h1>Array of products with the highest_bids</h1>
        // {mappedList}
        :<ListItem alignItems="flex-start">
          <ListItemText
            secondary="You don't have any bids yet"
          />
          </ListItem>
        }


    </List>
  )}