import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { useUserContext } from "../../Context";

// Displays a feed of a user's viewed and unviewed notifications.
// If a user has not viewed a notification, the notification will be highlighted.

export default function NotificationFeedItem({ n, shortened }) {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <div></div>;
  }

  const icon = "";

  return (
    <ListItem dense={true}>
      <ListItemAvatar>
        <Avatar>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={n.text} />
    </ListItem>
  );
}
