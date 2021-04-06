import React from "react";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './Stylings/styleUserBidsOrWinsFeed';
import FeedItem from './FeedItem.js'


/* Renders a list of <FeedItem/> components of product information. 
   Will either show a user's highest bids or products won.
   To be displayed on every profile page */

export default function UserBidsOrWinsFeed({...props}) {
  const classes = useStyles();
  const {products, title} = props


  return (
      <Paper elevation={3} className={classes.card} >
        <CardContent className={classes.cardContent}>
        <Typography variant="h5" component="h2" align="center" className={classes.feedTitle}>
            {title}
          </Typography>
          <List className={classes.itemList}>
            { products.length > 0 
            ? 
              products.map( p => (  
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

  )}


  