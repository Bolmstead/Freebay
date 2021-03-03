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
import FreebayAPI from '../../Api'

// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function AllWinsFeed() {
  const classes = useStyles();

  const allWins = FreebayAPI.getWinsFeed()

  console.log("allWins", allWins )

  return (
    <div className={classes.root}>
    <Typography variant="h5" component="h2" align="center">
      Products Won
    </Typography>
    <Card >
    <CardContent style={{maxHeight: 150, overflow: 'auto'}}>
    <List className={classes.root}>
      <h1>{userProfile["username"]}</h1>
        { products_won.length > 0 
        
        ? 
          
        products_won.map( p => (  
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
        
          <ListItem alignItems="flex-start">
            <ListItemText secondary="None yet!"/>
          </ListItem>
        }
    </List>
    </CardContent>
    </Card>
    </div>

  )}


  