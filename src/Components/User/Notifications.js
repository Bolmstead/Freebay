import React, { useState, useEffect, useContext } from "react";import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FolderIcon from '@material-ui/icons/Folder';
import Context from "../Common/Context";
import useStyles from './Stylings/styleNotifications.js'
import Paper from '@material-ui/core/Paper';
import NotificationItem from './NotificationItem'
import Link from '@material-ui/core/Link';



// Displays a feed of a user's viewed and unviewed notifications. 
// If a user has not viewed a notification, the notification will be highlighted.


export default function Notifications() {
  const classes = useStyles();
  const { currentUser } = useContext(Context);
  let { notifications } = currentUser

  return (
    <Paper elevation={3} className={classes.card} >  
      <CardContent className={classes.cardContent}>
        <Typography className={classes.feedTitle} variant="h5" component="h2" align="center">
          Notifications
        </Typography>
        <List className={classes.itemList} >
          {( notifications.map( n => (
              n.relatedProductId
              ? <Link href={"/product/"+ n.relatedProductId} 
                      color="inherit" 
                      style={{ textDecoration: 'none' }}
                >
                  <NotificationItem n={n} />
                </Link>
              : 
                <NotificationItem n={n} />
              ))
            )
          }
        </List>
      </CardContent>
    </Paper>
  );
}
