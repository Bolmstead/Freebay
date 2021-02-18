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


// Displays a feed of a user's viewed and unviewed notifications. 
// If a user has not viewed a notification, the notification will be highlighted.

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));


export default function Notifications(userProfile) {
  const classes = useStyles();
  const { currentUser } = useContext(Context);

  const userProfileUsername = userProfile["userProfile"]["username"]

  console.log("userProfileUsername", userProfileUsername)

  if (userProfileUsername !== currentUser["username"]) {
    return <div></div>
  }

  const { notifications } = currentUser

  console.log("notifications descrucutred from currentUser in Notifications component", notifications)


  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center"   direction="row" spacing="2">
        <Grid item xs={12}>
        <Typography variant="h5" component="h2" align="center">
            Notifications
          </Typography>
        <Card>  
            <CardContent style={{maxHeight: 150, overflow: 'auto'}}>
              <List >
        { notifications.length
          ? 
            notifications.map( n => (

              <ListItem dense="true">
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={n.text}
                />
              </ListItem>
              ))
          : 
              <ListItem alignItems="flex-start">
                <ListItemText secondary="You don't have any notifications"/>
              </ListItem>
        
        }
            </List>

            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </div>
  );
}
