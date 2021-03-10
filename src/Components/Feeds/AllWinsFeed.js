import React, { useState, useEffect, useContext } from "react";
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
import Divider from '@material-ui/core/Divider';


// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function AllWinsFeed() {
  const classes = useStyles();
  const [allWins, setAllWins] = useState(null);


  useEffect(() => {
    async function getRecentWins() {
      const result = await FreebayAPI.getWinsFeed()
      result.map( p => ( 
        p.name = (p.name.substring(0, 50) + "...")
        // p.initial = (p.name.substring(0,1))
      ))
      setAllWins(result)
      console.log("result", result)

    }
    getRecentWins();
  }, []);


  return (
    <List className={classes.root}>
        { allWins
        ? 
        allWins.map( p => (
          <div>

              <ListItem alignItems="flex-start">
              <Link href={"/Profile/" + p.username} style={{ textDecoration: 'none' }}>
              <ListItemAvatar>
              <Avatar alt="Product Image" className={classes.large}>
                B
              </Avatar>
              </ListItemAvatar>
              </Link>
              <Link href={"/Profile/" + p.username}>
            <ListItemText
              primary={p.username}
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    className={classes.inline}
                    color="textSecondary"
                  >
                    {p.name}
                  </Typography>
                </React.Fragment>
                }
              />
              </Link>
              </ListItem>
            
            <Divider variant="inset" component="li" />
          </div>
        ))

        :
        
          <ListItem alignItems="flex-start">
            <ListItemText secondary="None yet!"/>
          </ListItem>
        }

    </List>

  )}


  