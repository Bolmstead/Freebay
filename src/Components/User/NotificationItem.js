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


import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';


// Displays a feed of a user's viewed and unviewed notifications. 
// If a user has not viewed a notification, the notification will be highlighted.


export default function NotificationItem({n, shortened}) {
  console.log("n",n)
  console.log("shortened",shortened)

  const { currentUser } = useContext(Context);


  if (!currentUser) {
    return <div></div>
  }

  let icon;

  if (n.category === "bid") {
    icon = <AttachMoneyIcon />
  } else if (n.category === "outbid") {
    icon = <SentimentDissatisfiedIcon />
  } else if (n.category === "win") {
    icon = <InsertEmoticonIcon />
  } else if (n.category === "gift") {
    icon = <CardGiftcardIcon />
  }

  if ((shortened) && (n.text.length > 60)) {
    n.text = n.text.substring(0, 60) + "..."
  }

  return (
    <ListItem dense="true">
      <ListItemAvatar>
        <Avatar>
          {icon}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={n.text}
      />
    </ListItem>
  );
}
