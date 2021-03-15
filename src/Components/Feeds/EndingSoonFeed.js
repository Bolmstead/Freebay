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
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


// Feed products auction ending soon

export default function EndingSoonFeed() {
  const classes = useStyles();
  const [productsEndingSoon, setProductsEndingSoon] = useState(null);


  useEffect(() => {
    async function getProductsEndingSoon() {
      const result = await FreebayAPI.getProductsEndingSoon()
      setProductsEndingSoon(result)
      console.log("result", result)
    }
    getProductsEndingSoon();
  }, []);


  return (
    <List className={classes.root}>
      
        { productsEndingSoon
        
        ? 
          
        productsEndingSoon.map( p => (
          <div>
            <Link href={"/Product/" + p.id} dense={true}>

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
                    {
                      p.bidPrice
                    ? p.bidPrice
                    : p.startingBid
                    }
                  </Typography>
                </React.Fragment>
                }
              />
              </ListItem>
            </Link>
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



