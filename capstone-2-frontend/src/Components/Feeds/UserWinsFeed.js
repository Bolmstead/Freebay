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

// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function UserWinsFeed(userProfile) {
  const classes = useStyles();

  console.log("userProfile in WonOrBids Feed", userProfile )

  const { productsWon } = userProfile["userProfile"]

  console.log("productsWon in WonOrBids Feed", productsWon )

  let productsWonShortName

  if (productsWon) {
    productsWonShortName = productsWon.forEach( p => (p.shortname = p.name.substring(0, 20)))
    console.log(productsWonShortName,"productsWonShortName")
  }
  
  return (
    <div className={classes.root}>
    <Paper className={classes.card} variant="outlined">
    <CardContent className={classes.cardContent}>
    <List className={classes.root}>
      <h1>{userProfile["username"]}</h1>
        { productsWon
        
        ? 
          
        productsWonShortName.map( p => (  
          <Link href={"/Product/" + p.id}>

            <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Product Image" src={p.imageUrl} 
              className={classes.large}/>
            </ListItemAvatar>
          <ListItemText
            primary={p.name}
            secondary={
              <React.Fragment>
                <Typography
                  variant="caption"
                  className={classes.inline}
                  color="textPrimary"
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
              None yet!
          </Typography>
        }
    </List>
    </CardContent>
    </Paper>
    </div>

  )}


  