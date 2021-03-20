import React, { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleWinsFeed.js'
import FreebayAPI from '../../Api'
import Divider from '@material-ui/core/Divider';


/* Renders a list of products that most recently been won by any 
user. To be displayed on the home page */

export default function AllWinsFeed() {
  const classes = useStyles();
  const [allWins, setAllWins] = useState(null);

  useEffect(() => {
    async function getRecentWins() {

      // Grab the most recent winners from API
      const result = await FreebayAPI.getWinsFeed()

      // Map the result shortening the name of each 
      // product to better fit in homepage
      result.map( product => ( 
        product.name = (product.name.substring(0, 60) + "...")
      ))
      setAllWins(result)
    }
    getRecentWins();
  }, []);

  return (
    <List className={classes.root}>
      { allWins
      ? 
        allWins.map( product => (
          <div>
            <ListItem alignItems="flex-start">
              <Link href={"/Profile/" + product.username} style={{ textDecoration: 'none' }}>
                <ListItemAvatar>
                  <Avatar alt="Product Image" className={classes.large}>
                    {product.username.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
              </Link>
              <Link href={"/Profile/" + product.username} style={{ textDecoration: 'none' }}>
                <ListItemText primary={product.username} className={classes.listItem}
                secondary={
                  <React.Fragment>
                    <Typography variant="caption" className={classes.inline}color="textSecondary">
                      {product.name}
                    </Typography>
                  </React.Fragment>
                  }
                />
              </Link>
            </ListItem>
            {/* render a divider for each list item unless last in array */}
            { (allWins.indexOf(product) === (allWins.length - 1))
            ? <div></div>
            : <Divider variant="inset" component="li" />
            }
          </div>
        ))
      :
        <ListItem alignItems="flex-start">
          <ListItemText secondary="None yet!"/>
        </ListItem>
      }
    </List>
  )}


  