import React from "react";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { useUserContext } from "../../Context";
import useStyles from "./Stylings/styleNotifications.js";
import Paper from "@mui/material/Paper";
import NotificationFeedItem from "./NotificationFeedItem";
import Link from "@mui/material/Link";

// Displays a feed of a user's viewed and unviewed notifications.

export default function Notifications() {
  const classes = useStyles();
  const { currentUser } = useUserContext();
  const { notifications } = currentUser;

  return (
    <Paper elevation={3} className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.feedTitle} variant="h5" component="h2" align="center">
          Notifications
        </Typography>
        <List className={classes.itemList}>
          {notifications.map((n) =>
            n.relatedProductId ? (
              <Link
                href={"/product/" + n.relatedProductId}
                color="inherit"
                style={{ textDecoration: "none" }}
              >
                <NotificationFeedItem n={n} />
              </Link>
            ) : (
              <NotificationFeedItem n={n} />
            ),
          )}
        </List>
      </CardContent>
    </Paper>
  );
}
