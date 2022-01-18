import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import useStyles from "./Stylings/styleFeedItem.js";

// List item displaying product's title
// Renders within the <UserBidsFeed/> and <UserWinsFeed/> components.

export default function FeedItem(product) {
  const classes = useStyles();
  let { p } = product;

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
    <Link
      href={"/Product/" + p.id}
      className={classes.product}
      style={{ textDecoration: "none" }}
    >
      <ListItem alignItems="center" className={classes.listItem}>
        <ListItemAvatar>
          <Avatar
            alt="Product Image"
            src={p.imageUrl}
            className={classes.large}
          >
            
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={productName}
          className={classes.product}
          color="textPrimary"
        />
      </ListItem>
    </Link>
  );
}
