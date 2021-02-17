import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


// Feed of a user's product's wins. To be displayed for anyone viewing the page

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

  const { products_won} = userProfile["userProfile"]

  console.log("products_won in WonOrBids Feed", products_won )

  const mappedList = (
    products_won.map( p => {  
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
            <span>Products you have won</span>
        </div>
        { products_won.length > 0 
        ? <h1>Array of products won</h1>
        // {mappedList}
        :<ListItem alignItems="flex-start">
          <ListItemText
            secondary="You haven't won any products yet"
          />
          </ListItem>
        }


    </List>
  )}