import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import useStyles from "./Stylings/styleFeedItem.js";

// List item displaying product's title
// Renders within the <UserBidsFeed/> and <UserWinsFeed/> components.

export default function FeedItem(product) {
  const classes = useStyles();
  const { p } = product;

  // if product name is larger than a certain length, create a substring
  // of the text and save to productName variable. Will be used for the
  // product's title.
  let productName;
  if (p.name.length > 78) {
    productName = p.name.substring(0, 80) + "...";
  } else {
    productName = p.name;
  }

  return (
    <Link href={"/Product/" + p.id} className={classes.product} style={{ textDecoration: "none" }}>
      <ListItem alignItems="center" className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt="Product Image" src={p.imageUrl} className={classes.large}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={productName} className={classes.product} color="textPrimary" />
      </ListItem>
    </Link>
  );
}
