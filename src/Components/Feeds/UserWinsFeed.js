import React from "react";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './Stylings/styleWinsFeed.js';
import FeedItem from './FeedItem.js';


/* Renders a list of <FeedItem/> components of products a user
   has won. To be displayed on every profile page */

export default function UserWinsFeed(userProfile) {
  const classes = useStyles();
  const { productsWon } = userProfile.userProfile

  // If a user has won products, map each product name into a smaller name
  // to fit within the component container
   if (productsWon) {
    productsWon.forEach( 
      product => product.name = product.name.substring(0, 50) + "..."
    )
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
                <Typography variant="h6" component="h2" 
                align="center" color="textSecondary">
                  None yet!
                </Typography>
              }
          </List>
        </CardContent>
      </Paper>
    </div>

  )}


  