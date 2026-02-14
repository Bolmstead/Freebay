import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import { useUserContext } from "../../Context";
import Box from "@mui/material/Box";

// Displays a list item to be seen in a menu drop down
// when a user clicks on the notifications icon

export default function NotificationAppBarItem({ n, shortened }) {
  const { currentUser } = useUserContext();

  if (!currentUser) {
    return <div></div>;
  }

  const icon = "";

  if (shortened && n.text.length > 45) {
    n.text = n.text.substring(0, 42) + "...";
  }

  return (
    <ListItem>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <ListItemAvatar>
          <Avatar>{icon}</Avatar>
        </ListItemAvatar>
      </Box>
      <ListItemText primary={n.text} />
    </ListItem>
  );
}
