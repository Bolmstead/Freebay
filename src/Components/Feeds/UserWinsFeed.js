import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './Stylings/styleWinsFeed.js'
import FeedItem from './FeedItem.js'


// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function UserWinsFeed(userProfile) {
  const classes = useStyles();

  console.log("userProfile in WonOrBids Feed", userProfile )

  const { productsWon } = userProfile.userProfile

  console.log("productsWon in WonOrBids Feed", productsWon )

  function truncate(str, n){
    if (str !== undefined) {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;}
  };


   if (productsWon) {
    productsWon.forEach( product=> product.name = truncate(product.name, 50))
    console.log("productsWon", productsWon)
  }
  
  return (
    <div className={classes.root}>
    <Paper className={classes.card} variant="outlined">
    <CardContent className={classes.cardContent}>
    <List className={classes.root}>
      <h1>{userProfile.username}</h1>
        { productsWon
        
        ? 
          
        productsWon.map( p => (  
          <FeedItem p={p}/>
        ))

        :
        
        <Typography variant="h6" component="h2" align="center" color="textSecondary">
              None yet!
          </Typography>
        }
    </List>
    </CardContent>
    </Paper>
    </div>

  )}


  