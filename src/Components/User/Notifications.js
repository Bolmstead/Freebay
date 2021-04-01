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


export default function Notifications(userProfile) {
  const classes = useStyles();
  const { currentUser } = useContext(Context);

  const profileUsername = userProfile.userProfile.username

  console.log("profileUsername", profileUsername)

  if (!currentUser) {
    return <div></div>
  }

  if (profileUsername !== currentUser.username) {
    return <div></div>
  }

  let { notifications } = currentUser

  console.log("notifications descrucutred from currentUser in Notifications component", notifications)


  return (
    <div>
    <Typography variant="h5" component="h2" align="center">
    Notifications
  </Typography>
        <Paper className={classes.card} variant="outlined">  
            <CardContent className={classes.cardContent}>
              <List >
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
          </div>
  );
}
