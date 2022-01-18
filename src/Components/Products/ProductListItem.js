import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";
import useStyles from "./Stylings/styleProductListItem.js";

// Feed of a user's highest bids. To be displayed for anyone viewing the page

export default function ProductListItem(userProfile) {
  const classes = useStyles();

  const { highest_bids } = userProfile["userProfile"];

  return (
    <div className={classes.root}>
      <Paper className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <List className={classes.root}>
            {highest_bids ? (
              highest_bids.map((p) => (
                <Link href={"/Product/" + p.id} className={classes.product}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt="Product Image"
                        src={p.imageUrl}
                        className={classes.large}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={p.name}
                      className={classes.product}
                      secondary={
                        <React.Fragment>
                          <Typography
                            variant="caption"
                            className={classes.inline}
                            color="textPrimary"
                            className={classes.product}
                          >
                            ${p.bidPrice}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
              ))
            ) : (
              <ReactLoading
                type={"spinningBubbles"}
                color={"#BDBDBD"}
                height={100}
              />            )}
          </List>
        </CardContent>
      </Paper>
    </div>
  );
}
