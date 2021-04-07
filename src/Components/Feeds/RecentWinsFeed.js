import React, { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './Stylings/styleRecentWinsFeed.js'
import FreebayAPI from '../../Api'
import Divider from '@material-ui/core/Divider';
import LoadingText from '../Common/LoadingText'


/* Renders list of products that were most recently won by any 
user. To be displayed on the home page */

export default function RecentWinsFeed(haveBidsBeenChecked) {
  const classes = useStyles();
  const [allWins, setAllWins] = useState(null);

  useEffect(() => {
    async function getRecentWins() {

      const numOfRecentWins = 3

      // Grab the most recent winners from API
      const result = await FreebayAPI.getRecentWins(numOfRecentWins)
      console.log("results in getRecentWins", result)

      // Map the result shortening the name of each 
      // product to better fit in homepage
      result.map( product => ( 
        product.name = (product.name.substring(0, 70) + "...")
      ))

      console.log("result in recentWinsFeed", result)

      setAllWins(result)
    }
    getRecentWins();
  }, [haveBidsBeenChecked]);

  if (!allWins){
    return <LoadingText />
  }

  return (
    <List className={classes.root}>
      { allWins[0]
      ? 
        allWins.map( product => (
          <div>
            <ListItem alignItems="flex-start">
              <Link href={"/Profile/" + product.username} 
              style={{ textDecoration: 'none' }}
              >
                <ListItemAvatar>
                {product.userImageUrl
                    ?
                      <Avatar alt="Product Image" className={classes.large} src={product.userImageUrl}>
                      </Avatar>
                    :
                     <Avatar alt="Product Image" className={classes.large}>
                     </Avatar>
                    }
                </ListItemAvatar>
              </Link>
              <Link href={"/Profile/" + product.username} 
              style={{ textDecoration: 'none' }}
              >
                <ListItemText primary={product.username} 
                className={classes.listItem}
                secondary={
                  <React.Fragment>
                    <Typography variant="caption" className={classes.inline}
                    color="textSecondary"
                    >
                      {product.name}
                    </Typography>
                  </React.Fragment>
                  }
                />
              </Link>
            </ListItem>
            {/* render a divider for each list item unless it is last in array */}
            { (allWins.indexOf(product) === (allWins.length - 1))
            ? <div></div>
            : <Divider variant="inset" component="li" />
            }
          </div>
        ))
      :
      <Grid
      container
      direction="column"
      alignItems="flex-start"
      justify="flex-start"
      >
          <Grid item xs={12}>
              <Typography variant="h6" color="textSecondary" gutterBottom>
                  None yet!
              </Typography>  
          </Grid>   
      </Grid>
      }
    </List>
  )}


  